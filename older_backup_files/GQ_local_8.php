<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <title>GQ local</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js"></script>
    <script type="module" src="explosion_functions.js"></script>
    <script type="module" src="GQ_level_one_module.js"></script>

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
            left: 0px;
            float: right;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            background-color: #333;
            color: #f1f1f1;


            display: block;
        }



        #score_div {

            position: absolute;
            /* //float: right; */
            width: fit-content;
            top: 0px;
            right: 30px;
            color: #f2f2f2;
            text-align: center;
            width: 100px;

            /* background-color: rgb(20, 233, 13); */
            color: #f1f1f1;

            display: block;
        }

        #trm_name {
            width: 100px;
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

        #collision_div_finish_level {

            position: relative;
            /* top: 25px;
            left: 25px; */
            color: #f2f2f2;
            text-align: center;
            /* //font-size: xx-large; */
            width: 100vw;
            height: 100vh;

            background-color: black;
            color: #f1f1f1;
            border-style: double;
            border-width: 5px;

            display: none;
        }

        #collision_div_finish_level a {
            /* float: left; */
            display: block;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }


        #collision_div_finish_level a:hover {
            background-color: white;
            color: aqua;
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

        #loading {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: xx-large;
            font-family: sans-serif;
        }

        #loading>div>div {
            padding: 2px;
        }

        .progress {
            width: 50vw;
            border: 1px solid black;
        }

        #progressbar {
            width: 0;
            transition: width ease-out .5s;
            height: 1em;
            background-color: #888;
            background-image: linear-gradient(-45deg,
                    rgba(255, 255, 255, .5) 25%,
                    transparent 25%,
                    transparent 50%,
                    rgba(255, 255, 255, .5) 50%,
                    rgba(255, 255, 255, .5) 75%,
                    transparent 75%,
                    transparent);
            background-size: 50px 50px;
            animation: progressanim 2s linear infinite;
        }

        @keyframes progressanim {
            0% {
                background-position: 50px 50px;
            }

            100% {
                background-position: 0 0;
            }
        }
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>


</head>

<body>
    <div id="loading">
        <div>
            <div>...loading...</div>
            <div class="progress">
                <div id="progressbar"></div>
            </div>
        </div>
    </div>




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
            -500 for each hull collision, <br>-250 for each wing collision.<br>
            Five collisions == game over.
        </p>
    </div>

    <div id="colmiddle1">
        <div id="collision_div_red">
            <p id="C_N_red_nose_par"> Collision - nose </p>
            <p id="C_N_red_left_wing_par"></p>
            <p id="C_N_red_right_wing_par"></p>

        </div>
        <div id="collision_div_blue">
            <p id="C_N_blue_nose_par"> Collision - nose </p>
            <p id="C_N_blue_left_wing_par"></p>
            <p id="C_N_blue_right_wing_par"></p>
        </div>
        <div id="collision_div_green">
            <p id="C_N_green_nose_par"> Collision - nose </p>
            <p id="C_N_green_left_wing_par"></p>
            <p id="C_N_green_right_wing_par"></p>
        </div>
        <div id="collision_div_finish_level">

            <p id="C_D_F_collision_count">


            </p>
            <p id="C_D_F_next_level"></p>
            <p id="C_D_F_try_again"></p>


        </div>
        <canvas id="c" tabindex="0"></canvas>
        <!-- <canvas id="d" tabindex="0"></canvas> -->
        <div id="score_div">

            <p id="name_enter"> Enter your name (optional,<br> max 12 letters)</p>
            <input type="text" id="trm_name">
            <p>
                <button id="trm_login_button">Enter</button>
                <script>
                    $(document).ready(function() {

                        let module_score;
                        $("button").click(function() {


                            if ($("#trm_name").val()) {
                                document.querySelector("#SD_logged_in_par").innerHTML =
                                    $("#trm_name").val();
                            }

                            // document.querySelector("#SD_score_par").innerHTML =
                            //     "</p>Currently score: " + module_score;

                            $("#trm_name").hide();
                            $("#trm_login_button").hide();
                            $("#name_enter").hide();
                            $("#trm_blurb").hide();

                        });
                    });
                </script>


            <p id='SD_logged_in_par'></p>
            <p id="SD_score_par"></p>
            <p id="SD_C_C_par"></p>




        </div>


    </div>







</body>

</html>