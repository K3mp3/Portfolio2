/* eslint-disable no-unused-vars */
import * as THREE from "three";
import gsap from "gsap"; 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import { PointsMaterial } from "three";

//Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.TorusKnotGeometry( 0.01, 0.8, 100, 16 );
const sphereMaterial = new THREE.PointsMaterial( {
    size: 0.01,
    color: "#36A2F1",
});
const sphere = new THREE.Points(geometry, sphereMaterial);
scene.add(sphere);


const particlesMaterial = new THREE.PointsMaterial( {
    size: 0.006,
    color: "#5036F1",
});


const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 2000; // How many particles we want 

const posArray = new Float32Array(particlesCnt * 3);
// xyz, xyz, xyz, xyz

for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() -0.5) * (Math.random() *5);
}

particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

// Mesh
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight + 100,
};

//Light
const light = new THREE.PointLight(0xfff, 1, 100);
light.position.set(1, 10, 10);
light.intensity = 10.25;
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(
    25, 
    sizes.width / sizes.height, 
    0.1, 
    100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 4;
scene.add(camera);

//Render
const canvas = document.querySelector(".webgl");
let renderer = null;
if (canvas) {
    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(2);
    renderer.setClearColor(new THREE.Color("#121617"), 1);
    renderer.render(scene, camera);
}

// Mouse
document.addEventListener("mousemove", animateParticles);

let mouseY = 0;
let mouseX = 0;

function animateParticles(e) {
    mouseY = e.clientY;
    mouseX = e.clientX;
}

let controls = null;

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
};

//Resize
if (renderer) {
    //Controls
    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    window.addEventListener("resize", () => {
        //Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
      
        //Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
    });
    loop();
}
