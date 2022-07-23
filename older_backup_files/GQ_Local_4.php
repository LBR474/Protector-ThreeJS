<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>My first three.js app</title>
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            background-color: #333;
            width: 100vw;
            height: 100vh;
            margin: 0px;
        }

        #top_left_menu {

            position: absolute;
            top: 10px;
            left: 10px;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            background-color: #333;
            color: #f1f1f1;
            z-index: 0;

            display: block;
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
            top: 10px;
            right: 0px;
            /* float: right; */
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            background-color: #333;
            color: #f1f1f1;


            display: block;
        }

        #top_right_menu a:hover {
            background-color: white;
            color: aqua;
        }

        #db_connect_div {

            position: absolute;
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



        #container {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 100vw;
            height: 100vh;
            /* background-color: pink; */
            align-content: center;
            text-align: center;
            /* float: right; */

        }



        #c {
            width: 100%;
            height: 100%;

            display: block;
            border-style: dotted;
            border-width: 2px;
            /* background-color: pink; */
        }
    </style>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js"></script>
</head>

<body>
    <div id="container">
        <script type="module">
            import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
            import {
                OrbitControls
            } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
            import {
                GLTFLoader
            } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';
            import * as tweenMax from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js';


            const scene = new THREE.Scene();

            //scene.background = new THREE.Color('white');
            const texloader = new THREE.TextureLoader();
            const bgTexture =
                texloader.load('./images/extra_stars_pic.png');

            scene.background = bgTexture;
            //scene.background = new THREE.Color('white');



            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 7;
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();
            // canvas area begins .....................................................



            const renderer = new THREE.WebGLRenderer({
                
            });



            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            // controls area begins .....................................................

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 0, 0);
            controls.update();

            // lights area begins .....................................................

            {
                const color = 0xFFFFFF;
                const intensity = 1;
                const light = new THREE.AmbientLight(color, intensity);
                light.position.set(0, 0, 4);
                const light2 = new THREE.DirectionalLight(color, intensity);
                light2.position.set(0, -2, 4);
                light2.target.position.set(0, 0, 0);
                scene.add(light, light2);
                scene.add(light2.target);
            }





            // cube area begins .....................................................


            const geometry = new THREE.BoxGeometry(5, 5, 0.1);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                transparent: true,
                opacity: 0.5
                //emiss
            });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            cube.position.y = -0.5;
            cube.position.x = 0;

            var newMaterial = new THREE.MeshBasicMaterial({
                color: 0xc0c0c0,
                //map: texloader.load('./images/extra_stars_pic.png'),
            });
            var explodeMaterial = new THREE.MeshPhongMaterial({
                color: 0xFF0000,
                //map: texloader.load('./images/extra_stars_pic.png'),
            });



            // nsea protector area begins .....................................................


            const gltfLoader = new GLTFLoader();
            let protector;
            const cube_array = [];
            const protector_cylinders = [];
            var map = texloader.load('./images/extra_stars_pic.png');

            // If texture is used for color information, set colorspace.
            map.encoding = THREE.sRGBEncoding;

            // UVs use the convention that (0, 0) corresponds to the upper left corner of a texture.
            map.flipY = false;



            gltfLoader.load(
                // resource URL
                'nsea_protector_hull_base_3.glb',
                // called when the resource is loaded
                function(gltf) {
                    protector = gltf.scene;
                    protector_cylinders.push(protector);
                    protector.rotation.y = Math.PI;
                    protector.position.y = -0.45;
                    scene.add(protector);



                    protector.traverse((o) => {
                        if (o.isMesh) o.material = newMaterial;
                    });

                    protector.rotation.y = Math.PI;

                    //protector.position.y = -0.45;
                    //scene.add(protector);
                    renderer.render(scene, camera);




                },


            );


            // red mine area begins .....................................................
            let mine_red;
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


                    cube_array.push(mine_red);
                    scene.add(mine_red);
                    renderer.render(scene, camera);


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
                    mine_blue.scale.x = 5;
                    mine_blue.scale.y = 5;

                    //mine_blue.position.x = -10;
                    mine_blue.position.z = -20;
                    // scene.add(mine_blue);



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
                    mine_green.scale.x = 5;
                    mine_green.scale.y = 5;


                    mine_green.position.z = -20;




                },


            );






            // blue mine move function area begins .....................................................



            let blue_mine_box;

            let blue_mine = () => {
                // protector.traverse((o) => {
                //     if (o.isMesh) o.material = newMaterial;
                // });
                blue_pause = false;
                if (mine_red || mine_green) {
                    scene.remove(mine_red);
                    scene.remove(mine_green);
                }
                scene.add(mine_blue);



                if (mine_blue.position.z >= 6.5) {
                    blue_pause = true;

                    mine_move_control();

                } else {
                    mine_blue.position.z += 0.1;
                    requestAnimationFrame(blue_mine);
                    renderer.render(scene, camera);
                }

            }

            // green mine move function area begins .....................................................

            let green_mine = () => {
                // protector.traverse((o) => {
                //     if (o.isMesh) o.material = newMaterial;
                // });
                gsap.to("#collision_div_red", {
                    display: "none",
                    duration: 0.1

                });
                green_pause = false;
                if (mine_red || mine_blue) {
                    scene.remove(mine_red);
                    scene.remove(mine_blue);
                }
                scene.add(mine_green);

                if (mine_green.position.z >= 6.5) {
                    //blue_pause = true;
                    scene.remove(mine_green);
                    mine_move_control();

                } else {
                    mine_green.position.z += 0.1;
                    requestAnimationFrame(green_mine);
                    renderer.render(scene, camera);
                }

            }

            // red mine move function area begins .....................................................

            let red_mine_box, box1;
            let red_mine = () => {
                // protector.traverse((o) => {
                //     if (o.isMesh) o.material = newMaterial;
                // });

                if (mine_blue || mine_green) {
                    scene.remove(mine_blue);
                    scene.remove(mine_green);
                }
                scene.add(mine_red);
                box1 = new THREE.Box3().setFromObject(cube);

                red_mine_box = new THREE.Box3().setFromObject(
                    mine_red);

                var intersects = box1.intersectsBox(red_mine_box);


                if (mine_red.position.z >= 6.5 && !intersects) {


                    mine_move_control();



                } else if (intersects) {

                    // protector.traverse((o) => {
                    //     if (o.isMesh) o.material = explodeMaterial;
                    // });
                    gsap.to("#collision_div_red", {
                        display: "block",
                        duration: 0.3
                    });

                    var targetColor = new THREE.Color(0xFF0000);
                    gsap.to(cube.material.color, 5, {
                        r: targetColor.r,
                        g: targetColor.g,
                        b: targetColor.b,
                        ease: "bounce.out"
                    });

                    scene.remove(mine_red);
                    setTimeout(() => {
                        protector.traverse((o) => {
                            if (o.isMesh) o.material = newMaterial;
                        });

                    }, 1000);
                    setTimeout(mine_move_control(), 1000);

                } else {
                    mine_red.position.z += 0.1;
                    requestAnimationFrame(red_mine);
                    renderer.render(scene, camera);
                }
            }




            // mine move control function area begins .....................................................


            let red_pause, blue_pause, green_pause;
            let mine_run_counter = 0;


            var mine_move_control = () => {

                mine_run_counter += 1;
                //console.log(mine_run_counter);
                if (mine_run_counter % 3 == 0) {
                    //blue_pause = false;
                    mine_green.position.z = -20;
                    green_mine();
                    return;
                } else if (mine_run_counter % 2 == 0) {
                    //blue_pause = false;
                    mine_blue.position.z = -20;
                    blue_mine();
                    return;
                } else {
                    //red_pause = false;
                    mine_red.position.z = -20;
                    red_mine();
                    return;
                }
            }





            document.addEventListener('click', function(e) {
                mine_move_control();
            });
            // document.querySelector("#continue1").addEventListener('click', function(e) {
            //     colorTo(cube, 0x00FF00);
            // });
            animate();
        </script>

        <div id="top_left_menu">
            <li></li>
            <p></p>

            <a href="#" id="stop1">Stop</a>
            <p></p>
            <a href="#" id="continue1">Continue</a>
            <p></p>
            <a href="#" id="reset1">Reset</a>
            <p></p>
        </div>
        <div id="top_right_menu">
            Click screen to start.<p></p>
            Arrow and num pad keys move the Protector<p></p> around to avoid incoming mines.<p></p>
            <?php include 'connection.php'; ?>
        </div>





        <div id="db_connect_div">
            Login to save your progress.<p></p>
            <?php include 'connection.php'; ?>
        </div>









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

                //document.write("Score goes here: <p>" + score);
            </script>
            <p></p>
        </div>


    </div>

</body>

</html>