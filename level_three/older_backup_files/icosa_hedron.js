
import * as THREE from 'https://cdn.skypack.dev/three@0.120.0';

export {
    icosahedron_red, icosahedron_blue, icosahedron_green, 
    make_Icosa_instance_red, make_Icosa_instance_blue, make_Icosa_instance_green, 
    icosahedron_array_red, icosahedron_array_blue, icosahedron_array_green, x_pos, y_pos
};

const texloader = new THREE.TextureLoader();
const radius = 1;
let x_pos, y_pos, icosahedron_red, icosahedron_blue, icosahedron_green;
const icosahedron_array_red = [];
const icosahedron_array_blue = [];
const icosahedron_array_green = [];



const icosa_red = new THREE.MeshStandardMaterial({
    color: 0xFF0000,
    //map: texloader.load('../examples/textures/lava/lavatile.jpg'),
    transparent: true,
    emissive: 'red',
    emissiveIntensity: 7,
    opacity: 0
});
const icosa_blue = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    //map: texloader.load('../examples/textures/lava/lavatile.jpg'),
    transparent: true,
    emissive: 0x0000FF,
    emissiveIntensity: 7,
    opacity: 0
});
const icosa_green = new THREE.MeshStandardMaterial({
    color: 0x00FF00,
    //map: texloader.load('../examples/textures/lava/lavatile.jpg'),
    transparent: true,
    emissive: 0x00FF00,
    emissiveIntensity: 7,
    opacity: 0
});


let make_Icosa_instance_red = () => {
    icosahedron_red = new THREE.Mesh(new THREE.IcosahedronGeometry(radius), icosa_red);
    icosahedron_array_red.push(icosahedron_red);
}
let make_Icosa_instance_blue = () => {
    icosahedron_blue = new THREE.Mesh(new THREE.IcosahedronGeometry(radius), icosa_blue);
    icosahedron_array_blue.push(icosahedron_blue);
}
let make_Icosa_instance_green = () => {
    icosahedron_green = new THREE.Mesh(new THREE.IcosahedronGeometry(radius), icosa_green);
    icosahedron_array_green.push(icosahedron_green);
}





