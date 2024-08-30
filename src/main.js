import * as THREE from 'three';
import mainClass from "./mainClass";
import { GUI } from 'dat.gui';
import Carton from "./objects/Carton";

function initApp() {
  const app = new mainClass()

  const positionOfCarton = new THREE.Vector3(100, 0, 0);
  const width = 1;
  const height = 4;
  const length = 2;

  const carton = new Carton(app, positionOfCarton, width, height, length);
  console.log('carton: ', carton);

    // Define the carton properties
    const cartonProperties = {
        width: width,    // Default width
        height: height,  // Default height
        length: length,  // Default length
        selfRotation: true, // Default rotation boolean
    };

    // Initialize dat.GUI
    const gui = new GUI();

    // Add controls to GUI for width, height, and length
    gui.add(cartonProperties, 'width', 1, 10).name('Width').onChange(updateCarton);
    gui.add(cartonProperties, 'height', 1, 10).name('Height').onChange(updateCarton);
    gui.add(cartonProperties, 'length', 1, 10).name('Length').onChange(updateCarton);
    gui.add(cartonProperties, 'selfRotation', true).name('CartonRotation').onChange(updateCarton);

    // Wrap updateCarton to pass cartonProperties
    function updateCarton() {
        carton.updateCarton(cartonProperties);
    }
}

initApp()