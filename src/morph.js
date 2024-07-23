import * as THREE from '/node_modules/three/build/three.module.js';
import * as TWEEN from '@tweenjs/tween.js';
import { scene } from '.';
import { addText, textMesh } from './text';

let isMorphing = false

function morphTorusKnot(mesh, plusOrMinus) {

  isMorphing = true
  const initialGeometry = mesh.geometry.clone();
  const targetGeometry = new THREE.TorusKnotGeometry(2, 3, 256, 16);

  // Ensure attributes are properly initialized
  initialGeometry.computeVertexNormals();
  targetGeometry.computeVertexNormals();


  const positionAttribute = initialGeometry.attributes.position;
  const targetPositionAttribute = targetGeometry.attributes.position;

  const positionAttributeCopy = positionAttribute.clone();

  // First tween: morph to the target shape
  const tweenToTarget = new TWEEN.Tween({ morph: 0 })
    .to({ morph: 1 }, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((obj) => {
      // Loop through each vertex in the buffer attribute
      for (let i = 0; i < positionAttribute.count; i++) {
        // Interpolate vertex positions
        const initialVertex = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);
        const targetVertex = new THREE.Vector3().fromBufferAttribute(targetPositionAttribute, i);
        const morphedVertex = initialVertex.clone().lerp(targetVertex, obj.morph);

        // Update vertex position in the buffer attribute
        positionAttribute.setXYZ(i, morphedVertex.x, morphedVertex.y, morphedVertex.z);
      }

      // Flag the attribute as needing update
      positionAttribute.needsUpdate = true;

      // Update the mesh with the modified geometry
      mesh.geometry = initialGeometry;
    })
    .onComplete(() => {
      tweenToOriginal.start();
      addText(plusOrMinus) // Start the second tween after the first one completes
    });



  // Second tween: morph back to the original shape
  const tweenToOriginal = new TWEEN.Tween({ morph: 1 })
    .to({ morph: 0 }, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((obj) => {
      // Loop through each vertex in the buffer attribute
      for (let i = 0; i < positionAttribute.count; i++) {
        // Interpolate vertex positions (reverse direction)
        const initialVertex = new THREE.Vector3().fromBufferAttribute(positionAttributeCopy, i);
        const targetVertex = new THREE.Vector3().fromBufferAttribute(targetPositionAttribute, i);
        const morphedVertex = initialVertex.clone().lerp(targetVertex, obj.morph);

        // Update vertex position in the buffer attribute
        positionAttribute.setXYZ(i, morphedVertex.x, morphedVertex.y, morphedVertex.z);
      }

      // Flag the attribute as needing update
      positionAttribute.needsUpdate = true;

      // Update the mesh with the modified geometry
      mesh.geometry = initialGeometry;
    })
    .onComplete(() => {
      console.log('Second tween completed');
      isMorphing = false
      // Optionally perform additional actions after the second tween completes
    });

  // Start the first tween
  tweenToTarget.start();
}
export { morphTorusKnot, isMorphing };