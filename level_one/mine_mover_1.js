import * as THREE from 'https://cdn.skypack.dev/three@0.120.0'
//import { icosa_explosion_red_nose_func } from './explosion_functions.js';

import { DragControls } from
    'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/DragControls.js';

import {
    mine_red,
    red_mines_array,
    blue_mines_array,
    green_mines_array,
    nose_cone,
    protector_group,
    left_wing,
    right_wing,
    //boxhelper,




} from './gltf_loading_script_1.js'
import {
    renderer,
    scene,
    camera,
    cubes,
    backgroundScene,
    dragAction,
    blue_engine_color,

    pause
} from './GQ_level_one_module.js';

import {

    icosa_explosion_red_nose_func,
    icosa_explosion_red_wing_right_func,
    icosa_explosion_red_wing_left_func,
    icosa_explosion_blue_nose_func,
    icosa_explosion_blue_wing_right_func,
    icosa_explosion_blue_wing_left_func,

    icosa_explosion_green_nose_func,
    icosa_explosion_green_wing_right_func,
    icosa_explosion_green_wing_left_func,
} from './explosion_functions_1.js';
import { icosahedron_array_red } from './icosa_hedron_1.js';
import {
    score_update,



} from './score_update_1.js';

export {
    mine_mover_1,
    new_mine_number_generator,
    mine_number,
    protector_rock_left_wing,
    protector_rock_right_wing,
    protector_rock_nose,
    collision_count_nose,
    collision_count_wing,
    module_score,


}

let mine_number;
mine_number = (Math.random() * red_mines_array.length).toFixed(0);
let module_score = 0;
let collision_count_nose = 0;
let collision_count_wing = 0;

let mine_mover_1_counter = 0;


let mine_mover_1 = () => {
    mine_mover_1_counter += 1;

    let mineboxhelper = new THREE.BoxHelper(red_mines_array[mine_number], 0xffff00);


    let hull_box = new THREE.Box3().setFromObject(nose_cone);

    let left_wing_box = new THREE.Box3().setFromObject(left_wing);

    let right_wing_box = new THREE.Box3().setFromObject(right_wing);



    if (pause == false
        && red_mines_array[mine_number]
        && module_score <= 3000
        && (collision_count_nose + collision_count_wing <= 5)

    ) {
        let red_mine_box =
            new THREE.Box3().setFromObject(red_mines_array[mine_number]);

        let blue_mine_box =
            new THREE.Box3().setFromObject(blue_mines_array[mine_number]);

        let green_mine_box =
            new THREE.Box3().setFromObject(green_mines_array[mine_number]);

        let mines_intersects_red_nose = red_mine_box.intersectsBox(hull_box);

        let mines_intersects_blue_nose = blue_mine_box.intersectsBox(hull_box);

        let mines_intersects_green_nose = green_mine_box.intersectsBox(hull_box);


        let mines_intersects_red_left_wing = red_mine_box.intersectsBox(left_wing_box);

        let mines_intersects_blue_left_wing = blue_mine_box.intersectsBox(left_wing_box);

        let mines_intersects_green_left_wing = green_mine_box.intersectsBox(left_wing_box);


        let mines_intersects_red_right_wing = red_mine_box.intersectsBox(right_wing_box);

        let mines_intersects_blue_right_wing = blue_mine_box.intersectsBox(right_wing_box);

        let mines_intersects_green_right_wing = green_mine_box.intersectsBox(right_wing_box);




        let current_mine_position = red_mines_array[mine_number].position.x;

        if (mine_number % 3 == 0){
            //< (red_mines_array.length / 2).toFixed(0)) {
            gsap.to(
                [
                    red_mines_array[mine_number].position,
                    

                ],
                0.1,
                {
                    z: "+=3",
                    x: protector_group.position.x,
                   
                })
        } else if (mine_number % 2 == 0) {
            gsap.to(
                [
                    blue_mines_array[mine_number].position,
                ],
                0.1,
                {
                    z: "+=3.1",
                    y: protector_group.position.y,
                    
                })
        } else {
            gsap.to(
                [
                    green_mines_array[mine_number].position,
                ],
                0.1,
                {
                    z: "+=3.2",
                    y: protector_group.position.y,
                })
        }
        // } else {
        //     gsap.to(
        //         [
        //             red_mines_array[mine_number].position,
        //             red_mines_array[mine_number - 3].position,

        //         ],
        //         0.1,
        //         {
        //             z: "+=2",
        //             // y: protector_group.position.y,
        //             x: "-=0.2",
        //         })
        //     gsap.to(
        //         [
        //             blue_mines_array[mine_number].position,

        //         ],
        //         0.1,
        //         {
        //             z: "+=3.2",
        //             // y: "-=" + protector_group.position.y * 0.1,
        //             x: "-=0.2",

        //         })
        //     gsap.to(
        //         [
        //             green_mines_array[mine_number].position,
        //         ],
        //         0.1,
        //         {
        //             z: "+=3.3",
        //             // y: "+=" + protector_group.position.y * 0.1,
        //             x: "-=0.2",
        //         })
        //     console.log(protector_group.position.x);
        // }







        if (

            red_mines_array[mine_number].position.z >= 7.5
            || blue_mines_array[mine_number].position.z >= 7.5
            || green_mines_array[mine_number].position.z >= 7.5

            ) {

            module_score += 100;
            score_update();

            scene.remove(red_mines_array[mine_number]);
            red_mines_array.splice(mine_number, 1);

            scene.remove(blue_mines_array[mine_number]);
            blue_mines_array.splice(mine_number, 1);

            scene.remove(green_mines_array[mine_number]);
            green_mines_array.splice(mine_number, 1);


            new_mine_number_generator();
            return;
        }

        if (mines_intersects_red_nose) {

            icosa_explosion_red_nose_func();
            protector_rock_nose();
            module_score -= 500;
            collision_count_nose += 1;
            score_update();
            if (red_mines_array.length > 0) {
                scene.remove(red_mines_array[mine_number]);
                red_mines_array.splice(mine_number, 1);

                scene.remove(blue_mines_array[mine_number]);
                blue_mines_array.splice(mine_number, 1);

                scene.remove(green_mines_array[mine_number]);
                green_mines_array.splice(mine_number, 1);


                new_mine_number_generator();
                return;
            }


        }





        if (mines_intersects_blue_nose) {

            icosa_explosion_blue_nose_func();
            protector_rock_nose();
            module_score -= 500;
            collision_count_nose += 1;
            score_update();
            if (blue_mines_array.length > 0) {
                scene.remove(red_mines_array[mine_number]);
                red_mines_array.splice(mine_number, 1);

                scene.remove(blue_mines_array[mine_number]);
                blue_mines_array.splice(mine_number, 1);

                scene.remove(green_mines_array[mine_number]);
                green_mines_array.splice(mine_number, 1);


                new_mine_number_generator();
                return;
            }


        }
        if (mines_intersects_green_nose) {

            icosa_explosion_green_nose_func();
            protector_rock_nose();
            module_score -= 500;
            collision_count_nose += 1;
            score_update();
            if (green_mines_array.length > 0) {
                scene.remove(red_mines_array[mine_number]);
                red_mines_array.splice(mine_number, 1);

                scene.remove(blue_mines_array[mine_number]);
                blue_mines_array.splice(mine_number, 1);

                scene.remove(green_mines_array[mine_number]);
                green_mines_array.splice(mine_number, 1);


                new_mine_number_generator();
                return;
            }


        }
        if (mines_intersects_red_left_wing) {

            icosa_explosion_red_wing_left_func();
            protector_rock_left_wing();
            module_score -= 250;
            collision_count_wing += 1;
            score_update();
            if (red_mines_array.length > 0) {
                scene.remove(red_mines_array[mine_number]);
                red_mines_array.splice(mine_number, 1);

                scene.remove(blue_mines_array[mine_number]);
                blue_mines_array.splice(mine_number, 1);

                scene.remove(green_mines_array[mine_number]);
                green_mines_array.splice(mine_number, 1);


                new_mine_number_generator();
                return;
            }


        }
        if (mines_intersects_red_right_wing) {

            icosa_explosion_red_wing_right_func();
            protector_rock_right_wing();
            module_score -= 250;
            collision_count_wing += 1;
            score_update();
            if (red_mines_array.length > 0) {
                scene.remove(red_mines_array[mine_number]);
                red_mines_array.splice(mine_number, 1);

                scene.remove(blue_mines_array[mine_number]);
                blue_mines_array.splice(mine_number, 1);

                scene.remove(green_mines_array[mine_number]);
                green_mines_array.splice(mine_number, 1);


                new_mine_number_generator();
                return;
            }


        }
        if (mines_intersects_blue_left_wing) {

            icosa_explosion_blue_wing_left_func();
            protector_rock_left_wing();
            module_score -= 250;
            collision_count_wing += 1;
            score_update();
            if (red_mines_array.length > 0) {
                scene.remove(red_mines_array[mine_number]);
                red_mines_array.splice(mine_number, 1);

                scene.remove(blue_mines_array[mine_number]);
                blue_mines_array.splice(mine_number, 1);

                scene.remove(green_mines_array[mine_number]);
                green_mines_array.splice(mine_number, 1);


                new_mine_number_generator();
                return;
            }


        }
        if (mines_intersects_blue_right_wing) {

            icosa_explosion_blue_wing_right_func();
            protector_rock_right_wing();
            module_score -= 250;
            collision_count_wing += 1;
            score_update();
            if (red_mines_array.length > 0) {
                scene.remove(red_mines_array[mine_number]);
                red_mines_array.splice(mine_number, 1);

                scene.remove(blue_mines_array[mine_number]);
                blue_mines_array.splice(mine_number, 1);

                scene.remove(green_mines_array[mine_number]);
                green_mines_array.splice(mine_number, 1);


                new_mine_number_generator();
                return;
            }


        }
        if (mines_intersects_green_left_wing) {

            icosa_explosion_green_wing_left_func();
            protector_rock_left_wing();
            module_score -= 250;
            collision_count_wing += 1;
            score_update();
            if (red_mines_array.length > 0) {
                scene.remove(red_mines_array[mine_number]);
                red_mines_array.splice(mine_number, 1);

                scene.remove(blue_mines_array[mine_number]);
                blue_mines_array.splice(mine_number, 1);

                scene.remove(green_mines_array[mine_number]);
                green_mines_array.splice(mine_number, 1);


                new_mine_number_generator();
                return;
            }


        }
        if (mines_intersects_green_right_wing) {

            icosa_explosion_green_wing_right_func();
            protector_rock_right_wing();
            module_score -= 250;
            collision_count_wing += 1;
            score_update();
            if (red_mines_array.length > 0) {
                scene.remove(red_mines_array[mine_number]);
                red_mines_array.splice(mine_number, 1);

                scene.remove(blue_mines_array[mine_number]);
                blue_mines_array.splice(mine_number, 1);

                scene.remove(green_mines_array[mine_number]);
                green_mines_array.splice(mine_number, 1);


                new_mine_number_generator();
                return;
            }


        }






    }






    requestAnimationFrame(mine_mover_1);


}











let new_mine_number_generator = () => {


    mine_number = (red_mines_array.length * Math.random()).toFixed(0);
    //mine_number = (protector_group.position.x * Math.random()).toFixed(0);


    if (red_mines_array[mine_number]) {
        cancelAnimationFrame(mine_mover_1);
        mine_mover_1();
    } else if (red_mines_array.length == 0) {
        console.log("Finalised");
        return;
    } else {
        new_mine_number_generator();
    }
}
function protector_rock_right_wing() {
    gsap.from(
        protector_group.rotation,


        {
            duration: 1.3,

            //x: -Math.PI / 12,
            //y: -Math.PI / 12,
            z: -Math.PI / 24,



            ease: "bounce.out",
        },




    );
}

function protector_rock_left_wing() {
    gsap.from(
        protector_group.rotation, 1.25,


        {
            z: Math.PI / 24,



            ease: "elastic.out(1, 0.3)",

        },




    );

}
async function protector_rock_nose() {
    gsap.fromTo(
        protector_group.rotation, 1.3,


        {
            x: -Math.PI / 48,

            ease: "bounce.out",
        },
        {
            x: 0,

            ease: "bounce.out",
        },

    );

}


