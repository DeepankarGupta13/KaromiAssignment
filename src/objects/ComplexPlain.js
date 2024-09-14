import * as THREE from 'three'
import Dimension from './Dimension';
import { HEIGTH_TEXT, RADIUS_TEXT, WIDTH_TEXT } from '../utils/Constants';

export default class ComplexPlane {
    constructor(app, position, width = 6, height = 10, radius = 2) {
        this.position = position;
        this.app = app;

        this.width = width;
        this.height = height;
        this.radius = radius;

        this.objectGroup = new THREE.Object3D();

        this.planeMesh = this.createRoundedPlane(this.width, this.height, this.radius);
        this.planeMesh.position.set(this.position.x, this.position.y, this.position.z);

        this.objectGroup.add(this.planeMesh);

        this.app.scene.add(this.objectGroup);
    }

    // create a plane with rounded corners
    createRoundedPlane(w, h, r) {
        const shape = new THREE.Shape();
        shape.moveTo(-w / 2 + r, -h / 2);
        shape.lineTo(w / 2 - r, -h / 2);
        shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
        shape.lineTo(w / 2, h / 2 - r);
        shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
        shape.lineTo(-w / 2 + r, h / 2);
        shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
        shape.lineTo(-w / 2, -h / 2 + r);
        shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, side: THREE.DoubleSide });

        this.widthDimension = new Dimension(this, `W: ${this.width}`, { 
            x: (this.position.x + this.width / 2),
            y: -(this.position.y + this.height / 2 + 1),
            z: this.position.z,
        }, WIDTH_TEXT)

        this.heightDimension = new Dimension(this, `H: ${this.height}`, {
            x: -(this.position.x + this.width / 2 + 1),
            y: this.position.y + this.height / 2,
            z: this.position.z,
        }, HEIGTH_TEXT)

        this.radiusDimension = new Dimension(this, `R: ${this.radius}`, { 
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2, 
            z: this.position.z,
        }, RADIUS_TEXT)

        return new THREE.Mesh(geometry, material);
    }

    updatePlane() {
        this.objectGroup.clear(); // Remove the old plane
        this.planeMesh = this.createRoundedPlane(this.width, this.height, this.radius); // Create new plane
        this.objectGroup.add(this.planeMesh); // Add updated plane to the scene
        console.log('complex plain after update: ', this);
    }
}