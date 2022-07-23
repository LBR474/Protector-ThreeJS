
import * as THREE from 'https://cdn.skypack.dev/three@0.120.0'


// import {
//     OrbitControls
// } from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/controls/OrbitControls.js';

import { DragControls } from
    'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/DragControls.js';


// import {
//     exp_cube,
//     exp_cube_geometry,
//     exp_cube_array,
//     makeInstanceRed
// } from './exp_cube.js';



import {
    make_Icosa_instance_red,
    make_Icosa_instance_blue,
    make_Icosa_instance_green,
    icosahedron_array_red,
    icosahedron_array_blue,
    icosahedron_array_green
} from './icosa_hedron.js';

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
    Cylinder_0_box

} from './gltf_loading_script.js';

import {
    mine_move_control,
    blackColor,
    standardColor,
    blue_engine_color,
    
} from './mine_move_control.js';
import {
    y_pos,
    z_pos,
} from './mine_mover_1.js';




export {
    scene,
    renderer,
    camera,
    pause,
    num_cubes_and_isos,
    cubes

};


const scene = new THREE.Scene();


const texloader = new THREE.TextureLoader();
const bgTexture = texloader.load('./images/extra_stars_pic.png');

//scene.background = bgTexture;

//scene.background = new THREE.Color('white');


// background scene and camera area begins .................................................


// Create your background scene
var backgroundScene = new THREE.Scene();
const backgroundCamera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.01, 100);
backgroundScene.add(backgroundCamera);
backgroundScene.background = bgTexture;




// front scene camera area begins .....................................................
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.01, 100);


backgroundCamera.position.z = 7;
backgroundCamera.position.y = 1;

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

icosa_red_caller();
icosa_blue_caller();
icosa_green_caller();


// points array area begins ................................................................
const colorArray = [new THREE.Color(0xFFFFFF), new THREE.Color(0xFFFFFF),
new THREE.Color(0xFFFFFF)];
const positions = [];
const colors = [];

for (let i = 0; i < 300; i++) {

    positions.push((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50);

    const clr = colorArray[Math.floor(Math.random() * colorArray.length)];

    colors.push(clr.r, clr.g, clr.b);

}

const particles_geometry = new THREE.BufferGeometry();
particles_geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
particles_geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const particles_material = new THREE.PointsMaterial({
    size: 3, vertexColors: true, depthTest: false, sizeAttenuation: false
});

const particlesMesh = new THREE.Points(particles_geometry, particles_material);



backgroundScene.add(particlesMesh);
const boxmaterial = new THREE.MeshBasicMaterial({ color: 'black' });
const boxmat_array = [];
for (let index = 0; index < 9; index++) {
    boxmat_array[index] = new THREE.MeshBasicMaterial({ color: 'black' });
    
}

const whiteColor = new THREE.MeshBasicMaterial({ color: 'white' });
const whiteColor1 = new THREE.MeshBasicMaterial({ color: 'white' });

// const WFgeometry = new THREE.SphereGeometry(1, 1, 1);

// const wireframe = new THREE.WireframeGeometry(WFgeometry);

// const line = new THREE.LineSegments(wireframe);
// line.material.depthTest = false;
// line.material.opacity = 0.25;
// line.material.transparent = true;

// //scene.add(line);

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
        opacity: 1,
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
cubes.forEach((c) => scene.add(c))

// const buffer_geometry = new THREE.BufferGeometry(); 
// // create a simple square shape. We duplicate the top left and bottom right 
// // vertices because each vertex needs to appear once per triangle. 
// const vertices = new Float32Array( [ -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 ] ); 
// // itemSize = 3 because there are 3 values (components) per vertex geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) ); 
// const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); 
// const cubes = new THREE.Mesh( geometry, material );
// //scene.add(cubes);

const controls = new DragControls(cubes, camera, renderer.domElement);

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



// render area begins .....................................................

var clock = new THREE.Clock();
let render_counter = 0;
let protector_counter = 0;
let protector_group_counter = 0;


   




function render() {
    
    if (protector_group && render_counter > 20) {
        cubes[0].add(protector_group);
        //cubes[0].add(cubes[1]);
        //line.add(protector_group);
        //console.log(render_counter)
    }

    if (resizeRendererToDisplaySize(renderer)) {
        //const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        //controls.update();
    }




    render_counter += 1;




    if (protector_counter == 0) {

    protector_group_adder();
    }



    const loadingElem = document.querySelector('#loading');



    particlesMesh.rotation.x += 0.00011;


    const protector_returner = () => {

        if (protector && bgTexture) {
            
            protector_counter += 1;

            loadingElem.style.display = 'none';
            scene.add(protector);

            return protector_returner;

        }
        // else {
        //     console.log("protector not loaded yet");
        // }
    };

    if (protector_counter == 0) {
        protector_returner();
    }

    renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene, backgroundCamera);
    renderer.render(scene, camera);
    //cube.color.setHex(00, 00, FF);

    requestAnimationFrame(render);
    
}

function protector_group_adder() {
    
    if (hull_and_tail) {
        protector_group_counter += 1;
        protector_group.add(
            nose_cone,
            // boxhelper,
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
        protector_group.position.z = 0;

        scene.add(protector_group);
       
        //console.log(protector);
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









// // query selector area begins .....................................................
var startup = document.getElementById("c");
//startup.addEventListener("keydown", function (e) {










// startup.addEventListener("keydown", function (e) {
   




//     // if (click_counter == 0) {

//     if (e.keyCode == 37 || e.keyCode == 100) {
//         // move left

//         protector_group.position.x -= 1;

//     } else if (e.keyCode == 39 || e.keyCode == 102) {
//         // move right
//         protector_group.position.x += 1;

//         // camera.lookAt(camera.position.x, 0, 0);
//     } else if (e.keyCode == 38 || e.keyCode == 104) {
//         //move up
//         protector_group.position.y += 1;

//     } else if (e.keyCode == 40 || e.keyCode == 98) {
//         //move down
//         protector_group.position.y -= 1;

//     } else if (e.keyCode == 103 || e.keyCode == 36) {
//         // move diagonal left and up
//         protector_group.position.x -= 1;
//         protector_group.position.y += 1;

//     } else if (e.keyCode == 97 || e.keyCode == 35) {
//         // move diagonal left and down
//         protector_group.position.x -= 1;
//         protector_group.position.y -= 1;

//     } else if (e.keyCode == 105 || e.keyCode == 33) {
//         // move diagonal right and up
//         protector_group.position.x += 1;
//         protector_group.position.y += 1;

//     } else if (e.keyCode == 99 || e.keyCode == 34) {
//         // move diagonal right and down
//         protector_group.position.x += 1;
//         protector_group.position.y -= 1;

//     }


// });

colmiddle1.querySelector("#c").addEventListener('mousemove', function mouse_moved(e) {



    for (let index = 0; index < icosahedron_array_red.length; index++) {
        protector_group.add(icosahedron_array_red[index]);
        protector_group.add(icosahedron_array_blue[index]);
        protector_group.add(icosahedron_array_green[index]);
       

    }

    // scene.add(protector_group);
});


let click_counter = 0;

document.querySelector("#c").addEventListener('click', function clicked(e) {
    // if (mine_move_control_2_counter > 0 && mine_move_control_2_counter < 3) {
    gsap.from(
        protector_group.rotation, 1.3,


        {
            x: -Math.PI / 48,

            ease: "bounce.out",
        },

    );


    if (click_counter == 0) {
        mine_move_control();
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





    var z_pos_when_stopped = z_pos;
    var y_pos_when_stopped = y_pos;
    pause = false;




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






    mine_move_control();

});


document.querySelector("#continue1").addEventListener("keydown", function (e) {


    $("#trm_name").hide();
    $("#trm_login_button").hide();
    $("#name_enter").hide();


    // if (e.keyCode == 37 || e.keyCode == 100) {
    //     // move left

    //     protector_group.position.x -= 1;

    // } else if (e.keyCode == 39 || e.keyCode == 102) {
    //     // move right
    //     protector_group.position.x += 1;

    //     // camera.lookAt(camera.position.x, 0, 0);
    // } else if (e.keyCode == 38 || e.keyCode == 104) {
    //     //move up
    //     protector_group.position.y += 1;

    // } else if (e.keyCode == 40 || e.keyCode == 98) {
    //     //move down
    //     protector_group.position.y -= 1;

    // } else if (e.keyCode == 103 || e.keyCode == 36) {
    //     // move diagonal left and up
    //     protector_group.position.x -= 1;
    //     protector_group.position.y += 1;

    // } else if (e.keyCode == 97 || e.keyCode == 35) {
    //     // move diagonal left and down
    //     protector_group.position.x -= 1;
    //     protector_group.position.y -= 1;

    // } else if (e.keyCode == 105 || e.keyCode == 33) {
    //     // move diagonal right and up
    //     protector_group.position.x += 1;
    //     protector_group.position.y += 1;

    // } else if (e.keyCode == 99 || e.keyCode == 34) {
    //     // move diagonal right and down
    //     protector_group.position.x += 1;
    //     protector_group.position.y -= 1;

    // }


});







document.querySelector("#stop1").addEventListener('click', function () {


  
        // left_front_engine_light_1.traverse((o) => {

        //     if (o.isMesh) {

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

    gsap.to(mine_blue.scale, {
        duration: .7,
        x: 0.2,
        y: 0.2,
        z: 0.2
    });
    gsap.to(mine_red.scale, {
        duration: .7,
        x: 0.2,
        y: 0.2,
        z: 0.2
    });
    gsap.to(mine_green.scale, {
        duration: .7,
        x: 0.2,
        y: 0.2,
        z: 0.2
    });



});
document.querySelector("#reset1").addEventListener('click', function () {

    history.go(0);


});


render();










