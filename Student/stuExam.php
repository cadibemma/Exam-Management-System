<!DOCTYPE html>
<?php include "stuNav.php";?>
<?php include "stuSess.php";?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="../Javascript/stuExam.js" language="JavaScript"></script>
    <title>Online Exam</title>
</head>
<style>
    body, html {
        height:100%;
        font-family: Arial;
        color: black;
        background-image: linear-gradient(to bottom left, cyan, white,lightblue);
        overflow-y: scroll;
        overflow-x: scroll;
    }
    textarea {
        resize: none;
    }
    .exams{

    }
</style>
<body onload="getExam();">
<center><div class="exams" id="exams"></div></center>




<div id="ajaxDiv" ></div>
<center><footer><?php  echo date('<br>Y-m-d');?></footer></center>
<script>
    var user = "<?php echo $_SESSION['username']; ?>";

    var finalarray=[];
    function getExam() {

        catchAjax();
        Ajax.onreadystatechange = function () {
            if (Ajax.readyState == 4 && Ajax.status==200) {
                var response= JSON.parse(Ajax.responseText);
                console.log(response);
                console.log(response[0]);
                listQuestions(response[0]);
                for (i=1; i < response.length; i++) {
                    finalarray.push(response[i]);
                }
            } console.log(finalarray);
        }
        var eID = localStorage.getItem("examID");

        console.log(eID);

        if(eID==null){
            alert('Please Select An EXAM First To Continue To This Page.');
            window.location.href='stuStartex.php';
        }

        var passArray ={"id":eID};
        Ajax.open("POST", "stuExSrtBack.php", true);
        Ajax.send(JSON.stringify(passArray));
    }

    function listQuestions(questions){
        if (!questions) return;

        var content = document.getElementById('exams').innerHTML;
        console.log(questions);
        console.log(Object.keys(questions).length);
        var examN= questions['examname'];

        content += `<center style="margin-top: 5%"><u><h3>${examN}</h3></u></center><br>`;

        for (i=1; i <= (Object.keys(questions).length-2)/2; i++) {
            const question = questions['q'+i];
            const pts = questions['q'+i+'w'];
            console.log(pts);

            content += `<div class="exMain"><p><span>Question ${i}:</span>
                    <br><div style="width: 60%"><p>${question}</p><br>
                    <span><label style="padding-left:7% ">Your Answer:</label>
                    <span style="float: right">Points: <span class="pts">${pts}</span></span><br>
                    <textarea rows="20" style="width:100%" id="q${i}a"></textarea></span><br><br></div>
                    </div>`;
        }

        content += `<br><br><center><input type="button" class="btn btn-primary" value="Submit Exam" onclick="submitExam();"
                style="padding: 7px 12px 7px; font-size: 20px; cursor:pointer; background-color:coral;
                border-radius: 8px;"></center></div>`;

        document.getElementById('exams').innerHTML = content;
    }
</script>
</body>
</html>