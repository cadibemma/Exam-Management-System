<!DOCTYPE html>
<?php include "stuNav.php";?>
<?php include "stuSess.php";?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="../Javascript/stuExam.js" language="JavaScript"></script>
    <title>Select Exam</title>
</head>
<style>
    body, html {
        height:100%;
        font-family: Arial;
        color: black;
        background-image: linear-gradient(to bottom right, mediumpurple, white,plum);
        overflow-y: scroll;
        overflow-x: scroll;
    }
    table {
        font-family: Arial, sans-serif;
        border-collapse: collapse;
        width: 90%;
        text-align: center;
        border-radius: 12px;
        font-size: large;
    }

    td, th {
        border: 1px solid indianred;
        padding: 10px;
    }

    tr:nth-child(odd) {
        background-color: rgba(255,255,255, 0.45);
    }

    .exStart{
        padding: 7px 12px 7px;
        font-size: 15px;
        cursor:pointer;
        background-color:crimson;
        border-radius: 8px;
    }
</style>
<body onload="examList();">
<br>
<center><h2>Select Exam:</h2></center>

<center><table id="exList">
        <tr>
            <th>Exam Name:</th>
            <th>Instructor:</th>
            <th>Status:</th>
            <th></th>
        </tr>
</table></center>
<br>
<script>
    var user = "<?php echo $_SESSION['username']; ?>";

    function start(id){
        tempAlert("Good Luck, <?php echo $_SESSION['name'];?>!!",1000);

        setTimeout( function() {
            location.href='stuExam.php';
            var iD=id;
            localStorage.setItem("examID",iD);}, 1000);
    }

    function examList() {
        catchAjax();
        Ajax.onreadystatechange = function () {//receive data from server
            if (Ajax.readyState == 4 && Ajax.status == 200) { //request finished and response is ready
                var res = Ajax.responseText;

                var response = JSON.parse(res);

                console.log(response);
                console.log(user);

                var exList= document.getElementById("exList").innerHTML;

                for(i=0;i<response.length;i++){

                    var exN = response[i].examname;
                    var exIn = response[i].professor;
                    var exS = response[i].status;
                    var exId = response[i].id;

                    if(exS.toLowerCase()=="graded"|| exS.toLowerCase()=="pending"){
                        exS="Completed";
                    }

                    exList +=`<tr id="${exId}">
                            <td>${exN}</td>
                            <td>${exIn}</td>
                            <td class="exStat">${exS}</td>
                            <td><input type="button" id="exStart" class="exStart" onclick="start(this.parentNode.parentNode.id)"
                                value="Start Exam"></td>
                          </tr>`;
                }
                document.getElementById("exList").innerHTML = exList;
                for(i=0;i<response.length;i++){
                    var exStart=document.getElementsByClassName('exStart');
                    var exStat=document.getElementsByClassName('exStat');
                    if(response[i].status.toLowerCase().trim()=="graded" ||
                        response[i].status.toLowerCase().trim()=="completed" ||
                        response[i].status.toLowerCase().trim()=="pending"){
                        exStart[i].disabled = true;
                        exStart[i].style.cursor="default";
                        exStart[i].style.backgroundColor="lightcoral";
                    }else exStart[i].style.color="white";

                    if(response[i].status.toLowerCase().trim()=="incomplete"){
                        exStat[i].style.color="dimgray";
                        exStat[i].style.fontStyle="italic";
                    }
                }
            }
        }
        var passArray ={"username":user};
        Ajax.open("POST", "getExamList.php", true); //POST, middle url
        Ajax.send(JSON.stringify(passArray));
    }
</script>

</body>
</html>