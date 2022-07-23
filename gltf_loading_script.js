
import * as THREE from 'https://cdn.skypack.dev/three@0.120.0'


import {
    GLTFLoader
} from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/loaders/GLTFLoader.js';
//import * as tweenMax from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js';

import { scene } from './GQ_level_one_module.js';
export {
    boxhelper,
    //helper,
    left_wing_box,
    left_front_engine_box,
    right_wing_box,
    right_front_engine_box,
    Cylinder_0_box,
    //mine_box,

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
    // blue_mines_array,
    // blue_mines_array_2,
    // green_mines_array,
    // green_mines_array_2,
    // red_mines_array,
    // red_mines_array_2,
    mines_boxes_array,
    mine_red,
    mine_blue,
    mine_green,
    number_of_mines


};


const texloader = new THREE.TextureLoader();
const floating_mine_green = texloader.load('./images/nx.png');
const gltfLoader = new GLTFLoader();
const minesgltfLoader = new GLTFLoader();

let protector_group = new THREE.Group();
//let scene = new THREE.Scene();

let protector;
const protector_cylinders = [];





let hull_and_tail,
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

    left_rear_engine_light_1,
    left_rear_engine_light_2,
    left_rear_engine_light_3,
    left_rear_engine_light_4,

    right_rear_engine_light_1,
    right_rear_engine_light_2,
    right_rear_engine_light_3,
    right_rear_engine_light_4,

    right_front_engine_light_1,
    right_front_engine_light_2,
    right_front_engine_light_3,
    right_front_engine_light_4,
    right_front_engine_light_5,
    right_front_engine_light_6,
    right_front_engine_light_7,
    right_front_engine_light_8,

    right_engine,
    right_front_engine,
    right_engine_light,
    left_wing,
    right_wing,
    nose_cone,
    boxhelper,
    left_wing_box,
    left_front_engine_box,
    right_wing_box,
    right_front_engine_box,
    Cylinder_0,
    Cylinder_0_box
    ;

gltfLoader.load(
    // resource URL
    //'nsea_protector_4.glb',
    './nsea_protector_hull_base_10.glb',
    // called when the resource is loaded
    function (gltf) {
        protector = gltf.scene;



        nose_cone = protector.getObjectByName('nose_cone');
        hull_and_tail = protector.getObjectByName('hull');
        Cylinder_0 = protector.getObjectByName('Cylinder_1');
        left_engine = protector.getObjectByName('left_engine_cube');
        left_front_engine_light_1 = protector.getObjectByName('left_front_engine_light_1');
        left_front_engine_light_2 = protector.getObjectByName('left_front_engine_light_2');
        left_front_engine_light_3 = protector.getObjectByName('left_front_engine_light_3');
        left_front_engine_light_4 = protector.getObjectByName('left_front_engine_light_4');
        left_front_engine_light_5 = protector.getObjectByName('left_front_engine_light_5');
        left_front_engine_light_6 = protector.getObjectByName('left_front_engine_light_6');
        left_front_engine_light_7 = protector.getObjectByName('left_front_engine_light_7');
        left_front_engine_light_8 = protector.getObjectByName('left_front_engine_light_8');

        right_engine = protector.getObjectByName('right_engine_cube');
        right_front_engine_light_1 = protector.getObjectByName('right_front_engine_light_1');
        right_front_engine_light_2 = protector.getObjectByName('right_front_engine_light_2');
        right_front_engine_light_3 = protector.getObjectByName('right_front_engine_light_3');
        right_front_engine_light_4 = protector.getObjectByName('right_front_engine_light_4');
        right_front_engine_light_5 = protector.getObjectByName('right_front_engine_light_5');
        right_front_engine_light_6 = protector.getObjectByName('right_front_engine_light_6');
        right_front_engine_light_7 = protector.getObjectByName('right_front_engine_light_7');
        right_front_engine_light_8 = protector.getObjectByName('right_front_engine_light_8');


        left_rear_engine_light_1
            = protector.getObjectByName('left_rear_engine_light_one');
        left_rear_engine_light_2
            = protector.getObjectByName('left_rear_engine_light_two');
        left_rear_engine_light_3
            = protector.getObjectByName('left_rear_engine_light_three');
        left_rear_engine_light_4
            = protector.getObjectByName('left_rear_engine_light_four');

        right_rear_engine_light_1
            = protector.getObjectByName('right_rear_engine_light_one');
        right_rear_engine_light_2
            = protector.getObjectByName('right_rear_engine_light_two');
        right_rear_engine_light_3
            = protector.getObjectByName('right_rear_engine_light_three');
        right_rear_engine_light_4
            = protector.getObjectByName('right_rear_engine_light_four');


        left_front_engine = protector.getObjectByName('left_front_engine');
        right_front_engine = protector.getObjectByName('right_front_engine');

        left_wing = protector.getObjectByName('left_wing');
        right_wing = protector.getObjectByName('right_wing');
        protector_cylinders.push(protector, hull_and_tail, Cylinder_0);

        //console.log(dumpObject(gltf.scene).join('\n'));
        // console.log(Cylinder_0);
        //console.log(protector.children[24]);

        boxhelper = new THREE.BoxHelper(nose_cone, 0xffff00);
        left_wing_box = new THREE.BoxHelper(left_wing, 0xff0000);
        left_front_engine_box = new THREE.BoxHelper(left_front_engine, 0x00FF00);
        right_wing_box = new THREE.BoxHelper(right_wing, 0xff0000);
        right_front_engine_box = new THREE.BoxHelper(right_front_engine, 0x00FF00);
        Cylinder_0_box = new THREE.BoxHelper(Cylinder_0, 0x76FF00);





        //scene.add(gltf.scene);




    },


);

function dumpObject(obj, lines = [], isLast = true, prefix = '') {
    const localPrefix = isLast ? '└─' : '├─';
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child, ndx) => {
        const isLast = ndx === lastNdx;
        dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
}



// red mine area begins .....................................................
let mine_red;
const mines_array = [];
const mines_boxes_array = [];

let mine_blue;
let blue_mines_array = [];
let blue_mines_array_2 = [];


let mine_green;
let green_mines_array = [];
let green_mines_array_2 = [];


//let helper;

let number_of_mines = 15;

const red_mines_array = [];
const red_mines_array_2 = [];



const S_geometry = new THREE.SphereGeometry(0.1, 32, 16);
const S_material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

let sphere_array = []

for (let index = 0; index < number_of_mines * 3; index++) {
   
    const sphere = new THREE.Mesh(S_geometry, S_material);
    sphere_array.push(sphere)
    sphere.name = "LOaded sphere" + index
    
}


for (let index = 0; index < number_of_mines; index++) {
    

    minesgltfLoader.load(
        // resource URL
        ('./tmRs.glb'),
        // called when the resource is loaded
        function (gltf) {
            mine_red = gltf.scene;
            
            mine_red.name = "red" + index

            mine_red.add(sphere_array[index])
           
            mines_array.push(mine_red);
            
            scene.add(mine_red)
            
            mine_red.position.x = index - 7.5
            mine_red.position.y = 0
            mine_red.position.z = -40


            mine_red.scale.x = 5
            mine_red.scale.y = 5
            mine_red.scale.z = 5
            
            if (index < 5) {
                //console.log(sphere)
            }
        },
    );
}

// green mine area begins .....................................................



for (let index = number_of_mines ; index < number_of_mines * 2; index++) {

    minesgltfLoader.load(
        // resource URL
        ('./tmGs.glb'),
        // called when the resource is loaded
        function (gltf) {
            mine_green = gltf.scene;

            mine_green.name = "green" + index

            mine_green.add(sphere_array[index])

            mines_array.push(mine_green);

            scene.add(mine_green)

            mine_green.position.x = index - number_of_mines - 7.5
            mine_green.position.y = 1
            mine_green.position.z = -40


            mine_green.scale.x = 5
            mine_green.scale.y = 5
            mine_green.scale.z = 5
            // if ( index == 5) {
            //     console.log(mine_green)
            // }
            
        },
    );
}

// blue mine area begins .....................................................

for (let index = number_of_mines * 2; index < number_of_mines * 3; index++) {

    minesgltfLoader.load(
        // resource URL
        ('./tmBs.glb'),
        // called when the resource is loaded
        function (gltf) {
            mine_blue = gltf.scene;

            mine_blue.name = "blue" + index

            mine_blue.add(sphere_array[index])

            mines_array.push(mine_blue);

            scene.add(mine_blue)

            if (index == 37){
                console.log(mine_blue)
            }

            mine_blue.position.x = index - number_of_mines * 2 - 7.5
            mine_blue.position.y = -1
            mine_blue.position.z = -40

            mine_blue.scale.x = 5
            mine_blue.scale.y = 5
            mine_blue.scale.z = 5
        },
    );


}













const manager = new THREE.LoadingManager();
manager.onLoad = init;
const progressbarElem = document.querySelector('#progressbar');
manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    progressbarElem.style.width = `${itemsLoaded / itemsTotal * 100 | 0}%`;
};
const models = {
    pig: { url: './nsea_protector_hull_base_10.glb' },

};
{
    //const gltfLoader = new GLTFLoader(manager);
    for (const model of Object.values(models)) {
        gltfLoader.load(model.url, (gltf) => {
            model.gltf = gltf;
        });
    }
}

function init() {
    // hide the loading bar
    const loadingElem = document.querySelector('#loading');
    loadingElem.style.display = 'none';


}







