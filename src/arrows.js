import * as THREE from '/node_modules/three/build/three.module.js';

function rightArrow(){
  const shaftGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 32); // Shaft of the arrow
  const coneGeometry = new THREE.ConeGeometry(0.3, 0.6, 32); // Arrowhead

  const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const shaft = new THREE.Mesh(shaftGeometry, whiteMaterial);
  const cone = new THREE.Mesh(coneGeometry, whiteMaterial);

  // Position adjustments
  shaft.rotation.z = Math.PI / 2;
  cone.rotation.z = -Math.PI / 2;
  cone.position.set(1, 0, 0); // Position the cone at the end of the shaft

  const arrow = new THREE.Group();
  arrow.scale.set(0.3, 0.3, 0.3);
  arrow.add(shaft, cone);

  return arrow
}

function leftArrow(){
  const shaftGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 32); // Shaft of the arrow
  const coneGeometry = new THREE.ConeGeometry(0.3, 0.6, 32); // Arrowhead

  const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const shaft = new THREE.Mesh(shaftGeometry, whiteMaterial);

  const cone = new THREE.Mesh(coneGeometry, whiteMaterial);

  // Position adjustments
  shaft.rotation.z = -Math.PI / 2;
  shaft.position.set(1, 0, 0);
  cone.rotation.z = Math.PI / 2;
  cone.position.set(0, 0, 0); // Position the cone at the end of the shaft

  const arrow = new THREE.Group();
  arrow.scale.set(0.3, 0.3, 0.3);
  arrow.add(shaft, cone);

  return arrow

}

export {rightArrow, leftArrow}