// Import Three.js (make sure to include the library in your project)
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let cubeGroup = new THREE.Group();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    controls = new OrbitControls(camera, renderer.domElement);
    
    createRubiksCube();
    animate();
}

function createRubiksCube() {
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xffa500, 0xffffff];
    
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                let geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
                let materials = colors.map(color => new THREE.MeshBasicMaterial({ color }));
                let cube = new THREE.Mesh(geometry, materials);
                cube.position.set(x, y, z);
                cubeGroup.add(cube);
            }
        }
    }
    scene.add(cubeGroup);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.onload = init;
