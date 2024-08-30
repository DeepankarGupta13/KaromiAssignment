import * as THREE from 'three';
import mainClass from "./mainClass";
import Carton from "./objects/Carton";

function initApp() {
  const app = new mainClass()

  const positionOfCarton = new THREE.Vector3(100, 0, 0);
  const width = 1;
  const height = 4;
  const length = 2;

  const carton = new Carton(app, positionOfCarton, width, height, length);
  console.log('carton: ', carton);
}

initApp()