<!DOCTYPE html>
<?php include "stuNav.php";?>
<?php include "stuSess.php";?>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../Layouts/examReview.css">
    <script src="../Javascript/stuGrade.js" language="JavaScript"></script>
    <title>View Exam Score</title>
</head>
<style>
    .split {
        height: 100%;
        width: 50%;
        position: fixed;
        z-index: 1;
        overflow-x: hidden;
    }

    .left {
        left: 0;
        background-image: linear-gradient(to bottom right, plum, white, pink);
    }

    .right {
        right: 0;
        background-image: linear-gradient(to bottom left, cyan, white,lightblue);
    }

    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
    }

</style>
<body onload="reviewExam();">
<div class="split left" id="split left" onscroll="SyncScroll('split left')">
    <div class="exL"><br><input type="button" value="<< Go Back" onclick="goBack();" class="goBack">
    <center><h3 style="margin-right: 15%">Grade Breakdown:</h3></center><hr></div>
    <center><div class="grBR" id="grBR" style="margin-top: 150px"></div></center>


    <br><br><br><br>
<center><strong><div class="totFtr" id="totFtr">
            <span id="totOvrl" class="totOvrl"></span></div></strong></center>
</div>
<div class="split right" id="split right" onscroll="SyncScroll('split right')" style="text-align: center; border-left: 3px double; border-color: indianred ">
    <div id="exR" class="exR"></div>
    <center><div class="examsR" id="examsR" style="margin-top: 150px"></div></center>
    <br><br>

    <div id="ajaxDiv" ></div>
    <center><footer><?php  echo date('<br>Y-m-d');?></footer></center>
</div>

</body>
<script>
    var user = "<?php echo $_SESSION['username']; ?>";

    function goBack() {
        location.href='stuGrade.php';
    }
    //var finalarray=[];

    function reviewExam() {

        catchAjax();
        Ajax.onreadystatechange = function () {
            if (Ajax.readyState == 4 && Ajax.status==200) {
                var response= JSON.parse(Ajax.responseText);
                console.log(Ajax.responseText);
                console.log(response);
                listQuestions(response[0]);
                listStuData(response);

                //finalarray.push(response[1]);
                //console.log(finalarray);
            }
        }
        var eID = localStorage.getItem("gExamID");

        console.log(eID);

        if(eID==null){
            alert('Please Select An Exam to Review To Continue To This Page.');
            window.location.href='stuGrade.php';
        }

        var passArray ={"id":eID, "username":user};
        Ajax.open("POST", "../examRev_back.php", true);
        Ajax.send(JSON.stringify(passArray));
    }
    function SyncScroll(splitId) {
        var split1 = document.getElementById("split left");
        var split2 = document.getElementById("split right");
        if (splitId=="split left") {
            split2.scrollTop = split1.scrollTop;
        }
        else {
            split1.scrollTop = split2.scrollTop;
        }
    }
</script>
</html>