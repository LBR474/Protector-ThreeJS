<?php


$servername = "localhost";
$username = "newuser";
$password = "55_Five55";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


else {
echo "connection return connected successfully<p>";
}
// header:
//     'http://localhost/three_js_fundamentals/three.js-r128/protector/GQ_local_6.php#';
// }
// $_SESSION["favcolor"] = "yellow";
//print_r($_SESSION);

//var_dump(session_id());

//session_destroy();