
import * as THREE from 'https://cdn.skypack.dev/three@0.120.0';

export { exp_cube, 
    exp_cube_geometry, 
    exp_cube_array, 
    makeInstanceRed, 
    //MakeInstanceRedCaller
 };


const exp_cube_Width = 0.2;
const exp_cube_Height = 0.5;
const exp_cube_Depth = 0.5;
const exp_cube_array = [];
const exp_cube_geometry = new THREE.BoxGeometry(

    exp_cube_Width, exp_cube_Height, exp_cube_Depth);

let x, y, exp_cube;
const texloader = new THREE.TextureLoader();

// function MakeInstanceRedCaller() {
//     for (let index = 0; index < num_cubes_and_isos; index++) {
//         //console.log (protector.position.x);
//         makeInstanceRed(exp_cube_geometry, 0, 0);
//         //scene.add(exp_cube);
//     }
// }
// MakeInstanceRedCaller();

function makeInstanceRed(exp_cube_geometry, x, y) {
    const material = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        //map: texloader.load('../examples/textures/lava/lavatile.jpg'),
        transparent: true,
        opacity: 0
    });

    exp_cube = new THREE.Mesh(exp_cube_geometry, material);
    //scene.add(exp_cube);

    exp_cube.position.x = x;
    exp_cube.position.y = y;
    exp_cube_array.push(exp_cube);



    //return exp_cube;
}






