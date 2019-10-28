var user;

function submitExam(){

    catchAjax();
    Ajax.onreadystatechange = function(){
        if(Ajax.readyState == 4 && Ajax.status == 200){


            var ajaxDisplay = document.getElementById('exams');
            var res=Ajax.responseText;
            console.log(res);
            console.log(JSON.parse(res));

            html =`<div style="margin-top: 15%" class='submitted'>
                      <center><h4><font size="+2">CONGRATULATIONS on completing your Exam!!</font></h4>
                       <p>*** Please wait as you will be redirected out of your exam ***</p></center>
                       </div>`;
            ajaxDisplay.innerHTML=html;
            setTimeout( function() {location.href="stuStartex.php";}, 2500);

        }
    }
    var eID = localStorage.getItem('examID');
    var exM = document.getElementsByClassName('exMain');
    var pts = document.getElementsByClassName('pts');
    var sendarray1={};

    for(i=0;i < exM.length; i++){
        sendarray1["q"+(i+1)]=document.getElementById('q'+(i+1)+'a').value;
        sendarray1["q"+(i+1)+"w"]= parseInt(pts[i].innerHTML);
    }

    var sendarray2={
        "id":eID,
        "username":user
    };

    var sendarray=extend(sendarray2,sendarray1);

    finalarray.push(sendarray);
    console.log(sendarray);
    console.log(finalarray);

    Ajax.open("POST", "stuExEdBack.php", true);
    Ajax.send(JSON.stringify(finalarray));
}

function extend(dest, src) {
    for(var key in src) {
        dest[key] = src[key];
    }
    return dest;
}

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

function tempAlert(msg,duration)
{
    var el = document.createElement("div");
    el.setAttribute("style","position:absolute;top:35%;left:35%;background-color:white;" +
        "border-radius:10px;padding:5% 10%;color:dimgray;font-family: Lato, sans-serif;font-weight: 100; border-style: groove");
    el.innerHTML = msg;
    setTimeout(function(){
        el.parentNode.removeChild(el);
    },duration);
    document.body.appendChild(el);
}