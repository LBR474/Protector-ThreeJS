import * as THREE from 'https://cdn.skypack.dev/three@0.120.0'

import * as gltf_loads from '../gltf_loading_script.js';
import * as exp_funcs from '../explosion_functions.js';
import * as icosa_loads from '../icosa_hedron.js';
import * as score_update from '../score_update.js';
import * as gq_l_m_3 from './GQ_level_two_module.js';

export {
    mine_mover_2,
    new_mine_number_generator,
    protector_rock_left_wing,
    protector_rock_right_wing,
    protector_rock_nose,

}


export let mine_number;
mine_number = (Math.random() * gltf_loads.red_mines_array.length).toFixed(0);
let module_score_level_two = 0;
let collision_count_nose_level_two = 0;
let collision_count_wing_level_two = 0;

let mine_mover_2_counter = 0;


let mine_mover_2 = () => {
    mine_mover_2_counter += 1;

    let mineboxhelper = new THREE.BoxHelper(gltf_loads.red_mines_array[mine_number], 0xffff00);


    let hull_box = new THREE.Box3().setFromObject(gltf_loads.nose_cone);

    let left_wing_box = new THREE.Box3().setFromObject(gltf_loads.left_wing);

    let right_wing_box = new THREE.Box3().setFromObject(gltf_loads.right_wing);



    if (gq_l_m_3.pause == false
        && gltf_loads.red_mines_array[mine_number]
        && gltf_loads.red_mines_array_2[mine_number]
        && module_score_level_two <= 18000
        && gltf_loads.red_mines_array.length > 0
        && (collision_count_nose_level_two + collision_count_wing_level_two <= 5)

    ) {
        let red_mine_box =
            new THREE.Box3().setFromObject(gltf_loads.red_mines_array[mine_number]);
        let red_mine_box_2 =
            new THREE.Box3().setFromObject(gltf_loads.red_mines_array_2[mine_number]);

        let blue_mine_box =
            new THREE.Box3().setFromObject(gltf_loads.blue_mines_array[mine_number]);
        let blue_mine_box_2 =
            new THREE.Box3().setFromObject(gltf_loads.blue_mines_array_2[mine_number]);

        let green_mine_box =
            new THREE.Box3().setFromObject(gltf_loads.green_mines_array[mine_number]);
        let green_mine_box_2 =
            new THREE.Box3().setFromObject(gltf_loads.green_mines_array_2[mine_number]);

        let mines_intersects_red_nose = red_mine_box.intersectsBox(hull_box);

        let mines_intersects_red_nose_2 = red_mine_box_2.intersectsBox(hull_box);

        let mines_intersects_blue_nose = blue_mine_box.intersectsBox(hull_box);

        let mines_intersects_blue_nose_2 = blue_mine_box_2.intersectsBox(hull_box);

        let mines_intersects_green_nose = green_mine_box.intersectsBox(hull_box);

        let mines_intersects_green_nose_2 = green_mine_box.intersectsBox(hull_box);



        let mines_intersects_red_left_wing = red_mine_box.intersectsBox(left_wing_box);

        let mines_intersects_red_left_wing_2 = red_mine_box_2.intersectsBox(left_wing_box);

        let mines_intersects_blue_left_wing = blue_mine_box.intersectsBox(left_wing_box);

        let mines_intersects_blue_left_wing_2 = blue_mine_box_2.intersectsBox(left_wing_box);

        let mines_intersects_green_left_wing = green_mine_box.intersectsBox(left_wing_box);

        let mines_intersects_green_left_wing_2 = green_mine_box_2.intersectsBox(left_wing_box);


        let mines_intersects_red_right_wing = red_mine_box.intersectsBox(right_wing_box);

        let mines_intersects_red_right_wing_2 = red_mine_box_2.intersectsBox(right_wing_box);

        let mines_intersects_blue_right_wing = blue_mine_box.intersectsBox(right_wing_box);

        let mines_intersects_blue_right_wing_2 = blue_mine_box_2.intersectsBox(right_wing_box);

        let mines_intersects_green_right_wing = green_mine_box.intersectsBox(right_wing_box);

        let mines_intersects_green_right_wing_2 = green_mine_box_2.intersectsBox(right_wing_box);





        let current_mine_position = gltf_loads.red_mines_array[mine_number].position.x;

        if (mine_number % 3 == 0) {

            gsap.to(
                [
                    gltf_loads.red_mines_array[mine_number].position,
                ],
                0.1,
                {
                    z: "+=3.2",

                })
            gsap.to(
                [
                    gltf_loads.green_mines_array[mine_number].position,
                ],
                0.1,
                {
                    z: "+=3.2",
                    x: "+=" + gltf_loads.protector_group.position.x * 0.5,
                })


        } else if (mine_number % 2 == 0) {
            gsap.to(
                [
                    gltf_loads.green_mines_array[mine_number].position,
                ],
                0.1,
                {
                    z: "+=3.2",

                })
            gsap.to(
                [
                    gltf_loads.blue_mines_array[mine_number].position,
                ],
                0.1,
                {
                    z: "+=3.2",
                    y: "+=" + gltf_loads.protector_group.position.y * 0.1,
                })
        }


        else if (mine_number % 1 == 0) {
            gsap.to(
                [
                    gltf_loads.blue_mines_array[mine_number].position,

                ],
                0.1,
                {
                    z: "+=3.2",

                })
            gsap.to(
                [
                    gltf_loads.red_mines_array[mine_number].position,
                ],
                0.1,
                {
                    z: "+=3.2",
                    x: "+=" + gltf_loads.protector_group.position.x * 0.5,
                })
        }



        let mine_run_end_point = 3.5;
        if (

            gltf_loads.red_mines_array[mine_number].position.z >= mine_run_end_point
            || gltf_loads.red_mines_array_2[mine_number].position.z >= mine_run_end_point
            || gltf_loads.blue_mines_array[mine_number].position.z >= mine_run_end_point
            || gltf_loads.blue_mines_array_2[mine_number].position.z >= mine_run_end_point
            || gltf_loads.green_mines_array[mine_number].position.z >= mine_run_end_point
            || gltf_loads.green_mines_array_2[mine_number].position.z >= mine_run_end_point

        ) {

            module_score_level_two += 200;
            score_update.score_update(module_score_level_two, collision_count_nose_level_two, collision_count_wing_level_two);

            gq_l_m_3.scene.remove(gltf_loads.red_mines_array[mine_number]);
            gltf_loads.red_mines_array.splice(mine_number, 1);

            gq_l_m_3.scene.remove(gltf_loads.red_mines_array_2[mine_number]);
            gltf_loads.red_mines_array_2.splice(mine_number, 1);

            gq_l_m_3.scene.remove(gltf_loads.blue_mines_array[mine_number]);
            gltf_loads.blue_mines_array.splice(mine_number, 1);

            gq_l_m_3.scene.remove(gltf_loads.blue_mines_array_2[mine_number]);
            gltf_loads.blue_mines_array_2.splice(mine_number, 1);

            gq_l_m_3.scene.remove(gltf_loads.green_mines_array[mine_number]);
            gltf_loads.green_mines_array.splice(mine_number, 1);

            gq_l_m_3.scene.remove(gltf_loads.green_mines_array_2[mine_number]);
            gltf_loads.green_mines_array_2.splice(mine_number, 1);

            cancelAnimationFrame(mine_mover_2);
            new_mine_number_generator();
            return;
        }

        if (mines_intersects_red_nose
            ||
            mines_intersects_red_nose_2

        ) {

            exp_funcs.icosa_explosion_red_nose_func();
            protector_rock_nose();
            module_score_level_two -= 500;
            collision_count_nose_level_two += 1;
            score_update.score_update(module_score_level_two, collision_count_nose_level_two, collision_count_wing_level_two);
            if (gltf_loads.red_mines_array.length > 0) {

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array[mine_number]);
                gltf_loads.red_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array_2[mine_number]);
                gltf_loads.red_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array[mine_number]);
                gltf_loads.blue_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array_2[mine_number]);
                gltf_loads.blue_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array[mine_number]);
                gltf_loads.green_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array_2[mine_number]);
                gltf_loads.green_mines_array_2.splice(mine_number, 1);


                cancelAnimationFrame(mine_mover_2);
                new_mine_number_generator();
                // new_mine_number_generator();
                return;
            }


        }





        if (mines_intersects_blue_nose
            || mines_intersects_blue_nose_2
        ) {

            exp_funcs.icosa_explosion_blue_nose_func();
            protector_rock_nose();
            module_score_level_two -= 500;
            collision_count_nose_level_two += 1;
            score_update.score_update(module_score_level_two, collision_count_nose_level_two, collision_count_wing_level_two);
            if (gltf_loads.blue_mines_array.length > 0) {

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array[mine_number]);
                gltf_loads.red_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array_2[mine_number]);
                gltf_loads.red_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array[mine_number]);
                gltf_loads.blue_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array_2[mine_number]);
                gltf_loads.blue_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array[mine_number]);
                gltf_loads.green_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array_2[mine_number]);
                gltf_loads.green_mines_array_2.splice(mine_number, 1);


                new_mine_number_generator();
                return;
            }


        }
        if (mines_intersects_green_nose
            || mines_intersects_green_nose_2
        ) {

            exp_funcs.icosa_explosion_green_nose_func();
            protector_rock_nose();
            module_score_level_two -= 500;
            collision_count_nose_level_two += 1;
            score_update.score_update(module_score_level_two, collision_count_nose_level_two, collision_count_wing_level_two);
            if (gltf_loads.green_mines_array.length > 0) {

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array[mine_number]);
                gltf_loads.red_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array_2[mine_number]);
                gltf_loads.red_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array[mine_number]);
                gltf_loads.blue_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array_2[mine_number]);
                gltf_loads.blue_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array[mine_number]);
                gltf_loads.green_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array_2[mine_number]);
                gltf_loads.green_mines_array_2.splice(mine_number, 1);



                new_mine_number_generator();
                return;
            }


        }
        if (mines_intersects_red_left_wing
            || mines_intersects_red_left_wing_2
        ) {

            exp_funcs.icosa_explosion_red_wing_left_func();
            protector_rock_left_wing();
            module_score_level_two -= 250;
            collision_count_wing_level_two += 1;
            score_update.score_update(module_score_level_two, collision_count_nose_level_two, collision_count_wing_level_two);
            if (gltf_loads.red_mines_array.length > 0) {

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array[mine_number]);
                gltf_loads.red_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array_2[mine_number]);
                gltf_loads.red_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array[mine_number]);
                gltf_loads.blue_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array_2[mine_number]);
                gltf_loads.blue_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array[mine_number]);
                gltf_loads.green_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array_2[mine_number]);
                gltf_loads.green_mines_array_2.splice(mine_number, 1);



                new_mine_number_generator();
                return;
            }


        }
        if (mines_intersects_red_right_wing
            || mines_intersects_red_right_wing_2
        ) {

            exp_funcs.icosa_explosion_red_wing_right_func();
            protector_rock_right_wing();
            module_score_level_two -= 250;
            collision_count_wing_level_two += 1;
            score_update.score_update(module_score_level_two, collision_count_nose_level_two, collision_count_wing_level_two);
            if (gltf_loads.red_mines_array.length > 0) {

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array[mine_number]);
                gltf_loads.red_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array_2[mine_number]);
                gltf_loads.red_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array[mine_number]);
                gltf_loads.blue_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array_2[mine_number]);
                gltf_loads.blue_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array[mine_number]);
                gltf_loads.green_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array_2[mine_number]);
                gltf_loads.green_mines_array_2.splice(mine_number, 1);




                new_mine_number_generator();
                return;
            }


        }
        if (mines_intersects_blue_left_wing
            || mines_intersects_blue_left_wing_2
        ) {

            exp_funcs.icosa_explosion_blue_wing_left_func();
            protector_rock_left_wing();
            module_score_level_two -= 250;
            collision_count_wing_level_two += 1;
            score_update.score_update(module_score_level_two, collision_count_nose_level_two, collision_count_wing_level_two);
            if (gltf_loads.red_mines_array.length > 0) {

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array[mine_number]);
                gltf_loads.red_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array_2[mine_number]);
                gltf_loads.red_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array[mine_number]);
                gltf_loads.blue_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array_2[mine_number]);
                gltf_loads.blue_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array[mine_number]);
                gltf_loads.green_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array_2[mine_number]);
                gltf_loads.green_mines_array_2.splice(mine_number, 1);



                new_mine_number_generator();
                return;
            }


        }
        if (mines_intersects_blue_right_wing
            || mines_intersects_blue_right_wing_2
        ) {

            exp_funcs.icosa_explosion_blue_wing_right_func();
            protector_rock_right_wing();
            module_score_level_two -= 250;
            collision_count_wing_level_two += 1;
            score_update.score_update(module_score_level_two, collision_count_nose_level_two, collision_count_wing_level_two);
            if (gltf_loads.red_mines_array.length > 0) {

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array[mine_number]);
                gltf_loads.red_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array_2[mine_number]);
                gltf_loads.red_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array[mine_number]);
                gltf_loads.blue_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array_2[mine_number]);
                gltf_loads.blue_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array[mine_number]);
                gltf_loads.green_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array_2[mine_number]);
                gltf_loads.green_mines_array_2.splice(mine_number, 1);


                new_mine_number_generator();
                return;
            }


        }
        if (mines_intersects_green_left_wing
            || mines_intersects_green_left_wing_2

        ) {

            exp_funcs.icosa_explosion_green_wing_left_func();
            protector_rock_left_wing();
            module_score_level_two -= 250;
            collision_count_wing_level_two += 1;
            score_update.score_update(module_score_level_two, collision_count_nose_level_two, collision_count_wing_level_two);
            if (gltf_loads.red_mines_array.length > 0) {

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array[mine_number]);
                gltf_loads.red_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array_2[mine_number]);
                gltf_loads.red_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array[mine_number]);
                gltf_loads.blue_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array_2[mine_number]);
                gltf_loads.blue_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array[mine_number]);
                gltf_loads.green_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array_2[mine_number]);
                gltf_loads.green_mines_array_2.splice(mine_number, 1);


                new_mine_number_generator();
                return;
            }


        }
        if (mines_intersects_green_right_wing
            || mines_intersects_green_right_wing_2

        ) {

            exp_funcs.icosa_explosion_green_wing_right_func();
            protector_rock_right_wing();
            module_score_level_two -= 250;
            collision_count_wing_level_two += 1;
            score_update.score_update(module_score_level_two, collision_count_nose_level_two, collision_count_wing_level_two);
            if (gltf_loads.red_mines_array.length > 0) {

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array[mine_number]);
                gltf_loads.red_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.red_mines_array_2[mine_number]);
                gltf_loads.red_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array[mine_number]);
                gltf_loads.blue_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.blue_mines_array_2[mine_number]);
                gltf_loads.blue_mines_array_2.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array[mine_number]);
                gltf_loads.green_mines_array.splice(mine_number, 1);

                gq_l_m_3.scene.remove(gltf_loads.green_mines_array_2[mine_number]);
                gltf_loads.green_mines_array_2.splice(mine_number, 1);


                new_mine_number_generator();
                return;
            }


        }






    }






    requestAnimationFrame(mine_mover_2);


}











let new_mine_number_generator = () => {


    mine_number = (gltf_loads.red_mines_array.length * Math.random()).toFixed(0);

    if (module_score_level_two > 18000) {
        gq_l_m_3.pause == true;
        level_two_finish(module_score_level_two, collision_count_nose_level_two, collision_count_wing_level_two);
        return;
    }

    if (gltf_loads.red_mines_array[mine_number]) {
        cancelAnimationFrame(mine_mover_2);
        mine_mover_2();
    } else if (
        gltf_loads.red_mines_array.length == 0

    ) {
        console.log("Finalised");
        gq_l_m_3.pause == true;
        level_two_finish(module_score_level_two, collision_count_nose_level_two, collision_count_wing_level_two);
        return;
    } else {
        new_mine_number_generator();
    }
}
function protector_rock_right_wing() {
    gsap.from(
        gltf_loads.protector_group.rotation,
        {
            duration: 1.3,
            z: -Math.PI / 24,
            ease: "bounce.out",
        },
    );
}

function protector_rock_left_wing() {
    gsap.from(
        gltf_loads.protector_group.rotation, 1.25,
        {
            z: Math.PI / 24,
            ease: "elastic.out(1, 0.3)",
        },
    );
}


async function protector_rock_nose() {
    gsap.fromTo(
        gltf_loads.protector_group.rotation, 1.3,
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


let level_two_finish = (module_score_level_two, collision_count_nose_level_two, collision_count_wing_level_two) => {

    gq_l_m_3.pause == true;

    if (document.querySelector("#SD_logged_in_par").innerHTML) {
        sessionStorage.setItem("entered_name", document.querySelector("#SD_logged_in_par").innerHTML);
        //console.log(sessionStorage.getItem("entered_name"));
    } else {
        sessionStorage.setItem("entered_name", "");
        //console.log(sessionStorage.getItem("entered_name"));
    }
    let player = sessionStorage.getItem("entered_name");

    sessionStorage.setItem("level_two_stored_score", module_score_level_two);
    sessionStorage.setItem("level_two_nose_collisions", collision_count_nose_level_two);
    sessionStorage.setItem("level_two_wing_collisions", collision_count_wing_level_two);


    $("#SD_score_par").hide();
    $("#SD_logged_in_par").hide();
    $("#SD_C_C_par").hide();
    $("#SD_previous_level_score_par").hide();
    $("#top_left_menu").hide();

    if ($("#trm_name").val()) {
        player = " " + $("#trm_name").val();
    } else {
        player = '';
    }


    let level_one_stored_score_number = Number(sessionStorage.getItem("level_one_stored_score"));
    document.querySelector("#C_D_F_collision_count").innerHTML =
        "<form><h1>Congratulations " + player + ", Tothian mine field middle zone passed"
        + "<h3>Number of wing collisions (Middle zone): " + collision_count_wing_level_two +
        "<br>Number of hull collisions (Middle zone): " + collision_count_nose_level_two +
        "<br>Score (Middle zone): " + module_score_level_two +

        // sessionStorage.setItem("level_one_stored_score", module_score_level_one);
        // sessionStorage.setItem("level_one_nose_collisions", collision_count_nose);
        // sessionStorage.setItem("level_one_wing_collisions", collision_count_wing);

        "<h3>Number of wing collisions (Outer perimeter): " + sessionStorage.getItem("level_one_wing_collisions") +
        "<br>Number of hull collisions (Outer perimeter): " + sessionStorage.getItem("level_one_nose_collisions") +
        "<br>Score (Outer perimeter): " + sessionStorage.getItem("level_one_stored_score") +
        
    "<br>Total score: " + (level_one_stored_score_number + module_score_level_two)
        ;

    document.querySelector("#C_D_F_next_level").innerHTML =
        "<a href='../level_three/index.php'><h3>Go to next level?</h3></a></form>";

    document.querySelector("#C_D_F_try_again").innerHTML =
        "";



    gsap.to("#collision_div_finish_level", {
        display: "block",
        duration: 0.3
    });
    //let pause = true;

    return;

}

let level_game_over = () => {
    let player;
    $("#SD_score_par").hide();
    $("#SD_logged_in_par").hide();
    $("#SD_C_C_par").hide();
    $("#top_left_menu").hide();




    if ($("#trm_name").val()) {
        player = " " + $("#trm_name").val();
    } else {
        player = '';
    }

    document.querySelector("#C_D_F_collision_count").innerHTML =
        "<h1>Game over</h1>";


    document.querySelector("#C_D_F_next_level").innerHTML =
        "<a href='./index.php'><h3>Try outer perimeter again?</h3></a><br>";






    gsap.to("#collision_div_finish_level", {
        display: "block",
        duration: 0.3
    });

}


