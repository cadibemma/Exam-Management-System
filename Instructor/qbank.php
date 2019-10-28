<!DOCTYPE html>
<?php include "profSess.php";?>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../Layouts/qbank.css">
    <script src="../Javascript/qbank.js" type="text/JavaScript" ></script>
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
        background-image: linear-gradient(to bottom right, plum, white, pink);
    }

    .right {
        right: 0;
        background-image: linear-gradient(to bottom left,lightsalmon, white,pink);
    }

    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
    }
</style>
<body onload="allDiffOnload()">
<div class="split left">

    <div style="padding-top: 20px;"><?php include "profNav.php";?>
    <center><h2>Add Question</h2></center>
    <hr>
    <br><br>
    <div style="margin-left: 8%; margin-right: 9%">
        <span class="topic" style="width:200px;">
            <select style="cursor:pointer;" name = "topic" id="topic">
                <option value="">Topic:</option>
                <option value="if">If</option>
                <option value="lists">Lists</option>
                <option value="for loop">For Loops</option>
                <option value="def">Def</option>
                <option value="while">While</option>
                <option value="string method">String Method</option>
                <option value="turtles">Turtles</option>
            </select>
        </span>
        <span class="diff"><strong>Difficulty Level:</strong>
            <br>
            <form id="qDiff">
                <input style="cursor:pointer;" type="radio" id="diff1" name="Diff" value="Easy" checked>Easy<br>
                <input style="cursor:pointer;" type="radio" id="diff2" name="Diff" value="Medium">Medium<br>
                <input style="cursor:pointer;" type="radio" id="diff3" name="Diff" value="Hard">Hard
            </form>
        </span>
        <span class="const"><strong>Constraints:</strong>
            <br>
            <form>
            <input type="checkbox" name="constraint1" value="for"> Must use FOR Loop<br>
            <input type="checkbox" name="constraint2" value="while"> Must use WHILE Loop<br>
            <input type="checkbox" name="constraint3" value="print"> Must PRINT Statement
            </form>
        </span>
    </div>
    <div>
        <div class="qbox">

            <h4><label>Input New Question:</label></h4>

            <center><div><input name="funcName" id="funcName" type="text" placeholder="Function Name"
                   style="border-radius:6px; font-size: medium; margin-bottom: 10px;">
            <br>
            <textarea rows ="13" cols="55" name="Question" id="Question" placeholder="Question Description"
                      style="font-size: medium; width: auto; height: auto"></textarea></div></center>
            <br>
            <br>
            <h4><label>Input Test Cases:</label></h4>
            <center id="1" >
                <input type="text" id="tcase_i1" class="tcase_i" placeholder="Test Case 1" style="font-size: medium;
                border-radius:8px;"> &nbsp;  &nbsp;
                <input type="text" id="tcase_a1" class="tcase_a" placeholder="Output 1"
                       style="font-size: medium; border-radius:8px;">
            </center>
            <center id="2" >
                <input type="text" id="tcase_i2" class="tcase_i" placeholder="Test Case 2" style=" font-size: medium;
                border-radius:8px;"> &nbsp;  &nbsp;
                <input type="text" id="tcase_a2" class="tcase_a" placeholder="Output 2"
                       style="font-size: medium; border-radius:8px;">
            </center>
            <center><div class="tcases" id="tcases"></div></center>
            <center><div id="addReC"></div></center>
            <br>
            <center><strong>*** NOTE: Only 1 Test Case per line and EVERY Test Case MUST have Output ***</strong></center>
            <br>
            <br>
            <br><div id="ajaxIn" style="text-align: center"></div>
            <br>
            <br>
            <input type="button" class="qAdd" onclick="addData();" value="Add to Bank">
        </div>
        <br>
    </div></div>
</div>
<script>
    var adRe= '<input type="button" class="tCase" id="tCase" onclick="addCase();" value="New Test Case">';
    document.getElementById("addReC").innerHTML= adRe;
</script>

<div class="split right" style="text-align: center; border-left: 3px double; border-color: indianred ">

    <div style="position: fixed; width: 50%; padding-top: 20px;" class="qbR"><center><h2>Question Bank</h2></center>
    <hr>
        <div class="keyS"><strong>Keyword Search: </strong><input oninput="keySearch(this.value);" name="qKeyS"
                                                                  id="qKeyS" type="text" style="border-radius:8px;"></div>
        <br>
        <div class="diffSort">
            <center><input type="button" id="diffs1" onclick="checkDiff(this.id);" value="Easy">
            <input type="button" id="diffs2" onclick="checkDiff(this.id);" value="Medium">
            <input type="button" id="diffs3" onclick="checkDiff(this.id);" value="Hard"></center>
        </div>
        <div class="topicS">
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
            <ul class="bnkbox" id="bnkbox" name="bnkbox" style="list-style-type:none;">
            </ul>
        </section>
</div>
<script>
    function allDiffOnload() {

        var ts="";
        document.getElementById("topicSort").value= ts;
        window["topic"] = ts;
        window["difficulty"] = ts;
        selectTopic(ts);
    }
</script>
</body>
</html>