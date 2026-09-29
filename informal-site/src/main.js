import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.matchMedia('(max-width: 760px)').matches;

const mount = document.querySelector('#world-canvas');
const zonePanel = document.querySelector('#zone-panel');
const zoneKicker = document.querySelector('#zone-kicker');
const zoneTitle = document.querySelector('#zone-title');
const zoneCopy = document.querySelector('#zone-copy');
const zoneMeta = document.querySelector('#zone-meta');
const tutorialButton = document.querySelector('#tutorial-button');
const resetButton = document.querySelector('#reset-view');
const canvasHint = document.querySelector('#canvas-hint');

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.35 : 1.8));
renderer.setSize(mount.clientWidth, mount.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = !isMobile;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
mount.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07100f);
scene.fog = new THREE.FogExp2(0x07100f, 0.023);

const camera = new THREE.PerspectiveCamera(52, mount.clientWidth / mount.clientHeight, 0.1, 160);
camera.position.set(24, 18, 27);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.target.set(0, 2.4, 0);
controls.minDistance = 10;
controls.maxDistance = 48;
controls.maxPolarAngle = Math.PI * 0.485;
controls.minPolarAngle = Math.PI * 0.16;
controls.enablePan = false;

const hemi = new THREE.HemisphereLight(0x9bd9ff, 0x13251d, 2.05);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xd9fbff, 4.3);
sun.position.set(18, 28, 10);
sun.castShadow = !isMobile;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -32;
sun.shadow.camera.right = 32;
sun.shadow.camera.top = 32;
sun.shadow.camera.bottom = -32;
scene.add(sun);

const rim = new THREE.DirectionalLight(0x5effc6, 1.8);
rim.position.set(-18, 9, -20);
scene.add(rim);

const ocean = new THREE.Mesh(
  new THREE.CircleGeometry(48, 64),
  new THREE.MeshStandardMaterial({ color: 0x071c25, roughness: 0.35, metalness: 0.35 })
);
ocean.rotation.x = -Math.PI / 2;
ocean.position.y = -1.04;
scene.add(ocean);

const terrainMaterial = new THREE.MeshStandardMaterial({
  color: 0x244b3b,
  roughness: 0.94,
  metalness: 0.02,
  flatShading: true
});

const terrainSize = isMobile ? 29 : 37;
const terrainGeometry = new THREE.BoxGeometry(1, 1, 1);
const terrain = new THREE.InstancedMesh(terrainGeometry, terrainMaterial, terrainSize * terrainSize);
terrain.receiveShadow = !isMobile;
terrain.castShadow = false;
scene.add(terrain);

const dummy = new THREE.Object3D();
let terrainIndex = 0;
const half = Math.floor(terrainSize / 2);

function terrainHeight(x, z) {
  const r = Math.hypot(x, z);
  if (r < 15) return 1;
  const ridge = Math.sin(x * 0.43) * 0.7 + Math.cos(z * 0.37) * 0.55 + Math.sin((x + z) * 0.22) * 0.45;
  const rise = Math.max(0, (r - 14) * 0.18);
  return THREE.MathUtils.clamp(Math.round(1 + rise + ridge), 1, 5);
}

for (let x = -half; x <= half; x += 1) {
  for (let z = -half; z <= half; z += 1) {
    const h = terrainHeight(x, z);
    dummy.position.set(x, -1 + h / 2, z);
    dummy.scale.set(0.96, h, 0.96);
    dummy.updateMatrix();
    terrain.setMatrixAt(terrainIndex++, dummy.matrix);
  }
}
terrain.instanceMatrix.needsUpdate = true;

const pathMaterial = new THREE.MeshStandardMaterial({ color: 0x334b4c, roughness: 0.8, metalness: 0.14 });
const pathGlowMaterial = new THREE.MeshStandardMaterial({
  color: 0x4df2be,
  emissive: 0x18a987,
  emissiveIntensity: 2.2,
  roughness: 0.28,
  metalness: 0.36
});

function addPath(x1, z1, x2, z2) {
  const dx = x2 - x1;
  const dz = z2 - z1;
  const steps = Math.max(Math.abs(dx), Math.abs(dz));
  for (let i = 0; i <= steps; i += 1) {
    const t = steps === 0 ? 0 : i / steps;
    const x = Math.round(THREE.MathUtils.lerp(x1, x2, t));
    const z = Math.round(THREE.MathUtils.lerp(z1, z2, t));
    const block = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.16, 0.92), i % 4 === 0 ? pathGlowMaterial : pathMaterial);
    block.position.set(x, 0.08, z);
    block.receiveShadow = !isMobile;
    scene.add(block);
  }
}

addPath(0, 0, -11, 0);
addPath(0, 0, 11, 0);
addPath(0, 0, 0, -11);
addPath(0, 0, 0, 11);

const plaza = new THREE.Group();
scene.add(plaza);

const plazaBase = new THREE.Mesh(
  new THREE.CylinderGeometry(4.4, 4.4, 0.55, 8),
  new THREE.MeshStandardMaterial({ color: 0x263b42, roughness: 0.6, metalness: 0.32 })
);
plazaBase.position.y = 0.28;
plazaBase.receiveShadow = !isMobile;
plaza.add(plazaBase);

const beaconCore = new THREE.Mesh(
  new THREE.BoxGeometry(1.15, 6.8, 1.15),
  new THREE.MeshStandardMaterial({ color: 0x102723, emissive: 0x26d9a6, emissiveIntensity: 2.6, metalness: 0.72, roughness: 0.18 })
);
beaconCore.position.y = 3.72;
beaconCore.castShadow = !isMobile;
plaza.add(beaconCore);

for (let y = 1.15; y < 6.5; y += 1.35) {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.2 + y * 0.025, 0.055, 6, 24),
    new THREE.MeshBasicMaterial({ color: 0x69ffd2 })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = y;
  ring.userData.baseY = y;
  plaza.add(ring);
}

const zones = [
  {
    id: 'career',
    code: 'ZONE 01',
    title: 'Career Base',
    copy: 'Your starting settlement: profile, skills, evidence, jobs, applications, approvals, and the systems that keep the search grounded.',
    meta: 'FOUNDATION // ACTIVE',
    position: new THREE.Vector3(-11, 0, 0),
    camera: new THREE.Vector3(-19, 9, 11),
    look: new THREE.Vector3(-11, 2.3, 0),
    accent: 0x62f29f,
    type: 'base'
  },
  {
    id: 'forge',
    code: 'ZONE 02',
    title: 'Agent Forge',
    copy: 'A workshop for specialist agents: mentoring, research, resumes, application preparation, coordination, and reviewed automation.',
    meta: 'AUTOMATION // DEVELOPING',
    position: new THREE.Vector3(11, 0, 0),
    camera: new THREE.Vector3(19, 10, 9),
    look: new THREE.Vector3(11, 2.7, 0),
    accent: 0x5ee7ff,
    type: 'forge'
  },
  {
    id: 'range',
    code: 'ZONE 03',
    title: 'Cyber Range',
    copy: 'The training grounds: Proxmox-backed environments, SIEM telemetry, guided investigations, attack simulation, and lab-generated evidence.',
    meta: 'TRAINING // EXPANDING',
    position: new THREE.Vector3(0, 0, -11),
    camera: new THREE.Vector3(11, 10, -20),
    look: new THREE.Vector3(0, 2.4, -11),
    accent: 0xff706c,
    type: 'range'
  },
  {
    id: 'vault',
    code: 'ZONE 04',
    title: 'Evidence Vault',
    copy: 'A hardened archive for screenshots, notes, detections, fixes, writeups, and proof that turns practice into employer-visible experience.',
    meta: 'PROOF // ONLINE',
    position: new THREE.Vector3(0, 0, 11),
    camera: new THREE.Vector3(-10, 9, 20),
    look: new THREE.Vector3(0, 2.4, 11),
    accent: 0xc988ff,
    type: 'vault'
  }
];

const hitTargets = [];
const animatedElements = [];

function block(x, y, z, sx, sy, sz, material, parent, cast = true) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = cast && !isMobile;
  mesh.receiveShadow = !isMobile;
  parent.add(mesh);
  return mesh;
}

function materialFor(base, emissive = 0x000000, intensity = 0) {
  return new THREE.MeshStandardMaterial({ color: base, emissive, emissiveIntensity: intensity, roughness: 0.58, metalness: 0.26 });
}

function createLandmark(zone) {
  const group = new THREE.Group();
  group.position.copy(zone.position);
  scene.add(group);

  const stone = materialFor(0x26383e);
  const dark = materialFor(0x111d22);
  const accent = materialFor(zone.accent, zone.accent, 1.25);

  if (zone.type === 'base') {
    block(0, 1.3, 0, 5.8, 2.6, 5.2, stone, group);
    block(-2.05, 3.05, -1.65, 1.2, 2.1, 1.2, dark, group);
    block(2.05, 3.05, -1.65, 1.2, 2.1, 1.2, dark, group);
    block(0, 3.1, 0.2, 2.6, 1.1, 1.7, accent, group);
    block(0, 4.2, 0.15, 0.22, 1.2, 0.22, accent, group, false);
  }

  if (zone.type === 'forge') {
    block(0, 0.7, 0, 6.3, 1.4, 5.2, dark, group);
    block(-1.85, 2.2, 0, 1.5, 3.1, 1.5, stone, group);
    block(1.85, 2.2, 0, 1.5, 3.1, 1.5, stone, group);
    const bridge = block(0, 3.25, 0, 2.7, 0.38, 0.65, accent, group);
    bridge.userData.pulse = true;
    animatedElements.push(bridge);
    for (const x of [-2.35, 2.35]) {
      const antenna = block(x, 4.65, 0, 0.22, 2.5, 0.22, accent, group, false);
      antenna.userData.floatGlow = true;
      animatedElements.push(antenna);
    }
  }

  if (zone.type === 'range') {
    block(0, 0.55, 0, 6.4, 1.1, 6.4, dark, group);
    for (const [x, z] of [[-2.2,-2.2],[2.2,-2.2],[-2.2,2.2],[2.2,2.2]]) {
      block(x, 2.0, z, 1.25, 3.5, 1.25, stone, group);
    }
    const core = block(0, 2.0, 0, 2.25, 3.2, 2.25, accent, group);
    core.userData.pulse = true;
    animatedElements.push(core);
  }

  if (zone.type === 'vault') {
    block(0, 0.7, 0, 6.2, 1.4, 5.6, dark, group);
    block(0, 2.45, -1.7, 5.3, 2.1, 1.3, stone, group);
    block(0, 2.45, 1.7, 5.3, 2.1, 1.3, stone, group);
    block(-2.0, 3.8, 0, 1.1, 1.8, 2.1, stone, group);
    block(2.0, 3.8, 0, 1.1, 1.8, 2.1, stone, group);
    const crystal = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.05, 0),
      new THREE.MeshStandardMaterial({ color: zone.accent, emissive: zone.accent, emissiveIntensity: 1.7, metalness: 0.28, roughness: 0.16 })
    );
    crystal.position.y = 4.8;
    crystal.userData.spin = true;
    group.add(crystal);
    animatedElements.push(crystal);
  }

  const hit = new THREE.Mesh(
    new THREE.BoxGeometry(7.5, 7, 7.5),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
  );
  hit.position.y = 3.0;
  hit.userData.zone = zone;
  group.add(hit);
  hitTargets.push(hit);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(3.9, 0.045, 5, 48),
    new THREE.MeshBasicMaterial({ color: zone.accent, transparent: true, opacity: 0.62 })
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 0.19;
  halo.userData.spinSlow = true;
  group.add(halo);
  animatedElements.push(halo);
}

zones.forEach(createLandmark);

const guide = new THREE.Group();
const guideCore = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.42, 0),
  new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x6dffd3, emissiveIntensity: 2.4, roughness: 0.18, metalness: 0.4 })
);
guide.add(guideCore);
const guideRing = new THREE.Mesh(
  new THREE.TorusGeometry(0.68, 0.035, 5, 24),
  new THREE.MeshBasicMaterial({ color: 0x68ffd0 })
);
guideRing.rotation.x = Math.PI / 2;
guide.add(guideRing);
guide.position.set(2.2, 4.6, 2.0);
scene.add(guide);

const particleCount = isMobile ? 120 : 260;
const particlePositions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i += 1) {
  const r = 8 + Math.random() * 28;
  const a = Math.random() * Math.PI * 2;
  particlePositions[i * 3] = Math.cos(a) * r;
  particlePositions[i * 3 + 1] = 1.4 + Math.random() * 14;
  particlePositions[i * 3 + 2] = Math.sin(a) * r;
}
const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
const particles = new THREE.Points(
  particleGeometry,
  new THREE.PointsMaterial({ color: 0x66ffd0, size: 0.06, transparent: true, opacity: 0.48, depthWrite: false })
);
scene.add(particles);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hovered = null;
let cameraMove = null;
let tutorialIndex = -1;

function setZonePanel(zone) {
  zoneKicker.textContent = zone.code;
  zoneTitle.textContent = zone.title;
  zoneCopy.textContent = zone.copy;
  zoneMeta.textContent = zone.meta;
  zonePanel.classList.add('is-visible');
}

function focusZone(zone) {
  setZonePanel(zone);
  cameraMove = {
    fromPosition: camera.position.clone(),
    fromTarget: controls.target.clone(),
    toPosition: zone.camera.clone(),
    toTarget: zone.look.clone(),
    started: performance.now(),
    duration: reducedMotion ? 1 : 1050
  };
}

function resetView() {
  tutorialIndex = -1;
  zonePanel.classList.remove('is-visible');
  cameraMove = {
    fromPosition: camera.position.clone(),
    fromTarget: controls.target.clone(),
    toPosition: new THREE.Vector3(24, 18, 27),
    toTarget: new THREE.Vector3(0, 2.4, 0),
    started: performance.now(),
    duration: reducedMotion ? 1 : 950
  };
}

function updatePointer(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

renderer.domElement.addEventListener('pointermove', (event) => {
  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(hitTargets, false)[0]?.object ?? null;
  if (hovered !== hit) {
    hovered = hit;
    renderer.domElement.style.cursor = hovered ? 'pointer' : 'grab';
    canvasHint.textContent = hovered ? `CLICK TO INSPECT ${hovered.userData.zone.title.toUpperCase()}` : 'DRAG TO LOOK • SCROLL TO ZOOM • CLICK A LANDMARK';
  }
});

renderer.domElement.addEventListener('pointerup', (event) => {
  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(hitTargets, false)[0]?.object;
  if (hit?.userData.zone) focusZone(hit.userData.zone);
});

tutorialButton.addEventListener('click', () => {
  tutorialIndex = (tutorialIndex + 1) % zones.length;
  const zone = zones[tutorialIndex];
  tutorialButton.textContent = tutorialIndex === zones.length - 1 ? 'Restart guided tour' : 'Next tutorial stop';
  focusZone(zone);
});

resetButton.addEventListener('click', () => {
  tutorialButton.textContent = 'Start guided tour';
  resetView();
});

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animate(time) {
  const t = time * 0.001;

  if (!reducedMotion) {
    guide.position.y = 4.6 + Math.sin(t * 1.6) * 0.24;
    guide.rotation.y = t * 0.7;
    guideRing.rotation.z = t * 0.9;
    particles.rotation.y = t * 0.015;

    plaza.children.forEach((child, index) => {
      if (child.geometry?.type === 'TorusGeometry') {
        child.rotation.z = t * (0.08 + index * 0.008);
        child.position.y = child.userData.baseY + Math.sin(t * 1.2 + index) * 0.05;
      }
    });

    animatedElements.forEach((item, index) => {
      if (item.userData.spin) item.rotation.y = t * 0.55;
      if (item.userData.spinSlow) item.rotation.z = t * 0.08;
      if (item.userData.pulse && item.material?.emissiveIntensity !== undefined) item.material.emissiveIntensity = 1.1 + Math.sin(t * 2.4 + index) * 0.45;
      if (item.userData.floatGlow) item.scale.y = 0.94 + Math.sin(t * 1.8 + index) * 0.08;
    });
  }

  if (cameraMove) {
    const raw = Math.min(1, (performance.now() - cameraMove.started) / cameraMove.duration);
    const e = easeInOutCubic(raw);
    camera.position.lerpVectors(cameraMove.fromPosition, cameraMove.toPosition, e);
    controls.target.lerpVectors(cameraMove.fromTarget, cameraMove.toTarget, e);
    if (raw >= 1) cameraMove = null;
  }

  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

function resize() {
  const width = mount.clientWidth;
  const height = mount.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}

new ResizeObserver(resize).observe(mount);
resize();
