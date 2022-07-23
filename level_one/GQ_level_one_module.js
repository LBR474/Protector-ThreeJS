
import * as THREE from 'https://cdn.skypack.dev/three@0.120.0'


// import {
//     OrbitControls
// } from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/controls/OrbitControls.js';

// import { DragControls } from
//     'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/DragControls.js';


// import {
//     exp_cube,
//     exp_cube_geometry,
//     exp_cube_array,
//     makeInstanceRed
// } from './exp_cube.js';

import {
    torus_left_wing,
    torus_right_wing,
    // laser_cylinder,
    // laserboxhelper,
    laser_group

} from './torus_1.js';

import {
    make_Icosa_instance_red,
    make_Icosa_instance_blue,
    make_Icosa_instance_green,
    icosahedron_array_red,
    icosahedron_array_blue,
    icosahedron_array_green
} from './icosa_hedron_1.js';

import {
    boxhelper,
    left_wing_box,
    left_front_engine_box,
    right_wing_box,
    right_front_engine_box,
    hull_and_tail,
    left_front_engine,
    left_engine,

    left_front_engine_light_1,
    left_front_engine_light_2,
    left_front_engine_light_3,
    left_front_engine_light_4,
    left_front_engine_light_5,
    left_front_engine_light_6,
    left_front_engine_light_7,
    left_front_engine_light_8,

    right_front_engine_light_1,
    right_front_engine_light_2,
    right_front_engine_light_3,
    right_front_engine_light_4,
    right_front_engine_light_5,
    right_front_engine_light_6,
    right_front_engine_light_7,
    right_front_engine_light_8,

    left_rear_engine_light_1,
    left_rear_engine_light_2,
    left_rear_engine_light_3,
    left_rear_engine_light_4,

    right_rear_engine_light_1,
    right_rear_engine_light_2,
    right_rear_engine_light_3,
    right_rear_engine_light_4,

    right_engine,
    right_front_engine,
    right_engine_light,
    left_wing,
    right_wing,
    nose_cone,
    protector_group,
    protector,
    protector_cylinders,
    mines_array,
    mine_red,
    mine_blue,
    mine_green,
    red_mines_array,
    blue_mines_array,
    green_mines_array,
    Cylinder_0_box,
    number_of_mines

} from './gltf_loading_script_1.js';


import * as score_update from './score_update_1.js';
//import { } from './_____.js';
import * as mine_multi_pieces from './mine_multi_pieces.html';
import * as mine_mover_1 from './mine_mover_1.js';
import { icosa_explosion_red_nose_func } from './explosion_functions_1.js';





export {
    scene,
    backgroundScene,
    renderer,
    camera,
    pause,
    num_cubes_and_isos,
    cubes,
    dragAction,
    blue_engine_color,

};


const scene = new THREE.Scene();


const texloader = new THREE.TextureLoader();
const bgTexture = texloader.load('../images/extra_stars_pic.png');
const floating_mine_green = texloader.load('../images/nx.png');
const floating_mine_blue = texloader.load('../images/tothian_mine_blue_big_2D_1.png');
const floating_mine_red = texloader.load('../images/tothian_mine_red_big_2D_1.png');
//const bgTexture = texloader.load('./images/space_pic.jpg');

//scene.background = bgTexture;

const background_color = new THREE.Color(0x05014a);



// background scene and camera area begins .................................................


// Create your background scene
var backgroundScene = new THREE.Scene();
const backgroundCamera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.01, 100);
backgroundScene.add(backgroundCamera);
backgroundScene.background = bgTexture;
//backgroundScene.background = background_color;




// front scene camera area begins .....................................................
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.01, 100);


backgroundCamera.position.z = 7;
backgroundCamera.position.y = 3;

camera.position.z = 7;
camera.position.y = 1;



scene.add(camera);



// lights area begins .....................................................

{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 2, 2);
    const light2 = new THREE.DirectionalLight(0xFFFFFF, intensity);
    light2.position.set(0, -1, 2);
    light2.target.position.set(0, 0, 1.5);
    scene.add(light, light2);
    scene.add(light2.target);
}



// canvas area begins .....................................................

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});


// controls area begins .....................................................

//const controls = new OrbitControls(camera, canvas);

//controls.target.set(0, 1, 0);
//controls.passive = true;
//controls.update();



// global variable area begins .....................................................

let pause = false;
let num_cubes_and_isos = 50;
//let blackColor = new THREE.Color(0x000000);

icosa_red_caller();
icosa_blue_caller();
icosa_green_caller();


// points array area begins ................................................................
const colorArray = [new THREE.Color(0xFFFFFF), new THREE.Color(0xFFFFFF),
new THREE.Color(0xFFFFFF)];
const positions = [];
const colors = [];

for (let i = 0; i < 300; i++) {

    positions.push((Math.random() - 0.5) * 300, (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300);

    const clr = colorArray[Math.floor(Math.random() * colorArray.length)];

    colors.push(clr.r, clr.g, clr.b);

}

const particles_geometry = new THREE.BufferGeometry();
particles_geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
particles_geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const particles_material = new THREE.PointsMaterial({
    size: 3, vertexColors: true, depthTest: false, sizeAttenuation: false,
    map: floating_mine_green,
});
const particles_material_2 = new THREE.PointsMaterial({
    size: 3, vertexColors: true, depthTest: false, sizeAttenuation: false,
    map: floating_mine_blue,
});
const particles_material_3 = new THREE.PointsMaterial({
    size: 3, vertexColors: true, depthTest: false, sizeAttenuation: false,
    map: floating_mine_red,
});
const particlesMesh = new THREE.Points(particles_geometry, particles_material);
const particlesMesh_2 = new THREE.Points(particles_geometry, particles_material_2);
const particlesMesh_3 = new THREE.Points(particles_geometry, particles_material_3);


backgroundScene.add(
    particlesMesh, 
    // particlesMesh_2, 
    // particlesMesh_3
    );
const boxmaterial = new THREE.MeshBasicMaterial({ color: 'black' });
const boxmat_array = [];
for (let index = 0; index < 9; index++) {
    boxmat_array[index] = new THREE.MeshBasicMaterial({ color: 'black' });

}

const whiteColor = new THREE.MeshBasicMaterial({ color: 'white' });
const whiteColor1 = new THREE.MeshBasicMaterial({ color: 'white' });



const cube_array_geometry = new THREE.PlaneGeometry(5, 2);
//const buffer_geometry = new THREE.BufferGeometry(); 
const vertices = [
    // front
    { pos: [-2, -1, 3], norm: [0, 0, 1], uv: [0, 0], }, // 0
    { pos: [2.5, -1, 3], norm: [0, 0, 1], uv: [1, 0], }, // 1
    { pos: [-2, 1, 3], norm: [0, 0, 1], uv: [0, 1], }, // 2
    { pos: [2.5, 1, 3], norm: [0, 0, 1], uv: [1, 1], }, // 3
    // right
    { pos: [2.5, -1, 3], norm: [1, 0, 0], uv: [0, 0], }, // 4
    { pos: [2.5, -1, -1], norm: [1, 0, 0], uv: [1, 0], }, // 5
    { pos: [2.5, 1, 3], norm: [1, 0, 0], uv: [0, 1], }, // 6
    { pos: [2.5, 1, -1], norm: [1, 0, 0], uv: [1, 1], }, // 7
    // back
    { pos: [1, -1, -1], norm: [0, 0, -1], uv: [0, 0], }, // 8
    { pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 0], }, // 9
    { pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 1], }, // 10
    { pos: [-1, 1, -1], norm: [0, 0, -1], uv: [1, 1], }, // 11
    // left
    { pos: [-2, -1, -1], norm: [-1, 0, 0], uv: [0, 0], }, // 12
    { pos: [-2, -1, 3], norm: [-1, 0, 0], uv: [1, 0], }, // 13
    { pos: [-2, 1, -1], norm: [-1, 0, 0], uv: [0, 1], }, // 14
    { pos: [-2, 1, 3], norm: [-1, 0, 0], uv: [1, 1], }, // 15
    // top
    { pos: [2.5, 1, -1], norm: [0, 1, 0], uv: [0, 0], }, // 16
    { pos: [-2, 1, -1], norm: [0, 1, 0], uv: [1, 0], }, // 17
    { pos: [2.5, 1, 3], norm: [0, 1, 0], uv: [0, 1], }, // 18
    { pos: [-2, 1, 3], norm: [0, 1, 0], uv: [1, 1], }, // 19
    // bottom
    { pos: [2.5, -1, 3], norm: [0, -1, 0], uv: [0, 0], }, // 20
    { pos: [-2, -1, 3], norm: [0, -1, 0], uv: [1, 0], }, // 21
    { pos: [2.5, -1, -1], norm: [0, -1, 0], uv: [0, 1], }, // 22
    { pos: [-2, -1, -1], norm: [0, -1, 0], uv: [1, 1], }, // 23
];
const buffer_positions = [];
const normals = [];
const uvs = [];
for (const vertex of vertices) {
    buffer_positions.push(...vertex.pos);
    normals.push(...vertex.norm);
    uvs.push(...vertex.uv);
}

const buffer_geometry = new THREE.BufferGeometry();
const positionNumComponents = 3;
const normalNumComponents = 3;
const uvNumComponents = 2;
buffer_geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(buffer_positions), positionNumComponents));
buffer_geometry.setAttribute(
    'normal',
    new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
buffer_geometry.setAttribute(
    'uv',
    new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));

buffer_geometry.setIndex([
    0, 1, 2, 2, 1, 3, //front
    4, 5, 6, 6, 5, 7, //right
    //8, 9, 10, 10, 9, 11, //back
    12, 13, 14, 14, 13, 15, //left
    16, 17, 18, 18, 17, 19, //top
    20, 21, 22, 22, 21, 23, //bottom
]);


const material = [
    new THREE.MeshPhongMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0,
    }),
    new THREE.MeshPhongMaterial({
        color: 0x00FF00,
        transparent: true,
        opacity: 1.0,
    }),
]

const cubes = [
    //new THREE.Mesh(cube_array_geometry, material[0]),
    //new THREE.Mesh(cube_array_geometry, material[1]),
    new THREE.Mesh(buffer_geometry, material[1]),





]
cubes[0].position.x = 0
cubes[0].position.z = 1
cubes[0].scale.x = 1

// cubes[1].position.x = 1
// cubes[1].rotation.y = (Math.PI / 4);
//cubes.forEach((c) => scene.add(c))


//const controls = new DragControls(cubes, camera, renderer.domElement);


function icosa_green_caller() {
    for (let index = 0; index < num_cubes_and_isos; index++) {
        make_Icosa_instance_green();

    }
}

function icosa_blue_caller() {
    for (let index = 0; index < num_cubes_and_isos; index++) {
        make_Icosa_instance_blue();

    }
}

function icosa_red_caller() {
    for (let index = 0; index < num_cubes_and_isos; index++) {
        make_Icosa_instance_red();
        //scene.add(icosahedron_red);
    }
}


var scale = 0.05;
var lastX = 0;
var lastY = 0;
var meshX = 0;
var meshY = 0;

var dragger = new Draggable(document.createElement("div"), {
    onDrag: dragAction,
    bounds: {
        target: "#colmiddle1",
        minX: -100,
        maxX: 100,
        minY: -100,
        maxY: 100,
    
    
    },
    // type: 'x, y',
    trigger: renderer.domElement,
    throwProps: true,
    throwResistance: 10000
});

function dragAction() {
    //console.log(protector_group.position.x);
    var x = dragger.x;
    var y = dragger.y;

    var dx = x - lastX;
    var dy = y - lastY;

    lastX = x;
    lastY = y;

    meshX += dx;
    meshY -= dy;

    // if (protector_group.position.x < 5) {

    protector_group.position.y = meshY * scale;
    protector_group.position.x = meshX * scale;
    // } else {
    //     scale == 0;
    // }


}


// render area begins .....................................................

var clock = new THREE.Clock();
let render_counter = 0;
let protector_counter = 0;
let protector_group_counter = 0;
let mines_adder_counter = 0;
const loadingElem = document.querySelector('#loading');





//const controls = new DragControls(cubes, camera, renderer.domElement);

function render() {




    if (resizeRendererToDisplaySize(renderer)) {
        //const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        //controls.update();
    }
    render_counter += 1;

    if (protector_counter == 0 && protector) {
        protector_returner();


    }


    if (render_counter > 10 && render_counter < 20) {
        mines_adder();
        protector_group_adder();
        // gsap.to(red_mines_array[5].position, 0.5,
        //     {
        //         z: 0,
        //     })
    }


    particlesMesh.rotation.x += 0.0011;
    particlesMesh_2.rotation.y += 0.0011;
    particlesMesh_3.rotation.z += 0.0011;

    red_mines_array.forEach(element => {
        element.rotation.y += 0.1;
    });
    blue_mines_array.forEach(element => {
        element.rotation.x += 0.1;
    });
    green_mines_array.forEach(element => {
        element.rotation.z += 0.1;
    });

    // if (render_counter > 20) {

    //     gsap.to(
    //         [red_mines_array[mine_mover_2.mine_number].position,
    //         blue_mines_array[mine_mover_2.mine_number].position],
    //         0.1,
    //         {
    //             z: "+=0.5",


    //         })
    //     }





    renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene, backgroundCamera);
    renderer.render(scene, camera);


    requestAnimationFrame(render);

}

const protector_returner = () => {


    protector_counter += 1;

    loadingElem.style.display = 'none';
    scene.add(protector);
    //protector.position.y = 0;

    return protector_returner;

};

let mines_adder = () => {


    mine_multi_pieces.clone_array.forEach((element, ndx) => {
        // document.createElement("div");
        scene.add(element);

        element.position.x =
            (ndx * 1) - (red_mines_array.length * 0.5);
        element.position.y = -3;



    });
    red_mines_array.forEach((element, ndx) => {
        // document.createElement("div");
        scene.add(element);

        element.position.x =
            (ndx * 1) - (red_mines_array.length * 0.5);
        element.position.y = 0;



    });
    blue_mines_array.forEach((element, ndx) => {

        scene.add(element);
        element.position.x =
            (ndx * 1) - (blue_mines_array.length * 0.5);
        element.position.y = -5;



    });
    green_mines_array.forEach((element, ndx) => {

        scene.add(element);
        element.position.x =
            (ndx * 1) - (green_mines_array.length * 0.5);

        element.position.y = 5;



    });

}




function protector_group_adder() {

    if (hull_and_tail) {
        protector_group_counter += 1;
        protector_group.add(
            nose_cone,
            //laser_group,
            //boxhelper,
            //left_wing_box,
            // left_front_engine_box,
            //right_wing_box,
            // right_front_engine_box,
            //Cylinder_0_box,
            hull_and_tail,


            left_front_engine_light_1,
            left_front_engine_light_2,
            left_front_engine_light_3,
            left_front_engine_light_4,
            left_front_engine_light_5,
            left_front_engine_light_6,
            left_front_engine_light_7,
            left_front_engine_light_8,



            right_front_engine_light_1,
            right_front_engine_light_2,
            right_front_engine_light_3,
            right_front_engine_light_4,
            right_front_engine_light_5,
            right_front_engine_light_6,
            right_front_engine_light_7,
            right_front_engine_light_8,

            left_rear_engine_light_1,
            left_rear_engine_light_2,
            left_rear_engine_light_3,
            left_rear_engine_light_4,

            right_rear_engine_light_1,
            right_rear_engine_light_2,
            right_rear_engine_light_3,
            right_rear_engine_light_4,


            right_engine,
            left_engine,
            left_front_engine,
            left_wing,
            right_front_engine,
            right_wing


        );
        //protector_group.rotation.y = -Math.PI / 2;
        protector_group.rotation.y = 0;
        protector_group.position.y = 0;
        // protector_group.position.z = 0;

        scene.add(protector_group);

        //scene.add(boxhelper);
        left_front_engine_light_1.material = boxmat_array[0];
        left_front_engine_light_2.material = boxmat_array[1];
        left_front_engine_light_3.material = boxmat_array[2];
        left_front_engine_light_4.material = boxmat_array[3];
        left_front_engine_light_5.material = boxmat_array[4];
        left_front_engine_light_6.material = boxmat_array[5];
        left_front_engine_light_7.material = boxmat_array[6];
        left_front_engine_light_8.material = boxmat_array[7];



        right_front_engine_light_1.material = boxmat_array[0];
        right_front_engine_light_2.material = boxmat_array[1];
        right_front_engine_light_3.material = boxmat_array[2];
        right_front_engine_light_4.material = boxmat_array[3];
        right_front_engine_light_5.material = boxmat_array[4];
        right_front_engine_light_6.material = boxmat_array[5];
        right_front_engine_light_7.material = boxmat_array[6];
        right_front_engine_light_8.material = boxmat_array[7];



        left_rear_engine_light_1.material = boxmat_array[0];
        left_rear_engine_light_2.material = boxmat_array[1];
        left_rear_engine_light_3.material = boxmat_array[2];
        left_rear_engine_light_4.material = boxmat_array[3];

        right_rear_engine_light_1.material = boxmat_array[0];
        right_rear_engine_light_2.material = boxmat_array[1];
        right_rear_engine_light_3.material = boxmat_array[2];
        right_rear_engine_light_4.material = boxmat_array[3];


    };
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}


let laser_returner = () => {



    laser_group.position.x = cubes[0].position.x;
    laser_group.cylinder.position.y = cubes[0].position.y;
    laser_group.position.z = cubes[0].position.z;
    scene.add(laser_cylinder);

}



// onload control area begins .......................................................................................................................................
var blue_engine_color = new THREE.Color(0x09E0FE);
var standardColor = new THREE.Color(0xFFFFFF);
var blackColor = new THREE.Color(0x000000);
let onload_control_counter = 0;


var onload_control = () => {




    // if (onload_control_counter == 0) {






    //score_update(module_score);


    gsap.to([
        left_front_engine_light_1.material.color,
        left_front_engine_light_2.material.color,
        left_front_engine_light_3.material.color,
        left_front_engine_light_4.material.color,
        left_front_engine_light_5.material.color,
        left_front_engine_light_6.material.color,
        left_front_engine_light_7.material.color,
        left_front_engine_light_8.material.color,

        right_front_engine_light_1.material.color,
        right_front_engine_light_2.material.color,
        right_front_engine_light_3.material.color,
        right_front_engine_light_4.material.color,
        right_front_engine_light_5.material.color,
        right_front_engine_light_6.material.color,
        right_front_engine_light_7.material.color,
        right_front_engine_light_8.material.color,

        left_rear_engine_light_1.material.color,
        left_rear_engine_light_2.material.color,
        left_rear_engine_light_3.material.color,
        left_rear_engine_light_4.material.color,

        right_rear_engine_light_1.material.color,
        right_rear_engine_light_2.material.color,
        right_rear_engine_light_3.material.color,
        right_rear_engine_light_4.material.color,








    ],


        // 2, 
        {
            r: blue_engine_color.r,
            g: blue_engine_color.g,
            b: blue_engine_color.b,
            //ease: "elastic",
            stagger: 0.1
        });


    gsap.to("#collision_div_red", {
        display: "none",
        //map: damageTexture,
        duration: 2
    });
    gsap.to("#collision_div_blue", {
        display: "none",
        duration: 1
    });
    gsap.to("#collision_div_green", {
        display: "none",
        duration: 1
    });



    if (pause == true) {


        mines_array[mines_i].position.z = -20;
        gsap.to(mines_array[mines_i].scale, {
            duration: .7,
            x: 0.2,
            y: 0.2
        });
        //mine_mover_1();
        //return;

    } else {

        // mines_array.forEach(element => {
        //     element.position.z = -50;
        // });



        //mine_mover_2();
        //return;


    }
    onload_control_counter += 1;
    // }




}













// query selector area begins .....................................................

// }

let module_score = 0;


var startup = document.getElementById("c");

startup.addEventListener("mousedown", function (e) {

    // switch (e.button) {
    //     case 0:
    //         // left mouse button

    //         break;
    //     case 1:
    //         // middle mouse button
    //         break;
    //     default:
        // 2 === right mouse button
        // gsap.to(laser_group.position, {
        //     duration: .9,

        //     z: -180,

        // });
        // gsap.to(laserboxhelper.position, {
        //     duration: .9,

        //     z: -180,

        // });
        //laser_cylinder.position.z = -20;

        //laser_returner();
        //break;
   // }

});

// startup.addEventListener("mouseup", function (e) {
//     dragAction();
// });


// $(colmiddle1).ready(function () {
//   mines_adder();
// });

//will run once the entire page is
//loaded including images and iframes
// $(colmiddle1).load(function () {
//    mines_adder();
// });

colmiddle1.querySelector("#c").addEventListener('mousemove', function mouse_moved(e) {

    //Draggable.create("#c");

    for (let index = 0; index < icosahedron_array_red.length; index++) {
        protector_group.add(icosahedron_array_red[index]);
        protector_group.add(icosahedron_array_blue[index]);
        protector_group.add(icosahedron_array_green[index]);


    }
    //mines_adder();

});


let click_counter = 0;

document.querySelector("#c").addEventListener('click', function clicked(e) {
    icosa_red_caller();
    icosa_blue_caller();
    icosa_green_caller();





    if (click_counter == 0) {
        score_update.score_update(module_score);
        onload_control();
        mine_mover_1.protector_rock_nose();

        
        mine_mover_1.new_mine_number_generator();
        click_counter += 1;
    }


    $("#trm_name").hide();
    $("#trm_login_button").hide();
    $("#name_enter").hide();
    // $("#trm_blurb").hide();


    $("#top_right_menu").hide();
    $("#top_left_menu").show();
    

});



document.querySelector("#continue1").addEventListener('click', function () {
    $("#trm_name").hide();
    $("#trm_login_button").hide();
    $("#name_enter").hide();






    pause = false;
    onload_control();
    mine_mover_1.mine_mover_1();




    gsap.to(mine_blue.scale, {
        duration: .7,
        x: 5,
        y: 5,
        z: 5
    });
    gsap.to(mine_red.scale, {
        duration: .7,
        x: 5,
        y: 5,
        z: 5
    });
    gsap.to(mine_green.scale, {
        duration: .7,
        x: 5,
        y: 5,
        z: 5
    });






    // onload_control();
    // mine_mover_2();
});


// document.querySelector("#continue1").addEventListener("keydown", function (e) {


//     $("#trm_name").hide();
//     $("#trm_login_button").hide();
//     $("#name_enter").hide();




// });







document.querySelector("#stop1").addEventListener('click', function () {




    gsap.to([
        left_front_engine_light_1.material.color,
        left_front_engine_light_2.material.color,
        left_front_engine_light_3.material.color,
        left_front_engine_light_4.material.color,
        left_front_engine_light_5.material.color,
        left_front_engine_light_6.material.color,
        left_front_engine_light_7.material.color,
        left_front_engine_light_8.material.color,

        right_front_engine_light_1.material.color,
        right_front_engine_light_2.material.color,
        right_front_engine_light_3.material.color,
        right_front_engine_light_4.material.color,
        right_front_engine_light_5.material.color,
        right_front_engine_light_6.material.color,
        right_front_engine_light_7.material.color,
        right_front_engine_light_8.material.color,

        left_rear_engine_light_1.material.color,
        left_rear_engine_light_2.material.color,
        left_rear_engine_light_3.material.color,
        left_rear_engine_light_4.material.color,

        right_rear_engine_light_1.material.color,
        right_rear_engine_light_2.material.color,
        right_rear_engine_light_3.material.color,
        right_rear_engine_light_4.material.color,




    ],
        //0.6,
        {
            r: blackColor.r,
            g: blackColor.g,
            b: blackColor.b,
            //ease: "elastic",
            stagger: 0.1,
        });




    if (!$("#trm_name").val()) {
        $("#trm_name").show();
        $("#trm_login_button").show();
        $("#name_enter").show();
    }

    pause = true;

    // gsap.to(mine_blue.scale, {
    //     duration: .7,
    //     x: 0.2,
    //     y: 0.2,
    //     z: 0.2
    // });
    // gsap.to(mine_red.scale, {
    //     duration: .7,
    //     x: 0.2,
    //     y: 0.2,
    //     z: 0.2
    // });
    // gsap.to(mine_green.scale, {
    //     duration: .7,
    //     x: 0.2,
    //     y: 0.2,
    //     z: 0.2
    // });



});
document.querySelector("#reset1").addEventListener('click', function () {

    history.go(0);


});


render();










