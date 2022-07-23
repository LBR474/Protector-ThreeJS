if(isset($_POST['login_button'])) {
<!-- $user_email = trim($_POST['user_email']); -->
$user_password = trim($_POST['password']);
$sql = "SELECT fname FROM test_2 WHERE fname='louie'";
$resultset = mysqli_query($conn, $sql) or
die("database error:". mysqli_error($conn));
$row = mysqli_fetch_assoc($resultset);
if($row['pass']==$user_password){
echo "ok";
$_SESSION['user_session'] = $row['uid'];
} else {
echo "email or password does not exist.";
}
}