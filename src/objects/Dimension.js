import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { HEIGTH_TEXT, RADIUS_TEXT_BL, RADIUS_TEXT_BR, RADIUS_TEXT_TL, RADIUS_TEXT_TR, WIDTH_TEXT } from '../utils/Constants';

export default class Dimension {
    constructor(plane, value, position, type) {
        this.value = value;
        this.position = position;
        this.plane = plane;
        this.type = type

        this.createDimensionText(this.plane.objectGroup, this.value, this.position, this.type, this.updateDimension)
    }

    // Function to create dimension text
    createDimensionText(scene, value, position, type, updateDimension) {
        const loader = new FontLoader();
        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
            const geometry = new TextGeometry(value, {
                font: font,
                size: 0.3,
                depth: 0.1
            });
            const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const textMesh = new THREE.Mesh(geometry, material);
            textMesh.position.set(position.x, position.y, position.z);
            scene.add(textMesh);

            // Add double-click event listener to allow editing
            textMesh.callback = function () {
                textMesh.visible = false;
                const input = document.createElement('input');
                input.type = 'number';
                input.value = value;
                input.style.position = 'absolute';
                input.style.left = `${event.clientX}px`;
                input.style.top = `${event.clientY}px`;
                input.style.width = `${50}px`;

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
        } else if (type === RADIUS_TEXT_TL) {
            if (newValue < Math.min(this.plane.width / 2, this.plane.height / 2 )) {
                this.plane.radiusTL = newValue;
            }
            else {
                console.error('the radius is greater then half of min(width, height');
                window.alert('the radius is greater then half of min(width, height');
            }
        } else if (type === RADIUS_TEXT_TR) {
            if (newValue < Math.min(this.plane.width / 2, this.plane.height / 2 )) {
                this.plane.radiusTR = newValue;
            }
            else {
                console.error('the radius is greater then half of min(width, height');
                window.alert('the radius is greater then half of min(width, height');
            }
        } else if (type === RADIUS_TEXT_BL) {
            if (newValue < Math.min(this.plane.width / 2, this.plane.height / 2 )) {
                this.plane.radiusBL = newValue;
            }
            else {
                console.error('the radius is greater then half of min(width, height');
                window.alert('the radius is greater then half of min(width, height');
            }
        } else if (type === RADIUS_TEXT_BR) {
            if (newValue < Math.min(this.plane.width / 2, this.plane.height / 2 )) {
                this.plane.radiusBR = newValue;
            }
            else {
                console.error('the radius is greater then half of min(width, height');
                window.alert('the radius is greater then half of min(width, height');
            }
        }
        this.plane.updatePlane();
    }
}