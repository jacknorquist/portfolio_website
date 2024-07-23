import * as THREE from '/node_modules/three/build/three.module.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { scene } from '.';
import { sphere } from './circles';


let textMesh

function textAdd(text){

const loader = new FontLoader();
  loader.load('https://cdn.jsdelivr.net/npm/three/examples/fonts/gentilis_regular.typeface.json', function(font) {
    // Create text geometry
    const textGeometry = new TextGeometry(text, {
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

    textMesh.position.y = 1

    textMesh.position.x = -textWidth / 2;
    textMesh.position.z = 0;

    // Add text mesh to the scene
    scene.add(textMesh);
  });


  for (let i =0; i<3;i++){
    let sphereShape
    if(i === slide){
    sphereShape = sphere(0xff0000)
    }else{
      sphereShape = sphere(0xffffff)
    }
    sphereShape.position.set(i-1,-1,0)
    scene.add(sphereShape);
  }

}

let slide = 0
const max = 3
let textSlide=['Jack Norquist | Software Engineer', 'About Me', 'I Like Turtles']

function addText(plusOrMinus = 0){
  slide+= plusOrMinus
  if(slide >= max){
    slide = 0
  }else if(slide<0){
    slide = 2
  }
  scene.remove(textMesh)
  textAdd(textSlide[slide])
}



// let textSlide = [[homeTop, aboutLink, duluth]]

// const homeTop = {
//   text: 'Jack Norquist | Software Developer',

// }



export {addText, textMesh, slide}