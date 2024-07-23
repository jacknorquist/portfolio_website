import * as THREE from '/node_modules/three/build/three.module.js';

function sphere(colorCode) {
  // Create a SphereGeometry with radius 0.1, and increase the segments for smoother surface
  const geometry = new THREE.SphereGeometry(0.1, 32, 32); // radius, widthSegments, heightSegments

  // Create a standard material that interacts with lights and shadows
  const material = new THREE.MeshStandardMaterial({ color: colorCode });

  // Create a mesh by combining geometry and material
  const sphere = new THREE.Mesh(geometry, material);

  return sphere;
}

export { sphere };