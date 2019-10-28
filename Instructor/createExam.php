<!DOCTYPE html>
<?php include "profSess.php";?>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../Layouts/createExam.css">
    <script src="../Javascript/createExam.js" type="text/javascript"></script>
    <title>Edit Question Bank</title>
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
    }

    .left {
        left: 0;
        background-image: linear-gradient(to bottom right,lightsalmon, white,pink);
    }

    .right {
        right: 0;
        background-image: linear-gradient(to bottom left,lightsalmon, white,pink);
    }

    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
    }
</style>
<body onload="allDiffOnload()">
<div class="split left">

    <div style="position: fixed; width: 50%; padding-top: 20px;" class="crExL"><?php include "profNav.php";?>
    <center><h2>Question Bank</h2></center>
    <hr>
        <div class="keyS" style="text-align: center">Keyword Search: <input oninput="keySearch(this.value);" name="qKeyS"
                                                                            id="qKeyS" type="text" style="border-radius:8px;"/></div>
        <br>
        <div style="margin-right: 10%" class="diffSort">
            <center><input type="button" id="diffs3" class="qHard" onclick="checkDiff(this.id);" value="Hard">
                <input type="button" id="diffs2" class="qMed" onclick="checkDiff(this.id);" value="Medium">
                <input type="button" id="diffs1" class="qEasy" onclick="checkDiff(this.id);" value="Easy"></center>
        </div>
        <div style="padding-top:15px" class="topicS">
            <select onchange="selectTopic(this.value);" name= "topic" id="topicSort">
                <option value="">Topic:</option>
                <option value="if">If</option>
                <option value="lists">Lists</option>
                <option value="for loop">For Loops</option>
                <option value="def">Def</option>
                <option value="while">While</option>
                <option value="string method">String Method</option>
                <option value="turtles">Turtles</option>
            </select>
        </div>
        <br>
        <hr style="border-top: 5px double; color:lightcoral"></div>
        <section class="qbank" id="qbank" >
            <ul name="bnkbox" class="bnkbox" id="bnkbox" style="list-style-type:none;">
            </ul>
            <br>
            <br>
            <div class="addFootr"><input type="button" id="qAddE" class="qAddE" onclick="addQuestion();" value="Add To Exam">
                <input style="display: none;" type="reset" class="reset" onclick="reset()"></div>
        </section>
</div>

<div class="split right" style="border-left: 3px double; border-color: indianred">
    <div style="position: fixed; width: 50%; padding-top: 20px;" class="crExR"><center><h2>Create Exam</h2></center>
    <hr>
    <br>
    <label for="exName" style="font-size: larger;"> &nbsp; Exam Name: </label><input name="exName" id="exName" type="text" style="border-radius:4px"/>
    <br><br><br>
    <span style=" font-size:18px;"> &nbsp; Questions:</span>
    <span style=" float:right; font-size:18px;">Point Value &nbsp; </span>

    <hr style="border-top: 5px double; color:lightcoral;"></div>
            <section class="exq" id="exq" >
                <ol class="exQues" id="exQues">
                </ol>
                <br>
                <br>
                <div class="footer"><input type="button" id="exCreate" class="exCreate" onclick="createExam();" value="Create Exam!">
                    <strong><span id="totalPts" style=" padding-left: 19%">Total: 0 pts</span></strong></div>
            </section>
</div>
<script>
    var userSess= "<?php echo $_SESSION['username']; ?>";

    function allDiffOnload() {

        var ts="";
        document.getElementById("topicSort").value= ts;
        window["topic"] = ts;
        window["difficulty"] = ts;
        selectTopic(ts);
    }
    function tempAlert(msg,duration)
    {
        var el = document.createElement("div");
        el.setAttribute("style","position:absolute;top:40%;left:35%;background-color:white;" +
            "border-radius:10px;padding:3% 5%;color:dimgray;font-family: Lato, sans-serif;font-weight: 100; border-style: groove;" +
            "z-index:4; width:350px; height:auto;");
        el.innerHTML = msg;
        setTimeout(function(){
            el.parentNode.removeChild(el);
        },duration);
        document.body.appendChild(el);
    }
</script>
</body>
</html>