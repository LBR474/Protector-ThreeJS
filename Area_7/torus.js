
import * as THREE from 'https://cdn.skypack.dev/three@0.120.0';
import { protector_group } from './gltf_loading_script.js';

// import {
//     cubes
// } from './GQ_level_three_module.js';

export {
    torus_left_wing,
    torus_right_wing,
    hull_collision,
    laser_cylinder,
    laserboxhelper,
    laser_group,

};


const torusgeometry = new THREE.TorusGeometry(2, 0.2, 8, 100, 3.1);


const laser_cylinder_geometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 32);

const hull_collision_geometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 32);

const hull_collision_material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    opacity: 0,
    transparent: true,
    emissive: 'red',
    emissiveIntensity: 7,


});


const torus_left_wing_material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    opacity: 0,
    transparent: true,
    emissive: 'red',
    emissiveIntensity: 7,


});

const torus_right_wing_material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    opacity: 0,
    transparent: true,
    emissive: 'red',
    emissiveIntensity: 7,


});
const hull_collision = new THREE.Mesh(hull_collision_geometry, hull_collision_material);
const torus_left_wing = new THREE.Mesh(torusgeometry, torus_left_wing_material);
const torus_right_wing = new THREE.Mesh(torusgeometry, torus_right_wing_material);


torus_left_wing.rotation.x = Math.PI / 2;
torus_left_wing.rotation.z = Math.PI / 2;
torus_left_wing.position.x = -0.5;
torus_left_wing.position.z = -1.5;
torus_left_wing.position.y = -0.5;

torus_right_wing.rotation.x = Math.PI / 2;
torus_right_wing.rotation.z = -Math.PI / 2;
torus_right_wing.position.x = 0.5;
torus_right_wing.position.z = 1.5;
torus_right_wing.position.y = -0.5;

hull_collision.rotation.x = Math.PI / 2;
hull_collision.position.x = 0.1;


const laser_cylinder = new THREE.Mesh(laser_cylinder_geometry, torus_right_wing_material);
laser_cylinder.rotation.x = Math.PI / 2;
laser_cylinder.position.x = protector_group.position.x;


let laserboxhelper = new THREE.BoxHelper(laser_cylinder, 0xffff00);
let laser_group = new THREE.Group();
laser_group.add(laser_cylinder, laserboxhelper);

//export {x};