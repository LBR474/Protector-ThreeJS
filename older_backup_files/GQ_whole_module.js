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






const scene = new THREE.Scene();

const texloader = new THREE.TextureLoader();
const bgTexture = texloader.load('./images/extra_stars_pic.png');


let protector_group = new THREE.Group();



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

// document.querySelector('#SD_score_par').innerHTML =
//     $("#trm_name").val() + "Current score: " + score;


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


// scene.add(hull_nose);
// scene.add(hull_tail);
// scene.add(torus_left_wing, torus_right_wing);





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

    if (module_score >= 2000) {
        inc_ = 2.5;
    } else if (1999 >= module_score && module_score >= 1000) {
        inc_ = 0.2;
    } else if (999 >= module_score && module_score >= 500) {
        inc_ = 0.15;
    } else {
        inc_ = 0.1;
    }
    document.querySelector("#SD_score_par").innerHTML =
        "Current score: " + module_score;

    document.querySelector("#SD_C_C_par").innerHTML =
        "Number of collisions: " + (collision_count_nose + collision_count_wing) ;


    if ($("#trm_name").val()) {
        document.querySelector("#SD_logged_in_par").innerHTML =
            ($("#trm_name").val());
    }

}

let level_game_over = (collision_count_wing, collision_count_nose) => {
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
        "<a href='./GQ_local_7.php'><h3>Try again?</h3></a>";

        
   

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








// blue mine move function area begins .....................................................

let blue_mine_box;
let box1 = new THREE.Box3().setFromObject(hull_nose);

let blue_mine = () => {



    scene.add(mine_blue);
    let hull_box = new THREE.Box3().setFromObject(hull_nose);
    let left_wing_box = new THREE.Box3().setFromObject(torus_left_wing);
    let right_wing_box = new THREE.Box3().setFromObject(torus_right_wing);


    blue_mine_box = new THREE.Box3().setFromObject(
        mine_blue);



    var intersects_blue_nose = hull_box.intersectsBox(blue_mine_box);
    var intersects_blue_right = right_wing_box.intersectsBox(blue_mine_box);
    var intersects_blue_left = left_wing_box.intersectsBox(blue_mine_box);

    if (mine_blue.position.z >= 7.5) {
        module_score += 100;
        
        score_update(module_score);
        scene.remove(mine_blue);
        if (module_score >= 3000) {
            level_finish(collision_count_wing, collision_count_nose);
            return;
        }
        mine_blue.position.x = protector_group.position.x;
        mine_move_control();

    } 
   else if (intersects_blue_right) {

       

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


        scene.remove(mine_blue);
        module_score -= 250;
         collision_count_wing += 1; 
        score_update(module_score);


        setTimeout(mine_move_control(), 4000);


    }
    else if (intersects_blue_left) {
         
        document.querySelector("#C_N_blue_nose_par").innerHTML =
            "";
        document.querySelector("#C_N_blue_right_wing_par").innerHTML =
            "";
        document.querySelector("#C_N_blue_left_wing_par").innerHTML =
            "Collision - wing";

        gsap.to("#collision_div_blue", {
            display: "block",
            duration: 0.3
        });


        torus_left_wing.material.color.setRGB(0, 0, 1);
        torus_left_wing.material.opacity = 1;


        scene.remove(mine_blue);
        module_score -= 250;
        collision_count_wing += 1;
        score_update(module_score);


        setTimeout(mine_move_control(), 4000);


    }
    else if (intersects_blue_nose) {
       
        

        document.querySelector("#C_N_blue_left_wing_par").innerHTML =
            "";
        document.querySelector("#C_N_blue_right_wing_par").innerHTML =
            "";

        gsap.to("#collision_div_blue", {
            display: "block",
            duration: 0.3
        });

        hull_nose.material.color.setRGB(0, 0, 1);
        hull_nose.material.opacity = 1;
        hull_tail.material.color.setRGB(0, 0, 1);
        hull_tail.material.opacity = 1;

        scene.remove(mine_blue);
        module_score -= 500;
        collision_count_nose += 1;
        score_update(module_score);

        setTimeout(mine_move_control(), 4000);
    }

    
    else if (pause == true) {
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
    let left_wing_box = new THREE.Box3().setFromObject(torus_left_wing);
    let right_wing_box = new THREE.Box3().setFromObject(torus_right_wing);


    green_mine_box = new THREE.Box3().setFromObject(
        mine_green);



    var intersects_green_nose = hull_box.intersectsBox(green_mine_box);
    var intersects_green_right = right_wing_box.intersectsBox(green_mine_box);
    var intersects_green_left = left_wing_box.intersectsBox(green_mine_box);

    if (mine_green.position.z >= 7.5) {
        module_score += 100;
        score_update(module_score);
        if (module_score >= 3000) {
            level_finish(collision_count_wing, collision_count_nose);
            return;
        }
        scene.remove(mine_green);
        mine_green.position.x = protector_group.position.x;
        mine_move_control();

    }
    else if (intersects_green_right) {

        collision_count_wing += 1; 

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


        scene.remove(mine_green);
        module_score -= 250;
        score_update(module_score);


        setTimeout(mine_move_control(), 4000);


    }
    else if (intersects_green_left) {

        collision_count_wing += 1; 


        document.querySelector("#C_N_green_nose_par").innerHTML =
            "";
        document.querySelector("#C_N_green_right_wing_par").innerHTML =
            "";
        document.querySelector("#C_N_green_left_wing_par").innerHTML =
            "Collision - wing";

        gsap.to("#collision_div_green", {
            display: "block",
            duration: 0.3
        });


        torus_left_wing.material.color.setRGB(0, 1, 0);
        torus_left_wing.material.opacity = 1;


        scene.remove(mine_green);
        module_score -= 250;
        score_update(module_score);


        setTimeout(mine_move_control(), 4000);


    }
    else if (intersects_green_nose) {
        
        collision_count_nose += 1; 

        document.querySelector("#C_N_green_left_wing_par").innerHTML =
            "";
        document.querySelector("#C_N_green_right_wing_par").innerHTML =
            "";

        gsap.to("#collision_div_green", {
            display: "block",
            duration: 0.3
        });

        hull_nose.material.color.setRGB(0, 1, 0);
        hull_nose.material.opacity = 1;
        hull_tail.material.color.setRGB(0, 1, 0);
        hull_tail.material.opacity = 1;

        scene.remove(mine_green);
        module_score -= 500;
        score_update(module_score);

        setTimeout(mine_move_control(), 4000);
    }

    
    else if (pause == true) {
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
    let left_wing_box = new THREE.Box3().setFromObject(torus_left_wing);
    let right_wing_box = new THREE.Box3().setFromObject(torus_right_wing);

    red_mine_box = new THREE.Box3().setFromObject(
        mine_red);


    var intersects_red_nose = hull_box.intersectsBox(red_mine_box);
    var intersects_red_left = left_wing_box.intersectsBox(red_mine_box);
    var intersects_red_right = right_wing_box.intersectsBox(red_mine_box);

    if (mine_red.position.z >= 7.5) {
        module_score += 3100;
        score_update(module_score);
        if (module_score >= 3000) {
            level_finish(collision_count_wing, collision_count_nose);
            return;
        }
        scene.remove(mine_red);
        mine_red.position.x = protector_group.position.x;
        mine_move_control();


    }
    else if (intersects_red_right) {

        

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


        scene.remove(mine_red);
        module_score -= 250;
        collision_count_wing += 1; 
        if (collision_count_wing > 4) {
            level_game_over();
        }
        score_update(module_score);


        setTimeout(mine_move_control(), 4000);


    }
    else if (intersects_red_left) {
        

        document.querySelector("#C_N_red_nose_par").innerHTML =
            "";
        document.querySelector("#C_N_red_right_wing_par").innerHTML =
            "";
        document.querySelector("#C_N_red_left_wing_par").innerHTML =
            "Collision - wing";

        gsap.to("#collision_div_red", {
            display: "block",
            duration: 0.3
        });

        
        torus_left_wing.material.color.setRGB(1, 0, 0);
        torus_left_wing.material.opacity = 1;
        

        scene.remove(mine_red);
        module_score -= 250;
        collision_count_wing += 1;
        score_update(module_score);
       

        setTimeout(mine_move_control(), 4000);


    }
    else if (intersects_red_nose) {
        
        

        document.querySelector("#C_N_red_left_wing_par").innerHTML =
            "";
        document.querySelector("#C_N_red_right_wing_par").innerHTML =
            "";

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
        collision_count_nose += 1;
        score_update(module_score);
        
        setTimeout(mine_move_control(), 4000);
    } 
    
    
    
    else if (pause == true) {
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



let click_counter = 0;

document.querySelector("#c").addEventListener('click', function clicked(e) {

    protector_group.add(protector_cylinders[0]);
    scene.add(protector_group);

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


//})


//red_mine();
render();
