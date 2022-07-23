
import * as THREE from 'https://cdn.skypack.dev/three@0.120.0'



import * as torus_loads from '../torus.js';

import * as icosa_loads from '../icosa_hedron.js';

import * as gltf_loads from '../gltf_loading_script.js';

import * as score_update from '../score_update.js';
//import { } from './_____.js';
import * as mine_mover_functions from './mine_mover_3.js';

import * as exp_func from '../explosion_functions.js';





export {
    scene,
    backgroundScene,
    renderer,
    camera,
    pause,
    num_cubes_and_isos,
    //cubes,
    dragAction,
    blue_engine_color,

};


const scene = new THREE.Scene();


const texloader = new THREE.TextureLoader();
const bgTexture = texloader.load('../images/another_star_pic.png');
//const bgTexture = texloader.load('./images/space_pic.jpg');
const floating_mine_green = texloader.load('../images/nx.png');
const floating_mine_blue = texloader.load('../images/tothian_mine_blue_big_2D_1.png');
const floating_mine_red = texloader.load('../images/tothian_mine_red_big_2D_1.png');


//scene.background = bgTexture;

const background_color = new THREE.Color(0x05014a);



// // background scene and camera area begins .................................................


// Create your background scene
var backgroundScene = new THREE.Scene();
const backgroundCamera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.01, 100);
backgroundScene.add(backgroundCamera);
backgroundScene.background = bgTexture;
//backgroundScene.background = background_color;




// // front scene camera area begins .....................................................
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.01, 100);


backgroundCamera.position.z = 7;
backgroundCamera.position.y = 3;

camera.position.z = 7;
camera.position.y = 1;



scene.add(camera);



// // lights area begins .....................................................

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



// // canvas area begins .....................................................

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});


// // controls area begins .....................................................

//const controls = new OrbitControls(camera, canvas);

//controls.target.set(0, 1, 0);
//controls.passive = true;
//controls.update();



// // global variable area begins .....................................................

let pause = false;
let num_cubes_and_isos = 50;

icosa_red_caller();
icosa_blue_caller();
icosa_green_caller();


// // points array area begins ................................................................
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
    //map: floating_mine_green,
});
const particles_material_2 = new THREE.PointsMaterial({
    size: 3, vertexColors: true, depthTest: false, sizeAttenuation: false,
    //map: floating_mine_blue,
});
const particles_material_3 = new THREE.PointsMaterial({
    size: 3, vertexColors: true, depthTest: false, sizeAttenuation: false,
    //map: floating_mine_red,
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




function icosa_green_caller() {
    for (let index = 0; index < num_cubes_and_isos; index++) {
        icosa_loads.make_Icosa_instance_green();

    }
}

function icosa_blue_caller() {
    for (let index = 0; index < num_cubes_and_isos; index++) {
        icosa_loads.make_Icosa_instance_blue();

    }
}

function icosa_red_caller() {
    for (let index = 0; index < num_cubes_and_isos; index++) {
        icosa_loads.make_Icosa_instance_red();

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
        minX: -150,
        maxX: 150,
        minY: -100,
        maxY: 75,


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



    gltf_loads.protector_group.position.y = meshY * scale;
    gltf_loads.protector_group.position.x = meshX * scale;


}


// // render area begins .....................................................

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

    if (protector_counter == 0 && gltf_loads.protector) {
        protector_returner();
    }


    if (
        render_counter > 10 &&
        render_counter < 30 &&
        loadingElem.style.display == 'none') {

        mines_adder();
        protector_group_adder();
    }


    particlesMesh.rotation.y += 0.0011;
    // particlesMesh_2.rotation.y += 0.0011;
    // particlesMesh_3.rotation.z += 0.0011;

    gltf_loads.red_mines_array.forEach(element => {
        element.rotation.y += 0.1;
    });
    gltf_loads.red_mines_array_2.forEach(element => {
        element.rotation.y += 0.1;
    });
    gltf_loads.blue_mines_array.forEach(element => {
        element.rotation.x += 0.1;
    });
    gltf_loads.blue_mines_array_2.forEach(element => {
        element.rotation.x += 0.1;
    });
    gltf_loads.green_mines_array.forEach(element => {
        element.rotation.z += 0.1;
    });
    gltf_loads.green_mines_array_2.forEach(element => {
        element.rotation.z += 0.1;
    });

    renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene, backgroundCamera);
    renderer.render(scene, camera);


    requestAnimationFrame(render);

}

const protector_returner = () => {


    protector_counter += 1;

    loadingElem.style.display = 'none';
    scene.add(gltf_loads.protector);
    //protector.position.y = 0;

    return protector_returner;

};

let mines_adder = () => {
let mine_locator = 1;

    gltf_loads.red_mines_array.forEach((element, ndx) => {

        scene.add(element);
        element.position.x =
            (ndx * mine_locator);
        // - (green_mines_array.length * 0.5);

        // element.position.y = Math.random() * 25;
        element.position.y = 0;


    });
    gltf_loads.red_mines_array_2.forEach((element, ndx) => {

        scene.add(element);
        element.position.x =
            (ndx * mine_locator) - (gltf_loads.red_mines_array.length * mine_locator);

        element.position.y = 0;


    });

    gltf_loads.blue_mines_array.forEach((element, ndx) => {

        scene.add(element);
        element.position.x =
            (ndx * mine_locator);
        // - (green_mines_array.length * 0.5);

        element.position.y = 3.5;



    });
    gltf_loads.blue_mines_array_2.forEach((element, ndx) => {

        scene.add(element);

        element.position.x =
            (ndx * mine_locator) - (gltf_loads.blue_mines_array.length * mine_locator);
        element.position.y = 3.5;



    });
    gltf_loads.green_mines_array.forEach((element, ndx) => {

        scene.add(element);
        element.position.x =
            (ndx * mine_locator);
        // - (green_mines_array.length * 0.5);

        element.position.y = -3.5;


    });
    gltf_loads.green_mines_array_2.forEach((element, ndx) => {

        scene.add(element);
        element.position.x =
            (ndx * mine_locator) - (gltf_loads.green_mines_array.length * mine_locator);
        element.position.y = -3.5;



    });

}




function protector_group_adder() {

    if (gltf_loads.hull_and_tail) {
        protector_group_counter += 1;
        gltf_loads.protector_group.add(
            gltf_loads.nose_cone,
            //laser_group,
            //boxhelper,
            //left_wing_box,
            // left_front_engine_box,
            //right_wing_box,
            //gltf_loads.right_front_engine_box,
            //Cylinder_0_box,
            gltf_loads.hull_and_tail,


            gltf_loads.left_front_engine_light_1,
            gltf_loads.left_front_engine_light_2,
            gltf_loads.left_front_engine_light_3,
            gltf_loads.left_front_engine_light_4,
            gltf_loads.left_front_engine_light_5,
            gltf_loads.left_front_engine_light_6,
            gltf_loads.left_front_engine_light_7,
            gltf_loads.left_front_engine_light_8,



            gltf_loads.right_front_engine_light_1,
            gltf_loads.right_front_engine_light_2,
            gltf_loads.right_front_engine_light_3,
            gltf_loads.right_front_engine_light_4,
            gltf_loads.right_front_engine_light_5,
            gltf_loads.right_front_engine_light_6,
            gltf_loads.right_front_engine_light_7,
            gltf_loads.right_front_engine_light_8,

            gltf_loads.left_rear_engine_light_1,
            gltf_loads.left_rear_engine_light_2,
            gltf_loads.left_rear_engine_light_3,
            gltf_loads.left_rear_engine_light_4,

            gltf_loads.right_rear_engine_light_1,
            gltf_loads.right_rear_engine_light_2,
            gltf_loads.right_rear_engine_light_3,
            gltf_loads.right_rear_engine_light_4,


            gltf_loads.right_engine,
            gltf_loads.left_engine,
            gltf_loads.left_front_engine,
            gltf_loads.left_wing,
            gltf_loads.right_front_engine,
            gltf_loads.right_wing


        );
        //protector_group.rotation.y = -Math.PI / 2;
        gltf_loads.protector_group.rotation.y = 0;
        gltf_loads.protector_group.position.y = 0;
        // protector_group.position.z = 0;

        scene.add(gltf_loads.protector_group);

        //scene.add(boxhelper);
        gltf_loads.left_front_engine_light_1.material = boxmat_array[0];
        gltf_loads.left_front_engine_light_2.material = boxmat_array[1];
        gltf_loads.left_front_engine_light_3.material = boxmat_array[2];
        gltf_loads.left_front_engine_light_4.material = boxmat_array[3];
        gltf_loads.left_front_engine_light_5.material = boxmat_array[4];
        gltf_loads.left_front_engine_light_6.material = boxmat_array[5];
        gltf_loads.left_front_engine_light_7.material = boxmat_array[6];
        gltf_loads.left_front_engine_light_8.material = boxmat_array[7];



        gltf_loads.right_front_engine_light_1.material = boxmat_array[0];
        gltf_loads.right_front_engine_light_2.material = boxmat_array[1];
        gltf_loads.right_front_engine_light_3.material = boxmat_array[2];
        gltf_loads.right_front_engine_light_4.material = boxmat_array[3];
        gltf_loads.right_front_engine_light_5.material = boxmat_array[4];
        gltf_loads.right_front_engine_light_6.material = boxmat_array[5];
        gltf_loads.right_front_engine_light_7.material = boxmat_array[6];
        gltf_loads.right_front_engine_light_8.material = boxmat_array[7];



        gltf_loads.left_rear_engine_light_1.material = boxmat_array[0];
        gltf_loads.left_rear_engine_light_2.material = boxmat_array[1];
        gltf_loads.left_rear_engine_light_3.material = boxmat_array[2];
        gltf_loads.left_rear_engine_light_4.material = boxmat_array[3];

        gltf_loads.right_rear_engine_light_1.material = boxmat_array[0];
        gltf_loads.right_rear_engine_light_2.material = boxmat_array[1];
        gltf_loads.right_rear_engine_light_3.material = boxmat_array[2];
        gltf_loads.right_rear_engine_light_4.material = boxmat_array[3];


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



// // onload control area begins .......................................................................................................................................
var blue_engine_color = new THREE.Color(0x09E0FE);
var standardColor = new THREE.Color(0xFFFFFF);
var blackColor = new THREE.Color(0x000000);
let engine_color_control_counter = 0;


var engine_color_control = () => {




    // if (engine_color_control_counter == 0) {






    //score_update(module_score);


    gsap.to([
        gltf_loads.left_front_engine_light_1.material.color,
        gltf_loads.left_front_engine_light_2.material.color,
        gltf_loads.left_front_engine_light_3.material.color,
        gltf_loads.left_front_engine_light_4.material.color,
        gltf_loads.left_front_engine_light_5.material.color,
        gltf_loads.left_front_engine_light_6.material.color,
        gltf_loads.left_front_engine_light_7.material.color,
        gltf_loads.left_front_engine_light_8.material.color,

        gltf_loads.right_front_engine_light_1.material.color,
        gltf_loads.right_front_engine_light_2.material.color,
        gltf_loads.right_front_engine_light_3.material.color,
        gltf_loads.right_front_engine_light_4.material.color,
        gltf_loads.right_front_engine_light_5.material.color,
        gltf_loads.right_front_engine_light_6.material.color,
        gltf_loads.right_front_engine_light_7.material.color,
        gltf_loads.right_front_engine_light_8.material.color,

        gltf_loads.left_rear_engine_light_1.material.color,
        gltf_loads.left_rear_engine_light_2.material.color,
        gltf_loads.left_rear_engine_light_3.material.color,
        gltf_loads.left_rear_engine_light_4.material.color,

        gltf_loads.right_rear_engine_light_1.material.color,
        gltf_loads.right_rear_engine_light_2.material.color,
        gltf_loads.right_rear_engine_light_3.material.color,
        gltf_loads.right_rear_engine_light_4.material.color,








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



    // if (pause == true) {


    //     mines_array[mines_i].position.z = -20;
    //     gsap.to(mines_array[mines_i].scale, {
    //         duration: .7,
    //         x: 0.2,
    //         y: 0.2
    //     });

    // } 
    // // else {

    //     // mines_array.forEach(element => {
    //     //     element.position.z = -50;
    //     // });



    //     //mine_mover_2();
    //     //return;


    // }
    engine_color_control_counter += 1;
    // }




}













// // query selector area begins .....................................................

// }

let module_score = 0;


var startup = document.getElementById("c");



colmiddle1.querySelector("#c").addEventListener('mousemove', function mouse_moved(e) {


    for (let index = 0; index < icosa_loads.icosahedron_array_red.length; index++) {
        gltf_loads.protector_group.add(icosa_loads.icosahedron_array_red[index]);
        gltf_loads.protector_group.add(icosa_loads.icosahedron_array_blue[index]);
        gltf_loads.protector_group.add(icosa_loads.icosahedron_array_green[index]);


    }
    //mines_adder();

});


let click_counter = 0;

document.querySelector("#c").addEventListener('click', function clicked(e) {
    // icosa_red_caller();
    // icosa_blue_caller();
    // icosa_green_caller();





    if (click_counter == 0) {
        score_update.score_update(module_score);
        engine_color_control();
        mine_mover_functions.protector_rock_nose();


        mine_mover_functions.new_mine_number_generator();
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
    engine_color_control();
    mine_mover_functions.mine_mover_3();




    // gsap.to(mine_blue.scale, {
    //     duration: .7,
    //     x: 5,
    //     y: 5,
    //     z: 5
    // });
    // gsap.to(mine_red.scale, {
    //     duration: .7,
    //     x: 5,
    //     y: 5,
    //     z: 5
    // });
    // gsap.to(mine_green.scale, {
    //     duration: .7,
    //     x: 5,
    //     y: 5,
    //     z: 5
    // });




});










document.querySelector("#stop1").addEventListener('click', function () {




    gsap.to([
        gltf_loads.left_front_engine_light_1.material.color,
        gltf_loads.left_front_engine_light_2.material.color,
        gltf_loads.left_front_engine_light_3.material.color,
        gltf_loads.left_front_engine_light_4.material.color,
        gltf_loads.left_front_engine_light_5.material.color,
        gltf_loads.left_front_engine_light_6.material.color,
        gltf_loads.left_front_engine_light_7.material.color,
        gltf_loads.left_front_engine_light_8.material.color,

        gltf_loads.right_front_engine_light_1.material.color,
        gltf_loads.right_front_engine_light_2.material.color,
        gltf_loads.right_front_engine_light_3.material.color,
        gltf_loads.right_front_engine_light_4.material.color,
        gltf_loads.right_front_engine_light_5.material.color,
        gltf_loads.right_front_engine_light_6.material.color,
        gltf_loads.right_front_engine_light_7.material.color,
        gltf_loads.right_front_engine_light_8.material.color,

        gltf_loads.left_rear_engine_light_1.material.color,
        gltf_loads.left_rear_engine_light_2.material.color,
        gltf_loads.left_rear_engine_light_3.material.color,
        gltf_loads.left_rear_engine_light_4.material.color,

        gltf_loads.right_rear_engine_light_1.material.color,
        gltf_loads.right_rear_engine_light_2.material.color,
        gltf_loads.right_rear_engine_light_3.material.color,
        gltf_loads.right_rear_engine_light_4.material.color,




    ],
        //0.6,
        {
            r: blackColor.r,
            g: blackColor.g,
            b: blackColor.b,
            //ease: "elastic",
            stagger: 0.1,
        });




    if (sessionStorage.getItem("entered_name")) {
        if (sessionStorage.getItem("entered_name").length > 0) {
            document.querySelector("#SD_logged_in_par").innerHTML = sessionStorage.getItem("entered_name");
            $("#trm_login_button").hide();
            $("#name_enter").hide();
            $("#trm_name").hide();
        } else {
            $("#trm_name").show();
            $("#trm_login_button").show();
            $("#name_enter").show();
        }
    } else {
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










