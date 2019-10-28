<!DOCTYPE html>
<?php include "stuNav.php";?>
<?php include "stuSess.php";?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Home</title>
</head>
<style>
    body, html {
        height:100%;
        font-family: Arial;
        color: black;
        background-image: linear-gradient(to bottom right, plum, white, pink);
        overflow-y: scroll;
        overflow-x: scroll;
    }
</style>
<body>

<center style="margin-top: 10%"><h1>Welcome, <?php echo $_SESSION['name'];?>!</h1></center>
<br>
<center><h3>Today is <?php  echo date('<br>Y-m-d');?></h3></center>
<br>
<br>
<br>
<center>Please go to the "Exam" tab to select your exam!</center>
<br>
<center><h2><strong>GOODLUCK!!!</strong></h2></center>
<br>
<center><h5>*** When Exam is completed, you will be notified when your scores are ready ***</h5></center>
</body>
</html>