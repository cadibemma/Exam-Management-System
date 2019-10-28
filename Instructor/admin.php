<!DOCTYPE html>
<?php include "profSess.php";?>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>NJIT Admin</title>
</head>
<style>
    body {
        font-family: Arial;
        color: black;
    }
    .split {
        height: 100%;
        width: 50%;
        position: fixed;
        z-index: 1;
        top: 0;
        overflow-x: hidden;
        padding-top: 20px;
    }

    .left {
        left: 0;
        background-image: linear-gradient(to bottom right, plum, white, pink);
    }

    .right {
        right: 0;
        background-image: url("../Images/wallpaperTemp.jpg");
        background-color: white;
    }

    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
    }
</style>
<body>
<div class="split left">

    <center><h1>Welcome to the NJIT Exam Creation System</h1></center>
    <hr>
    <br>
    <?php include "profNav.php";?>
    <center><h2>Welcome, <?php echo $_SESSION['name'];?></h2></center>

    <center><h3>Today is <?php  echo date('<br>Y-m-d');?></h3></center>

</div>
<div class="split right">

</div>

</body>
</html>