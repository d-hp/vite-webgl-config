import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as lil from 'lil-gui';

/* Base */

// Debug
const gui = new lil.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/* Lights */

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
gui.add(ambientLight, 'ambient-intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Direction Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 2, -1);
gui.add(directionalLight, 'direction-intensity').min(0).max(1).step(0.001);
gui.add(directionalLight.position, 'direction-x').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'direction-y').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'direction-z').min(-5).max(5).step(0.001);
scene.add(directionalLight);

/* Materials */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, 'material-metalness').min(0).max(1).step(0.001);
gui.add(material, 'material-roughness').min(0).max(1).step(0.001);

/* Objects */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);

plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

scene.add(sphere, plane);

/* Sizes */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/* Resize Event Handler */
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/* Camera */

// Base Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

/* Controls */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/* Renderer */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* Animate */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Insert animations here (before controls/renderer & after delta time)

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
