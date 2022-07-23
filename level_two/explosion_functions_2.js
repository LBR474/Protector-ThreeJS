
import * as icosa_loads from './icosa_hedron_2.js';

import * as torus_loads from './torus_2.js';

import * as gltf_loads from './gltf_loading_script_2.js';


import * as score_update from './score_update_2.js';

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
    //exp_cube
};


//

function icosa_explosion_red_nose_func() {
    for (let i = 0; i < icosa_loads.icosahedron_array_red.length; i++) {
        if (i < 25) {
            icosa_loads.icosahedron_array_red[i].position.x =

                gltf_loads.nose_cone.position.x;
            gsap.to(icosa_loads.icosahedron_array_red[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_red[i].position, 0.1, {
                x: -(1 * Math.random()),
                y: +(1 * Math.random()),
                z: gltf_loads.nose_cone.position.z,

                ease: "back.Out",
            });

        } else {
            icosa_loads.icosahedron_array_red[i].position.x =

                gltf_loads.nose_cone.position.x;

            gsap.to(icosa_loads.icosahedron_array_red[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_red[i].position, 0.1, {
                x: +(1 * Math.random()),

                y: +(1 * Math.random()),
                z: gltf_loads.nose_cone.position.z,


                ease: "back.Out",
            });

        }

        gsap.to(icosa_loads.icosahedron_array_red[i].material, 0.5, {
            opacity: 0,
            ease: "back.Out",
        });
    }

}



function icosa_explosion_red_wing_right_func() {
    //console.log("Right eing collision");
    for (let i = 0; i < icosa_loads.icosahedron_array_red.length; i++) {
        if (i < 25) {
            icosa_loads.icosahedron_array_red[i].position.x =

                gltf_loads.right_wing.position.x + 1;
            gsap.to(icosa_loads.icosahedron_array_red[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_red[i].position, 0.1, {
                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() + 2),

                ease: "back.Out",
            });

        } else {
            icosa_loads.icosahedron_array_red[i].position.x =

                gltf_loads.right_wing.position.x + 1;

            gsap.to(icosa_loads.icosahedron_array_red[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_red[i].position, 0.1, {
                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() + 2),


                ease: "back.Out",
            });

        }

        gsap.to(icosa_loads.icosahedron_array_red[i].material, 0.5, {
            opacity: 0,
            ease: "back.Out",
        });
    }

}
function icosa_explosion_red_wing_left_func() {

    for (let i = 0; i < icosa_loads.icosahedron_array_red.length; i++) {
        if (i < 25) {
            icosa_loads.icosahedron_array_red[i].position.x =

                gltf_loads.left_wing.position.x - 1;
            gsap.to(icosa_loads.icosahedron_array_red[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_red[i].position, 0.1, {
                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() - 2),

                ease: "back.Out",
            });

        } else {
            icosa_loads.icosahedron_array_red[i].position.x =

                gltf_loads.left_wing.position.x - 1;

            gsap.to(icosa_loads.icosahedron_array_red[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_red[i].position, 0.1, {
                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() - 2),


                ease: "back.Out",
            });

        }

        gsap.to(icosa_loads.icosahedron_array_red[i].material, 0.5, {
            opacity: 0,
            ease: "back.Out",
        });
    }

}

// blue explosions area starts ................................................................................

async function icosa_explosion_blue_nose_func() {

    for (let i = 0; i < icosa_loads.icosahedron_array_blue.length; i++) {
        if (i < 25) {
            icosa_loads.icosahedron_array_blue[i].position.x =

                gltf_loads.nose_cone.position.x;
            gsap.to(icosa_loads.icosahedron_array_blue[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_blue[i].position, 0.1, {
                x: -(1 * Math.random()),
                y: +(1 * Math.random()),
                z: gltf_loads.nose_cone.position.z,

                ease: "back.Out",
            });

        } else {
            icosa_loads.icosahedron_array_blue[i].position.x =

                gltf_loads.nose_cone.position.x;

            gsap.to(icosa_loads.icosahedron_array_blue[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_blue[i].position, 0.1, {
                x: +(1 * Math.random()),

                y: +(1 * Math.random()),
                z: gltf_loads.nose_cone.position.z,


                ease: "back.Out",
            });

        }

        gsap.to(icosa_loads.icosahedron_array_blue[i].material, 0.5, {
            opacity: 0,
            ease: "back.Out",
        });
    }

}

function icosa_explosion_blue_wing_right_func() {

    for (let i = 0; i < icosa_loads.icosahedron_array_blue.length; i++) {
        if (i < 25) {
            icosa_loads.icosahedron_array_blue[i].position.x =

                gltf_loads.right_wing.position.x + 1;
            gsap.to(icosa_loads.icosahedron_array_blue[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_blue[i].position, 0.1, {
                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() + 2),

                ease: "back.Out",
            });

        } else {
            icosa_loads.icosahedron_array_blue[i].position.x =

                gltf_loads.right_wing.position.x + 1;

            gsap.to(icosa_loads.icosahedron_array_blue[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_blue[i].position, 0.1, {
                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() + 2),


                ease: "back.Out",
            });

        }

        gsap.to(icosa_loads.icosahedron_array_blue[i].material, 0.5, {
            opacity: 0,
            ease: "back.Out",
        });
    }
}



function icosa_explosion_blue_wing_left_func() {


    for (let i = 0; i < icosa_loads.icosahedron_array_blue.length; i++) {
        if (i < 25) {
            icosa_loads.icosahedron_array_blue[i].position.x =

                gltf_loads.left_wing.position.x - 1;
            gsap.to(icosa_loads.icosahedron_array_blue[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_blue[i].position, 0.1, {
                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() - 2),

                ease: "back.Out",
            });

        } else {
            icosa_loads.icosahedron_array_blue[i].position.x =

                gltf_loads.left_wing.position.x - 1;

            gsap.to(icosa_loads.icosahedron_array_blue[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_blue[i].position, 0.1, {
                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() - 2),


                ease: "back.Out",
            });

        }

        gsap.to(icosa_loads.icosahedron_array_blue[i].material, 0.5, {
            opacity: 0,
            ease: "back.Out",
        });
    }

}

// green explosions area starts ................................................................................

async function icosa_explosion_green_nose_func() {

    for (let i = 0; i < icosa_loads.icosahedron_array_green.length; i++) {
        if (i < 25) {
            icosa_loads.icosahedron_array_green[i].position.x =

                gltf_loads.nose_cone.position.x;
            gsap.to(icosa_loads.icosahedron_array_green[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_green[i].position, 0.1, {
                x: -(1 * Math.random()),
                y: +(1 * Math.random()),
                z: gltf_loads.nose_cone.position.z,

                ease: "back.Out",
            });

        } else {
            icosa_loads.icosahedron_array_green[i].position.x =

                gltf_loads.nose_cone.position.x;

            gsap.to(icosa_loads.icosahedron_array_green[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_green[i].position, 0.1, {
                x: +(1 * Math.random()),

                y: +(1 * Math.random()),
                z: gltf_loads.nose_cone.position.z,


                ease: "back.Out",
            });

        }

        gsap.to(icosa_loads.icosahedron_array_green[i].material, 0.5, {
            opacity: 0,
            ease: "back.Out",
        });
    }
}

function icosa_explosion_green_wing_right_func() {

    for (let i = 0; i < icosa_loads.icosahedron_array_green.length; i++) {
        if (i < 25) {
            icosa_loads.icosahedron_array_green[i].position.x =

                gltf_loads.right_wing.position.x + 1;
            gsap.to(icosa_loads.icosahedron_array_green[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_green[i].position, 0.1, {
                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() + 2),

                ease: "back.Out",
            });

        } else {
            icosa_loads.icosahedron_array_green[i].position.x =

                gltf_loads.right_wing.position.x + 1;

            gsap.to(icosa_loads.icosahedron_array_green[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_green[i].position, 0.1, {
                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() + 2),


                ease: "back.Out",
            });

        }

        gsap.to(icosa_loads.icosahedron_array_green[i].material, 0.5, {
            opacity: 0,
            ease: "back.Out",
        });
    }
}
function icosa_explosion_green_wing_left_func() {

    for (let i = 0; i < icosa_loads.icosahedron_array_green.length; i++) {
        if (i < 25) {
            icosa_loads.icosahedron_array_green[i].position.x =

                gltf_loads.left_wing.position.x - 1;
            gsap.to(icosa_loads.icosahedron_array_green[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_green[i].position, 0.1, {
                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() - 2),

                ease: "back.Out",
            });

        } else {
            icosa_loads.icosahedron_array_green[i].position.x =

                gltf_loads.left_wing.position.x - 1;

            gsap.to(icosa_loads.icosahedron_array_green[i].material, 0.1, {
                //color: color,
                opacity: 1,
                ease: "back.Out",
            });


            gsap.to(icosa_loads.icosahedron_array_green[i].position, 0.1, {
                z: (-1 * Math.random()),
                y: +(1 * Math.random()),
                x: (1 * Math.random() - 2),


                ease: "back.Out",
            });

        }

        gsap.to(icosa_loads.icosahedron_array_green[i].material, 0.5, {
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