import * as THREE from 'three';

// Authored procedural assets: no imported game textures, logos, or UI artwork.
// This file intentionally keeps decorative meshes separate from the zone/navigation logic.
export function addWorldPolish({ world, mat, isMobile, terrainHeight }) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const decorations = new THREE.Group();
  decorations.name = 'Original environmental detail';
  world.add(decorations);

  function hash(x, z, seed = 0) {
    const n = Math.sin(x * 127.1 + z * 311.7 + seed * 43.3) * 43758.5453;
    return n - Math.floor(n);
  }

  function makeSurface(kind) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#eeeeee';
    ctx.fillRect(0, 0, 64, 64);
    const step = kind === 'wood' ? 4 : 8;
    for (let y = 0; y < 64; y += step) {
      for (let x = 0; x < 64; x += step) {
        const n = hash(x, y, kind.length);
        const v = Math.round(190 + n * 58);
        ctx.fillStyle = `rgb(${v},${v},${v})`;
        ctx.fillRect(x, y, step, step);
      }
    }
    if (kind === 'metal' || kind === 'stone') {
      ctx.strokeStyle = 'rgba(45,48,48,.28)';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, 62, 62);
      if (kind === 'metal') {
        ctx.beginPath();
        ctx.moveTo(0, 32);
        ctx.lineTo(64, 32);
        ctx.moveTo(32, 0);
        ctx.lineTo(32, 64);
        ctx.stroke();
        for (const x of [5, 59]) for (const y of [5, 59]) {
          ctx.fillStyle = '#747777';
          ctx.fillRect(x, y, 3, 3);
        }
      }
    } else if (kind === 'wood') {
      ctx.fillStyle = 'rgba(55,48,40,.22)';
      for (let y = 12; y < 64; y += 16) ctx.fillRect(0, y, 64, 2);
    }
    const result = new THREE.CanvasTexture(canvas);
    result.colorSpace = THREE.SRGBColorSpace;
    result.magFilter = THREE.NearestFilter;
    result.minFilter = THREE.NearestMipmapNearestFilter;
    return result;
  }

  for (const [key, kind] of [['stone', 'stone'], ['stone2', 'stone'],
    ['dark', 'metal'], ['path', 'metal'], ['wood', 'wood'], ['leaf', 'stone']]) {
    mat[key].map = makeSurface(kind);
    mat[key].needsUpdate = true;
  }

  const trim = new THREE.MeshStandardMaterial({ color: 0x607476, metalness: 0.64, roughness: 0.44 });
  const black = new THREE.MeshStandardMaterial({ color: 0x08171b, metalness: 0.45, roughness: 0.4 });
  const glass = new THREE.MeshStandardMaterial({
    color: 0x153d41, emissive: 0x116a6b, emissiveIntensity: 0.55,
    metalness: 0.35, roughness: 0.16, transparent: true, opacity: 0.86
  });

  function cube(parent, x, y, z, sx, sy, sz, material, cast = true) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    mesh.castShadow = cast && !isMobile;
    mesh.receiveShadow = !isMobile;
    parent.add(mesh);
    return mesh;
  }

  function screenTexture(title, subtitle, tint) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#071419';
    ctx.fillRect(0, 0, 512, 256);
    ctx.strokeStyle = tint;
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, 492, 236);
    ctx.fillStyle = 'rgba(100,255,215,.10)';
    for (let y = 38; y < 226; y += 18) ctx.fillRect(22, y, 468, 2);
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = tint;
    ctx.font = 'bold 54px monospace';
    ctx.fillText(title, 256, 98);
    ctx.fillStyle = '#c5ebe5';
    ctx.font = '27px monospace';
    ctx.fillText(subtitle, 256, 174);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    return texture;
  }

  // Low stairs, stone edging and powered pavers make the spawn read like an inhabited place.
  for (let i = 0; i < 32; i++) {
    const theta = i * Math.PI * 2 / 32;
    const x = Math.sin(theta) * 5.85;
    const z = Math.cos(theta) * 5.85;
    if (Math.abs(x) < 2.2 || Math.abs(z) < 2.2) continue; // Four walkable exits.
    cube(decorations, x, 0.12, z, 0.78, 0.24, 0.78, i % 4 === 0 ? mat.glow : trim, false);
  }
  for (const a of [-1, 1]) for (const b of [-1, 1]) {
    cube(decorations, a * 4.0, 0.16, b * 4.0, 1.2, 0.3, 1.2, mat.stone2);
  }

  function addKiosk(x, z, title, subtitle, accent) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = Math.atan2(-x, -z);
    decorations.add(group);
    cube(group, 0, 0.22, 0, 2.2, 0.44, 1.25, mat.stone);
    cube(group, 0, 1.16, 0, 1.8, 1.55, 0.8, black);
    cube(group, 0, 2.08, 0, 2.15, 0.24, 1.05, trim);
    cube(group, -0.86, 2.27, 0, 0.13, 0.34, 0.95, accent, false);
    cube(group, 0.86, 2.27, 0, 0.13, 0.34, 0.95, accent, false);
    const display = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.8),
      new THREE.MeshBasicMaterial({ map: screenTexture(title, subtitle, '#78ffd1'), side: THREE.DoubleSide }));
    display.position.set(0, 1.3, 0.415);
    group.add(display);
  }
  addKiosk(-7.9, 6.1, '01 // BASE', 'Skills & careers', mat.lime);
  addKiosk(7.9, 6.1, '02 // FORGE', 'Agents & workflows', mat.cyan);
  addKiosk(-7.9, -6.1, '03 // RANGE', 'Security practice', mat.red);
  addKiosk(7.9, -6.1, '04 // VAULT', 'Evidence & builds', mat.violet);

  function addLamp(x, z, accent) {
    const lamp = new THREE.Group();
    lamp.position.set(x, 0, z);
    cube(lamp, 0, 0.22, 0, 0.85, 0.44, 0.85, mat.stone2);
    cube(lamp, 0, 1.57, 0, 0.23, 2.6, 0.23, trim, false);
    cube(lamp, 0, 2.9, 0, 0.66, 0.36, 0.66, accent, false);
    cube(lamp, 0, 3.15, 0, 0.85, 0.16, 0.85, mat.dark, false);
    decorations.add(lamp);
  }
  for (const d of [-10.5, -7.5, 7.5, 10.5]) {
    const accent = d < 0 ? mat.cyan : mat.lime;
    addLamp(d, -2.4, accent);
    addLamp(d, 2.4, accent);
  }
  for (const d of [-10.5, 10.5]) {
    addLamp(-2.4, d, d < 0 ? mat.red : mat.violet);
    addLamp(2.4, d, d < 0 ? mat.red : mat.violet);
  }

  // A few site-specific utility props are more convincing than a sea of repeated cubes.
  function addCrate(x, z, accent) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    cube(g, 0, 0.43, 0, 0.84, 0.86, 0.84, mat.dark);
    cube(g, 0, 0.9, 0, 0.93, 0.12, 0.93, trim);
    cube(g, 0, 0.48, 0.435, 0.59, 0.12, 0.04, accent, false);
    decorations.add(g);
  }
  [
    [-19.6, 4.8, mat.lime], [-17.9, 4.8, mat.lime],
    [18.4, 5.1, mat.cyan], [19.7, 5.1, mat.cyan],
    [-4.7, -19.2, mat.red], [4.7, -19.2, mat.red],
    [-5.0, 19.0, mat.violet], [5.0, 19.0, mat.violet]
  ].forEach(([x, z, accent]) => addCrate(x, z, accent));

  // Instance all landscape debris and vegetation to avoid one draw call per detail.
  const max = isMobile ? 190 : 480;
  const stoneGeo = new THREE.BoxGeometry(1, 1, 1);
  const stones = new THREE.InstancedMesh(stoneGeo, mat.stone2, max);
  const tufts = new THREE.InstancedMesh(stoneGeo, mat.leaf, max);
  const ob = new THREE.Object3D();
  let stoneCount = 0;
  let tuftCount = 0;
  for (let x = -23; x <= 23; x++) {
    for (let z = -23; z <= 23; z++) {
      const r = Math.hypot(x, z);
      if (r < 9.7 || r > 23.5 || Math.abs(x) < 3 || Math.abs(z) < 3) continue;
      if ((Math.abs(x - 15) < 6 && Math.abs(z) < 6) ||
          (Math.abs(x + 15) < 6 && Math.abs(z) < 6) ||
          (Math.abs(z - 15) < 6 && Math.abs(x) < 6) ||
          (Math.abs(z + 15) < 6 && Math.abs(x) < 6)) continue;
      const h = terrainHeight(x, z);
      if (h <= 0) continue;
      const n = hash(x, z, 13);
      if (n < 0.75) continue;
      const count = n > 0.91 ? stoneCount : tuftCount;
      if (count >= max) continue;
      ob.position.set(x + hash(z, x) * 0.35 - 0.17, h - 1 + 0.055, z + hash(x, z) * 0.35 - 0.17);
      ob.rotation.set(0, Math.round(hash(x, z, 18) * 3) * Math.PI / 2, 0);
      if (n > 0.91) {
        ob.scale.set(0.18 + n * 0.30, 0.11, 0.24);
        ob.updateMatrix();
        stones.setMatrixAt(stoneCount++, ob.matrix);
      } else {
        ob.scale.set(0.24, 0.10 + hash(z, x, 4) * 0.09, 0.25);
        ob.updateMatrix();
        tufts.setMatrixAt(tuftCount++, ob.matrix);
      }
    }
  }
  stones.count = stoneCount;
  tufts.count = tuftCount;
  stones.instanceMatrix.needsUpdate = true;
  tufts.instanceMatrix.needsUpdate = true;
  stones.receiveShadow = !isMobile;
  decorations.add(stones, tufts);

  // Original illuminated insets near the paths: a quiet cue to follow the tutorial.
  for (let i = 0; i < 4; i++) {
    const turn = i * Math.PI / 2;
    for (const r of [6.7, 8.7, 12.2]) {
      const x = Math.round(Math.cos(turn) * r);
      const z = Math.round(Math.sin(turn) * r);
      const tile = cube(decorations, x, 0.045, z, 0.28, 0.09, 0.28, mat.glow, false);
      tile.rotation.y = turn;
    }
  }

  return decorations;
}
