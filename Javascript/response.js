function logOn(){
    var Ajax;
    try{
// Firefox, Safari
        Ajax = new XMLHttpRequest();    //allows to make Html request in javascript //plus helps you to change data with server
    }
    catch (e){// Internet Explorer
        try{
            Ajax = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try{
                Ajax = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e){// if error occurs
                alert("OOPS!");
                return false;
            }
        }
    }

    Ajax.onreadystatechange = function() {//receive data from server
        if(Ajax.readyState == 4){ //request finished and response is ready
            var ajaxDisplay = document.getElementById('ajaxID1');
            var res = Ajax.responseText;
            console.log(res);
            var jsonObj = JSON.parse(res);

            console.log(jsonObj);

            if(jsonObj == "student") window.location.replace("Student/stuMain.php");
            else if(jsonObj == "instructor") window.location.replace("Instructor/admin.php");
            else ajaxDisplay.innerHTML = "Authentication Failed...";
        }
    }
    var n = document.getElementById('username').value; //getting username from html file
    var p = document.getElementById('password').value; //getting password from html file
    if(!p||!n){  //checking values are null
        alert("MISSING INFORMATION");
        return false;
    }
    var passArray = {"name": n.toLowerCase().trim(),"pass":p};
    Ajax.open("POST", "verify.php",true); //POST, front php
    Ajax.send(JSON.stringify(passArray));
}
