import * as THREE from '/node_modules/three/build/three.module.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { scene } from '.';
import { sphere } from './circles';


let textMesh

function textAdd(text){

  const objectsToRemove = [];

  // Traverse through all children of the scene
  scene.traverse(child => {
      // Check if the child is a text object (example condition based on userData)
      console.log('in here')
      if (child instanceof THREE.Mesh && child.userData.isTextObject) {
          // Add the object to the array of objects to be removed
          objectsToRemove.push(child);
      }
  });

  // Remove objects from the scene
  objectsToRemove.forEach(object => {
      scene.remove(object);
  });



  for (let i =0;  i<text.length;i++){

const loader = new FontLoader();
  loader.load('https://cdn.jsdelivr.net/npm/three/examples/fonts/gentilis_regular.typeface.json', function(font) {
    // Create text geometry
    const textGeometry = new TextGeometry(text[i], {
      font: font,
      size: .4,
      height: 1,
      depth: .05,
      bevelEnabled: false
    });
    textGeometry.computeBoundingBox();
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
    // Create material for the text
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Create text mesh
    textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.userData.isTextObject = true;

    textMesh.position.y = i

    textMesh.position.x = -textWidth / 2;
    textMesh.position.z = 0;

    // Add text mesh to the scene
    scene.add(textMesh);
  });
}




  // for (let i =0; i<3;i++){
  //   let sphereShape
  //   if(i === slide){
  //   sphereShape = sphere(0xff0000)
  //   }else{
  //     sphereShape = sphere(0xffffff)
  //   }
  //   sphereShape.position.set(i-1,0,0)
  //   scene.add(sphereShape);
  // }

}

let slide = 0
const max = 3
let textSlide=[['About Me','Jack Norquist | Software Engineer'],['Projects','Jack Norquist | Software Engineer']]

function addText(index = 0){
  slide = index
  textAdd(textSlide[index])
}



// let textSlide = [[homeTop, aboutLink, duluth]]

// const homeTop = {
//   text: 'Jack Norquist | Software Developer',

// }



export {addText, textMesh, slide}