import * as THREE from 'https://cdn.skypack.dev/three@0.120.0'

import {
    mines_i,
    mine_mover_1,
    // hull_nose,
    // hull_tail,
    inc_,
    module_score,
    collision_count_nose,
    collision_count_wing,
    y_pos,
    z_pos
} from './mine_mover_1.js';

import {
    
    pause,
    

} from './mine_move_control.js';


export {
    score_update,
    level_finish,
    level_game_over
}

// score update function area begins .....................................................
let score_update = (module_score) => {

    if (module_score >= 2000) {
        inc_ == 0.39;
    } else if (1999 >= module_score && module_score >= 1000) {
        inc_ == 0.36;
    } else if (999 >= module_score && module_score >= 500) {
        inc_ == 0.33;
    } else {
        inc_ == 0.30;
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
    //pause == true;
    //$("#colmiddle1").hide();



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
        "<a href='./GQ_local_9.php'><h3>Try again?</h3></a>";



    gsap.to("#collision_div_finish_level", {
        display: "block",
        duration: 0.3
    });
    pause == true;
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
        "<a href='./level_two/GQ_local_9.php'><h3>Go to next level?</h3></a>";

    document.querySelector("#C_D_F_try_again").innerHTML =
        "";



    gsap.to("#collision_div_finish_level", {
        display: "block",
        duration: 0.3
    });
    pause == true;



}

