import * as THREE from 'three';
import Plane from './Planes';
import { colors } from '../utils/Constants';
import { GUI } from 'dat.gui';

// creating class for basic caton which will have all the required planes in unboxed state
export default class Carton {
    /**
     * 
     * @param {*} position position of the carton
     * @param {*} width width of the carton
     * @param {*} height height of the carton
     * @param {*} length length of the carton
     */
    constructor(app, position, width, height, length) {

        this.position = position;
        this.width = width;
        this.height = height;
        this.length = length;

        this.app = app;

        this.objectsGroup = new THREE.Object3D();
        this.app.scene.add(this.objectsGroup);

        // function to make planes such that it makes a carton
        this.makePlanes();

        this.gui = new GUI();
        this.params = { progress: 0 };
        this.setupGUI();
    }

    // this function will call the planes class to make planes accordingly
    makePlanes() {

        this.objectsGroup.clear();
        // we will create six planes as a cuboid has 6 planes
        // for now we are handling 6 faces in future n number of planes can be added

        const planeMetaData = this.getFacePositionDirection();

        // center plane at the given position
        this.centerPlane = new Plane(this, this.length, this.height, colors[0], planeMetaData.center.direction, false);
        this.centerPlane.name = 'Center';

        // top plane
        this.topPlane = new Plane(this, this.length, this.width, colors[1], planeMetaData.top.direction, true);
        this.topPlane.name = 'Top';
        this.topPlane.makeParent(this.centerPlane);
        this.topPlane.setMeshPosition();

        // bottom plane
        this.bottomPlane = new Plane(this, this.length, this.width, colors[2], planeMetaData.bottom.direction, true);
        this.bottomPlane.name = 'Bottom';
        this.bottomPlane.makeParent(this.centerPlane);
        this.bottomPlane.setMeshPosition();

        // left Plane
        this.leftPlane = new Plane(this, this.width, this.height, colors[3], planeMetaData.left.direction, true);
        this.leftPlane.name = 'Left';
        this.leftPlane.makeParent(this.centerPlane);
        this.leftPlane.setMeshPosition();

        // right
        this.rightPlane = new Plane(this, this.width, this.height, colors[4], planeMetaData.right.direction, true);
        this.rightPlane.name = 'Right';
        this.rightPlane.makeParent(this.centerPlane);
        this.rightPlane.setMeshPosition();

        // right most
        this.rightmostPlane = new Plane(this, this.length, this.height, colors[5], planeMetaData.rightMost.direction, true);
        this.rightmostPlane.name = 'RightMost'
        this.rightmostPlane.makeParent(this.rightPlane);
        this.rightmostPlane.setMeshPosition();

    }

    updateCarton(properties) {
        let planeUpdationRequired = false;
        if (Object.prototype.hasOwnProperty.call(properties, 'width') &&
            properties.width !== this.width) {
            this.width = properties.width;
            planeUpdationRequired = true;
        }
        if (Object.prototype.hasOwnProperty.call(properties, 'height') &&
            properties.height !== this.height) {
            this.height = properties.height;
            planeUpdationRequired = true;
        }
        if (Object.prototype.hasOwnProperty.call(properties, 'length') &&
            properties.length !== this.length) {
            this.length = properties.length;
            planeUpdationRequired = true;
        }

        if (planeUpdationRequired) this.makePlanes();
    }

    setupGUI() {
        const xAxis = new THREE.Vector3(1, 0, 0);
        const yAxis = new THREE.Vector3(0, 1, 0);

        this.gui.add(this.params, 'progress', 0, 1).name('Folding Progress').onChange(() => {
            const progress = this.params.progress;

            this.topPlane.setRotation(xAxis, Math.PI / 2 * progress); // Top face
            this.bottomPlane.setRotation(xAxis.clone().negate(), Math.PI / 2 * progress); // Bottom face
            this.leftPlane.setRotation(yAxis, Math.PI / 2 * progress); // Left face
            this.rightPlane.setRotation(yAxis.clone().negate(), Math.PI / 2 * progress); // Right face
            this.rightmostPlane.setRotation(yAxis.clone().negate(), Math.PI / 2 * progress); // rightMost face
        });
    }

    getFacePositionDirection() {
        const centerPlanePositionDirection = new THREE.Vector3(0, 0, 0)

        const topPlanePositionDirection = new THREE.Vector3(0, 0.5, 0);

        const bottomPlanePositionDirection = new THREE.Vector3(0, -0.5, 0);

        const leftPlanePositionDirection = new THREE.Vector3(-0.5, 0 , 0);

        const rightPlanePositionDirection = new THREE.Vector3(0.5, 0 , 0);

        const rightMostPlanePositionDirection = new THREE.Vector3(0.5, 0, 0);

        return {
            center: { direction: centerPlanePositionDirection },
            top: { direction: topPlanePositionDirection },
            bottom: { direction: bottomPlanePositionDirection },
            left: { direction: leftPlanePositionDirection },
            right: { direction: rightPlanePositionDirection },
            rightMost: { direction: rightMostPlanePositionDirection },
        }
    }
}