<!DOCTYPE html>
<?php include "stuNav.php";?>
<?php include "stuSess.php";?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="../Javascript/stuGrade.js" language="JavaScript"></script>
    <title>View Exam Score</title>
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

    .vwGrade{
        padding: 7px 12px 7px;
        font-size: 15px;
        cursor:pointer;
        background-color:crimson;
        border-radius: 8px;
    }
</style>
<body onload="exGradeList();">
<br>
<center><h2>Select Exam (To Review):</h2></center>

<center><table id="gradeList">
        <tr>
            <th>Exam Name:</th>
            <th>Instructor:</th>
            <th>Submission Date:</th>
            <th>Status:</th>
            <th>Grade:</th>
            <th></th>
        </tr>
    </table></center>
<br>
<script>
    var user = "<?php echo $_SESSION['username']; ?>";

    function viewEx(id) {
        var iD = id;
        localStorage.setItem("gExamID", iD);
        location.href = 'examReview.php';
    }

    function exGradeList() {
        catchAjax();
        Ajax.onreadystatechange = function () {//receive data from server
            if (Ajax.readyState == 4 && Ajax.status == 200) { //request finished and response is ready
                var res = Ajax.responseText;

                var response = JSON.parse(res);
                console.log(response);
                console.log(user);

                var grList = document.getElementById("gradeList").innerHTML;

                for(i=0;i<response.length;i++){

                    var exN = response[i].examname;
                    var exIn = response[i].professor;
                    var exD = response[i].date;
                    var exS = response[i].status;
                    var exG = response[i].grade;
                    var exT = response[i].total;
                    var exId = response[i].id;

                    var exGT =((parseFloat(exG)/parseFloat(exT)*100).toFixed(2))+"%";

                    if(exS.toLowerCase().trim()=="completed" || exS.toLowerCase().trim()=="pending"){
                        exS="Pending";
                        exG=0;
                        exGT=0;
                    }

                    if(exG==0 && exS!="Graded"){
                        grList += `<tr id="${exId}">
                                   <td>${exN}</td>
                                   <td>${exIn}</td>
                                   <td>${exD}</td>
                                   <td class="grStat">${exS}</td>
                                   <td></td>
                                   <td><input type="button" id="vwGrade" class="vwGrade"
                                   onclick="viewEx(this.parentNode.parentNode.id)" value="Review"></td>
                               </tr>`;
                    }else {
                        grList += `<tr id="${exId}">
                                   <td>${exN}</td>
                                   <td>${exIn}</td>
                                   <td>${exD}</td>
                                   <td class="grStat">${exS}</td>
                                   <td>${exGT}</td>
                                   <td><input type="button" id="vwGrade" class="vwGrade"
                                   onclick="viewEx(this.parentNode.parentNode.id)" value="Review"></td>
                               </tr>`;
                    }
                }

                document.getElementById("gradeList").innerHTML = grList;
                for(i=0;i<response.length;i++){
                    var vwGrade=document.getElementsByClassName('vwGrade');
                    var grStat=document.getElementsByClassName('grStat');
                    if(response[i].status.toLowerCase().trim()=="incomplete" ||
                        response[i].status.toLowerCase().trim()=="completed" ||
                        response[i].status.toLowerCase().trim()=="pending"){
                        vwGrade[i].disabled = true;
                        vwGrade[i].style.cursor="default";
                        vwGrade[i].style.backgroundColor="lightcoral";
                        grStat[i].style.color="dimgray";
                        grStat[i].style.fontStyle="italic";
                    }else vwGrade[i].style.color="white";
                }
            }
        }
        var passArray ={"username":user};
        Ajax.open("POST", "stuGradeList_bk.php", true); //POST, middle url
        Ajax.send(JSON.stringify(passArray));
    }
</script>

</body>
</html>