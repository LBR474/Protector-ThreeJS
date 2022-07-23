<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <title>GQ local</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0px;
        }

        #top_left_menu {

            position: fixed;
            top: '100px';
            left: '0px';
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            background-color: #333;
            color: #f1f1f1;


            display: none;
        }


        #top_left_menu a {
            float: left;
            display: block;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }


        #top_left_menu a:hover {
            background-color: white;
            color: aqua;
        }


        #top_right_menu {

            position: absolute;
            top: 40px;
            left: 30vw;
            float: right;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            background-color: #333;
            color: #f1f1f1;


            display: block;
        }

        #db_connect_div {

            position: relative;
            /* top: '100px';
            right: '0px'; */
            height: fit-content;
            float: right;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            background-color: #333;
            color: #f1f1f1;


            display: block;
        }

        #db_connect_div a {
            float: left;
            display: block;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }

        #db_connect_div a:hover {
            background-color: white;
            color: aqua;
        }

        #score_div {

            position: relative;
            float: right;
            /* top: 255px;
            right: 0px; */
            color: #f2f2f2;
            text-align: center;
            width: 100px;

            /* background-color: rgb(20, 233, 13); */
            color: #f1f1f1;

            display: block;
        }

        #collision_div_red {

            position: absolute;
            top: 255px;
            left: 255px;
            color: #f2f2f2;
            text-align: center;
            width: 100px;

            background-color: rgb(145, 10, 10);
            color: #f1f1f1;

            display: none;
        }

        #collision_div_blue {

            position: absolute;
            top: 255px;
            left: 255px;
            color: #f2f2f2;
            text-align: center;
            width: 100px;

            background-color: rgb(90, 13, 233);
            color: #f1f1f1;

            display: none;
        }

        #collision_div_green {

            position: absolute;
            top: 255px;
            left: 255px;
            color: #f2f2f2;
            text-align: center;
            width: 100px;

            background-color: rgb(20, 233, 13);
            color: #f1f1f1;

            display: none;
        }



        #colmiddle1 {
            position: absolute;
            left: 0px;
            width: 100%;
            height: 100%;
            z-index: -1;
            align-content: center;
            text-align: center;
            float: right;

        }



        #c {
            width: 100%;
            height: 100%;

            display: block;
            border-style: dotted;
            border-width: 0px;
            /* background-color: pink; */
        }

        #d {
            width: 100%;
            height: 100%;

            display: block;
            border-style: dotted;
            border-width: 2px;
            background-color: pink;
        }
    </style>
    <script src="../jquery/jquery-3.5.1.min.js"></script>

    <script>
        $(document).ready(function() {




            $("#c").click(function() {
                $("#top_left_menu").fadeIn();

                $("#top_right_menu").fadeOut();

            });



        });
    </script>

</head>

<body>



    <div id="top_left_menu">
        <!-- <li></li> -->
        <p></p>

        <a href="#" id="stop1">Pause</a>
        <p></p>
        <a href="#" id="continue1">Continue</a>
        <p></p>
        <a href="#" id="reset1">Reset</a>
        <p></p>
    </div>
    <div id="top_right_menu">
        <p id="trn_intro">Click on stars background pic to start.
        <p id="trm_blurb">
            Arrow and num pad keys move the Protector <br>
            around to avoid incoming mines.<br>
            <br>
            100 points added for each mine avoided.<br>
            <br>
            -500 for each collision, <br>five collisions in
            one area<br> of the spaceship == game over.
        </p>
        <p id="name_enter"> Enter your name (optional).</p>
        <input type="text" id="trm_name">
        <p>
            <button id="login_button">Enter</button>
            <script>
                $(document).ready(function() {


                    $("button").click(function() {
                        let name = ($("#trm_name").val());
                        //name;
                        document.querySelector("#dbc_demo2").innerHTML =
                            ($("#trm_name").val());





                        document.querySelector("#score_par").innerHTML =
                            ("Current player: <p>" + name +
                                "<p>Current score: <p>" + score);


                        $("#trm_name").hide();
                        $("#login_button").hide();
                        $("#name_enter").hide();
                        $("#trm_blurb").hide();
                        $("#dbc_pause1").hide();


                    });
                });
                //});
            </script>







    </div>
    <div id="score_div">
        <p id='logged_in_par'>
            <script>
                let score = 0;

                document.querySelector('#score_div').innerHTML =
                    "Score div Current score: " + score;
            </script>

    </div>
    <div id="db_connect_div">
        <script>
            $(document).ready(function() {
                $("#dbc_name").hide();
                $("#dbc_login_button").hide();
                $("#dbc_pause1").hide();
                $("#dbc_demo2").hide();

                $("button").click(function() {

                    //console.log($("#dbc_demo2").val());


                    if ($("#trm_name").val()) {
                        document.querySelector("#dbc_demo2").innerHTML =
                            ($("#trm_name").val());
                        document.querySelector("#logged_in_par").innerHTML =
                            ($("#trm_name").val());
                        $("#dbc_name").hide();
                        $("#dbc_login_button").hide();
                        $("#dbc_pause1").hide();

                        //$("#trm_name").val()
                            ($("#trm_name").val() +
                                " <br>Current score: <p>" + score);
                    } else if ($("#dbc_name").val()) {
                        // document.querySelector("#dbc_demo2").innerHTML =
                        //     ($("#dbc_name").val());
                        $("#dbc_name").hide();
                        $("#dbc_login_button").hide();
                        $("#dbc_pause1").hide();
                        document.querySelector("#score_par").innerHTML =
                            (
                                $("#dbc_name").val() +
                                "<br>Current score: <p>" + score);


                    } else {
                        $("#dbc_pause1").show();
                    }




                });

            });
            //});
        </script>
        <a href="#" id="dbc_pause1">Pause game and enter your name (optional).</a>
        <p></p>

        <p id="score_par">Current score: 0</p>
        <!-- <p id="demo1">For security and privacy reasons, -->
        <p id="dbc_demo2">Enter your name (optional).<br>



        <p> <input type="text" id="dbc_name"> <br>

            <button id="dbc_login_button">Enter</button>
        </p>

    </div>






    <div id="colmiddle1">


        <div id="collision_div_red">
            Collision.

        </div>
        <div id="collision_div_blue">
            Collision.
        </div>
        <div id="collision_div_green">
            Collision.
        </div>





        <canvas id="c" tabindex="0"></canvas>

        <script type="module">
            import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

            // import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

            import {
                GLTFLoader
            } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';
            import * as tweenMax from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js';
            import {
                OrbitControls
            } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';





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

            var inc_ = 0.1;
            var counter = 0;
            var A1_is_running = false;
            var A2_is_running = false;
            var A3_is_running = false;
            var pause = false;
            var newMaterial = new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                //map: texloader.load('./images/extra_stars_pic.png'),
            });
            var explodeMaterial = new THREE.MeshPhongMaterial({
                color: 0xFF0000,
                //map: texloader.load('./images/extra_stars_pic.png'),
            });

            // protector masking shape area begins .....................................................

            //const hull_geometry = new THREE.ConeGeometry(0.7, 1, 32, 64);
            var hull_geometry = new THREE.CylinderGeometry(0.5, 0.2, 3, 52,
                16);

            let hull_material = new THREE.MeshPhongMaterial({
                color: 'red',
                opacity: 1,
                transparent: true,
            });
            const hull = new THREE.Mesh(hull_geometry, hull_material);


            hull.rotation.x = Math.PI / 2;
            hull.position.y = -0.5;
            hull.position.z = -1;

            scene.add(hull);
            let size, x, y, z;



            // gltf  area begins .....................................................

            const gltfLoader = new GLTFLoader();
            let mine_red;
            const mines_array = [];








            // nsea protector area begins .....................................................

            let protector;
            const protector_cylinders = [];
            gltfLoader.load(
                // resource URL
                'nsea_protector_hull_base_3.glb',
                // called when the resource is loaded
                function(gltf) {
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
                function(gltf) {
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
                function(gltf) {
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
                function(gltf) {
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



            function score_update(score) {

                // document.querySelector("#score_div ").innerText = "Current Score " + score;
                // ($("#trm_name").val() +
                //     " <br>Current score: <p>" + score);
                if ($("#trm_name").val()) {
                    document.querySelector("#score_par").innerHTML =
                        //"Current Score: " + score;

                        ($("#trm_name").val() +
                            " <br>Current score: <p>" + score);
                } else if ($("#dbc_name").val()) {
                    document.querySelector("#score_par").innerHTML =
                        ($("#dbc_name").val() +
                            " <br>Current score: <p>" + score);

                } else {
                    document.querySelector("#score_par").innerHTML =

                        "Current score: <p>" + score;

                }

            }







            // blue mine move function area begins .....................................................

            let blue_mine_box;
            let box1 = new THREE.Box3().setFromObject(hull);

            let blue_mine = () => {



                scene.add(mine_blue);
                let hull_box = new THREE.Box3().setFromObject(hull);

                blue_mine_box = new THREE.Box3().setFromObject(
                    mine_blue);
                //red_mine_box = 
                //new THREE.Box3().setFromObject(cube_array[0]);


                var intersects_blue = hull_box.intersectsBox(blue_mine_box);

                //var intersects_blue = box1.intersect(blue_mine_box);

                if (mine_blue.position.z >= 7.5) {
                    score += 100;
                    score_update(score);
                    mine_move_control();

                } else if (intersects_blue) {

                    gsap.to("#collision_div_blue", {
                        display: "block",
                        duration: 0.3
                    });

                    scene.remove(mine_blue);
                    score -= 500;
                    score_update(score);

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
                    mine_blue.rotation.x += inc_;
                    mine_blue.rotation.z += inc_;

                    requestAnimationFrame(blue_mine);
                    renderer.render(scene, camera);
                }

            }
            // green mine move function area begins .....................................................

            let green_mine_box;
            let green_mine = () => {

                scene.add(mine_green);
                let hull_box = new THREE.Box3().setFromObject(hull);

                green_mine_box = new THREE.Box3().setFromObject(
                    mine_green);

                var intersects_green = hull_box.intersectsBox(green_mine_box);
                // var intersects_green = box1.intersect(green_mine_box);


                if (mine_green.position.z >= 7.5) {
                    score += 100;
                    score_update(score);
                    scene.remove(mine_green);
                    mine_move_control();

                } else if (intersects_green) {

                    gsap.to("#collision_div_green", {
                        display: "block",
                        duration: 0.3
                    });

                    scene.remove(mine_green);
                    score -= 500;
                    score_update(score);

                    protector.traverse((o) => {


                        if (o.isMesh) {

                            o.material.color = new THREE.Color('green');

                        }
                    });


                    setTimeout(mine_move_control(), 4000);


                } else if (pause == true) {
                    mine_green.position.z += inc_;
                    renderer.render(scene, camera);
                }
                // else if (mine_run_counter > 3) {
                //     mine_green.position.x = protector.position.x;
                //     mine_green.position.z += inc_;
                //     mine_green.rotation.y += inc_;
                //     renderer.render(scene, camera);
                //     requestAnimationFrame(green_mine);
                // } 
                else {
                    mine_green.position.z += inc_;
                    mine_green.rotation.y += inc_;

                    requestAnimationFrame(green_mine);
                    renderer.render(scene, camera);
                }
            }



            // red mine move function area begins .....................................................

            let red_mine_box;
            let red_mine = () => {



                scene.add(mine_red);
                let hull_box = new THREE.Box3().setFromObject(hull);

                red_mine_box = new THREE.Box3().setFromObject(
                    mine_red);
                // const red_mine_box_helper =
                //     new THREE.BoxHelper(mine_red, 0xffff00);
                // scene.add(red_mine_box_helper);

                var intersects_red = hull_box.intersectsBox(red_mine_box);
                //var intersects_red = box1.intersect(red_mine_box);

                if (mine_red.position.z >= 7.5) {
                    score += 100;
                    score_update(score);
                    scene.remove(mine_red);
                    mine_red.position.x = protector.position.x;
                    mine_move_control();


                } else if (intersects_red) {

                    gsap.to("#collision_div_red", {
                        display: "block",
                        duration: 0.3
                    });

                    scene.remove(mine_red);
                    score -= 500;
                    score_update(score);
                    protector.traverse((o) => {

                        if (o.isMesh) {
                            o.material.color = new THREE.Color('red');

                        }
                    });


                    setTimeout(mine_move_control(), 4000);


                } else if (pause == true) {
                    mine_red.position.z += inc_;
                    renderer.render(scene, camera);
                } else {
                    mine_red.position.z += inc_;
                    mine_red.rotation.x += inc_;

                    requestAnimationFrame(red_mine);
                    renderer.render(scene, camera);
                }
            }




            // mine move control function area begins .....................................................



            let mine_run_counter = 0;
            var standardColor = new THREE.Color(0xFFFFFF);

            var mine_move_control = () => {
                score_update(score);


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
                // if (mine_run_counter > 9) {
                //     inc_ = 0.3;
                // }
                if (pause == true) {
                    //inc_ = 0;
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
                    //inc_ = 0.1;
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




            let click_counter = 0;

            document.querySelector("#c").addEventListener('click', function clicked(e) {
                mine_move_control();
                // gsap.to("#score_div", {
                //     display: "block",
                //     duration: 0
                // });

                click_counter += 1;
            });



            document.querySelector("#continue1").addEventListener('click', function() {
                if ($("#trm_name").val() || $("#dbc_name").val()) {

                    $("#dbc_pause1").hide();

                }


                var z_pos_when_stopped = z_pos;
                var y_pos_when_stopped = y_pos;
                pause = false;

                inc_ = 0.1;


                gsap.to(mine_blue.scale, {
                    duration: .7,
                    x: 5,
                    y: 5
                });
                gsap.to(mine_red.scale, {
                    duration: .7,
                    x: 5,
                    y: 5
                });
                gsap.to(mine_green.scale, {
                    duration: .7,
                    x: 5,
                    y: 5
                });






                mine_run_counter -= 1;
                mine_move_control();

            });


            document.querySelector("#continue1").addEventListener("keydown", function(e) {




                if (e.keyCode == 37 || e.keyCode == 100) {
                    // move left
                    protector_cylinders[0].position.x -= 0.51;
                    hull.position.x -= 0.51;







                } else if (e.keyCode == 39 || e.keyCode == 102) {
                    // move right
                    protector_cylinders[0].position.x += 1;
                    hull.position.x += 1;


                    // camera.lookAt(camera.position.x, 0, 0);
                } else if (e.keyCode == 38 || e.keyCode == 104) {
                    //move up
                    protector_cylinders[0].position.y += 1;
                    hull.position.y += 1;
                } else if (e.keyCode == 40 || e.keyCode == 98) {
                    //move down
                    protector_cylinders[0].position.y -= 1;
                    hull.position.y -= 1;

                } else if (e.keyCode == 103 || e.keyCode == 36) {
                    // move diagonal left and up
                    protector_cylinders[0].position.x -= 1;
                    protector_cylinders[0].position.y += 1;
                    hull.position.x -= 1;
                    hull.position.y += 1;
                } else if (e.keyCode == 97 || e.keyCode == 35) {
                    // move diagonal left and down
                    protector_cylinders[0].position.x -= 1;
                    protector_cylinders[0].position.y -= 1;
                    hull.position.x -= 1;
                    hull.position.y -= 1;
                } else if (e.keyCode == 105 || e.keyCode == 33) {
                    // move diagonal right and up
                    protector_cylinders[0].position.x += 1;
                    protector_cylinders[0].position.y += 1;
                    hull.position.x += 1;
                    hull.position.y += 1;
                } else if (e.keyCode == 99 || e.keyCode == 34) {
                    // move diagonal right and down
                    protector_cylinders[0].position.x += 1;
                    protector_cylinders[0].position.y -= 1;
                    hull.position.x += 1;
                    hull.position.y -= 1;
                }


            });





            let z_pos_when_stopped;
            let y_pos_when_stopped;
            let stop_counter = 0;
            document.querySelector("#stop1").addEventListener('click', function() {


                stop_counter += 1;
                inc_ = 0;



                pause = true;
                //render(z_pos_when_stopped, y_pos_when_stopped);

                gsap.to(mine_blue.scale, {
                    duration: .7,
                    x: 0.2,
                    y: 0.2
                });
                gsap.to(mine_red.scale, {
                    duration: .7,
                    x: 0.2,
                    y: 0.2
                });
                gsap.to(mine_green.scale, {
                    duration: .7,
                    x: 0.2,
                    y: 0.2
                });



            });
            document.querySelector("#dbc_pause1").addEventListener('click', function() {
                //c.removeEventListener('click', myClick);
                // canvas.removeEventListener("keydown", function(e)

                //     {});




                $("#dbc_name").show();
                $("#dbc_login_button").show();
                $("#dbc_demo2").show();

                stop_counter += 1;
                inc_ = 0;



                pause = true;
                //render(z_pos_when_stopped, y_pos_when_stopped);

                gsap.to(mine_blue.scale, {
                    duration: .7,
                    x: 0.2,
                    y: 0.2
                });
                gsap.to(mine_red.scale, {
                    duration: .7,
                    x: 0.2,
                    y: 0.2
                });
                gsap.to(mine_green.scale, {
                    duration: .7,
                    x: 0.2,
                    y: 0.2
                });



            });


            document.querySelector("#reset1").addEventListener('click', function() {
                <?php
                session_destroy();
                ?>
                // let url = "http://localhost/three_js_fundamentals/three.js-r128/protector/GQ_local_6.php#";
                // window.location.href = url;

                history.go(0);

                //window.document.removeEventListener("keydown", function(e));
            });

            var startup = document.getElementById("c");


            startup.addEventListener("keydown", function(e)

                {


                    // if (click_counter == 0) {

                    if (e.keyCode == 37 || e.keyCode == 100) {
                        // move left
                        protector_cylinders[0].position.x -= 0.51;
                        hull.position.x -= 0.51;







                    } else if (e.keyCode == 39 || e.keyCode == 102) {
                        // move right
                        protector_cylinders[0].position.x += 1;
                        hull.position.x += 1;


                        // camera.lookAt(camera.position.x, 0, 0);
                    } else if (e.keyCode == 38 || e.keyCode == 104) {
                        //move up
                        protector_cylinders[0].position.y += 1;
                        hull.position.y += 1;
                    } else if (e.keyCode == 40 || e.keyCode == 98) {
                        //move down
                        protector_cylinders[0].position.y -= 1;
                        hull.position.y -= 1;

                    } else if (e.keyCode == 103 || e.keyCode == 36) {
                        // move diagonal left and up
                        protector_cylinders[0].position.x -= 1;
                        protector_cylinders[0].position.y += 1;
                        hull.position.x -= 1;
                        hull.position.y += 1;
                    } else if (e.keyCode == 97 || e.keyCode == 35) {
                        // move diagonal left and down
                        protector_cylinders[0].position.x -= 1;
                        protector_cylinders[0].position.y -= 1;
                        hull.position.x -= 1;
                        hull.position.y -= 1;
                    } else if (e.keyCode == 105 || e.keyCode == 33) {
                        // move diagonal right and up
                        protector_cylinders[0].position.x += 1;
                        protector_cylinders[0].position.y += 1;
                        hull.position.x += 1;
                        hull.position.y += 1;
                    } else if (e.keyCode == 99 || e.keyCode == 34) {
                        // move diagonal right and down
                        protector_cylinders[0].position.x += 1;
                        protector_cylinders[0].position.y -= 1;
                        hull.position.x += 1;
                        hull.position.y -= 1;
                    }

                    // }
                });

            //})


            //red_mine();
            render();
        </script>

    </div>







</body>

</html>