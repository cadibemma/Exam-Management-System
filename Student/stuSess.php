<?php

session_start();

$filename = basename($_SERVER['REQUEST_URI']);

if($filename != "stuExam.php" && $filename != "examReview.php")
{
    echo '<script>localStorage.clear();</script>';
}


if (!isset($_SESSION['username']) || $_SESSION['role']!="student")
{
    header("Location: ../login.html");
    die();
}
?>