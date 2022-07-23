import * as THREE from 'https://cdn.skypack.dev/three@0.120.0'


import {
    scene,
    renderer,
    camera,
    //score_update,
    //mine_move_control,
    //level_finish,
    //level_game_over,
    pause,
    //MakeInstanceRedCaller

} from './GQ_level_one_module.js';

import {
    torus_left_wing,
    torus_right_wing,
} from './torus.js';

import {
    icosahedron_array_red,
    icosahedron_array_blue,
    icosahedron_array_green,
    icosahedron_red,
} from './icosa_hedron.js';



import {
    mines_array,
    protector_group,
    hull_and_tail,
    protector,
    left_engine_light
} from './gltf_loading_script.js';

import {
    cube_array_explosion_func_right,
    cube_array_explosion_func_left,
    icosa_explosion_red_nose_func,
    icosa_explosion_red_wing_right_func,
    icosa_explosion_red_wing_left_func,
    icosa_explosion_blue_nose_func,
    icosa_explosion_blue_wing_right_func,
    icosa_explosion_blue_wing_left_func,
    icosa_explosion_green_nose_func,
    icosa_explosion_green_wing_right_func,
    icosa_explosion_green_wing_left_func,

} from './explosion_functions.js';


import {
    score_update,
    level_finish,
    level_game_over
} from './score_update.js';

import {
    // mines_i,
    // mine_mover,
    // hull_nose,
    // hull_tail,
    // inc_,
    // module_score,
    // collision_count_nose,
    // collision_count_wing,
    // //right_wing_box,
    // y_pos,
    // z_pos
    mine_move_control,
    blackColor
  



} from './mine_move_control.js';


export {
    mines_i,
    mine_mover,
    hull_nose,
    hull_tail,
    inc_,
    module_score,
    collision_count_nose,
    collision_count_wing,
    //right_wing_box,
    y_pos,
    z_pos,
    mine_box




}
// protector masking shape(s) area begins .....................................................

var hull_geometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 52,
    16);

let hull_material = new THREE.MeshPhongMaterial({
    color: 'green',
    opacity: 0,
    transparent: true,
});

const hull_nose = new THREE.Mesh(hull_geometry, hull_material);


hull_nose.rotation.x = Math.PI / 2;
hull_nose.position.y = -0.5;
hull_nose.position.z = -1;


const hull_tail = new THREE.Mesh(hull_geometry, hull_material);


hull_tail.rotation.x = Math.PI / 2;
hull_tail.position.y = -0.5;
hull_tail.position.z = 1;


let inc_ = 0.1;
let module_score = 0;
var y_pos = 0;
var z_pos = -5;
let collision_count_wing = 0;
let collision_count_nose = 0;








// // mine mover function area begins .....................................................

let mines_i = 0;
let mine_box;

    let mine_mover = (time) => {
    

    for (let i = 0; i < icosahedron_array_red.length; i++) {
        protector_group.add(icosahedron_array_red[i]);
        protector_group.add(icosahedron_array_blue[i]);
        protector_group.add(icosahedron_array_green[i]);

    }




    scene.add(mines_array[mines_i]);
        mine_box = new THREE.Box3().setFromObject(
            mines_array[mines_i]);
    let hull_box = new THREE.Box3().setFromObject(hull_and_tail);
    let left_wing_box = new THREE.Box3().setFromObject(torus_left_wing);
    let right_wing_box = new THREE.Box3().setFromObject(torus_right_wing);

    

    var mines_intersects_nose = hull_box.intersectsBox(mine_box);
    var mines_intersects_left_wing = left_wing_box.intersectsBox(mine_box);
    var mines_intersects_right_wing = right_wing_box.intersectsBox(mine_box);

    if (mines_array[mines_i].position.z >= 7.5) {

        module_score += 100;
        score_update(module_score);
        if (module_score >= 3000) {
            level_finish(collision_count_wing, collision_count_nose);
            return;
        }
        scene.remove(mines_array[mines_i]);
        mines_array[mines_i].position.x = protector_group.position.x;
        if (mines_i == 2) {
            mines_i = 0;
        } else {
            mines_i += 1;
        }
        mine_move_control();


    }
    // // else if (mines_intersects_right_wing) {
    // //     protector_rock_right_wing();
       

    // //     if (mines_i == 0) {
    // //         icosa_explosion_red_wing_right_func();
            


    // //         //cube_array_explosion_func_right();
    // //         gsap.to("#collision_div_red", {
    // //             display: "block",
    // //             duration: 0.3
    // //         });
    // //         document.querySelector("#C_N_red_nose_par").innerHTML =
    // //             "";
    // //         document.querySelector("#C_N_red_left_wing_par").innerHTML =
    // //             "";
    // //         document.querySelector("#C_N_red_right_wing_par").innerHTML =
    // //             "Collision - wing";

    // //         torus_right_wing.material.color.setRGB(1, 0, 0);
    // //        // torus_right_wing.material.opacity = 1;

    // //     }
    // //     else if (mines_i == 1) {

    // //         icosa_explosion_blue_wing_right_func();
    // //         gsap.to("#collision_div_blue", {
    // //             display: "block",
    // //             duration: 0.3
    // //         });
    // //         document.querySelector("#C_N_blue_nose_par").innerHTML =
    // //             "";
    // //         document.querySelector("#C_N_blue_left_wing_par").innerHTML =
    // //             "";
    // //         document.querySelector("#C_N_blue_right_wing_par").innerHTML =
    // //             "Collision - wing";

    // //         torus_right_wing.material.color.setRGB(0, 0, 1);
    // //         //torus_right_wing.material.opacity = 1;
    // //     } else if (mines_i == 2) {
    // //         icosa_explosion_green_wing_right_func();
    // //         gsap.to("#collision_div_green", {
    // //             display: "block",
    // //             duration: 0.3
    // //         });
    // //         document.querySelector("#C_N_green_nose_par").innerHTML =
    // //             "";
    // //         document.querySelector("#C_N_green_left_wing_par").innerHTML =
    // //             "";
    // //         document.querySelector("#C_N_green_right_wing_par").innerHTML =
    // //             "Collision - wing";

    // //         torus_right_wing.material.color.setRGB(0, 1, 0);
    // //        // torus_right_wing.material.opacity = 1;
    // //     }


    // //     scene.remove(mines_array[mines_i]);

    // //     if (mines_i == 2) {
    // //         mines_i = 0;
    // //     } else {
    // //         mines_i += 1;
    // //     }
    // //     module_score -= 250;
    // //     collision_count_wing += 1;
    // //     if ((collision_count_wing + collision_count_nose) > 4) {
    // //         level_game_over();
    // //     }
    // //     score_update(module_score);


    // //     setTimeout(mine_move_control(), 0);


    // // }
    // else if (mines_intersects_left_wing) {
    //     protector_rock_left_wing();
      
    //     if (mines_i == 0) {
    //         icosa_explosion_red_wing_left_func();

    //         gsap.to("#collision_div_red", {
    //             display: "block",
    //             duration: 0.3
    //         });
    //         document.querySelector("#C_N_red_nose_par").innerHTML =
    //             "";
    //         document.querySelector("#C_N_red_left_wing_par").innerHTML =
    //             "";
    //         document.querySelector("#C_N_red_right_wing_par").innerHTML =
    //             "Collision - wing";

    //         torus_left_wing.material.color.setRGB(1, 0, 0);
    //         //torus_left_wing.material.opacity = 1;

    //     }
    //     else if (mines_i == 1) {
    //         icosa_explosion_blue_wing_left_func();
    //         gsap.to("#collision_div_blue", {
    //             display: "block",
    //             duration: 0.3
    //         });
    //         document.querySelector("#C_N_blue_nose_par").innerHTML =
    //             "";
    //         document.querySelector("#C_N_blue_left_wing_par").innerHTML =
    //             "";
    //         document.querySelector("#C_N_blue_right_wing_par").innerHTML =
    //             "Collision - wing";

    //         torus_left_wing.material.color.setRGB(0, 0, 1);
    //         //torus_left_wing.material.opacity = 1;
    //     } else if (mines_i == 2) {
    //         icosa_explosion_green_wing_left_func();

    //         gsap.to("#collision_div_green", {
    //             display: "block",
    //             duration: 0.3
    //         });
    //         document.querySelector("#C_N_green_nose_par").innerHTML =
    //             "";
    //         document.querySelector("#C_N_green_left_wing_par").innerHTML =
    //             "";
    //         document.querySelector("#C_N_green_right_wing_par").innerHTML =
    //             "Collision - wing";

    //         torus_left_wing.material.color.setRGB(0, 1, 0);
    //         //torus_left_wing.material.opacity = 1;
    //     }


    //     scene.remove(mines_array[mines_i]);

    //     if (mines_i == 2) {
    //         mines_i = 0;
    //     } else {
    //         mines_i += 1;
    //     }
    //     module_score -= 250;
    //     collision_count_wing += 1;
    //     if (collision_count_wing > 4) {
    //         level_game_over();
    //     }
    //     score_update(module_score);


    //     setTimeout(mine_move_control(), 0);



    // }
    else if (mines_intersects_nose) {

        protector_rock_nose();
       

        document.querySelector("#C_N_red_left_wing_par").innerHTML =
            "";
        document.querySelector("#C_N_red_right_wing_par").innerHTML =
            "";
        document.querySelector("#C_N_red_nose_par").innerHTML =
            "Collision - nose";


        if (mines_i == 0) {
            icosa_explosion_red_nose_func();

            //cube_array_explosion_func();
            gsap.to("#collision_div_red", {
                display: "block",
                duration: 0.3
            });
            // hull_nose.material.color.setRGB(1, 0, 0);
            // //hull_nose.material.opacity = 1;
            // hull_tail.material.color.setRGB(1, 0, 0);
            //hull_tail.material.opacity = 1;
            //scene.remove(icosahedron_red);

            icosahedron_red.traverse((o) => {


                if (o.isMesh) {

                    for (let index = 0; index < icosahedron_array_red.length; index++) {

                        // gsap.to(icosahedron_array_red[index].material, 2, {
                        //     //opacity: 0,
                        //     ease: "back.Out",
                        // });
                        scene.remove(icosahedron_array_red[index]);
                    }



                }
            });


        } else if (mines_i == 1) {
            icosa_explosion_blue_nose_func();
            //cube_array_explosion_func();
            gsap.to("#collision_div_blue", {
                display: "block",
                duration: 0.3
            });
            // hull_nose.material.color.setRGB(0, 0, 1);
            // hull_nose.material.opacity = 1;
            // hull_tail.material.color.setRGB(0, 0, 1);
            // hull_tail.material.opacity = 1;

        } else if (mines_i == 2) {
            icosa_explosion_green_nose_func();

            gsap.to("#collision_div_green", {
                display: "block",
                duration: 0.3
            });
            // hull_nose.material.color.setRGB(0, 1, 0);
            // hull_nose.material.opacity = 1;
            // hull_tail.material.color.setRGB(0, 1, 0);
            // hull_tail.material.opacity = 1;
        }

        scene.remove(mines_array[mines_i]);
        if (mines_i == 2) {
            mines_i = 0;
        } else {
            mines_i += 1;
        }
        module_score -= 500;
        collision_count_nose += 1;
        if ((collision_count_wing + collision_count_nose) > 4) {
            level_game_over();
        }
        score_update(module_score);


        setTimeout(mine_move_control(), 0);

    }



    else if (pause == true) {
        mines_array[mines_i].position.z += inc_;
        renderer.render(scene, camera);
    } else {
        mines_array[mines_i].position.z += inc_;
        mines_array[mines_i].rotation.x += inc_ * 0.1;
        mines_array[mines_i].rotation.y += inc_;



        requestAnimationFrame(mine_mover);
        renderer.render(scene, camera);
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
    // gsap.from(
    //     protector_group.position,


    //     {
    //         duration: 1.3,

    //         x: torus_left_wing.position.x,
    //         //y: -Math.PI / 6,


    //         ease: "elastic"
    //     },




    // );
}

function protector_rock_left_wing() {
    gsap.from(
        protector_group.rotation, 1.25,


        {
            //duration: 1.3,

            //x: -Math.PI / 12,
            //y: -Math.PI / 12,
            z: Math.PI / 24,



            ease: "elastic.out(1, 0.3)",
            
        },




    );
    
}
function protector_rock_nose() {
    gsap.from(
        protector_group.rotation, 1.25,


        {
            //duration: 1.3,

            x: -Math.PI / 12,
            //y: -Math.PI / 12,
            //z: Math.PI / 24,



            ease: "elastic.out(1, 0.3)"
        },




    );
   
}

