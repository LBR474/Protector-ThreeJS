//import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

import * as THREE from 'https://cdn.skypack.dev/three@0.120.0'


import {
    GLTFLoader
} from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/loaders/GLTFLoader.js';
import * as tweenMax from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js';

import {
    OrbitControls
} from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/controls/OrbitControls.js';
//'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';

import {
    torus_left_wing, torus_right_wing
} from './torus.js';

import {
    exp_cube, exp_cube_geometry, exp_cube_array, makeInstance
} from './exp_cube.js';

import {
    icosahedron_red, icosahedron_blue, icosahedron_green,
    make_Icosa_instance_red, make_Icosa_instance_blue, make_Icosa_instance_green,
    icosahedron_array_red, icosahedron_array_blue, icosahedron_array_green
} from './icosa_hedron.js';
import {
    protector_group, protector, protector_cylinders, mines_array, mine_red, mine_blue, mine_green
} from './gltf_loading_script.js';

import {
    cube_array_explosion_func, 
    icosa_explosion_red_func, 
    icosa_explosion_blue_func,
    icosa_explosion_green_func
} from './explosion_functions';

//cube_array_explosion_func, icosa_explosion_func


// import {
//     protector_group, mines_array, mine_red, mine_blue, mine_green
// } from './gltf_loading_script.js';








const scene = new THREE.Scene();

const texloader = new THREE.TextureLoader();
const bgTexture = texloader.load('./images/extra_stars_pic.png');






scene.background = bgTexture;

//scene.background = new THREE.Color('white');
//scene.add(exp_cube);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();



// camera area begins .....................................................
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);

camera.position.z = 7;
camera.position.y = 1;



scene.add(camera);


// lights area begins .....................................................

{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    const light2 = new THREE.DirectionalLight(color, intensity);
    light2.position.set(0, -2, 0);
    light2.target.position.set(0, 0, 0);
    scene.add(light, light2);
    scene.add(light2.target);
}



// canvas area begins .....................................................

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({
    canvas
});


// controls area begins .....................................................

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 1, 0);
controls.passive = true;
controls.update();



// global variable area begins .....................................................

var y_pos = 0;
var z_pos = -5;
let collision_count_wing = 0;
let collision_count_nose = 0;


let inc_ = 0.1;
var counter = 0;
let module_score = 0;



var pause = false;
var newMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    //map: texloader.load('./images/extra_stars_pic.png'),
});
var explodeMaterial = new THREE.MeshPhongMaterial({
    color: 0xFF0000,
    //map: texloader.load('./images/extra_stars_pic.png'),
});



// protector masking shape(s) area begins .....................................................

var hull_geometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 52,
    16);

let hull_material = new THREE.MeshPhongMaterial({
    //color: 'transparent',
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



protector_group.add(hull_nose, hull_tail, torus_left_wing, torus_right_wing);

let num_cubes_and_isos = 50;


for (let index = 0; index < num_cubes_and_isos; index++) {
    makeInstance(exp_cube_geometry, 0.1, 0.1);
    scene.add(exp_cube);

}
for (let index = 0; index < num_cubes_and_isos; index++) {
    make_Icosa_instance_red(0.1, 0.1);
    scene.add(icosahedron_red);
}
for (let index = 0; index < num_cubes_and_isos; index++) {
    make_Icosa_instance_blue(0.1, 0.1);
    scene.add(icosahedron_blue);
}
for (let index = 0; index < num_cubes_and_isos; index++) {
    make_Icosa_instance_green(0.1, 0.1);
    scene.add(icosahedron_green);
}






let cos_divider = 48;
let sin_divider = 48;
let index = 1;
//const mines_array = [];
const loadingElem = document.querySelector('#loading');
function lotsa_cubes() {

}
setTimeout(lotsa_cubes(), 5000);



// gltf area begins .....................................................

const gltfLoader = new GLTFLoader();







// render area begins .....................................................

var clock = new THREE.Clock();
let render_counter = 0;

function render() {
    render_counter += 1;

    const loadingElem = document.querySelector('#loading');

    if (protector && render_counter < 7) {


        loadingElem.style.display = 'none';
        scene.add(protector);
    }




    var z_pos_when_stopped = z_pos;
    var y_pos_when_stopped = y_pos;





    renderer.render(scene, camera);

    requestAnimationFrame(render);
    if (resizeRendererToDisplaySize(renderer)) {
        //const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

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


// score update function area begins .....................................................
let score_update = (module_score) => {

    if (module_score >= 2000) {
        inc_ = 0.19;
    } else if (1999 >= module_score && module_score >= 1000) {
        inc_ = 0.16;
    } else if (999 >= module_score && module_score >= 500) {
        inc_ = 0.13;
    } else {
        inc_ = 0.1;
    }
    document.querySelector("#SD_score_par").innerHTML =
        "Current score: " + module_score;

    document.querySelector("#SD_C_C_par").innerHTML =
        "Number of collisions: " + (collision_count_nose + collision_count_wing);


    if ($("#trm_name").val()) {
        document.querySelector("#SD_logged_in_par").innerHTML =
            ($("#trm_name").val());
    }

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
        "";

    document.querySelector("#C_D_F_next_level").innerHTML =
        "<a href='./GQ_local_8.php'><h3>Try again?</h3></a>";




    //C_D_F_next_level


    gsap.to("#collision_div_finish_level", {
        display: "block",
        duration: 0.3
    });
    pause = true;
}



let level_finish = (collision_count_wing, collision_count_nose) => {
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
        "<h1>Congratulations" + player + ", Tothian mine field outer perimeter passed"
        + "<h3>Number of wing collisions " + collision_count_wing +
        "<br>Number of hull collisions " + collision_count_nose +
        "<br>Total score: " + module_score;
    document.querySelector("#C_D_F_next_level").innerHTML =
        "<a href='./GQ_local_7.php'><h3>Go to next level?</h3></a>";

    document.querySelector("#C_D_F_try_again").innerHTML =
        "";



    gsap.to("#collision_div_finish_level", {
        display: "block",
        duration: 0.3
    });
    pause = true;

    // gsap.to(mine_blue.scale, {
    //     duration: .7,
    //     x: 0.2,
    //     y: 0.2,
    //     z: 0.2
    // });
    // gsap.to(mine_red.scale, {
    //     duration: .7,
    //     x: 0.2,
    //     y: 0.2,
    //     z: 0.2
    // });
    // gsap.to(mine_green.scale, {
    //     duration: .7,
    //     x: 0.2,
    //     y: 0.2,
    //     z: 0.2
    // });

}











// // red mine move function area begins .....................................................

let i = 0;
let red_mine = (time) => {



    scene.add(mines_array[i]);
    let hull_box = new THREE.Box3().setFromObject(hull_nose);
    let left_wing_box = new THREE.Box3().setFromObject(torus_left_wing);
    let right_wing_box = new THREE.Box3().setFromObject(torus_right_wing);

    let mine_box = new THREE.Box3().setFromObject(
        mines_array[i]);


    var intersects_red_nose = hull_box.intersectsBox(mine_box);
    var intersects_red_left = left_wing_box.intersectsBox(mine_box);
    var intersects_red_right = right_wing_box.intersectsBox(mine_box);

    if (mines_array[i].position.z >= 7.5) {

        module_score += 100;
        score_update(module_score);
        if (module_score >= 3000) {
            level_finish(collision_count_wing, collision_count_nose);
            return;
        }
        scene.remove(mines_array[i]);
        mines_array[i].position.x = protector_group.position.x;
        if (i == 2) {
            i = 0;
        } else {
            i += 1;
        }
        mine_move_control();


    }
    else if (intersects_red_right) {


        if (i == 0) {
            gsap.to("#collision_div_red", {
                display: "block",
                duration: 0.3
            });
            document.querySelector("#C_N_red_nose_par").innerHTML =
                "";
            document.querySelector("#C_N_red_left_wing_par").innerHTML =
                "";
            document.querySelector("#C_N_red_right_wing_par").innerHTML =
                "Collision - wing";

            torus_right_wing.material.color.setRGB(1, 0, 0);
            torus_right_wing.material.opacity = 1;

        }
        else if (i == 1) {
            gsap.to("#collision_div_blue", {
                display: "block",
                duration: 0.3
            });
            document.querySelector("#C_N_blue_nose_par").innerHTML =
                "";
            document.querySelector("#C_N_blue_left_wing_par").innerHTML =
                "";
            document.querySelector("#C_N_blue_right_wing_par").innerHTML =
                "Collision - wing";

            torus_right_wing.material.color.setRGB(0, 0, 1);
            torus_right_wing.material.opacity = 1;
        } else if (i == 2) {
            gsap.to("#collision_div_green", {
                display: "block",
                duration: 0.3
            });
            document.querySelector("#C_N_green_nose_par").innerHTML =
                "";
            document.querySelector("#C_N_green_left_wing_par").innerHTML =
                "";
            document.querySelector("#C_N_green_right_wing_par").innerHTML =
                "Collision - wing";

            torus_right_wing.material.color.setRGB(0, 1, 0);
            torus_right_wing.material.opacity = 1;
        }


        scene.remove(mines_array[i]);

        if (i == 2) {
            i = 0;
        } else {
            i += 1;
        }
        module_score -= 250;
        collision_count_wing += 1;
        if ((collision_count_wing + collision_count_nose) > 4) {
            level_game_over();
        }
        score_update(module_score);


        setTimeout(mine_move_control(), 0);


    }
    else if (intersects_red_left) {
        if (i == 0) {
            gsap.to("#collision_div_red", {
                display: "block",
                duration: 0.3
            });
            document.querySelector("#C_N_red_nose_par").innerHTML =
                "";
            document.querySelector("#C_N_red_left_wing_par").innerHTML =
                "";
            document.querySelector("#C_N_red_right_wing_par").innerHTML =
                "Collision - wing";

            torus_left_wing.material.color.setRGB(1, 0, 0);
            torus_left_wing.material.opacity = 1;

        }
        else if (i == 1) {
            gsap.to("#collision_div_blue", {
                display: "block",
                duration: 0.3
            });
            document.querySelector("#C_N_blue_nose_par").innerHTML =
                "";
            document.querySelector("#C_N_blue_left_wing_par").innerHTML =
                "";
            document.querySelector("#C_N_blue_right_wing_par").innerHTML =
                "Collision - wing";

            torus_left_wing.material.color.setRGB(0, 0, 1);
            torus_left_wing.material.opacity = 1;
        } else if (i == 2) {
            gsap.to("#collision_div_green", {
                display: "block",
                duration: 0.3
            });
            document.querySelector("#C_N_green_nose_par").innerHTML =
                "";
            document.querySelector("#C_N_green_left_wing_par").innerHTML =
                "";
            document.querySelector("#C_N_green_right_wing_par").innerHTML =
                "Collision - wing";

            torus_left_wing.material.color.setRGB(0, 1, 0);
            torus_left_wing.material.opacity = 1;
        }


        scene.remove(mines_array[i]);

        if (i == 2) {
            i = 0;
        } else {
            i += 1;
        }
        module_score -= 250;
        collision_count_wing += 1;
        if (collision_count_wing > 4) {
            level_game_over();
        }
        score_update(module_score);


        setTimeout(mine_move_control(), 0);



    }
    else if (intersects_red_nose) {

        document.querySelector("#C_N_red_left_wing_par").innerHTML =
            "";
        document.querySelector("#C_N_red_right_wing_par").innerHTML =
            "";


        if (i == 0) {
            icosa_explosion_red_func();
            //cube_array_explosion_func();
            gsap.to("#collision_div_red", {
                display: "block",
                duration: 0.3
            });
            hull_nose.material.color.setRGB(1, 0, 0);
            hull_nose.material.opacity = 1;
            hull_tail.material.color.setRGB(1, 0, 0);
            hull_tail.material.opacity = 1;


        } else if (i == 1) {
            icosa_explosion_blue_func();
            //cube_array_explosion_func();
            gsap.to("#collision_div_blue", {
                display: "block",
                duration: 0.3
            });
            hull_nose.material.color.setRGB(0, 0, 1);
            hull_nose.material.opacity = 1;
            hull_tail.material.color.setRGB(0, 0, 1);
            hull_tail.material.opacity = 1;

        } else if (i == 2) {
            icosa_explosion_green_func();

              gsap.to("#collision_div_green", {
                display: "block",
                duration: 0.3
            });
            hull_nose.material.color.setRGB(0, 1, 0);
            hull_nose.material.opacity = 1;
            hull_tail.material.color.setRGB(0, 1, 0);
            hull_tail.material.opacity = 1;
        }

        scene.remove(mines_array[i]);
        if (i == 2) {
            i = 0;
        } else {
            i += 1;
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
        mines_array[i].position.z += inc_;
        renderer.render(scene, camera);
    } else {
        mines_array[i].position.z += inc_;
        mines_array[i].rotation.x += inc_ * 0.1;
        mines_array[i].rotation.y += inc_;



        requestAnimationFrame(red_mine);
        renderer.render(scene, camera);
    }


   
}




// mine move control function area begins .....................................................



let mine_run_counter = 0;
var standardColor = new THREE.Color(0xFFFFFF);

var mine_move_control = () => {
    protector_group.add(protector_cylinders[0]);
    scene.add(protector_group);

    score_update(module_score);

    exp_cube.traverse((o) => {


        if (o.isMesh) {

            for (let index = 0; index < exp_cube_array.length; index++) {
                gsap.to(exp_cube_array[index].material, 2, {
                    opacity: 0,
                    ease: "back.Out",
                });
                // gsap.to(icosahedron_array[index].material, 2, {
                //     opacity: 1,
                //     ease: "back.Out",
                // });

            }



        }
    });
    icosahedron_red.traverse((o) => {


        if (o.isMesh) {

            for (let index = 0; index < icosahedron_array_red.length; index++) {

                gsap.to(icosahedron_array_red[index].material, 2, {
                    opacity: 0,
                    ease: "back.Out",
                });

            }



        }
    });
    icosahedron_blue.traverse((o) => {


        if (o.isMesh) {

            for (let index = 0; index < icosahedron_array_blue.length; index++) {

                gsap.to(icosahedron_array_blue[index].material, 2, {
                    opacity: 0,
                    ease: "back.Out",
                });
                // for (let index = 0; index < exp_cube_array.length; index++) {
                //     gsap.to(exp_cube_array[index].material, 2, {
                //         opacity: 0,
                //         ease: "back.Out",
                //     });
                // }

            }



        }
    });
    icosahedron_green.traverse((o) => {


        if (o.isMesh) {

            for (let index = 0; index < icosahedron_array_green.length; index++) {

                gsap.to(icosahedron_array_green[index].material, 2, {
                    opacity: 0,
                    ease: "back.Out",
                });
                // for (let index = 0; index < exp_cube_array.length; index++) {
                //     gsap.to(exp_cube_array[index].material, 2, {
                //         opacity: 0,
                //         ease: "back.Out",
                //     });
                // }

            }



        }
    });






    protector.traverse((o) => {


        if (o.isMesh) {

            gsap.to(o.material.color, 2, {
                r: standardColor.r,
                g: standardColor.g,
                b: standardColor.b,
                ease: "back.Out",
            });

        }
    });
    hull_nose.traverse((o) => {


        if (o.isMesh) {

            gsap.to(o.material.color, 2, {
                r: standardColor.r,
                g: standardColor.g,
                b: standardColor.b,
                ease: "back.Out",
            });
        }
    });
    torus_left_wing.traverse((o) => {


        if (o.isMesh) {

            gsap.to(o.material.color, 2, {
                r: standardColor.r,
                g: standardColor.g,
                b: standardColor.b,
                ease: "back.Out",
            });
        }
    });
    torus_right_wing.traverse((o) => {


        if (o.isMesh) {

            gsap.to(o.material.color, 2, {
                r: standardColor.r,
                g: standardColor.g,
                b: standardColor.b,
                ease: "back.Out",
            });
        }
    });
    gsap.to(torus_right_wing.material, 2, {
        opacity: 0,
        ease: "back.Out",
    });
    gsap.to(torus_left_wing.material, 2, {
        opacity: 0,
        ease: "back.Out",
    });
    gsap.to(hull_nose.material, 2, {
        opacity: 0,
        ease: "back.Out",
    });
    gsap.to("#collision_div_red", {
        display: "none",
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

    mine_run_counter += 1;


    if (pause == true) {



        mines_array[i].position.z = -20;
        gsap.to(mines_array[i].scale, {
            duration: .7,
            x: 0.2,
            y: 0.2
        });
        red_mine();
        return;

    } else {


        mines_array[i].position.z = -20;


        red_mine();
        return;


    }
}





// // query selector area begins .....................................................
var startup = document.getElementById("c");




startup.addEventListener("keydown", function (e) {



    // if (click_counter == 0) {

    if (e.keyCode == 37 || e.keyCode == 100) {
        // move left

        protector_group.position.x -= 1;

    } else if (e.keyCode == 39 || e.keyCode == 102) {
        // move right
        protector_group.position.x += 1;

        // camera.lookAt(camera.position.x, 0, 0);
    } else if (e.keyCode == 38 || e.keyCode == 104) {
        //move up
        protector_group.position.y += 1;

    } else if (e.keyCode == 40 || e.keyCode == 98) {
        //move down
        protector_group.position.y -= 1;

    } else if (e.keyCode == 103 || e.keyCode == 36) {
        // move diagonal left and up
        protector_group.position.x -= 1;
        protector_group.position.y += 1;

    } else if (e.keyCode == 97 || e.keyCode == 35) {
        // move diagonal left and down
        protector_group.position.x -= 1;
        protector_group.position.y -= 1;

    } else if (e.keyCode == 105 || e.keyCode == 33) {
        // move diagonal right and up
        protector_group.position.x += 1;
        protector_group.position.y += 1;

    } else if (e.keyCode == 99 || e.keyCode == 34) {
        // move diagonal right and down
        protector_group.position.x += 1;
        protector_group.position.y -= 1;

    }


});

colmiddle1.querySelector("#c").addEventListener('mousemove', function mouse_moved(e) {

    for (let index = 0; index < icosahedron_array_red.length; index++) {
        protector_group.add(icosahedron_array_red[index]);
        protector_group.add(icosahedron_array_blue[index]);
        protector_group.add(icosahedron_array_green[index]);
        protector_group.add(exp_cube_array[index]);

    }

    // scene.add(protector_group);
});


let click_counter = 0;

document.querySelector("#c").addEventListener('click', function clicked(e) {


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






    mine_run_counter -= 1;
    mine_move_control();

});


document.querySelector("#continue1").addEventListener("keydown", function (e) {

    $("#trm_name").hide();
    $("#trm_login_button").hide();
    $("#name_enter").hide();


    if (e.keyCode == 37 || e.keyCode == 100) {
        // move left

        protector_group.position.x -= 1;

    } else if (e.keyCode == 39 || e.keyCode == 102) {
        // move right
        protector_group.position.x += 1;

        // camera.lookAt(camera.position.x, 0, 0);
    } else if (e.keyCode == 38 || e.keyCode == 104) {
        //move up
        protector_group.position.y += 1;

    } else if (e.keyCode == 40 || e.keyCode == 98) {
        //move down
        protector_group.position.y -= 1;

    } else if (e.keyCode == 103 || e.keyCode == 36) {
        // move diagonal left and up
        protector_group.position.x -= 1;
        protector_group.position.y += 1;

    } else if (e.keyCode == 97 || e.keyCode == 35) {
        // move diagonal left and down
        protector_group.position.x -= 1;
        protector_group.position.y -= 1;

    } else if (e.keyCode == 105 || e.keyCode == 33) {
        // move diagonal right and up
        protector_group.position.x += 1;
        protector_group.position.y += 1;

    } else if (e.keyCode == 99 || e.keyCode == 34) {
        // move diagonal right and down
        protector_group.position.x += 1;
        protector_group.position.y -= 1;

    }


});






// let z_pos_when_stopped;
// let y_pos_when_stopped;
// let stop_counter = 0;
let player_name = $("#trm_name").val();
document.querySelector("#stop1").addEventListener('click', function () {

    if (!$("#trm_name").val()) {
        $("#trm_name").show();
        $("#trm_login_button").show();
        $("#name_enter").show();
    }

    // document.querySelector("#SD_score_par").innerHTML =
    // "</p>Current score: " + score;



    //stop_counter += 1;




    pause = true;
    //render(z_pos_when_stopped, y_pos_when_stopped);

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

    // let url = "http://localhost/three_js_fundamentals/three.js-r128/protector/GQ_local_6.php#";
    // window.location.href = url;

    history.go(0);


});


render();

// render();
//lotsa_cubes();
