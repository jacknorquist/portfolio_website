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
import { generatePerlinNoise } from 'perlin-noise';


let scene, camera, renderer;
let torusKnotFront, torusKnotBack;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let textMesh;
const canvas = document.getElementById('canvas')

initHomePage();
animateHomePage();

function initHomePage() {
  // Setup scene
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

  const aboutMeBtn = document.getElementById('aboutmebtn')


  aboutMeBtn.addEventListener('click', function(){
    if(!isMorphing){
    morphShape(0);
    }
  })
  const projectsBtn = document.getElementById('projectsbtn')

  projectsBtn.addEventListener('click', function(){
    if(!isMorphing){
    morphShape(1);
    }
  })

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 5, 5);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);
  window.addEventListener('resize', onWindowResize);
}

function animateHomePage() {
  requestAnimationFrame(animateHomePage);

  torusKnotFront.rotation.y += 0.01;
  torusKnotBack.rotation.y += 0.01;
  TWEEN.update();
  renderer.render(scene, camera);
}


const aboutPage = document.getElementById('aboutPageCanvas');
const projectsPage = document.getElementById('projectsPageCanvas');
let sceneContent
let backgroundGeometry
let noise
let noiseData;

addBackGroundToContent();
// animateContentPages()

function addBackGroundToContent() {
  const renderer1 = new THREE.WebGLRenderer({ antialias: true });
  const renderer2 = new THREE.WebGLRenderer({ antialias: true });

  renderer1.setSize(window.innerWidth, window.innerHeight);
  renderer1.shadowMap.enabled = true;
  renderer1.shadowMap.type = THREE.PCFSoftShadowMap;
  aboutPage.appendChild(renderer2.domElement);
  projectsPage.appendChild(renderer1.domElement);



  // Scene
  const sceneContent = new THREE.Scene();

  // Camera
  const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera1.position.set(0, 0, 5);

  // Create a plane geometry
  const geometry = new THREE.PlaneGeometry(30, 30, 3, 6);

  // Adjust vertices to create a wavy effect
  const positions = geometry.attributes.position;
  const vertex = new THREE.Vector3();

  for (let i = 0; i < positions.count; i++) {
    vertex.fromBufferAttribute(positions, i);
    vertex.z = Math.sin(vertex.x * 0.5) * 0.5;
    positions.setY(i, vertex.y); // Set y positions to zero to create horizontal lines
  }

  // Material
  const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide, wireframe: true });

  // Mesh
  const plane = new THREE.Mesh(geometry, material);
  sceneContent.add(plane);

  // Ensure the geometry updates correctly
  positions.needsUpdate = true;
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 5, 5);
  sceneContent.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  sceneContent.add(ambientLight);

  const clock = new THREE.Clock();



  function animate() {
    requestAnimationFrame(animate);

    // Update vertices based on time
    const time = clock.getElapsedTime();
    for (let i = 0; i < positions.count; i++) {
      vertex.fromBufferAttribute(positions, i);
      vertex.z = Math.sin(vertex.y * 0.2 + time) * 0.2;
      positions.setZ(i, vertex.z);
    }

    // Ensure the geometry updates correctly
    positions.needsUpdate = true;

    renderer1.render(sceneContent, camera1);
    renderer2.render(sceneContent, camera1);
  }

  animate();
}




// function animateContentPages() {
//   requestAnimationFrame(animateContentPages);

//   // Update wave animation
//   for (let i = 0; i < backgroundGeometry.vertices.length; i++) {
//       const vertex = backgroundGeometry.vertices[i];
//       vertex.z = noise.simplex3(vertex.x / 5 + Date.now() * 0.001, vertex.y / 5, 0) * 2; // Adjust speed of animation with multiplier
//   }
//   backgroundGeometry.verticesNeedUpdate = true; // Update vertices after modification

//   // Render scene
//   renderer.render(scene, camera);
// }


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function morphShape(index) {
  morphTorusKnot(torusKnotBack, index);
}










document.addEventListener('wheel', handleWheel, { passive: true});
export {textMesh, scene}
