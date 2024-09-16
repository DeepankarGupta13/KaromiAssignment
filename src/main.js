import * as THREE from 'three';
import mainClass from "./mainClass";
import { GUI } from 'dat.gui';
import Carton from "./objects/Carton";
import ComplexPlane from './objects/ComplexPlain';

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
    gui.add(cartonProperties, 'width', 1).name('Width').onChange(updateCarton);
    gui.add(cartonProperties, 'height', 1).name('Height').onChange(updateCarton);
    gui.add(cartonProperties, 'length', 1).name('Length').onChange(updateCarton);
    gui.add(cartonProperties, 'selfRotation', true).name('CartonRotation').onChange(updateCarton);

    // Wrap updateCarton to pass cartonProperties
    function updateCarton() {
        carton.updateCarton(cartonProperties);
    }
}

function initGeomChanges() {
    const app = new mainClass();

    const position = new THREE.Vector3(0, 0, 0);
    const ComplexPlain = new ComplexPlane(app, position);
    console.log('ComplexPlain: ', ComplexPlain);

    const camera = app.camera;
    const scene = app.scene;

    // Event listener for double-clicks to edit dimensions
    document.addEventListener('dblclick', (event) => {
        // Raycaster to detect which object is clicked
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);

        intersects.forEach((intersect) => {
            if (intersect.object.userData.clickable) {
                intersect.object.callback();
            }
        });
    });
}

// initApp();
initGeomChanges();