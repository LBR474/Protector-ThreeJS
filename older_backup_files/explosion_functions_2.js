
// import {
//     exp_cube,
//     //exp_cube_geometry, 
//     exp_cube_array,
//     //makeInstanceRed
// } from './exp_cube.js';

import * as THREE from 'https://cdn.skypack.dev/three@0.120.0'


import {
    scene, num_cubes_and_isos
} from './GQ_level_two_module.js';

import {
    icosahedron_red, icosahedron_blue, make_Icosa_instance_red, make_Icosa_instance_blue,
    icosahedron_array_red, icosahedron_array_blue, icosahedron_array_green, x_pos, y_pos
} from './icosa_hedron.js';

import { torus_right_wing, torus_left_wing } from './torus.js';


import {
    left_wing,
    right_wing,
    nose_cone, protector_group, protector, protector_cylinders, mines_array, mine_red, mine_blue, mine_green


} from './gltf_loading_script.js';
import {
    //    hull_tail
} from './mine_mover_2.js';
import {
    mine_move_control,
    blackColor,
    standardColor,
    blue_engine_color
} from './mine_move_control.js';

export {
    // cube_array_explosion_func_right,
    // cube_array_explosion_func_left,
    icosa_explosion_red_nose_func,
    icosa_explosion_red_wing_right_func,
    icosa_explosion_red_wing_left_func,
    icosa_explosion_blue_nose_func,
    icosa_explosion_blue_wing_right_func,
    icosa_explosion_blue_wing_left_func,

    icosa_explosion_green_nose_func,
    icosa_explosion_green_wing_right_func,
    icosa_explosion_green_wing_left_func,
    laser_cannon_fire
    //exp_cube
};

const texloader = new THREE.TextureLoader();

function laser_cannon_fire() {

    scene.add(torus_left_wing);

        gsap.to(torus_left_wing.position, 2, {
            z: -20,
        });
    
}



function icosa_explosion_red_nose_func() {


    for (let i = 0; i < icosahedron_array_red.length; i++) {


        scene.add(icosahedron_array_red[i]);
        gsap.to(icosahedron_array_red[i].material, 0.1, {
            //color: color,
            opacity: 1,
            ease: "back.Out",
        });

        if (i < 25) {
            icosahedron_array_red[i].position.x =

                nose_cone.position.x;

            icosahedron_array_red[i].position.z =

                nose_cone.position.z;




            gsap.to(icosahedron_array_red[i].position, 1, {
                x: -(1 * Math.random()),
                y: +(1 * Math.random()),
                z: nose_cone.position.z,

                ease: "back.Out",
            });

        } else {
            icosahedron_array_red[i].position.x =

                nose_cone.position.x;

            icosahedron_array_red[i].position.z =

                nose_cone.position.z;


            gsap.to(icosahedron_array_red[i].position, 1, {
                x: +(1 * Math.random()),

                y: +(1 * Math.random()),
                z: nose_cone.position.z,


                ease: "back.Out",
            });

        }
        gsap.to(icosahedron_array_red[i].material, 2, {
            opacity: 0,
            ease: "back.Out",
        });
        scene.remove(icosahedron_array_red[i]);
    }

}

function icosa_explosion_red_wing_right_func() {

    for (let i = 0; i < icosahedron_array_red.length; i++) {


        scene.add(icosahedron_array_red[i]);
        //4;


        gsap.to(icosahedron_array_red[i].material, 0.1, {

            opacity: 1,
            ease: "back.Out",
        });

        if (i < 25) {
            icosahedron_array_red[i].position.x =
                right_wing.position.x + 1;


            gsap.to(icosahedron_array_red[i].position, 1, {

                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() + 1.5),


                ease: "back.Out",
            });

            scene.remove(icosahedron_array_red[i]);
        }
        else {
            icosahedron_array_red[i].position.x =
                right_wing.position.x + 1;

            gsap.to(icosahedron_array_red[i].position, 1, {

                z: (-1 * Math.random()),
                y: -(1 * Math.random()),
                x: (1 * Math.random()) + 1.5,


                ease: "back.Out",
            });
            scene.remove(icosahedron_array_red[i]);

        }
        gsap.to(icosahedron_array_red[i].material, 2, {
            opacity: 0,
            ease: "back.Out",
        });
    }

}
function icosa_explosion_red_wing_left_func() {


    for (let i = 0; i < icosahedron_array_red.length; i++) {


        scene.add(icosahedron_array_red[i]);
        //4;


        gsap.to(icosahedron_array_red[i].material, 0.1, {

            opacity: 1,
            ease: "back.Out",
        });

        if (i < 25) {
            icosahedron_array_red[i].position.x =
                left_wing.position.x - 1;


            gsap.to(icosahedron_array_red[i].position, 1, {

                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() - 2),


                ease: "back.Out",
            });

            scene.remove(icosahedron_array_red[i]);
        }
        else {
            icosahedron_array_red[i].position.x =
                left_wing.position.x - 1;

            gsap.to(icosahedron_array_red[i].position, 1, {

                z: (-1 * Math.random()),
                y: -(1 * Math.random()),
                x: (-1 * Math.random()) - 1,


                ease: "back.Out",
            });
            scene.remove(icosahedron_array_red[i]);

        }
        gsap.to(icosahedron_array_red[i].material, 2, {
            opacity: 0,
            ease: "back.Out",
        });
    }

}

// blue explosions area starts ................................................................................

function icosa_explosion_blue_nose_func() {

    for (let i = 0; i < icosahedron_array_blue.length; i++) {


        scene.add(icosahedron_array_blue[i]);
        gsap.to(icosahedron_array_blue[i].material, 0.1, {
            //color: color,
            opacity: 1,
            ease: "back.Out",
        });

        if (i < 25) {
            icosahedron_array_blue[i].position.x =

                nose_cone.position.x;

            gsap.to(icosahedron_array_blue[i].position, 1, {
                x: -(1 * Math.random()),
                y: +(1 * Math.random()),
                z: nose_cone.position.z,

                ease: "back.Out",
            });

        } else {
            icosahedron_array_red[i].position.x =

                nose_cone.position.x;

            gsap.to(icosahedron_array_blue[i].position, 1, {
                x: +(1 * Math.random()),

                y: +(1 * Math.random()),
                z: nose_cone.position.z,

                ease: "back.Out",
            });

        }
        gsap.to(icosahedron_array_blue[i].material, 2, {
            opacity: 0,
            ease: "back.Out",
        });
        scene.remove(icosahedron_array_blue[i]);
    }

}

function icosa_explosion_blue_wing_right_func() {

    for (let i = 0; i < icosahedron_array_blue.length; i++) {


        scene.add(icosahedron_array_blue[i]);
        //4;


        gsap.to(icosahedron_array_blue[i].material, 0.1, {

            opacity: 1,
            ease: "back.Out",
        });

        if (i < 25) {
            icosahedron_array_blue[i].position.x =
                right_wing.position.x + 1;


            gsap.to(icosahedron_array_blue[i].position, 1, {

                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() + 2),


                ease: "back.Out",
            });

            scene.remove(icosahedron_array_blue[i]);
        }
        else {
            icosahedron_array_blue[i].position.x =
                right_wing.position.x + 1;

            gsap.to(icosahedron_array_blue[i].position, 1, {

                z: (-1 * Math.random()),
                y: -(1 * Math.random()),
                x: (1 * Math.random()) + 2,


                ease: "back.Out",
            });
            scene.remove(icosahedron_array_blue[i]);

        }
        gsap.to(icosahedron_array_blue[i].material, 2, {
            opacity: 0,
            ease: "back.Out",
        });
    }

}
function icosa_explosion_blue_wing_left_func() {

    for (let i = 0; i < icosahedron_array_blue.length; i++) {


        scene.add(icosahedron_array_blue[i]);


        gsap.to(icosahedron_array_blue[i].material, 0.1, {

            opacity: 1,
            ease: "back.Out",
        });

        if (i < 25) {
            icosahedron_array_blue[i].position.x =
                left_wing.position.x - 1;


            gsap.to(icosahedron_array_blue[i].position, 1, {

                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() - 2),


                ease: "back.Out",
            });

            scene.remove(icosahedron_array_blue[i]);
        }
        else {
            icosahedron_array_blue[i].position.x =
                left_wing.position.x - 1;

            gsap.to(icosahedron_array_blue[i].position, 1, {

                z: (-1 * Math.random()),
                y: -(1 * Math.random()),
                x: (-1 * Math.random()) - 1,


                ease: "back.Out",
            });
            scene.remove(icosahedron_array_blue[i]);

        }
        gsap.to(icosahedron_array_blue[i].material, 2, {
            opacity: 0,
            ease: "back.Out",
        });
    }

}

// green explosions area starts ................................................................................

function icosa_explosion_green_nose_func() {

    for (let i = 0; i < icosahedron_array_green.length; i++) {


        scene.add(icosahedron_array_green[i]);
        gsap.to(icosahedron_array_green[i].material, 0.1, {
            //color: color,
            opacity: 1,
            ease: "back.Out",
        });

        if (i < 25) {
            icosahedron_array_green[i].position.x =

                nose_cone.position.x;

            gsap.to(icosahedron_array_green[i].position, 1, {
                x: +(1 * Math.random()),

                y: +(1 * Math.random()),
                z: nose_cone.position.z,

                ease: "back.Out",
            });

        } else {
            icosahedron_array_green[i].position.x =

                nose_cone.position.x;

            gsap.to(icosahedron_array_green[i].position, 1, {
                x: +(1 * Math.random()),

                y: +(1 * Math.random()),
                z: nose_cone.position.z,

                ease: "back.Out",
            });
        }
        gsap.to(icosahedron_array_green[i].material, 2, {
            opacity: 0,
            ease: "back.Out",
        });
        scene.remove(icosahedron_array_green[i]);
    }

}

function icosa_explosion_green_wing_right_func() {

    for (let i = 0; i < icosahedron_array_green.length; i++) {


        scene.add(icosahedron_array_green[i]);
        //4;


        gsap.to(icosahedron_array_green[i].material, 0.1, {

            opacity: 1,
            ease: "back.Out",
        });

        if (i < 25) {
            icosahedron_array_green[i].position.x =
                right_wing.position.x + 1;


            gsap.to(icosahedron_array_green[i].position, 1, {

                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() + 2),


                ease: "back.Out",
            });

            scene.remove(icosahedron_array_green[i]);
        }
        else {
            icosahedron_array_green[i].position.x =
                right_wing.position.x + 1;

            gsap.to(icosahedron_array_green[i].position, 1, {

                z: (-1 * Math.random()),
                y: -(1 * Math.random()),
                x: (1 * Math.random()) + 2,


                ease: "back.Out",
            });
            scene.remove(icosahedron_array_green[i]);

        }
        gsap.to(icosahedron_array_green[i].material, 2, {
            opacity: 0,
            ease: "back.Out",
        });
    }
}
function icosa_explosion_green_wing_left_func() {

    for (let i = 0; i < icosahedron_array_green.length; i++) {



        scene.add(icosahedron_array_green[i]);


        gsap.to(icosahedron_array_green[i].material, 0.1, {

            opacity: 1,
            ease: "back.Out",
        });

        if (i < 25) {
            icosahedron_array_green[i].position.x =
                left_wing.position.x - 1;


            gsap.to(icosahedron_array_green[i].position, 1, {

                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() - 2),


                ease: "back.Out",
            });

            scene.remove(icosahedron_array_green[i]);
        }
        else {
            icosahedron_array_green[i].position.x =
                left_wing.position.x - 1;

            gsap.to(icosahedron_array_green[i].position, 1, {

                z: (-1 * Math.random()),
                y: -(1 * Math.random()),
                x: (-1 * Math.random()) - 1,


                ease: "back.Out",
            });
            scene.remove(icosahedron_array_green[i]);

        } gsap.to(icosahedron_array_green[i].material, 2, {
            opacity: 0,
            ease: "back.Out",
        });
    }

}

// function cube_array_explosion_func_right() {


//     for (let i = 0; i < exp_cube_array.length; i++) {
//         gsap.to(exp_cube_array[i].material, 0.1, {
//             // color: 0xFF0000,
//             opacity: 1,
//             ease: "back.Out",
//         });

//         if (i <= 20) {


//             gsap.to(exp_cube_array[i].position, 2, {
//                 x: +(4 * Math.random()),
//                 y: +(2 * Math.random()),
//                 z: 1,

//                 ease: "back.Out",
//             });


//             gsap.to(exp_cube_array[i].scale, 1, {
//                 x: +(4 * Math.random()),
//                 y: +(2 * Math.random()),
//                 z: 1,

//                 ease: "back.Out",
//             });
//         } else {

//             gsap.to(exp_cube_array[i].position, 2, {
//                 x: +(4 * Math.random()),
//                 y: +(2 * Math.random()),
//                 z: 1,

//                 ease: "back.Out",
//             });
//             gsap.to(exp_cube_array[i].scale, 1, {
//                 x: +(4 * Math.random()),
//                 y: +(2 * Math.random()),
//                 z: 1,

//                 ease: "back.Out",
//             });
//         }

//     }
// }
// function cube_array_explosion_func_left() {


//     for (let i = 0; i < exp_cube_array.length; i++) {
//         gsap.to(exp_cube_array[i].material, 0.1, {
//             // color: 0xFF0000,
//             opacity: 1,
//             ease: "back.Out",
//         });

//         if (i <= 20) {


//             gsap.to(exp_cube_array[i].position, 2, {
//                 x: -(4 * Math.random()),
//                 y: +(2 * Math.random()),
//                 z: 1,

//                 ease: "back.Out",
//             });


//             gsap.to(exp_cube_array[i].scale, 1, {
//                 x: -(4 * Math.random()),
//                 y: +(2 * Math.random()),
//                 z: 1,

//                 ease: "back.Out",
//             });
//         } else {

//             gsap.to(exp_cube_array[i].position, 2, {
//                 x: -(4 * Math.random()),
//                 y: +(2 * Math.random()),
//                 z: 1,

//                 ease: "back.Out",
//             });
//             gsap.to(exp_cube_array[i].scale, 1, {
//                 x: -(4 * Math.random()),
//                 y: +(2 * Math.random()),
//                 z: 1,

//                 ease: "back.Out",
//             });
//         }

//     }
// }