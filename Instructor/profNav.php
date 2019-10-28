<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

</head>
<style>
    body {
        font-family: Arial;
        color: black;
    }

    .sidenav {
        height: 100%;
        width: 0;
        position: fixed;
        z-index: 3;
        top: 0;
        left: 0;
        background-color:crimson;
        overflow-x: hidden;
        transition: 0.5s;
        padding-top: 60px;
    }

    .sidenav a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: black;
        display: block;
        transition: 0.3s;
    }

    .sidenav a:hover {
        color: #f1f1f1;
    }

    .sidenav .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 50px;
    }

    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
    }
</style>
<body>

    <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <a href="admin.php">Home</a>
        <a href="qbank.php" onclick="showQuestions()">Edit Question Bank</a>
        <a href="createExam.php">Create Exam</a>
        <a href="profGradebook.php">Gradebook</a>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <a onclick="end()">Logout</a>
    </div>

    <span style="font-size:30px;cursor:pointer;background-color:crimson; border-radius:8px;
            margin-left:5px; padding: 1px 5px 2px; position: absolute; z-index: 2" onclick="openNav()">&#9776;</span>


<script>
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
function end() {

    if (confirm("Are you sure you would like to logout?") == true)
    {
        location.href="../logout.php";
    }

}

</script>
</body>
</html>