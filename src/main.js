import * as THREE from 'three/webgpu';
import { Flow } from 'three/addons/modifiers/CurveModifierGPU.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// ─── Scene Setup ──────────────────────────────────────────────
const hero = document.getElementById('hero');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  38,
  hero.clientWidth / hero.clientHeight,
  0.1,
  1000
);
camera.position.set(2, 3.2, 5.5);
camera.lookAt(0.5, -0.2, 0);

// ─── Oval Curve ───────────────────────────────────────────────
// 8 points arranged in a horizontal ellipse, matching the sketch
const rx = 2.6; // radius X (wide)
const rz = 1.1; // radius Z (narrow — foreshortened by camera angle)
const numHandles = 8;

const curvePoints = Array.from({ length: numHandles }, (_, i) => {
  const angle = (i / numHandles) * Math.PI * 2;
  return new THREE.Vector3(Math.cos(angle) * rx, 0, Math.sin(angle) * rz);
});

const curve = new THREE.CatmullRomCurve3(curvePoints, true, 'centripetal');

// ─── Lighting ─────────────────────────────────────────────────
// Blue-tinted key light from upper-left gives chrome-blue highlights
const keyLight = new THREE.DirectionalLight(0xfc0320, 4);
keyLight.position.set(-4, 8, 6);
scene.add(keyLight);

// Warm fill from opposite side for depth
const fillLight = new THREE.DirectionalLight(0xfc0320, 2);
fillLight.position.set(6, 2, -4);
scene.add(fillLight);

// Low ambient so the blue tint isn't washed out
scene.add(new THREE.AmbientLight(0xffffff, 0));

// ─── Renderer ─────────────────────────────────────────────────
const renderer = new THREE.WebGPURenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(hero.clientWidth, hero.clientHeight);
renderer.setClearColor(0xffffff, 1);
hero.appendChild(renderer.domElement);

// ─── Text ─────────────────────────────────────────────────────
let flow;

const loader = new FontLoader();
loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const geometry = new TextGeometry('Lachlan Haydon', {
    font,
    size: 0.5,
    depth: .10,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.007,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  // Flip to face outward along the curve (same as original example)
  geometry.rotateX(Math.PI);

  const material = new THREE.MeshStandardNodeMaterial({
    // color: 0x2e6fd6,
     color: 0xfc0320,
    roughness: 0.1,
    metalness: 1,
  });

  const mesh = new THREE.Mesh(geometry, material);

  flow = new Flow(mesh);
  flow.updateCurve(0, curve);
  scene.add(flow.object3D);
});

// ─── Animation Loop ───────────────────────────────────────────
renderer.setAnimationLoop(async () => {
  if (flow) {
    flow.moveAlongCurve(0.002);
  }
  await renderer.renderAsync(scene, camera);
});

// ─── Resize ───────────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = hero.clientWidth / hero.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(hero.clientWidth, hero.clientHeight);
});

// ─── Footer year ──────────────────────────────────────────────
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
