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

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.8));
renderer.setSize(mount.clientWidth, mount.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.02;
renderer.shadowMap.enabled = !isMobile;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
mount.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x071211);
scene.fog = new THREE.FogExp2(0x071211, isMobile ? 0.021 : 0.0175);

const camera = new THREE.PerspectiveCamera(52, mount.clientWidth / mount.clientHeight, 0.1, 220);
const spawnCamera = new THREE.Vector3(29, 20, 31);
const spawnLook = new THREE.Vector3(0, 2.6, 0);
camera.position.copy(spawnCamera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.target.copy(spawnLook);
controls.minDistance = 9;
controls.maxDistance = 62;
controls.maxPolarAngle = Math.PI * 0.49;
controls.minPolarAngle = Math.PI * 0.12;
controls.enablePan = false;

scene.add(new THREE.HemisphereLight(0x9edbff, 0x10221a, 2.2));

const sun = new THREE.DirectionalLight(0xe0fbff, 4.4);
sun.position.set(24, 34, 14);
sun.castShadow = !isMobile;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -42;
sun.shadow.camera.right = 42;
sun.shadow.camera.top = 42;
sun.shadow.camera.bottom = -42;
scene.add(sun);

const rim = new THREE.DirectionalLight(0x47ffc0, 1.8);
rim.position.set(-26, 12, -25);
scene.add(rim);

const moonRim = new THREE.DirectionalLight(0x687cff, 1.05);
moonRim.position.set(18, 8, 31);
scene.add(moonRim);

const world = new THREE.Group();
scene.add(world);

const blockGeo = new THREE.BoxGeometry(1, 1, 1);
const mat = {
  terrain: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0.02, flatShading: true }),
  dark: new THREE.MeshStandardMaterial({ color: 0x101d20, roughness: 0.7, metalness: 0.32 }),
  stone: new THREE.MeshStandardMaterial({ color: 0x273b3e, roughness: 0.78, metalness: 0.18 }),
  stone2: new THREE.MeshStandardMaterial({ color: 0x344d4d, roughness: 0.76, metalness: 0.18 }),
  path: new THREE.MeshStandardMaterial({ color: 0x334747, roughness: 0.82, metalness: 0.12 }),
  glow: new THREE.MeshStandardMaterial({ color: 0x59ffd0, emissive: 0x17bb8c, emissiveIntensity: 2.35, roughness: 0.25, metalness: 0.42 }),
  water: new THREE.MeshStandardMaterial({ color: 0x082b38, emissive: 0x04131a, emissiveIntensity: 0.65, roughness: 0.22, metalness: 0.42, transparent: true, opacity: 0.94 }),
  wood: new THREE.MeshStandardMaterial({ color: 0x4a4536, roughness: 0.9, metalness: 0.03 }),
  leaf: new THREE.MeshStandardMaterial({ color: 0x1f5b49, emissive: 0x0a241b, emissiveIntensity: 0.42, roughness: 0.88, metalness: 0.02 }),
  red: new THREE.MeshStandardMaterial({ color: 0xf06468, emissive: 0x8d222b, emissiveIntensity: 1.55, roughness: 0.35, metalness: 0.32 }),
  cyan: new THREE.MeshStandardMaterial({ color: 0x5ce8ff, emissive: 0x167c96, emissiveIntensity: 1.8, roughness: 0.3, metalness: 0.42 }),
  violet: new THREE.MeshStandardMaterial({ color: 0xbf86ff, emissive: 0x612aa8, emissiveIntensity: 1.75, roughness: 0.3, metalness: 0.38 }),
  lime: new THREE.MeshStandardMaterial({ color: 0x64ed9f, emissive: 0x16733e, emissiveIntensity: 1.5, roughness: 0.4, metalness: 0.24 }),
  amber: new THREE.MeshStandardMaterial({ color: 0xffca67, emissive: 0x9b6410, emissiveIntensity: 1.3, roughness: 0.4, metalness: 0.22 })
};

function cube(parent, x, y, z, sx = 1, sy = 1, sz = 1, material = mat.stone, cast = true) {
  const mesh = new THREE.Mesh(blockGeo, material);
  mesh.position.set(x, y, z);
  mesh.scale.set(sx, sy, sz);
  mesh.castShadow = cast && !isMobile;
  mesh.receiveShadow = !isMobile;
  parent.add(mesh);
  return mesh;
}

function terrainHeight(x, z) {
  const r = Math.hypot(x, z);
  if (r > 25) return 0;
  if (Math.abs(x) < 2 && z < -5 && z > -10) return 1;
  if (r < 15) return 2;
  const ridge = Math.sin(x * 0.36) * 0.9 + Math.cos(z * 0.31) * 0.8 + Math.sin((x + z) * 0.18) * 0.65;
  const rise = Math.max(0, (r - 13) * 0.2);
  return THREE.MathUtils.clamp(Math.round(2 + ridge + rise), 1, 7);
}

const terrainRadius = isMobile ? 22 : 27;
const terrainCount = (terrainRadius * 2 + 1) ** 2;
const terrain = new THREE.InstancedMesh(blockGeo, mat.terrain, terrainCount);
terrain.receiveShadow = !isMobile;
const dummy = new THREE.Object3D();
const c = new THREE.Color();
let ti = 0;

for (let x = -terrainRadius; x <= terrainRadius; x += 1) {
  for (let z = -terrainRadius; z <= terrainRadius; z += 1) {
    const h = terrainHeight(x, z);
    if (h <= 0) {
      dummy.scale.set(0, 0, 0);
      dummy.updateMatrix();
      terrain.setMatrixAt(ti, dummy.matrix);
      ti += 1;
      continue;
    }
    dummy.position.set(x, -1 + h / 2, z);
    dummy.scale.set(0.97, h, 0.97);
    dummy.updateMatrix();
    terrain.setMatrixAt(ti, dummy.matrix);
    const edge = Math.hypot(x, z) / terrainRadius;
    const noise = (Math.sin(x * 0.73 + z * 0.29) + 1) * 0.03;
    c.setHSL(0.42 - edge * 0.035, 0.31 + noise, 0.20 + (h - 2) * 0.014);
    terrain.setColorAt(ti, c);
    ti += 1;
  }
}
terrain.instanceMatrix.needsUpdate = true;
if (terrain.instanceColor) terrain.instanceColor.needsUpdate = true;
world.add(terrain);

const ocean = new THREE.Mesh(new THREE.CircleGeometry(72, 96), mat.water);
ocean.rotation.x = -Math.PI / 2;
ocean.position.y = -1.03;
world.add(ocean);

const river = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 16), mat.water);
river.rotation.x = -Math.PI / 2;
river.position.set(0, 0.02, -7.5);
world.add(river);

function addPath(x1, z1, x2, z2) {
  const dx = x2 - x1;
  const dz = z2 - z1;
  const steps = Math.max(Math.abs(dx), Math.abs(dz));
  for (let i = 0; i <= steps; i += 1) {
    const t = i / Math.max(1, steps);
    const x = Math.round(THREE.MathUtils.lerp(x1, x2, t));
    const z = Math.round(THREE.MathUtils.lerp(z1, z2, t));
    const path = cube(world, x, 0.12, z, 0.9, 0.16, 0.9, i % 4 === 0 ? mat.glow : mat.path, false);
    path.position.y += Math.abs(x) < 2 && z < -5 && z > -10 ? 0.55 : 0;
  }
}

addPath(0, 0, -15, 0);
addPath(0, 0, 15, 0);
addPath(0, 0, 0, -15);
addPath(0, 0, 0, 15);

// A simple bridge over the training channel.
for (let z = -9; z <= -5; z += 1) {
  cube(world, 0, 0.85, z, 3.1, 0.35, 0.92, mat.stone2);
  if (z % 2 !== 0) {
    cube(world, -1.25, 1.32, z, 0.12, 0.95, 0.12, mat.glow, false);
    cube(world, 1.25, 1.32, z, 0.12, 0.95, 0.12, mat.glow, false);
  }
}

const animated = [];
const hitTargets = [];

function addSign(x, z, accent, rotation = 0) {
  const sign = new THREE.Group();
  sign.position.set(x, 0, z);
  sign.rotation.y = rotation;
  cube(sign, 0, 0.9, 0, 0.18, 1.8, 0.18, mat.wood);
  const panel = cube(sign, 0, 1.65, 0, 1.35, 0.72, 0.18, accent, false);
  panel.userData.pulse = true;
  animated.push(panel);
  world.add(sign);
}

function addTree(x, z, scale = 1) {
  const tree = new THREE.Group();
  tree.position.set(x, 0, z);
  cube(tree, 0, 0.9 * scale, 0, 0.55 * scale, 1.8 * scale, 0.55 * scale, mat.wood);
  cube(tree, 0, 2.05 * scale, 0, 1.8 * scale, 1.2 * scale, 1.8 * scale, mat.leaf, false);
  cube(tree, 0, 2.95 * scale, 0, 1.1 * scale, 0.9 * scale, 1.1 * scale, mat.leaf, false);
  world.add(tree);
}

[
  [-8, 8, 1], [-11, 6, .8], [-15, 9, 1.1], [9, 8, 1], [13, 7, .85], [17, 10, 1.15],
  [-8, -11, .85], [-13, -9, 1], [9, -12, 1.05], [14, -10, .85], [-18, 2, .9], [18, -2, .9]
].forEach(([x, z, s]) => addTree(x, z, s));

// Spawn/tutorial plaza.
const plaza = new THREE.Group();
world.add(plaza);
const plazaBase = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.2, 0.65, 8), mat.stone2);
plazaBase.position.y = 0.33;
plazaBase.receiveShadow = !isMobile;
plaza.add(plazaBase);

for (let i = 0; i < 8; i += 1) {
  const a = (Math.PI * 2 * i) / 8;
  const p = cube(plaza, Math.cos(a) * 4.15, 0.82, Math.sin(a) * 4.15, 0.45, 1.3, 0.45, i % 2 ? mat.stone : mat.glow, false);
  p.rotation.y = a;
}

const beacon = cube(plaza, 0, 4.1, 0, 1.15, 7.5, 1.15, mat.glow);
animated.push(beacon);
for (let y = 1.3; y <= 7.1; y += 1.45) {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25 + y * 0.02, 0.055, 6, 28), new THREE.MeshBasicMaterial({ color: 0x78ffda }));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = y;
  ring.userData.spin = 0.14 + y * 0.006;
  plaza.add(ring);
  animated.push(ring);
}

// Four tutorial gates give the starting area the old tutorial-world rhythm without copying it.
const gateDefs = [
  [-5.3, 0, Math.PI / 2, mat.lime], [5.3, 0, Math.PI / 2, mat.cyan], [0, -5.3, 0, mat.red], [0, 5.3, 0, mat.violet]
];
for (const [x, z, rot, accent] of gateDefs) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = rot;
  cube(g, -1.3, 1.5, 0, 0.65, 3, 0.65, mat.stone);
  cube(g, 1.3, 1.5, 0, 0.65, 3, 0.65, mat.stone);
  cube(g, 0, 3, 0, 3.25, 0.45, 0.65, accent, false);
  world.add(g);
}

const zones = [
  { id: 'career', code: 'ZONE 01', title: 'Career Base', copy: 'The beginner settlement: profile, skills, evidence, jobs, applications, approvals, and the systems that keep the search grounded.', meta: 'FOUNDATION // ACTIVE', position: new THREE.Vector3(-15, 0, 0), camera: new THREE.Vector3(-24, 10, 13), look: new THREE.Vector3(-15, 2.6, 0), accent: mat.lime, raw: 0x64ed9f, type: 'base' },
  { id: 'forge', code: 'ZONE 02', title: 'Agent Forge', copy: 'A workshop for specialist agents: mentoring, research, resumes, application preparation, coordination, and reviewed automation.', meta: 'AUTOMATION // DEVELOPING', position: new THREE.Vector3(15, 0, 0), camera: new THREE.Vector3(24, 11, 12), look: new THREE.Vector3(15, 3, 0), accent: mat.cyan, raw: 0x5ce8ff, type: 'forge' },
  { id: 'range', code: 'ZONE 03', title: 'Cyber Range', copy: 'The fortified training grounds: Proxmox-backed environments, SIEM telemetry, investigations, controlled attack simulation, and lab-generated evidence.', meta: 'TRAINING // EXPANDING', position: new THREE.Vector3(0, 0, -15), camera: new THREE.Vector3(14, 11, -26), look: new THREE.Vector3(0, 2.8, -15), accent: mat.red, raw: 0xf06468, type: 'range' },
  { id: 'vault', code: 'ZONE 04', title: 'Evidence Vault', copy: 'A hardened archive for screenshots, notes, detections, fixes, writeups, and proof that turns practice into employer-visible experience.', meta: 'PROOF // ONLINE', position: new THREE.Vector3(0, 0, 15), camera: new THREE.Vector3(-13, 10, 25), look: new THREE.Vector3(0, 2.7, 15), accent: mat.violet, raw: 0xbf86ff, type: 'vault' }
];

function registerHit(group, zone, size = [8, 8, 8]) {
  const hit = new THREE.Mesh(new THREE.BoxGeometry(...size), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }));
  hit.position.y = 3.4;
  hit.userData.zone = zone;
  group.add(hit);
  hitTargets.push(hit);
}

function createCareerBase(zone) {
  const g = new THREE.Group();
  g.position.copy(zone.position);
  cube(g, 0, 0.75, 0, 7.5, 1.5, 6.4, mat.stone);
  cube(g, 0, 2.25, -1.1, 5.2, 1.8, 3.5, mat.stone2);
  cube(g, 0, 3.7, -1.1, 3.6, 1.1, 2.6, mat.lime);
  cube(g, -2.5, 2.7, 1.7, 1.3, 4.1, 1.3, mat.dark);
  cube(g, 2.5, 2.7, 1.7, 1.3, 4.1, 1.3, mat.dark);
  cube(g, 0, 1.45, 3.1, 2.2, 1.8, 0.35, mat.lime, false);
  addSign(-10.5, 2.6, mat.lime, Math.PI / 2);
  registerHit(g, zone);
  world.add(g);
}

function createForge(zone) {
  const g = new THREE.Group();
  g.position.copy(zone.position);
  cube(g, 0, 0.7, 0, 8, 1.4, 6.6, mat.dark);
  for (const x of [-2.6, 2.6]) {
    cube(g, x, 2.4, 0, 1.7, 4.2, 1.7, mat.stone2);
    const rod = cube(g, x, 5.3, 0, 0.25, 2.3, 0.25, mat.cyan, false);
    animated.push(rod);
  }
  const bridge = cube(g, 0, 3.5, 0, 3.7, 0.45, 0.8, mat.cyan, false);
  animated.push(bridge);
  for (let i = -2; i <= 2; i += 1) {
    const node = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), new THREE.MeshStandardMaterial({ color: zone.raw, emissive: zone.raw, emissiveIntensity: 2 }));
    node.position.set(i * 0.9, 2.05 + Math.abs(i) * 0.12, 1.7);
    node.userData.orbitPhase = i * 0.8;
    g.add(node);
    animated.push(node);
  }
  registerHit(g, zone);
  world.add(g);
}

function createRange(zone) {
  const g = new THREE.Group();
  g.position.copy(zone.position);
  cube(g, 0, 0.65, 0, 8.6, 1.3, 8.6, mat.dark);
  for (const [x, z] of [[-3,-3],[3,-3],[-3,3],[3,3]]) {
    cube(g, x, 2.5, z, 1.45, 4.6, 1.45, mat.stone);
    cube(g, x, 5.05, z, 1.05, 0.45, 1.05, mat.red, false);
  }
  const core = cube(g, 0, 2.5, 0, 2.5, 4, 2.5, mat.red);
  animated.push(core);
  for (const x of [-2, 2]) cube(g, x, 1.55, 0, 0.7, 2.5, 3.3, mat.stone2);
  registerHit(g, zone, [9, 9, 9]);
  world.add(g);
}

function createVault(zone) {
  const g = new THREE.Group();
  g.position.copy(zone.position);
  cube(g, 0, 0.75, 0, 8.2, 1.5, 7.2, mat.dark);
  cube(g, 0, 2.6, -2.25, 6.6, 2.2, 1.45, mat.stone2);
  cube(g, 0, 2.6, 2.25, 6.6, 2.2, 1.45, mat.stone2);
  cube(g, -2.7, 3.7, 0, 1.2, 4.4, 2.8, mat.stone);
  cube(g, 2.7, 3.7, 0, 1.2, 4.4, 2.8, mat.stone);
  const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(1.25, 0), new THREE.MeshStandardMaterial({ color: zone.raw, emissive: zone.raw, emissiveIntensity: 2.35, roughness: 0.16, metalness: 0.38 }));
  crystal.position.y = 5.7;
  crystal.userData.spin = 0.4;
  g.add(crystal);
  animated.push(crystal);
  registerHit(g, zone);
  world.add(g);
}

createCareerBase(zones[0]);
createForge(zones[1]);
createRange(zones[2]);
createVault(zones[3]);

// Side landmarks make the world feel explorable rather than like a four-button menu.
function createRelayTower(x, z, accent = mat.amber) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  cube(g, 0, 1, 0, 2.4, 2, 2.4, mat.stone);
  cube(g, 0, 3.1, 0, 1.35, 2.5, 1.35, mat.dark);
  const mast = cube(g, 0, 5.3, 0, 0.25, 2.4, 0.25, accent, false);
  animated.push(mast);
  world.add(g);
}
createRelayTower(-19, -15);
createRelayTower(18, 14, mat.cyan);

const secret = new THREE.Group();
secret.position.set(19, 0, -19);
cube(secret, 0, 0.55, 0, 4.2, 1.1, 4.2, mat.dark);
cube(secret, 0, 1.8, 0, 2.1, 1.9, 2.1, mat.stone2);
const secretCore = new THREE.Mesh(new THREE.DodecahedronGeometry(0.75, 0), new THREE.MeshStandardMaterial({ color: 0xffca67, emissive: 0xd17a13, emissiveIntensity: 2.2 }));
secretCore.position.y = 3.4;
secretCore.userData.spin = -0.35;
secret.add(secretCore);
animated.push(secretCore);
world.add(secret);

// Floating tutorial guide.
const guide = new THREE.Group();
const guideCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.44, 0), new THREE.MeshStandardMaterial({ color: 0xe6fff7, emissive: 0x54ffcf, emissiveIntensity: 2.5, roughness: 0.15 }));
guide.add(guideCore);
const guideRing = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.045, 6, 24), new THREE.MeshBasicMaterial({ color: 0x78ffda }));
guideRing.rotation.x = Math.PI / 2;
guide.add(guideRing);
guide.position.set(3.8, 4.5, 3.6);
world.add(guide);

// Low-cost ambient particles.
const particleCount = isMobile ? 95 : 190;
const particlePos = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i += 1) {
  particlePos[i * 3] = THREE.MathUtils.randFloatSpread(54);
  particlePos[i * 3 + 1] = THREE.MathUtils.randFloat(1.5, 15);
  particlePos[i * 3 + 2] = THREE.MathUtils.randFloatSpread(54);
}
const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({ color: 0x74ffd7, size: 0.045, transparent: true, opacity: 0.58 }));
world.add(particles);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let cameraTween = null;
let tourTimer = null;
let tourIndex = -1;

function showZone(zone) {
  zoneKicker.textContent = zone.code;
  zoneTitle.textContent = zone.title;
  zoneCopy.textContent = zone.copy;
  zoneMeta.textContent = zone.meta;
  zonePanel.classList.add('visible');
}

function moveCamera(position, look, duration = reducedMotion ? 1 : 1050) {
  const startPos = camera.position.clone();
  const startLook = controls.target.clone();
  const started = performance.now();
  cameraTween = { startPos, startLook, position: position.clone(), look: look.clone(), started, duration };
}

function focusZone(zone) {
  showZone(zone);
  moveCamera(zone.camera, zone.look);
}

function resetWorld() {
  clearTimeout(tourTimer);
  tourIndex = -1;
  tutorialButton.textContent = 'Start guided tour';
  zonePanel.classList.remove('visible');
  moveCamera(spawnCamera, spawnLook, reducedMotion ? 1 : 1200);
}

function nextTourStop() {
  tourIndex += 1;
  if (tourIndex >= zones.length) {
    tutorialButton.textContent = 'Tour complete — restart';
    tourIndex = -1;
    return;
  }
  const zone = zones[tourIndex];
  focusZone(zone);
  tutorialButton.textContent = `Next: ${zones[tourIndex + 1]?.title ?? 'Finish tour'}`;
}

tutorialButton.addEventListener('click', () => {
  clearTimeout(tourTimer);
  nextTourStop();
});
resetButton.addEventListener('click', resetWorld);

function updatePointer(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

renderer.domElement.addEventListener('pointermove', (event) => {
  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(hitTargets, false)[0];
  renderer.domElement.style.cursor = hit ? 'pointer' : 'grab';
});

renderer.domElement.addEventListener('click', (event) => {
  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(hitTargets, false)[0];
  if (hit?.object.userData.zone) focusZone(hit.object.userData.zone);
});

controls.addEventListener('start', () => canvasHint.classList.add('hidden'));

const clock = new THREE.Clock();
function animate() {
  const elapsed = clock.getElapsedTime();
  controls.update();

  if (cameraTween) {
    const now = performance.now();
    const raw = THREE.MathUtils.clamp((now - cameraTween.started) / cameraTween.duration, 0, 1);
    const t = 1 - Math.pow(1 - raw, 3);
    camera.position.lerpVectors(cameraTween.startPos, cameraTween.position, t);
    controls.target.lerpVectors(cameraTween.startLook, cameraTween.look, t);
    if (raw >= 1) cameraTween = null;
  }

  if (!reducedMotion) {
    plaza.rotation.y = Math.sin(elapsed * 0.08) * 0.025;
    guide.position.y = 4.5 + Math.sin(elapsed * 1.2) * 0.22;
    guide.position.x = 3.8 + Math.cos(elapsed * 0.35) * 0.45;
    guideRing.rotation.z += 0.007;
    particles.rotation.y += 0.00035;

    for (const obj of animated) {
      if (obj.userData.spin) obj.rotation.y += obj.userData.spin * 0.01;
      if (obj.userData.pulse) obj.scale.y = 1 + Math.sin(elapsed * 2.1 + obj.position.x) * 0.035;
      if (obj.userData.orbitPhase !== undefined) {
        obj.position.y += Math.sin(elapsed * 1.7 + obj.userData.orbitPhase) * 0.0015;
        obj.rotation.y += 0.012;
      }
    }
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

function resize() {
  const width = mount.clientWidth;
  const height = mount.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
window.addEventListener('resize', resize);

setTimeout(() => canvasHint.classList.add('soft'), 6500);
