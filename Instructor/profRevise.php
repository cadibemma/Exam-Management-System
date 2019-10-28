<!DOCTYPE html>
<?php include "profSess.php";?>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../Layouts/profRevise.css">
    <script src="../Javascript/profRevise.js" language="JavaScript"></script>
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
        background-image: linear-gradient(to bottom right, lightsalmon, white, pink);
    }

    .right {
        right: 0;
        background-image: linear-gradient(to bottom left, darkturquoise, white,lightblue);
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
<body class="body" onload="reviewExam();">
<div class="split left" id="split left" onscroll="SyncScroll('split left')">
    <div class="exL"><br>
        <?php include "profNav.php";?><center><h3>Grade Breakdown:</h3></center><hr></div>
    <center><div class="grBR" id="grBR" style="margin-top:150px"></div></center>


    <br><br><br><br>
    <center><strong><div class="totFtr" id="totFtr">
                <input type="button" value="<< Go Back" onclick="goBack();" class="goBack">
                <span id="totOvrl" class="totOvrl"></span>
                <input type="button" value="Update Score" onclick="altScore();" class="altScore" style="font-weight: bold;">
            </div></strong></center>
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

    var finalarray={};

    function goBack() {
        location.href='profGradebook1.php';
    }

    function reviewExam() {

        catchAjax();
        Ajax.onreadystatechange = function () {
            if (Ajax.readyState == 4 && Ajax.status==200) {
                var response= JSON.parse(Ajax.responseText);
                console.log(Ajax.responseText);
                console.log(response);
                listQuestions(response[0]);
                listStuData(response);

                finalarray=extend(finalarray,response[0]);
                for(i=1;i<response.length;i++){
                    var tempArr={};
                    var tcase=(Object.keys(response[i]).length - 4) / 4;
                    //console.log(tcase);
                    for(n=1;n<=tcase;n++) {
                        tempArr['q'+i+'s'+n]=response[i]['q'+i+'s'+n];
                        finalarray = extend(finalarray,tempArr);
                    }
                }
                console.log(finalarray);
            }
        }
        var eID = localStorage.getItem("pfgExamID");
        var un = localStorage.getItem("pfgExamUser");
        console.log(eID);

        if(eID==null){
            alert('Please Select An Exam to Review To Continue To This Page.');
            window.location.href='stuGrade.php';
        }

        var passArray ={"id":eID, "username":un};
        Ajax.open("POST", "../examRev_back.php", true);
        Ajax.send(JSON.stringify(passArray));
    }

    function listQuestions(questions){
        if (!questions) return;

        var content = document.getElementById('examsR').innerHTML;
        var exR = document.getElementById('exR').innerHTML;
        console.log(questions);
        console.log(Object.keys(questions).length);
        var examN= questions['examname'];

        exR += `<br><center><h3>${examN}:</h3></center><hr>`;

        for (i=1; i <= (Object.keys(questions).length-7)/11; i++) {
            const question = questions['q'+i];
            const ptsS = questions['q'+i+'aw'];
            const ptsW = questions['q'+i+'w'];
            const  ans = questions['q'+i+'a'];
            const pcom = questions['q'+i+'pc'];
            console.log(ptsW);

            orig[i-1]=ptsW;

            content += `<div class="exMain" style="margin-top: 3%"><p><span>Question ${i}:</span><br>
                    <div style="width: 75%"><p>${question}</p><br><span><label style="padding-left:17% ">
                    Your Answer:</label><span style="float: right">Points: <span class="pts">
<span class="stuPoints">${ptsS}</span>/${ptsW}</span></span><br><div id="q${i}a" class="qa">${ans}</div></span><br>
                    <span style="padding-right: 70%; font-family: Lato, sans-serif; font-weight: 100; font-style: italic;">
                    Addt'l. Comments:</span><textarea row="8" class="qc">${pcom}</textarea></div></div><br><br><br><br><br>`;
        }
        content += `</div>`;

        document.getElementById('exR').innerHTML = exR;
        document.getElementById('examsR').innerHTML = content;
    }
    function grade() {
        var overTot=parseFloat(0);
        var s= document.getElementsByClassName('stuData');
        for (i = 0; i < s.length; i++) {
            var toT = s[i].getElementsByClassName('totalPts')[0].innerHTML;
            console.log(parseFloat(toT));
            overTot += parseFloat(toT);
        }
        var gradePer= (parseFloat(overTot/tot)*100).toFixed(2);
        document.getElementById('overPts').innerHTML=overTot.toFixed(2);
        document.getElementById('per').innerHTML=gradePer;
    }
    function altScore(){
        var s= document.getElementsByClassName('stuData');
        var ov = document.getElementById('overPts').innerHTML;
        for (i = 0; i < s.length; i++) {
            var toT = s[i].getElementsByClassName('totalPts')[0].innerHTML;
            if(toT<0){
                alert("Total Can Not Be A Negative Value");
                return false;
            }
        }
        var total=parseFloat(finalarray['total']);
        if(ov > total){
            alert("Total Can Not Exceed Maximum Points");
            return false;
        }
        var input=document.getElementsByTagName('input');
        for(z=0;z<input.length; z++){
            if(input[z].value==""||input[z].value==null){
                alert('Field Can Not Be Left Blank');
                return false;
            }
        }
        catchAjax();
        Ajax.onreadystatechange = function () {
            if (Ajax.readyState == 4 && Ajax.status==200) {
                var res= JSON.parse(Ajax.responseText);
                console.log(Ajax.responseText);
                console.log(res);
                tempAlert("Grade Has Been Updated",1000);
                setTimeout( function() {
                    location.href='profGradebook1.php';}, 900);
            }
        }
        finalarray['grade']=document.getElementById('overPts').innerHTML;
        for (i = 0; i < s.length; i++) {
            finalarray['q' + (i+1) + 'aw'] = s[i].getElementsByClassName('totalPts')[0].innerHTML;
            finalarray['q' + (i+1) + 'fs'] = s[i].getElementsByClassName('funPts'+(i+1))[0].value;
            finalarray['q' + (i+1) + 'syn'] = s[i].getElementsByClassName('synPts'+(i+1))[0].value;
            finalarray['q' + (i+1) + 'pc'] = document.getElementsByClassName('qc')[i].value;
            var fPt =document.getElementById('fPts'+(i+1));
            var wPt =document.getElementById('wPts'+(i+1));
            var pPt =document.getElementById('pPts'+(i+1));
            if(fPt.innerHTML!=""){
                finalarray['q' + (i+1) + 'for'] = s[i].getElementsByClassName('fPts'+(i+1))[0].value;
            }
            if(wPt.innerHTML!=""){
                finalarray['q' + (i+1) + 'while'] = s[i].getElementsByClassName('wPts'+(i+1))[0].value;
            }
            if(pPt.innerHTML!=""){
                finalarray['q' + (i+1) + 'print'] = s[i].getElementsByClassName('pPts'+(i+1))[0].value;
            }
            var t = s[i].getElementsByClassName('tcases');
            var p = t[0].getElementsByClassName('pts'+(i+1));
            for(n=0;n<p.length;n++) {
                console.log(n);
                finalarray['q' + (i+1) + 's' + (n+1)] = p[n].value;
            }
        }
        console.log(finalarray);
        Ajax.open("POST", "profRevAlt_bac.php", true);
        Ajax.send(JSON.stringify(finalarray));
    }
    function extend(dest, src) {
        for(var key in src) {
            dest[key] = src[key];
        }
        return dest;
    }
    function tempAlert(msg,duration)
    {
        var el = document.createElement("div");
        el.setAttribute("style","position:absolute;top:35%;left:35%;background-color:white;" +
            "border-radius:10px;padding:5% 10%;color:dimgray;font-family: Lato, sans-serif;font-weight: 100; border-style: groove; z-index:4");
        el.innerHTML = msg;
        setTimeout(function(){
            el.parentNode.removeChild(el);
        },duration);
        document.body.appendChild(el);
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