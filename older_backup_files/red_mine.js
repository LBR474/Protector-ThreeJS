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
// import {
//     protector
// } from './query_selectors_1.js';
// import {
//     score,
//     inc_,
//     score_update
// } from './query_selectors_1.js';





const scene = new THREE.Scene();

const texloader = new THREE.TextureLoader();
const bgTexture = texloader.load('./images/extra_stars_pic.png');
//const explosionTexture = texloader.load('./images/extra_stars_pic.png');




scene.background = bgTexture;
//scene.background = new THREE.Color('white');

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
controls.update();



// global variable area begins .....................................................

var y_pos = 0;
var z_pos = -5;

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

// document.querySelector('#SD_score_par').innerHTML =
//     $("#trm_name").val() + "Current score: " + score;


// protector masking shape(s) area begins .....................................................

var hull_geometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 52,
    16);

let hull_material = new THREE.MeshPhongMaterial({
    //color: 'transparent',
    opacity: 0.5,
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


scene.add(hull_nose);
scene.add(hull_tail);
scene.add(torus_left_wing, torus_right_wing);





// gltf area begins .....................................................

const gltfLoader = new GLTFLoader();
let mine_red;
const mines_array = [];








// // nsea protector area begins .....................................................

let protector;
const protector_cylinders = [];
gltfLoader.load(
    // resource URL
    'nsea_protector_hull_base_3.glb',
    // called when the resource is loaded
    function (gltf) {
        protector = gltf.scene;
        protector_cylinders.push(protector);
        protector.rotation.y = Math.PI;
        protector.position.y = -0.45;
        scene.add(gltf.scene);




    },


);
//scene.add(protector_cylinders[0]);

// red mine area begins .....................................................

gltfLoader.load(
    // resource URL
    'tothian_mine_extra_red_small.glb',
    // called when the resource is loaded
    function (gltf) {
        mine_red = gltf.scene;
        mine_red.position.x = 0.1;
        mine_red.position.z = -20;
        mine_red.scale.x = 5;
        mine_red.scale.y = 5;
        mine_red.scale.z = 5;


        mines_array.push(mine_red);
        scene.add(gltf.scene);


    },


);

// blue mine area begins .....................................................

let mine_blue;
gltfLoader.load(
    // resource URL
    'tothian_mine_blue_small.glb',
    // called when the resource is loaded
    function (gltf) {
        mine_blue = gltf.scene;
        mines_array.push(mine_blue);
        mine_blue.scale.x = 5;
        mine_blue.scale.y = 5;
        mine_blue.scale.z = 5;

        //scene.add(gltf.scene);



    },


);


// green mine area begins .....................................................
let mine_green;
gltfLoader.load(
    // resource URL
    'tothian_mine_green_small.glb',
    // called when the resource is loaded
    function (gltf) {
        mine_green = gltf.scene;
        mines_array.push(mine_green);
        mine_green.scale.x = 5;
        mine_green.scale.y = 5;
        mine_green.scale.z = 5;
        //scene.add(gltf.scene);


    },


);




// render area begins .....................................................

var clock = new THREE.Clock();

function render(time) {
    time *= 0.001;
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
function score_update(module_score) {

    if (3000 >= module_score && module_score >= 2000) {
        inc_ = 0.3;
    } else if (1999 >= module_score && module_score >= 1000) {
        inc_ = 0.2;
    } else if (999 >= module_score && module_score >= 500) {
        inc_ = 0.15;
    } else {
        inc_ = 0.1;
    }
    document.querySelector("#SD_score_par").innerHTML =
        "Current score: " + module_score;


    if ($("#trm_name").val()) {
        document.querySelector("#SD_logged_in_par").innerHTML =
            ($("#trm_name").val());
    }

}


// function score_update(score) {

//     if (3000 >= score && score >= 2000) {
//         inc_ = 0.3;
//     } else if (1999 >= score && score >= 1000) {
//         inc_ = 0.2;
//     } else if (999 >= score && score >= 500) {
//         inc_ = 0.15;
//     } else {
//         inc_ = 0.1;
//     }
//     document.querySelector("#SD_score_par").innerHTML =
//         "Current score: " + score;


//     if ($("#trm_name").val()) {
//         document.querySelector("#SD_logged_in_par").innerHTML =
//             ($("#trm_name").val());
//     }

// }







// blue mine move function area begins .....................................................

let blue_mine_box;
let box1 = new THREE.Box3().setFromObject(hull_nose);

let blue_mine = () => {



    scene.add(mine_blue);
    let hull_box = new THREE.Box3().setFromObject(hull_nose);

    blue_mine_box = new THREE.Box3().setFromObject(
        mine_blue);



    var intersects_blue = hull_box.intersectsBox(blue_mine_box);

    if (mine_blue.position.z >= 7.5) {
        module_score += 100;
        score_update(score);
        scene.remove(mine_blue);
        mine_blue.position.x = protector.position.x;
        mine_blue.position.y = protector.position.y;
        mine_move_control();

    } else if (intersects_blue) {

        gsap.to("#collision_div_blue", {
            display: "block",
            duration: 0.3
        });


        scene.remove(mine_blue);

        module_score -= 500;
        score_update(module_score);

        protector.traverse((o) => {


            if (o.isMesh) {

                o.material.color = new THREE.Color('blue');

            }
        });


        setTimeout(mine_move_control(), 4000);


    } else if (pause == true) {
        mine_blue.position.z += inc_;
        renderer.render(scene, camera);
    } else {

        mine_blue.position.z += inc_;
        mine_blue.rotation.x += inc_ * 0.1;
        mine_blue.rotation.y += inc_;

        requestAnimationFrame(blue_mine);
        renderer.render(scene, camera);
    }

}
// green mine move function area begins .....................................................

let green_mine_box;
let green_mine = () => {

    scene.add(mine_green);
    let hull_box = new THREE.Box3().setFromObject(hull_nose);

    green_mine_box = new THREE.Box3().setFromObject(
        mine_green);

    var intersects_green = hull_box.intersectsBox(green_mine_box);
    // var intersects_green = box1.intersect(green_mine_box);


    if (mine_green.position.z >= 7.5) {
        module_score += 100;
        score_update(module_score);
        scene.remove(mine_green);
        mine_green.position.x = protector.position.x;
        mine_green.position.y = protector.position.y;
        mine_move_control();

    } else if (intersects_green) {

        gsap.to("#collision_div_green", {
            display: "block",
            duration: 0.3
        });

        scene.remove(mine_green);
        module_score -= 500;
        score_update(module_score);

        protector.traverse((o) => {


            if (o.isMesh) {

                o.material.color = new THREE.Color('green');

            }
        });


        setTimeout(mine_move_control(), 4000);


    } else if (pause == true) {
        mine_green.position.z += inc_;
        renderer.render(scene, camera);
    } else {
        mine_green.position.z += inc_;
        mine_green.rotation.x += inc_ * 0.1;
        mine_green.rotation.y += inc_;

        requestAnimationFrame(green_mine);
        renderer.render(scene, camera);
    }
}



// // red mine move function area begins .....................................................

let red_mine_box;
let red_mine = () => {



    scene.add(mine_red);
    let hull_box = new THREE.Box3().setFromObject(hull_nose);

    red_mine_box = new THREE.Box3().setFromObject(
        mine_red);


    var intersects_red = hull_box.intersectsBox(red_mine_box);

    if (mine_red.position.z >= 7.5) {
        module_score += 100;
        score_update(module_score);
        scene.remove(mine_red);
        mine_red.position.x = protector.position.x;
        mine_move_control();


    } else if (intersects_red) {

        gsap.to("#collision_div_red", {
            display: "block",
            duration: 0.3
        });

        hull_nose.material.color.setRGB(1, 0, 0);
        hull_nose.material.opacity = 1;
        hull_tail.material.color.setRGB(1, 0, 0);
        hull_tail.material.opacity = 1;

        scene.remove(mine_red);
        module_score -= 500;
        score_update(module_score);
        protector.traverse((o) => {

            if (o.isMesh) {
                //o.material.color = new THREE.Color('red');

            }
        });


        setTimeout(mine_move_control(), 4000);


    } else if (pause == true) {
        mine_red.position.z += inc_;
        renderer.render(scene, camera);
    } else {
        mine_red.position.z += inc_;
        mine_red.rotation.x += inc_ * 0.1;
        mine_red.rotation.y += inc_;



        requestAnimationFrame(red_mine);
        renderer.render(scene, camera);
    }
}




// mine move control function area begins .....................................................



let mine_run_counter = 0;
var standardColor = new THREE.Color(0xFFFFFF);

var mine_move_control = () => {

    score_update(module_score);



    protector.traverse((o) => {


        if (o.isMesh) {
            //o.material = newMaterial;
            //o.material.color = new THREE.Color('silver');
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
            //o.material = newMaterial;
            //o.material.color = new THREE.Color('silver');
            gsap.to(o.material.color, 2, {
                r: standardColor.r,
                g: standardColor.g,
                b: standardColor.b,
                ease: "back.Out",
            });
        }
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

        if (mine_run_counter % 3 == 0) {

            mine_green.position.z = -20;
            gsap.to(mine_green.scale, {
                duration: .7,
                x: 0.2,
                y: 0.2
            });
            green_mine();
            return;
        } else if (mine_run_counter % 2 == 0) {

            mine_blue.position.z = -20;
            gsap.to(mine_blue.scale, {
                duration: .7,
                x: 0.2,
                y: 0.2
            });
            blue_mine();
            return;
        } else {

            mine_red.position.z = -20;
            gsap.to(mine_red.scale, {
                duration: .7,
                x: 0.2,
                y: 0.2
            });
            red_mine();
            return;
        }
    } else {

        if (mine_run_counter % 3 == 0) {

            mine_green.position.z = -20;

            green_mine();
            return;
        } else if (mine_run_counter % 2 == 0) {

            mine_blue.position.z = -20;

            blue_mine();
            return;
        } else {

            mine_red.position.z = -20;

            red_mine();
            return;
        }

    }
}





// query selector area begins .....................................................
var startup = document.getElementById("c");


startup.addEventListener("keydown", function (e) {



    // if (click_counter == 0) {

    if (e.keyCode == 37 || e.keyCode == 100) {
        // move left
        //e.repeat = true;
        protector_cylinders[0].position.x -= 0.51;
        hull_nose.position.x -= 0.51;







    } else if (e.keyCode == 39 || e.keyCode == 102) {
        // move right
        protector_cylinders[0].position.x += 1;
        hull_nose.position.x += 1;


        // camera.lookAt(camera.position.x, 0, 0);
    } else if (e.keyCode == 38 || e.keyCode == 104) {
        //move up
        protector_cylinders[0].position.y += 1;
        hull_nose.position.y += 1;
    } else if (e.keyCode == 40 || e.keyCode == 98) {
        //move down
        protector_cylinders[0].position.y -= 1;
        hull_nose.position.y -= 1;

    } else if (e.keyCode == 103 || e.keyCode == 36) {
        // move diagonal left and up
        protector_cylinders[0].position.x -= 1;
        protector_cylinders[0].position.y += 1;
        hull_nose.position.x -= 1;
        hull_nose.position.y += 1;
    } else if (e.keyCode == 97 || e.keyCode == 35) {
        // move diagonal left and down
        protector_cylinders[0].position.x -= 1;
        protector_cylinders[0].position.y -= 1;
        hull_nose.position.x -= 1;
        hull_nose.position.y -= 1;
    } else if (e.keyCode == 105 || e.keyCode == 33) {
        // move diagonal right and up
        protector_cylinders[0].position.x += 1;
        protector_cylinders[0].position.y += 1;
        hull_nose.position.x += 1;
        hull_nose.position.y += 1;
    } else if (e.keyCode == 99 || e.keyCode == 34) {
        // move diagonal right and down
        protector_cylinders[0].position.x += 1;
        protector_cylinders[0].position.y -= 1;
        hull_nose.position.x += 1;
        hull_nose.position.y -= 1;
    }

    // }
});




let click_counter = 0;

document.querySelector("#c").addEventListener('click', function clicked(e) {

    if (click_counter == 0) {
        mine_move_control();
        click_counter += 1;
    }
    // if ($("#trm_name").val()) {
    // document.querySelector("#SD_logged_in_par").innerHTML =
    // $("#trm_name").val();
    // }

    // document.querySelector("#SD_score_par").innerHTML =
    // "</p>Current score: " + score;

    $("#trm_name").hide();
    $("#trm_login_button").hide();
    $("#name_enter").hide();
    // $("#trm_blurb").hide();


    $("#top_right_menu").hide();
    $("#top_left_menu").show();


});



document.querySelector("#continue1").addEventListener('click', function () {




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





    if (e.keyCode == 37 || e.keyCode == 100) {
        // move left
        protector_cylinders[0].position.x -= 0.51;
        hull_nose.position.x -= 0.51;







    } else if (e.keyCode == 39 || e.keyCode == 102) {
        // move right
        protector_cylinders[0].position.x += 1;
        hull_nose.position.x += 1;


        // camera.lookAt(camera.position.x, 0, 0);
    } else if (e.keyCode == 38 || e.keyCode == 104) {
        //move up
        protector_cylinders[0].position.y += 1;
        hull_nose.position.y += 1;
    } else if (e.keyCode == 40 || e.keyCode == 98) {
        //move down
        protector_cylinders[0].position.y -= 1;
        hull_nose.position.y -= 1;

    } else if (e.keyCode == 103 || e.keyCode == 36) {
        // move diagonal left and up
        protector_cylinders[0].position.x -= 1;
        protector_cylinders[0].position.y += 1;
        hull_nose.position.x -= 1;
        hull_nose.position.y += 1;
    } else if (e.keyCode == 97 || e.keyCode == 35) {
        // move diagonal left and down
        protector_cylinders[0].position.x -= 1;
        protector_cylinders[0].position.y -= 1;
        hull_nose.position.x -= 1;
        hull_nose.position.y -= 1;
    } else if (e.keyCode == 105 || e.keyCode == 33) {
        // move diagonal right and up
        protector_cylinders[0].position.x += 1;
        protector_cylinders[0].position.y += 1;
        hull_nose.position.x += 1;
        hull_nose.position.y += 1;
    } else if (e.keyCode == 99 || e.keyCode == 34) {
        // move diagonal right and down
        protector_cylinders[0].position.x += 1;
        protector_cylinders[0].position.y -= 1;
        hull_nose.position.x += 1;
        hull_nose.position.y -= 1;
    }


});




let z_pos_when_stopped;
let y_pos_when_stopped;
let stop_counter = 0;
document.querySelector("#stop1").addEventListener('click', function () {
    if (!$("#trm_name").val()) {
        $("#trm_name").show();
        $("#trm_login_button").show();
        $("#name_enter").show();
    }

    // document.querySelector("#SD_score_par").innerHTML =
    // "</p>Current score: " + score;



    stop_counter += 1;




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


//})


//red_mine();
render();
