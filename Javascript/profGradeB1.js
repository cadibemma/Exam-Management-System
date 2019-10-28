var user;

function catchAjax(){
    try {
        // Firefox, Safari
        Ajax = new XMLHttpRequest();    //allows to make Html request in javascript //plus helps you to change data with server
    } catch (e) {// Internet Explorer
        try {
            Ajax = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                Ajax = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {// if error occurs
                alert("OOPS!");
                return false;
            }
        }
    }
}

function viewStu(id) {
    catchAjax();
    Ajax.onreadystatechange = function () {//receive data from server
        if (Ajax.readyState == 4 && Ajax.status == 200) { //request finished and response is ready
            var res = Ajax.responseText;

            var response = JSON.parse(res);
            console.log(res);
            console.log(response);
            console.log(user);

            localStorage.setItem("pfgSTUExamID", id);
            document.getElementById("gradeListR").innerHTML =
            `${stuTemp(response)}`;

            var c=0;
            for(i=0;i<response.length;i++){
                var viewVw=document.getElementsByClassName('viewVw');
                var grStat=document.getElementsByClassName('grStat');
                if(response[i].status.toLowerCase().trim()=="incomplete"){
                    viewVw[i].disabled = true;
                    viewVw[i].style.cursor="default";
                    viewVw[i].style.backgroundColor="lightcoral";
                }else viewVw[i].style.color="white";

                if(response[i].status.toLowerCase().trim()=="incomplete"){
                    grStat[i].style.color="dimgray";
                    grStat[i].style.fontStyle="italic";
                }
                var releasS = document.getElementsByClassName('postScore');

                if(viewVw[i].disabled==false){
                    c++;
                }
            }
            if(c==0){
                releasS[0].disabled = true;
                releasS[0].style.cursor="default";
                releasS[0].style.backgroundColor="plum";
            }else{
                releasS[0].disabled = false;
                releasS[0].style.cursor="pointer";
                releasS[0].style.backgroundColor="mediumvioletred";
            }
            var selectVw = document.getElementsByClassName('selectVw');
            var tempID = id;
            for(i=0;i<selectVw.length;i++){
                if(selectVw[i].parentNode.parentNode.id== tempID){
                    selectVw[i].disabled = true;
                    selectVw[i].style.cursor="default";
                    selectVw[i].style.backgroundColor="lightcoral";
                }else{
                    selectVw[i].disabled = false;
                    selectVw[i].style.cursor="pointer";
                    selectVw[i].style.backgroundColor="crimson";
                }
            }
        }
    }
    var passArray ={"username":user,"id":id};
    Ajax.open("POST", "profGB_backTB2.php", true); //POST, middle url
    Ajax.send(JSON.stringify(passArray));
}
function stuTemp(data){
    var gdListR = `<tr >
                <th>Student:</th>
                <th>UCID:</th>
                <th>Submission Date:</th>
                <th>Status:</th>
                <th>Grade:</th>
                <th></th>
            </tr>`;

    for(i=0;i<data.length;i++){

        var exUn = data[i].username;
        var exStu = data[i].fName;
        var exS = data[i].status;
        var dte = data[i].date;
        var gde = data[i].grade;
        var tot = data[i].total;
        var id = localStorage.getItem("pfgSTUExamID");

        if(exS.toLowerCase()=="incomplete"){
            var fG="";
        } else fG =((parseFloat(gde)/parseFloat(tot)*100).toFixed(2))+"%";
        if(exS.toLowerCase()=="completed" && gde==0){
            var fG=0+'%';
        }

        /*if(exS.toLowerCase().trim()=="graded"){
            exS="Completed";
        }*/

        gdListR +=`<tr id="${id}">
                    <td>${exStu}</td>
                    <td>${exUn}</td>
                    <td>${dte}</td>
                    <td class="grStat">${exS}</td>
                    <td>${fG}</td>
                <td><input type="button" id="selectVw" class="viewVw"
                onclick="viewEx(this.parentNode.parentNode.id,this.parentNode.previousElementSibling.
                previousElementSibling.previousElementSibling.previousElementSibling.innerText)" value="View"></td>
                    </tr>`;
    }
    return gdListR;
}