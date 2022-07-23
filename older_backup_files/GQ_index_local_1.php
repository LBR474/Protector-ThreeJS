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

        #div2 {

            position: fixed;
            top: '100px';
            left: '0px';
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            background-color: #333;
            color: #f1f1f1;


            display: block;
        }


        #div2 a {
            float: left;
            display: block;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }


        #div2 a:hover {
            background-color: white;
            color: aqua;
        }


        #div3 {

            position: relative;
            /* top: '100px';
            right: '0px'; */
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
            float: right;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            background-color: #333;
            color: #f1f1f1;


            display: none;
        }

        #score_div {

            position: absolute;
            top: 255px;
            right: 0px;
            color: #f2f2f2;
            text-align: center;
            width: 100px;

            background-color: rgb(20, 233, 13);
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
            border-width: 2px;
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
            $("#div2").show();


            $("#c").click(function() {

                $("#div3").fadeOut();

            });


        });
    </script>

</head>

<body>



    <div id="div2">
        <li></li>
        <p></p>

        <a href="#" id="stop1">Stop</a>
        <p></p>
        <a href="#" id="continue1">Continue</a>
        <p></p>
        <a href="#" id="reset1">Reset</a>
        <p></p>
    </div>
    <div id="div3">
        Click screen to start.<p></p>
        Arrow and num pad keys move the Protector<p></p> around to avoid incoming mines.<p></p>
        <?php include 'connection.php'; ?>
    </div>
    <div id="db_connect_div">
        Login to save your progress.<p></p> <?php include 'connection.php'; ?>
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
        <div id="score_div">
            <script>
                let score = 0;

                document.write("Score goes here: <p>" + score);
            </script>
            <p></p>
        </div>




        <canvas id="c" tabindex="0"></canvas>

        <script type="module">
            import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
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



            //
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

            var inc_;
            var counter = 0;
            var A1_is_running = false;
            var A2_is_running = false;
            var A3_is_running = false;
            var pause = false;

            // protector masking shape area begins .....................................................

            //const hull_geometry = new THREE.ConeGeometry(0.7, 1, 32, 64);
            var hull_geometry = new THREE.CylinderGeometry(0.5, 0.2, 3, 52,
                16);

            let hull_material = new THREE.MeshPhongMaterial({
                color: 'red',
                opacity: 0,
                transparent: true,
            });
            const hull = new THREE.Mesh(hull_geometry, hull_material);


            hull.rotation.x = Math.PI / 2;
            hull.position.y = -0.5;
            hull.position.z = -1;

            scene.add(hull);
            let size, x, y, z;


            const sphereWidth = 0.001;
            const sphereHeight = 0.001;
            const sphereDepth = 0.001;
            const geometry = new THREE.SphereGeometry(sphereWidth, sphereHeight, sphereDepth);


            const sphere_geometry = new THREE.SphereGeometry(size, 32, 16,
                0, 6.3, 0, 6.3);

            const spheres = [];

            function makeSphereInstance(size, color, x, y, z) {

                const wireframe = new THREE.WireframeGeometry(sphere_geometry);

                const line = new THREE.LineSegments(wireframe);

                //line.material.depthTest = false;
                line.material.opacity = 0;
                //line.material.transparent = true;
                line.scale.x = size;
                line.scale.y = size;
                line.scale.z = size;
                line.material.color.setHex(color);
                line.material.emissive = 5.0;
                line.position.x = x;
                line.position.y = y;
                line.position.z = z;

                spheres.push(line);
                return (line);

            }
            for (let index = 0; index < 10; index++) {
                makeSphereInstance(Math.random() * 0.5, 0xff0000,
                    hull.position.x,
                    hull.position.y,
                    hull.position.z);

            }

            // gsap.to("#score_div", {
            //     display: "block",
            //     duration: 0.1

            // });



            // gltf  area begins .....................................................

            const gltfLoader = new GLTFLoader();
            let mine_red;
            const cube_array = [];
            const red_mines = [];







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
                    mine_red.position.z = -2;


                    cube_array.push(mine_red);
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
                    cube_array.push(mine_blue);
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
                    cube_array.push(mine_green);
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




            // show hide collision div area begins .....................................................
            let scaler_red = 0.051;
            let scaler_blue = 0.051;

            let red_counter = 0;
            var toggleoutred = function() {
                red_counter += 1;

                collision_div_red.style.display = "none";

                if (red_counter % 2 == 0) {
                    mine_red.position.x = Math.random() * -1;
                } else {
                    mine_red.position.x = Math.random() * 1;
                }



            }
            var blue_counter = 0;
            var toggleoutblue = function() {
                blue_counter += 1;

                collision_div_blue.style.display = "none";
                if (blue_counter % 2 == 0) {
                    mine_blue.position.x = Math.random() * -5;
                    mine_blue.position.y = Math.random() * -5;
                } else {
                    mine_blue.position.x = Math.random() * 5;
                    mine_blue.position.y = Math.random() * 5;
                }


            }




            var green_counter = 0;
            var toggleoutgreen = function() {
                green_counter += 1;

                collision_div_green.style.display = "none";
                if (blue_counter % 2 == 0) {
                    mine_green.position.x = Math.random() * -5;
                    //mine_blue.position.y = Math.random() * -5;
                } else {
                    mine_green.position.x = Math.random() * 5;
                    //mine_blue.position.y = Math.random() * 5;
                }


            }

            function score_update(score) {

                document.querySelector("#score_div").innerText = score;
                //toggleoutred();
                //return;
            }





            // animate function area begins .....................................................


            let box1, red_mine_box, blue_mine_box, green_mine_box;



            const animate = function(time) {
                time *= 0.01;

                cube_array[0].rotation.x += 0.1;
                cube_array[0].position.z = z_pos;


                z_pos += inc_;

                if (collision_div_green.style.display == "block" ||
                    collision_div_blue.style.display == "block") {
                    toggleoutgreen();
                    toggleoutblue();

                }

                box1 = new THREE.Box3().setFromObject(hull);
                red_mine_box = new THREE.Box3().setFromObject(cube_array[0]);

                var intersects = box1.intersectsBox(red_mine_box);

                if (intersects) {
                    scene.remove(cube_array[0]);
                    
                    spheres.forEach((line, ndx) => {
                        scene.add(line);

                        const speed = 1 + ndx * .1;
                        const rot = time * speed;

                        line.rotation.x = rot;
                        line.rotation.y = rot;

                        if (line.scale.x > 1.0) {
                            //console.log(line.scale.x);
                        } else {
                            line.scale.x += scaler_red;
                            line.scale.y += scaler_red;
                            line.scale.z += scaler_red;
                        }

                        line.position.x = hull.position.x;
                        line.position.y = hull.position.y;
                        line.position.z = hull.position.z;

                    });
                    gsap.to("#collision_div_red", {
                        display: "block",
                        duration: 3

                    });

                }


                 else if (z_pos >= 9) {
                    score -= 500;
                    score_update(score);
                }
                // console.log(z_pos);
                // console.log("Inc");
                // console.log(inc_)

                if (pause == true) {
                    A1_is_running = true;

                    return;

                } else if (z_pos > 9) {


                    scene.remove(cube_array[0]);
                    for (let ia = 0; ia < spheres.length; ia++) {
                        spheres[ia].scale.x = scaler_red;
                        spheres[ia].scale.y = scaler_red;
                        spheres[ia].scale.z = scaler_red;
                        spheres[ia].material.color.setHex(0x0000FF);
                        scene.remove(spheres[ia]);
                    }

                    scene.add(cube_array[1]);
                    A1_is_running = false;
                    //score_update(score);
                    animate2(z_pos = -5, y_pos = 0);


                } else {

                    requestAnimationFrame(animate);

                }

                renderer.render(scene, camera);

            };







            // animate 2 function area begins .....................................................

            const animate2 = function(time) {
                time *= 0.1;
                if (collision_div_red.style.display = "block") {
                    toggleoutred();
                }
                let U_D_mover = 0;
                //cube_array[1].position.x = 0;
                if (z_pos < -3) {
                    U_D_mover += 0.4;
                } else if (0 > z_pos && z_pos > -3) {
                    U_D_mover -= 0.4;
                } else if (z_pos > 0) {
                    U_D_mover += 0.4;
                }
                cube_array[1].position.y = U_D_mover;

                cube_array[1].rotation.x += 0.1;

                cube_array[1].position.z = z_pos;

                box1 = new THREE.Box3().setFromObject(hull);
                blue_mine_box = new THREE.Box3().setFromObject(cube_array[1]);
                //scene.add(box2);


                var intersects = box1.intersectsBox(blue_mine_box);
                if (intersects) {
                    var scaler_blue = 0.051;
                    spheres.forEach((line, ndx) => {


                        const speed = 1 + ndx * .1;
                        const rot = time * speed;

                        line.rotation.x = rot;
                        line.rotation.y = rot;


                        if (line.scale.x > 1.0) {
                            // console.log("From animate2");
                            // console.log(line.scale.x);

                        } else {
                            line.scale.x += scaler_red;
                            line.scale.y += scaler_red;
                            line.scale.z += scaler_red;
                        }
                        line.position.x = hull.position.x;
                        line.position.y = hull.position.y;
                        line.position.z = hull.position.z;
                        scene.add(line);


                    });


                    gsap.to("#collision_div_blue", {
                        display: "block",

                        duration: 3

                    });
                    scene.remove(cube_array[1]);



                }


                z_pos += inc_;
                if (pause == true) {
                    A2_is_running = true;
                    return;
                } else if (z_pos > 9) {
                    scene.remove(cube_array[1]);
                    scene.add(cube_array[2]);
                    for (let ia = 0; ia < spheres.length; ia++) {
                        spheres[ia].scale.x = scaler_red;
                        spheres[ia].scale.y = scaler_red;
                        spheres[ia].scale.z = scaler_red;
                        spheres[ia].material.color.setHex(0x00FF00);
                        scene.remove(spheres[ia]);
                    }

                    A2_is_running = false;
                    animate3(z_pos = -5, y_pos = 0);


                } else {

                    requestAnimationFrame(animate2);
                }

                renderer.render(scene, camera);

            };


            // animate 3 function area begins .....................................................
            const animate3 = function(time) {
                time *= 0.001;
                if (collision_div_blue.style.display = "block") {
                    toggleoutblue();
                }
                //inc_ = 0.1;
                let side_mover = 0;
                if (z_pos < -3) {
                    side_mover += 0.1;
                } else if (0 > z_pos && z_pos > -3) {
                    side_mover -= 0.1;
                } else if (z_pos > 0) {
                    side_mover += 0.1;
                }
                cube_array[2].rotation.x += 0.1;


                cube_array[2].position.x += side_mover;


                cube_array[2].position.z = z_pos;



                z_pos += inc_;
                box1 = new THREE.Box3().setFromObject(hull);
                green_mine_box = new THREE.Box3().setFromObject(cube_array[2]);
                // box helper   



                var intersects = box1.intersectsBox(green_mine_box);
                if (intersects) {
                    var scaler_blue = 0.051;
                    spheres.forEach((line, ndx) => {


                        const speed = 1 + ndx * .1;
                        const rot = time * speed;

                        line.rotation.x = rot;
                        line.rotation.y = rot;


                        if (line.scale.x > 1.3) {
                            //console.log("from animate3: ");


                        } else {
                            line.scale.x += scaler_red;
                            line.scale.y += scaler_red;
                            line.scale.z += scaler_red;
                        }
                        line.position.x = hull.position.x;
                        line.position.y = hull.position.y;
                        line.position.z = hull.position.z;
                        scene.add(line);



                    });


                    gsap.to("#collision_div_green", {
                        display: "block",
                        duration: 0.1,

                    });
                    scene.remove(cube_array[2]);

                }

                if (pause == true) {
                    A3_is_running = true;

                    return;
                } else if (z_pos > 9) {
                    scene.remove(cube_array[2]);
                    scene.add(cube_array[0]);
                    for (let ia = 0; ia < spheres.length; ia++) {
                        spheres[ia].scale.x = scaler_red;
                        spheres[ia].scale.y = scaler_red;
                        spheres[ia].scale.z = scaler_red;
                        spheres[ia].material.color.setHex(0xFF0000);
                        scene.remove(spheres[ia]);
                    }

                    A3_is_running = false;

                    cube_array[2].position.x = 0;

                    animate(z_pos = -5, y_pos = 0);

                } else {

                    requestAnimationFrame(animate3);
                }

                renderer.render(scene, camera);

            };

            // query selector area begins .....................................................


            document.querySelector("#c").addEventListener('click', function(e) {

                if (counter < 1) {
                    counter += 1;
                    animate(inc_ = 0.1);
                }

            });


            document.querySelector("#continue1").addEventListener('click', function() {

                var z_pos_when_stopped = z_pos;
                var y_pos_when_stopped = y_pos;
                pause = false;
                if (A1_is_running == true && A2_is_running == false) {
                    animate(z_pos = z_pos_when_stopped, y_pos_when_stopped);
                } else if (A2_is_running == true && A1_is_running == false) {
                    animate2(z_pos = z_pos_when_stopped, y_pos_when_stopped);
                } else if (A3_is_running == true && A2_is_running == false && A1_is_running == false) {
                    animate3(z_pos = z_pos_when_stopped, y_pos_when_stopped);
                }

                gsap.to("#db_connect_div", {
                    display: "none",
                    duration: 1

                });


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
            //})

            let z_pos_when_stopped;
            let y_pos_when_stopped;
            document.querySelector("#stop1").addEventListener('click', function() {
                z_pos_when_stopped = z_pos;
                y_pos_when_stopped = y_pos;

                pause = true;
                render(z_pos_when_stopped, y_pos_when_stopped);

                gsap.to("#db_connect_div", {
                    display: "block",
                    duration: 3

                });

            });

            document.querySelector("#reset1").addEventListener('click', function() {


                history.go(0);


            });

            var startup = document.getElementById("c");
            startup.addEventListener("keydown", function(e) {




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
            //})



            render();
        </script>

    </div>







</body>

</html>