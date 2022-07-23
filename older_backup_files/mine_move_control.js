import * as THREE from 'https://cdn.skypack.dev/three@0.120.0'

import { DragControls } from
    'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/DragControls.js';


import {
    scene,
    renderer,
    camera,

    pause,
    //damageTexture,

} from './GQ_level_one_module.js';







import {
    mines_array,
    protector_group,

} from './gltf_loading_script.js';


import {
    mines_i,
    mine_mover_1,
    module_score,
} from './mine_mover_1.js';

import {
    boxhelper, hull_and_tail, right_engine, right_engine_light, left_engine,
    left_wing,
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
    protector_cylinders,
    //mines_array, mine_red, mine_blue, mine_green

} from './gltf_loading_script.js';

import {
    score_update,
} from './score_update.js';





export {

    pause,

    mine_move_control,
    blackColor,
    standardColor,
    blue_engine_color,
    




}


// mine move control function area begins .....................................................
let mine_move_control_counter = 0;
var standardColor = new THREE.Color(0xFFFFFF);
var blackColor = new THREE.Color(0x000000);
var blue_engine_color = new THREE.Color(0x09E0FE);
const texloader = new THREE.TextureLoader();

var mine_move_control = () => {
    mine_move_control_counter += 1;

    


    score_update(module_score);

    
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
        mine_mover_1();
        return;

    } else {


        mines_array[mines_i].position.z = -20;


        mine_mover_1();
        return;


    }
}

