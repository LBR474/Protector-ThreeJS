import * as THREE from 'https://cdn.skypack.dev/three@0.120.0'

import * as gltf_loads from './gltf_loading_script.js';

//import * as MM1_scores from './mine_mover_1.js';

export {
    score_update,
   
    level_game_over,

}


let inc_ = 0.3;
let module_score = 0;
let collision_count_nose, collision_count_wing = 0;


// // score update function area begins .....................................................
let score_update = async (module_score,
    collision_count_nose, collision_count_wing


) => {

   
    document.querySelector("#SD_score_par").innerHTML =
        "Score: " +

        module_score;

    document.querySelector("#SD_C_C_par").innerHTML =
        "Number of hull collisions: " +
        collision_count_nose +
        "<br><br>Number of wing collisions: " +

        collision_count_wing;



    if ($("#trm_name").val()) {
        document.querySelector("#SD_logged_in_par").innerHTML =
            ($("#trm_name").val());
    }

    if (collision_count_nose + collision_count_wing > 4) {
        // pause == true;
        level_game_over();
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
           "<a href='./index.html'><h3>Try again?</h3></a>";   
  

    



    gsap.to("#collision_div_finish_level", {
        display: "block",
        duration: 0.3
    });
    
}




