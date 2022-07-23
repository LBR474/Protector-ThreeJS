<?php


$servername = "localhost";
$username = $_POST['name'];
$password = "55_Five55";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


else if ($_POST['name'] = 'newuser') {
echo $_POST['name'];
} else {
    echo "Login problem";
}
// header:
//     'http://localhost/three_js_fundamentals/three.js-r128/protector/GQ_local_6.php#';
// }
// $_SESSION["favcolor"] = "yellow";
//print_r($_SESSION);

//var_dump(session_id());

//session_destroy();
