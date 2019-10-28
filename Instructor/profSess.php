<?php

session_start();

$filename = basename($_SERVER['REQUEST_URI']);

if($filename != "profRevise.php" && $filename != "profGradebook1.php")
{
    echo '<script>localStorage.clear();</script>';
}

if (!isset($_SESSION['username']) || $_SESSION['role']!= "instructor")
{
    header("Location: ../login.html");
    die();
}

?>