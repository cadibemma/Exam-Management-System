<!DOCTYPE html>
<?php include "profSess.php";?>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../Layouts/profGradebook.css">
    <script src="../Javascript/profGradeB1.js" type="text/JavaScript" ></script>
    <title>Edit Question Bank</title>
</head>
<style>
    body, html{
        height:100%;
        margin: 0;
        font-family: Arial;
        color: black;
        background-image: linear-gradient(to bottom right, mediumpurple, white,plum);
        overflow-y: scroll;
        overflow-x: scroll;
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
        background-image: linear-gradient(to bottom right, mediumpurple, white,plum);
    }

    .right {
        right: 0;
        background-image: linear-gradient(to bottom left, mediumpurple, white,plum);
    }

    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
    }
</style>
<body onload="gradeBOnload()" id="profGB">
<div style="position: fixed; width: 100%; padding-top: 20px;  top:0" class="qbL"><?php include "profNav.php";?>
        <center><h2>Select Exam: </h2></center><hr></div>

    <center><table id="gradeListL" style="margin-top: 150px">
            <tr>
                <th style="min-width: 275px">Exam Name:</th>
                <th></th>
            </tr>
        </table></center>
    <br>



</body>
<script>
    var user = "<?php echo $_SESSION['username']; ?>";

    function gradeBOnload() {
        catchAjax();
        Ajax.onreadystatechange = function () {//receive data from server
            if (Ajax.readyState == 4 && Ajax.status == 200) { //request finished and response is ready
                var res = Ajax.responseText;

                var response = JSON.parse(res);
                console.log(res);
                console.log(response);
                console.log(user);

                var gdList = document.getElementById("gradeListL").innerHTML;

                for(i=0;i < response.length;i++){

                    var exN = response[i].examname;
                    var exId = response[i].id;

                    /*if(exS.toLowerCase().trim()=="graded"){
                        exS="Completed";
                    }*/

                    gdList +=`<tr id="${exId}">
                                <td>${exN}</td>
                                <td><input type="button" id="selectVw" class="selectVw"
                                    onclick="viewS(this.parentNode.parentNode.id)" value="Select>>"></td>
                                </tr>`;
                }
                document.getElementById("gradeListL").innerHTML = gdList;
            }
        }
        var passArray ={"username":user};
        Ajax.open("POST", "profGB_backTB1.php", true); //POST, middle url
        Ajax.send(JSON.stringify(passArray));
    }
    function viewS(id){

        var exid =id;
        localStorage.setItem("pfgSTUExamID", exid);
        location.href='profGradebook1.php';

    }
</script>
</html>