var Ajax;

var c=3;
function addCase() {

    var html= document.getElementById("tcases").innerHTML;
    var addReC = document.getElementById("addReC").innerHTML;

    var put=[];
    var out=[];

    if(c>1) {
        for(i=1;i<c; i++) {
        put[i] = document.getElementById("tcase_i"+i).value;
        out[i]= document.getElementById("tcase_a"+i).value;
        }
    }

    if (c < 6) {

        html += '<center id="'+c+'" ><input type="text" id="tcase_i'+c+'" class="tcase_i" placeholder="Test Case '+c+'"'
            +' style="font-size: medium; border-radius:8px;">'+' &nbsp;  &nbsp; '+'<input type="text" id="tcase_a'+c+'"'
            +' class="tcase_a" placeholder="Output '+ c +'" style="font-size: medium; border-radius:8px;"></center>';

        c++;

    } else if(c===6) {

        html += '<center id="'+c+'" ><input type="text" id="tcase_i'+c+'" class="tcase_i" placeholder="Test Case '+c+'"'
            +' style="font-size: medium; border-radius:8px;">'+' &nbsp;  &nbsp; '+'<input type="text" id="tcase_a'+c+'"'
            +' class="tcase_a" placeholder="Output '+ c +'" style="font-size: medium; border-radius:8px;"></center>';

        addReC = '<input type="button" class="tCaseR" onclick="removeCase();" value="—" style="border-radius: 20px; ' +
                'background-color: crimson; font-size: large; color: white; font-weight: bold">';

        document.getElementById("addReC").innerHTML= addReC;

        c++;

    }
    document.getElementById("tcases").innerHTML= html;

    for(i=1;i<c-1; i++){
        document.getElementById("tcase_i"+i).value = put[i];
        document.getElementById("tcase_a"+i).value = out[i];
    }

    if (c > 3 && c < 6) {
        addReC = '<input type="button" class="tCase" id="tCase" onclick="addCase();" value="New Test Case">' +
                '<input type="button" class="tCaseR" onclick="removeCase();" value="—"style="border-radius: 20px;' +
                ' background-color: crimson; font-size: large; color: white; font-weight: bold">';

        document.getElementById("addReC").innerHTML= addReC;
    }

    console.log(c);
}

function removeCase() {

    c--;

    var addReC = document.getElementById("addReC").innerHTML;
    var h= document.getElementById(c);

    h.parentNode.removeChild(h);

    if(c > 3 && c < 7){

        addReC = '<input type="button" class="tCase" id="tCase" onclick="addCase();" value="New Test Case">' +
                '<input type="button" class="tCaseR" onclick="removeCase();" value="—" style="border-radius: 20px; ' +
                'background-color: crimson; font-size: large; color: white; font-weight: bold">';

        document.getElementById("addReC").innerHTML= addReC;
    }

    if (c===3) {

        addReC = '<input type="button" class="tCase" id="tCase" onclick="addCase();" value="New Test Case">';

        document.getElementById("addReC").innerHTML= addReC;
    }
    console.log(c);
}

function addData() {

    var q = document.getElementById('Question').value;

    if (q != ""){

        catchAjax();
        Ajax.onreadystatechange = function () {//receive data from server
            if (Ajax.readyState == 4 && Ajax.status == 200) { //request finished and response is ready

                var res = Ajax.responseText;
                console.log(res);

                document.getElementById('ajaxIn').innerHTML="* Question Stored Successfully! *";
                setTimeout( function() {location.reload();},1000);

            }
        }
        var Question = document.getElementById('Question').value; //getting question from html file
        var diff1 = document.getElementById('diff1').checked;
        var diff2 = document.getElementById('diff2').checked;
        var diff3 = document.getElementById('diff3').checked;
        var topic = document.getElementById('topic').value;
        var funcName = document.getElementById('funcName').value;

        var put = [];
        var out = [];
        var ans= {};

        for (i = 1; i < c; i++) {
            put[i] = document.getElementById("tcase_i" + i).value;
            out[i] = document.getElementById("tcase_a" + i).value;

            if (put[i]=="" || out[i]==""){

                alert("Test Case Field Can Not Be Left Blank");
                return;

            }

            ans["testCase"+ i +"Expected"] = put[i];
            ans["testCase"+ i +"Result"] = out[i];
        }

        if (topic==""){

            alert("Please Select A Topic");
            return;

        }
        var diff;

        if (diff1 == true) {
            diff = "easy";
        } else if (diff2 == true) {
            diff = "medium";
        } else {
            diff = "hard";
        }

        var constr={};

        for(i=1;i<4;i++){
            let chkbx = document.getElementsByName('constraint'+i);

            if(chkbx[0].checked==true){
                constr[chkbx[0].value]=1;
            }
            else constr[chkbx[0].value]=0;
        }

        console.log(Question);
        console.log(diff);
        console.log(topic);

        var passArray = {
            "questionInput": Question,
            "difficulty": diff,
            "questionKey": topic,
            "questionName": funcName
        };
        var passArr=extend(passArray,extend(ans,constr));
        console.log(passArr);

        Ajax.open("POST", "qbank_bk.php", true); //POST, middle url
        Ajax.send(JSON.stringify(passArr));

    } else {
        alert("Question field is REQUIRED");
    }
}

function extend(dest, src) {
    for(var key in src) {
        dest[key] = src[key];
    }
    return dest;
}

function checkDiff(diffc) {
    var x = document.getElementById(diffc);
    if (window["difficulty"]==="" || window["difficulty"]!==x.value) {
        window["difficulty"]=x.value;
        x.style.backgroundColor="navajowhite";
        x.style.color="white";
        selectDifficulty(window["difficulty"]);
    } else {
        x.style.backgroundColor="lightsalmon";
        x.style.color="black";
        window["difficulty"]="";
        selectTopic(window["topic"]);
    }

    for(i=1;i<4;i++)
    {
        if (diffc != "diffs"+i)
        {
            document.getElementById("diffs"+i).style.backgroundColor="lightsalmon";
            document.getElementById("diffs"+i).style.color="black";
        }
    }
}

function selectDifficulty(difficulty) {

    window["difficulty"] = difficulty;
    console.log(difficulty);
    if(window["topic"]!=""){
        filterData(window["difficulty"],window["topic"]);
    } else {
        catchAjax();
        Ajax.onreadystatechange = function () {//receive data from server
            if (Ajax.readyState == 4 && Ajax.status == 200) { //request finished and response is ready
                var res = Ajax.responseText;

                var response = JSON.parse(res);

                console.log(response);

                document.getElementById("bnkbox").innerHTML =

                    `${filterTempDif(response)}`
            }
        }
        Ajax.open("GET", "qbank_st.php", true); //POST, middle url
        Ajax.send();
    }
}
function filterTempDif(obj){
    var ques="";
    console.log(obj.length);
    for (i = 0; i < obj.length; i++) {
        if (obj[i].difficulty == difficulty.toLowerCase()) {

            const question = obj[i].questionInput.trim();
            const topic = obj[i].questionKey.trim().toUpperCase();
            const id = obj[i].id;

            ques += `<li id="bnk" data-id="${id}"><strong style="float: left; font-size: smaller">(${topic})</strong><br>${question}</li><br>`
        }
    }
    return ques;
}

function selectTopic(topic) {
    window["topic"] = topic;
    console.log(topic);

    if(window["difficulty"]!=""){
        if(window["topic"]==""){
            selectDifficulty(window["difficulty"]);
        } else {
            filterData(window["difficulty"], window["topic"]);
        }
    }else {
        catchAjax();
        Ajax.onreadystatechange = function () {//receive data from server
            if (Ajax.readyState === 4 && Ajax.status === 200) { //request finished and response is ready
                var res = Ajax.responseText;

                var response = JSON.parse(res);

                console.log(response);

                document.getElementById("bnkbox").innerHTML =
                    `${filterTempTop(response)}`
            }
        }
        Ajax.open("GET", "qbank_st.php", true); //POST, middle url
        Ajax.send();
    }
}
function filterTempTop(obj){
    var ques="";
    for (i = 0; i < obj.length; i++) {
        if (obj[i].questionKey.toLowerCase() == topic) {

            const question = obj[i].questionInput.trim();
            const topic = obj[i].questionKey.trim().toUpperCase();
            const id = obj[i].id;

            ques += `<li id="bnk" data-id="${id}"><strong style="float: left; font-size: smaller">(${topic})</strong><br>${question}</li><br>`
        } else if (obj[i].questionKey.toLowerCase() != topic && topic == "") {
            const question = obj[i].questionInput.trim();
            const topic = obj[i].questionKey.trim().toUpperCase();
            const id = obj[i].id;

            ques += `<li id="bnk" data-id="${id}"><strong style="float: left; font-size: smaller">(${topic})</strong><br>${question}</li><br>`
        }
    }
    return ques;
}

function filterData(difficulty,topic){

    console.log(difficulty);
    console.log(topic);

    catchAjax();
    Ajax.onreadystatechange = function () {//receive data from server
        if (Ajax.readyState == 4 && Ajax.status == 200) { //request finished and response is ready
            var res = Ajax.responseText;

            var response = JSON.parse(res);

            console.log(response);

            document.getElementById("bnkbox").innerHTML=

                `${filterTempDT(response)}`
        }
    }

    Ajax.open("GET", "qbank_st.php", true); //POST, middle url
    Ajax.send();
}

function filterTempDT(obj){
    var ques="";
    for (i = 0; i < obj.length; i++) {
        if (obj[i].difficulty.toLowerCase() == difficulty.toLowerCase() && obj[i].questionKey.toLowerCase() == topic) {

            const question = obj[i].questionInput.trim();
            const topic = obj[i].questionKey.trim().toUpperCase();
            const id = obj[i].id;

            ques += `<li id="bnk" data-id="${id}"><strong style="float: left; font-size: smaller">(${topic})</strong><br>${question}</li><br>`
        }
    }
    return ques;
}

function keySearch(text){

    catchAjax();
    Ajax.onreadystatechange = function () {//receive data from server
        if (Ajax.readyState == 4 && Ajax.status == 200) { //request finished and response is ready
            var res = Ajax.responseText;

            var response = JSON.parse(res);

            console.log(response);

            document.getElementById("bnkbox").innerHTML =

                `${filterKey(response,text)}`

        }
    }
    Ajax.open("GET", "qbank_st.php", true); //POST, middle url
    Ajax.send();
}

function filterKey(obj,text){
    var ques="";
    for (i = 0; i < obj.length; i++) {
        let q=obj[i].questionInput.toLowerCase();
        let t=obj[i].questionKey.toLowerCase();

        if (q.includes(text.toLowerCase())==true || t.includes(text.toLowerCase())==true){

            const question = obj[i].questionInput.trim();
            const topic = obj[i].questionKey.trim().toUpperCase();
            const id = obj[i].id;

            ques += `<li id="bnk" data-id="${id}"><strong style="float: left; font-size: smaller">(${topic})</strong><br>${question}</li><br>`
        }
    }
    return ques;
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