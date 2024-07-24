import * as THREE from '/node_modules/three/build/three.module.js';
import { Scene } from 'three';

function downArrow() {
  const shaftGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 32); // Shaft of the arrow
  const coneGeometry = new THREE.ConeGeometry(0.3, 0.6, 32); // Arrowhead

  const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const shaft = new THREE.Mesh(shaftGeometry, whiteMaterial);
  const cone = new THREE.Mesh(coneGeometry, whiteMaterial);

  // Adjust rotation and position to point the arrow downwards
  shaft.rotation.x = Math.PI; // Rotate 180 degrees around x-axis to point down
  shaft.position.set(0, -1, 0); // Position the shaft below the origin

  cone.rotation.x = Math.PI; // Rotate cone 180 degrees around x-axis to point down
  cone.position.set(0, -2, 0); // Position the cone at the end of the shaft, pointing down

  const arrow = new THREE.Group();
  arrow.scale.set(0.3, 0.3, 0.3); // Scale the arrow to be three times larger
  arrow.add(shaft, cone);


  return arrow;
}
function upArrow() {
  // Arrow components
  const shaftGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 32); // Shaft of the arrow
  const coneGeometry = new THREE.ConeGeometry(0.3, 0.6, 32); // Arrowhead

  const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

  const shaft = new THREE.Mesh(shaftGeometry, whiteMaterial);
  const cone = new THREE.Mesh(coneGeometry, whiteMaterial);

  // Adjust rotation and position to point the arrow upwards
  shaft.rotation.x = -Math.PI; // Rotate 180 degrees around x-axis to point up
  shaft.position.set(0, 1, 0); // Position the shaft above the origin

  cone.rotation.x = 0; // No rotation needed for cone as it naturally points up by default
  cone.position.set(0, 2, 0); // Position the cone at the end of the shaft, pointing up

  const arrow = new THREE.Group();
  arrow.scale.set(0.3, 0.3, 0.3); // Scale the arrow to be three times larger
  arrow.add(shaft, cone);

  return arrow;
}

export {downArrow, upArrow}