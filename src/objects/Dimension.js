import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { HEIGTH_TEXT, RADIUS_TEXT, WIDTH_TEXT } from '../utils/Constants';

export default class Dimension {
    constructor(plane, value, position, type) {
        this.value = value;
        this.position = position;
        this.plane = plane;
        this.type = type

        this.createDimensionText(this.plane, this.plane.objectGroup, this.value, this.position, this.type, this.updateDimension)
    }

    // Function to create dimension text
    createDimensionText(plane, scene, value, position, type, updateDimension) {
        const loader = new FontLoader();
        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
            const geometry = new TextGeometry(value, {
                font: font,
                size: 0.5,
                depth: 0.1
            });
            const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const textMesh = new THREE.Mesh(geometry, material);
            textMesh.position.set(position.x, position.y, position.z);
            scene.add(textMesh);

            // Add double-click event listener to allow editing
            textMesh.callback = function () {
                const input = document.createElement('input');
                input.type = 'number';
                input.value = value;
                input.style.position = 'absolute';
                input.style.left = `${event.clientX}px`;
                input.style.top = `${event.clientY}px`;

                document.body.appendChild(input);
                input.focus();

                input.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') {
                        value = parseFloat(input.value);
                        scene.remove(textMesh); // Remove old text
                        document.body.removeChild(input);
                        updateDimension(type, value); // Update geometry with new value
                    }
                });
            };

            textMesh.userData = { clickable: true };
        });
    }

    updateDimension = (type, newValue) => {
        // TODO: add errors for radius greater than MIN(height, Width)/2;
        if (type === WIDTH_TEXT) {
            this.plane.width = newValue;
        } else if (type === HEIGTH_TEXT) {
            this.plane.height = newValue;
        } else if (type === RADIUS_TEXT) {
            this.plane.radius = newValue;
        }
        this.plane.updatePlane();
    }
}