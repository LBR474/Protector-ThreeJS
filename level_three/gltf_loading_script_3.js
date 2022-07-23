
import * as THREE from 'https://cdn.skypack.dev/three@0.120.0'


import {
    GLTFLoader
} from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/loaders/GLTFLoader.js';
//import * as tweenMax from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js';

//import { scene } from './GQ_level_two_module.js';
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
    blue_mines_array,
    blue_mines_array_2,
    green_mines_array,
    green_mines_array_2,
    red_mines_array,
    red_mines_array_2,
    mines_boxes_array,
    mine_red,
    mine_blue,
    mine_green,
    number_of_mines


};


const texloader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

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
//let helper;

let number_of_mines = 40;

const red_mines_array = [];
const red_mines_array_2 = [];


//let bbox2 = new THREE.Box3().setFromObject(blue_mines_array[5]);

//var helper = new THREE.Box3Helper();
//var helper2 = new THREE.Box3Helper(bbox2, 0xff0000);




for (let index = 0; index < number_of_mines; index++) {
    gltfLoader.load(
        // resource URL
        './tothian_mine_extra_red_small.glb',
        // called when the resource is loaded
        function (gltf) {



            mine_red = gltf.scene;
            mine_red.position.x = index;
            mine_red.position.z = -90;
            mine_red.scale.x = 5;
            mine_red.scale.y = 5;
            mine_red.scale.z = 5;


            mine_red.name = 'red' + index;


            red_mines_array.push(mine_red);
            mines_array.push(mine_red);

            //scene.add(mine_red);


        },


    );
}
for (let index = 0; index < number_of_mines; index++) {
    gltfLoader.load(
        // resource URL
        './tothian_mine_extra_red_small.glb',
        // called when the resource is loaded
        function (gltf) {



            mine_red = gltf.scene;
            mine_red.position.x = index;
            mine_red.position.z = -90;
            mine_red.scale.x = 5;
            mine_red.scale.y = 5;
            mine_red.scale.z = 5;


            mine_red.name = 'red' + index;


            red_mines_array_2.push(mine_red);
            mines_array.push(mine_red);

            //scene.add(mine_red);


        },


    );
}




// blue mine area begins .....................................................

let mine_blue;
let blue_mines_array = [];
let blue_mines_array_2 = [];
for (let index = 0; index < number_of_mines; index++) {
    gltfLoader.load(
        // resource URL
        './tothian_mine_blue_small.glb',
        // called when the resource is loaded
        function (gltf) {
            mine_blue = gltf.scene;
            mines_array.push(mine_blue);
            mine_blue.scale.x = 5;
            mine_blue.scale.y = 5;
            mine_blue.scale.z = 5;
            mine_blue.position.z = -90;

            mine_blue.name = 'blue' + index;
            blue_mines_array.push(mine_blue);
            ///mines_array.push(mine_blue);
            //scene.add(gltf.scene);



        },


    );
}

for (let index = 0; index < number_of_mines; index++) {
    gltfLoader.load(
        // resource URL
        './tothian_mine_blue_small.glb',
        // called when the resource is loaded
        function (gltf) {
            mine_blue = gltf.scene;
            mines_array.push(mine_blue);
            mine_blue.scale.x = 5;
            mine_blue.scale.y = 5;
            mine_blue.scale.z = 5;
            mine_blue.position.z = -90;

            mine_blue.name = 'blue' + index;
            blue_mines_array_2.push(mine_blue);
            ///mines_array.push(mine_blue);
            //scene.add(gltf.scene);



        },


    );
}


// green mine area begins .....................................................
let mine_green;
let green_mines_array = [];
let green_mines_array_2 = [];
for (let index = 0; index < number_of_mines; index++) {
    gltfLoader.load(
        // resource URL
        './tothian_mine_green_small.glb',
        // called when the resource is loaded
        function (gltf) {
            mine_green = gltf.scene;
            mines_array.push(mine_green);
            mine_green.scale.x = 5;
            mine_green.scale.y = 5;
            mine_green.scale.z = 5;
            mine_green.position.z = -90;
            mine_green.name = 'green' + index;
            green_mines_array.push(mine_green);
            //green_mines_array_2.push(mine_green);
            //mines_array.push(mine_green);


        },


    );


}

for (let index = 0; index < number_of_mines; index++) {
    gltfLoader.load(
        // resource URL
        './tothian_mine_green_small.glb',
        // called when the resource is loaded
        function (gltf) {
            mine_green = gltf.scene;
            mines_array.push(mine_green);
            mine_green.scale.x = 5;
            mine_green.scale.y = 5;
            mine_green.scale.z = 5;
            mine_green.position.z = -90;
            mine_green.name = 'green' + index;
            //green_mines_array.push(mine_green);
            green_mines_array_2.push(mine_green);
            //mines_array.push(mine_green);


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





// export { protector_group, mines_array, mine_red, mine_blue, mine_green };


