import * as THREE from 'three'
import Dimension from './Dimension';
import { HEIGTH_TEXT, RADIUS_TEXT_BL, RADIUS_TEXT_BR, RADIUS_TEXT_TL, RADIUS_TEXT_TR, WIDTH_TEXT } from '../utils/Constants';

export default class ComplexPlane {
    constructor(app, position, width = 6, height = 10, radiusTL = 2, radiusTR = 1, radiusBL = 1, radiusBR = 2) {
        this.position = position;
        this.app = app;

        this.width = width;
        this.height = height;
        this.radiusTL = radiusTL; // Top-left radius
        this.radiusTR = radiusTR; // Top-right radius
        this.radiusBL = radiusBL; // Bottom-left radius
        this.radiusBR = radiusBR; // Bottom-rigth radius

        this.objectGroup = new THREE.Object3D();

        this.planeMesh = this.createRoundedPlane(this.width, this.height, this.radiusTL, this.radiusTR, this.radiusBL, this.radiusBR);
        this.planeMesh.position.set(this.position.x, this.position.y, this.position.z);

        this.objectGroup.add(this.planeMesh);

        this.app.scene.add(this.objectGroup);
    }

    // create a plane with rounded corners
    createRoundedPlane(w, h, rTL, rTR, rBL, rBR) {
        const shape = new THREE.Shape();

        // Bottom-left corner
        shape.moveTo(-w / 2 + rBL, -h / 2);
        shape.lineTo(w / 2 - rBR, -h / 2);
        shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + rBR); // Bottom-right

        // Right edge
        shape.lineTo(w / 2, h / 2 - rTR);
        shape.quadraticCurveTo(w / 2, h / 2, w / 2 - rTR, h / 2); // Top-right

        // Top edge
        shape.lineTo(-w / 2 + rTL, h / 2);
        shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - rTL); // Top-left

        // Left edge
        shape.lineTo(-w / 2, -h / 2 + rBL);
        shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + rBL, -h / 2); // Back to Bottom-left

        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, side: THREE.DoubleSide });

        this.widthDimension = new Dimension(this, `W: ${this.width}`, {
            x: this.position.x,
            y: -(this.position.y + this.height / 2 + 1),
            z: this.position.z,
        }, WIDTH_TEXT)

        this.heightDimension = new Dimension(this, `H: ${this.height}`, {
            x: -(this.position.x + this.width / 2 + 1.5),
            y: this.position.y,
            z: this.position.z,
        }, HEIGTH_TEXT)

        this.radiusTLDimension = new Dimension(this, `RTL: ${this.radiusTL}`, {
            x: this.position.x - this.width / 2 - 1,
            y: this.position.y + this.height / 2,
            z: this.position.z,
        }, RADIUS_TEXT_TL);

        this.radiusTRDimension = new Dimension(this, `RTR: ${this.radiusTR}`, {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
            z: this.position.z,
        }, RADIUS_TEXT_TR);

        this.radiusBLDimension = new Dimension(this, `RBL: ${this.radiusBL}`, {
            x: this.position.x - this.width / 2 - 1,
            y: this.position.y - this.height / 2,
            z: this.position.z,
        }, RADIUS_TEXT_BL);

        this.radiusBRDimension = new Dimension(this, `RTL: ${this.radiusBR}`, {
            x: this.position.x + this.width / 2,
            y: this.position.y - this.height / 2,
            z: this.position.z,
        }, RADIUS_TEXT_BR);

        return new THREE.Mesh(geometry, material);
    }

    updatePlane() {
        this.objectGroup.clear(); // Remove the old plane
        this.planeMesh = this.createRoundedPlane(this.width, this.height, this.radiusTL, this.radiusTR, this.radiusBL, this.radiusBR); // Create new plane
        this.objectGroup.add(this.planeMesh); // Add updated plane to the scene
        console.log('complex plain after update: ', this);
    }
}