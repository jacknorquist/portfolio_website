import * as THREE from '/node_modules/three/build/three.module.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import * as TWEEN from '@tweenjs/tween.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import {morphTorusKnot, isMorphing} from './morph.js';
import { addText, slide} from './text.js';
import './index.css';
import { handleWheel } from './scrollHandler.js';
import {  leftArrow, rightArrow } from './arrows.js';
import { sphere } from './circles.js';

let scene, camera, renderer;
let torusKnotFront, torusKnotBack;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let textMesh;
const canvas = document.getElementById('canvas')
init();
animate();

function init() {
  // Setup scene
  const raycaster = new THREE.Raycaster();
  scene = new THREE.Scene();

  // Setup camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Setup renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  canvas.appendChild(renderer.domElement);

  // Create TorusKnot geometry and material
  const geometry = new THREE.TorusKnotGeometry(5, .02, 356, 8);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

  // Create front and back parts of TorusKnot
  torusKnotFront = new THREE.Mesh(geometry, material.clone());
  torusKnotBack = new THREE.Mesh(geometry, material.clone());

  // Position front and back parts
  torusKnotFront.position.set(0, 0, 0);
  torusKnotBack.position.set(0, 0, 0);

  // Set render layers
  torusKnotFront.layers.set(1); // Front-facing parts
  torusKnotBack.layers.set(0);  // Back-facing parts

  // Add to scene
  scene.add(torusKnotBack);
  scene.add(torusKnotFront);

  // Add lights

  addText()


  const leftArrowShape= leftArrow();
  leftArrowShape.position.set(-3,-1,0)
  scene.add(leftArrowShape)




  const rightArrowShape = rightArrow();
  rightArrowShape.position.set(3,-1,0);
  scene.add(rightArrowShape)







  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 5, 5);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);


  function onClick(event) {

    // Calculate mouse position in normalized device coordinates (-1 to +1)
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster's origin
    raycaster.setFromCamera(mouse, camera);

    // Perform raycasting on each arrow group's children
    const intersectsLeft = raycaster.intersectObjects(leftArrowShape.children, true);
    const intersectsRight = raycaster.intersectObjects(rightArrowShape.children, true);

    // Handle click on specific objects
    if (intersectsLeft.length > 0) {
      if(!isMorphing){
      morphShape(-1)
      }
    } else if (intersectsRight.length > 0) {
      if(!isMorphing){
      morphShape(1)
      }
      // Add your logic for right arrow click here
    }
  }

  document.addEventListener('click', onClick)
  window.addEventListener('resize', onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);

  // Update TWEEN
  // Auto-rotation or other updates
  torusKnotFront.rotation.y += 0.01;
  torusKnotBack.rotation.y += 0.01;

  TWEEN.update();

  // Render the scene
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function morphShape(plusOrMinus) {
  morphTorusKnot(torusKnotBack, plusOrMinus);
}





// window.addEventListener('click', function() {
//   if(!isMorphing){
//   morphShape();
//   }
// });







document.addEventListener('wheel', handleWheel, { passive: true});




export {textMesh, scene}
