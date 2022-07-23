import * as THREE from 'https://cdn.skypack.dev/three@0.120.0'

import * as gltf_loads from './gltf_loading_script.js';

import * as score_update from './score_update.js';
import * as gq_l_m_3 from './GQ_level_one_module.js';

export {
    mine_mover_1,
    new_mine_number_generator,
    protector_rock_left_wing,
    protector_rock_right_wing,
    protector_rock_nose,

}


export let mine_number;
mine_number = (Math.random() * gltf_loads.mines_array.length).toFixed(0);
let module_score_level_one = 0;
let collision_count_nose = 0;
let collision_count_wing = 0;



let mine_mover_1_counter = 0;
function mine_piece_remove() {

   
    gltf_loads.mines_array[mine_number].children[1].material.opacity = 1
    gq_l_m_3.scene.remove(gltf_loads.mines_array[mine_number]);
    gltf_loads.mines_array.splice(mine_number, 1);
    new_mine_number_generator();
    return;
}




let mine_mover_1 = () => {

    //gq_l_m_3.scene.add(sphere)

    mine_mover_1_counter += 1;

    //let mineboxhelper = new THREE.BoxHelper(gltf_loads.mines_array[mine_number], 0xffff00);


    let hull_box = new THREE.Box3().setFromObject(gltf_loads.nose_cone);

    let left_wing_box = new THREE.Box3().setFromObject(gltf_loads.left_wing);

    let right_wing_box = new THREE.Box3().setFromObject(gltf_loads.right_wing);

  



    if (gq_l_m_3.pause == false
        && gltf_loads.mines_array[mine_number]

        && module_score_level_one < 3000
        && gltf_loads.mines_array.length > 0
        && (collision_count_nose + collision_count_wing <= 5)

    ) {
        let red_mine_box =
            new THREE.Box3().setFromObject(gltf_loads.mines_array[mine_number]);

        let mines_intersects_red_nose = red_mine_box.intersectsBox(hull_box);
        let mines_intersects_red_left_wing = red_mine_box.intersectsBox(left_wing_box);
        let mines_intersects_red_right_wing = red_mine_box.intersectsBox(right_wing_box);
        //mine_mover_group.add(sphere)

        gsap.to(
            [
                gltf_loads.mines_array[mine_number].position,
               // mine_mover_group.position,
            ],
            0.1,
            {
                z: "+=1.5",
                // x: gltf_loads.protector_group.position.x,

            })

        let mine_run_end_point = 3.5;

        if (

            gltf_loads.mines_array[mine_number].position.z >= mine_run_end_point


        ) {

            module_score_level_one += 100;
            score_update.score_update(module_score_level_one, collision_count_nose, collision_count_wing);

            gq_l_m_3.scene.remove(gltf_loads.mines_array[mine_number]);
            gltf_loads.mines_array.splice(mine_number, 1);



            cancelAnimationFrame(mine_mover_1);
            new_mine_number_generator();
            return;
        }

        if (
            mines_intersects_red_nose

            || mines_intersects_red_left_wing

            || mines_intersects_red_right_wing


        ) {
            gq_l_m_3.renderer.preserveDrawingBuffer = true
            gq_l_m_3.renderer.autoClearColor = false
            
            gltf_loads.mines_array[mine_number].children[1].material.transparent = true
                gsap.to(gltf_loads.mines_array[mine_number].children[1].scale, 0.5, {
                    x: 8 * Math.random(),
                    y: 8 * Math.random(),
                    z: 8 * Math.random(),

                    //onComplete: mine_piece_remove,
                    ease: "bounce.InOut",

                });
            
            gsap.to(gltf_loads.mines_array[mine_number].children[1].material, 0.5, {
                opacity: 0.0,

                onComplete: mine_piece_remove,
                ease: "bounce.Out",

            });

            // gsap.to(gltf_loads.mines_array[mine_number].children[1].scale, 0.01, {
            //     x: 0.01,
            //     y: 0.01,
            //     z: 0.01,

            //     //onComplete: mine_piece_remove,
            //     ease: "elastic.InOut",

            // });





            if (mines_intersects_red_nose) {
                protector_rock_nose();
            } else if (mines_intersects_red_left_wing) {
                protector_rock_left_wing();
            } else if (mines_intersects_red_right_wing) {
                protector_rock_right_wing();
            }




            module_score_level_one -= 500;
            collision_count_nose += 1;
            score_update.score_update(module_score_level_one, collision_count_nose, collision_count_wing);

            if (gltf_loads.mines_array.length > 0) {


                return;
            }
            
        }
        gq_l_m_3.renderer.preserveDrawingBuffer = false
        gq_l_m_3.renderer.autoClearColor = true
    }
    cancelAnimationFrame(mine_mover_1);
    requestAnimationFrame(mine_mover_1);
}



let new_mine_number_generator = () => {
    mine_number = (gltf_loads.mines_array.length * Math.random()).toFixed(0);

    if (module_score_level_one >= 3000) {
        gq_l_m_3.pause == true;
        level_finish(module_score_level_one,
            collision_count_nose, collision_count_wing);
        return;
    }

    if (gltf_loads.mines_array[mine_number]) {
        cancelAnimationFrame(mine_mover_1);
        
            mine_mover_1();
        
    } else if (
        gltf_loads.mines_array.length == 0

    ) {
        console.log("Finalised");
        gq_l_m_3.pause == true;
        level_finish(module_score_level_one,
            collision_count_nose, collision_count_wing);
        return;
    } else {
        cancelAnimationFrame(mine_mover_1);
        setTimeout(() => {
            new_mine_number_generator();
        }, 0);

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




let level_finish = (module_score_level_one, collision_count_nose, collision_count_wing) => {
    let player, level_one_stored_score;
    sessionStorage.setItem("level_one_stored_score", module_score_level_one);
    sessionStorage.setItem("level_one_nose_collisions", collision_count_nose);
    sessionStorage.setItem("level_one_wing_collisions", collision_count_wing);

    if (document.querySelector("#SD_logged_in_par").innerHTML) {
        sessionStorage.setItem("entered_name", document.querySelector("#SD_logged_in_par").innerHTML);

    } else {
        sessionStorage.setItem("entered_name", "");

    }

    gq_l_m_3.pause == true;
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
        "<h1>Congratulations" + player + ", Tothian mine field outer perimeter passed"
        + "<h3> Number of wing collisions " + collision_count_wing +
        "<br>Number of hull collisions " + collision_count_nose +
        "" + " <br>Total score: " + module_score_level_one;
    document.querySelector("#C_D_F_next_level").innerHTML =
        // "<a href='./level_two/index.php?module_score_level_one_from_post=" +
        // module_score_level_one+ "'><h3>Go to next level?</h3></a></form>";
        "<a href='./level_two/index.html'>Go to next level?</a>";

    document.querySelector("#C_D_F_try_again").innerHTML =
        "";



    gsap.to("#collision_div_finish_level", {
        display: "block",
        duration: 0.3
    });
    //let pause = true;

    return;

}

function mine_piece_spreader() {

    gltf_loads.mines_array[mine_number].children.array.forEach(element => {

    });
    element.position.y += 5
    element.position.x += 5

}