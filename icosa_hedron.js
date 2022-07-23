
import * as THREE from 'https://cdn.skypack.dev/three@0.120.0';

export {
    icosahedron_red, icosahedron_blue, icosahedron_green, 
    make_Icosa_instance_red, make_Icosa_instance_blue, make_Icosa_instance_green, 
    icosahedron_array_red, icosahedron_array_blue, icosahedron_array_green, x_pos, y_pos,
    clone_array, red_mines_group
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


const x_vec = 0.21
const y_vec = 0.21
const z_vec = 0.21


const vec_0 = new THREE.Vector3(0, y_vec, 0)
const vec_1 = new THREE.Vector3(0, 0, z_vec)
const vec_2 = new THREE.Vector3(-x_vec, 0, -z_vec)
const vec_3 = new THREE.Vector3(x_vec, 0, -z_vec)

const points_1 = []
const points_2 = []
const points_3 = []
const points_4 = []


points_1.push(vec_2, vec_1, vec_0)
points_2.push(vec_0, vec_3, vec_2)
points_3.push(vec_1, vec_3, vec_0)
points_4.push(vec_2, vec_3, vec_1)

let geometry_1 = new THREE.BufferGeometry().setFromPoints(points_1)
let line_1 = new THREE.Mesh(geometry_1, new THREE.MeshBasicMaterial({ color: 0xFF0000 }))

let geometry_2 = new THREE.BufferGeometry().setFromPoints(points_2)
let line_2 = new THREE.Mesh(geometry_2, new THREE.MeshBasicMaterial({ color: 0xFF0000 }))

let geometry_3 = new THREE.BufferGeometry().setFromPoints(points_3)
let line_3 = new THREE.Mesh(geometry_3, new THREE.MeshBasicMaterial({ color: 0xFF0000 }))

let geometry_4 = new THREE.BufferGeometry().setFromPoints(points_4)
let line_4 = new THREE.Mesh(geometry_4, new THREE.MeshBasicMaterial({ color: 0xFF0000 }))

const tetra = new THREE.Group();

const red_mines_group = new THREE.Group(

);
tetra.add(line_1, line_2, line_3, line_4);
//tetra.rotation.z = 0.5


const clone_array = []
for (let index = 0; index < 25; index++) {
    clone_array.push(tetra.clone())
    red_mines_group.add(clone_array[index])

}
//console.log(red_mines_group)



const vec_place_0 = new THREE.Vector3(0, 0, 0)
const place_alter = 0.1
let place_alter_mult = 0.1

clone_array[0].position.set(vec_place_0.x, vec_place_0.y, vec_place_0.z);


clone_array[1].position.set(vec_place_0.x,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z + place_alter * place_alter_mult);

clone_array[2].position.set(vec_place_0.x - place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

clone_array[3].position.set(vec_place_0.x + place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

place_alter_mult += 0.1

clone_array[4].position.set(vec_place_0.x,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z + place_alter * place_alter_mult);

clone_array[5].position.set(vec_place_0.x - place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

clone_array[6].position.set(vec_place_0.x + place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

clone_array[7].position.set(vec_place_0.x,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

clone_array[8].position.set(vec_place_0.x - place_alter * place_alter_mult / 2,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z);

clone_array[9].position.set(vec_place_0.x + place_alter * place_alter_mult / 2,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z);

clone_array[10].position.set(vec_place_0.x, // centre pyramid row 3
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - 0.25);

place_alter_mult += 0.1

clone_array[11].position.set(vec_place_0.x,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z + place_alter * place_alter_mult);

clone_array[12].position.set(vec_place_0.x - place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

clone_array[13].position.set(vec_place_0.x + place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

clone_array[14].position.set(vec_place_0.x,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

clone_array[15].position.set(vec_place_0.x - place_alter * place_alter_mult / 2,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z);

clone_array[16].position.set(vec_place_0.x + place_alter * place_alter_mult / 2,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z);

clone_array[17].position.set(vec_place_0.x, // centre pyramid row 4
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - 0.25);

place_alter_mult += 0.1

clone_array[18].position.set(vec_place_0.x,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z + place_alter * place_alter_mult);

clone_array[19].position.set(vec_place_0.x - place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

clone_array[20].position.set(vec_place_0.x + place_alter * place_alter_mult,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

clone_array[21].position.set(vec_place_0.x,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - place_alter * place_alter_mult);

clone_array[22].position.set(vec_place_0.x - place_alter * place_alter_mult / 2,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z);

clone_array[23].position.set(vec_place_0.x + place_alter * place_alter_mult / 2,
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z);

clone_array[24].position.set(vec_place_0.x, // centre pyramid row 4
    vec_place_0.y - place_alter * place_alter_mult,
    vec_place_0.z - 0.25);


// for (let index = 0; index < clone_array.length; index++) {

//     scene.add(clone_array[index])
// }






