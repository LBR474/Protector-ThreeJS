
import * as THREE from 'https://cdn.skypack.dev/three@0.120.0';

export { 
    torus_left_wing, 
    torus_right_wing, 
}


const torusgeometry = new THREE.TorusGeometry(1.5, 0.1, 8, 100, 1.55);
const torus_left_wing_material = new THREE.MeshPhongMaterial({ 
    color: 0xff0000,
    opacity: 1,
    transparent: true,


});
const torus_right_wing_material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    opacity: 1,
    transparent: true,


});
const torus_left_wing = new THREE.Mesh(torusgeometry, torus_left_wing_material);
const torus_right_wing = new THREE.Mesh(torusgeometry, torus_right_wing_material);


torus_left_wing.rotation.x = -Math.PI / 2;
torus_left_wing.rotation.z = Math.PI / 2;
torus_left_wing.position.x = -0.4;
torus_left_wing.position.z = 3;
torus_left_wing.position.y = -0.7;

torus_right_wing.rotation.x = Math.PI / 2;
torus_right_wing.rotation.z = -Math.PI / 2;
torus_right_wing.position.x = 0.4;
torus_right_wing.position.z = 3;
torus_right_wing.position.y = -0.7;






//export {torus_left_wing, torus_right_wing};


