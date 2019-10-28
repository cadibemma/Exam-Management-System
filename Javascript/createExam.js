var Ajax;
function addQuestion(){
    let content = document.getElementById("exQues").innerHTML;
    var con = document.getElementsByClassName("exQues")[0].innerHTML;
    var chkbox=document.getElementsByName("bnkc");
    console.log(chkbox.length);

    var q = document.getElementsByClassName('qChoice');
    var pt=[];
    if(q.length > 0){
        for(i=0;i<q.length; i++) {
            pt[i] = document.getElementsByName('points')[i].value;
        }
    }

    for(var i=0;i<chkbox.length;i++){

        var id = chkbox[i].getAttribute('id');
        console.log(id);
        var question = document.getElementsByClassName(id)[0].innerHTML;
        console.log(question);
        console.log(con);

        if(chkbox[i].checked == true && (con.includes('id="'+id+'"')==false)){

            content +=
                `<li id="${id}" class="qChoice"><label>${question}</label><span class="set"><input type="number" min="1" id="${id}" 
                    name="points" class="points" oninput="totPoints()"><input type="button" class="exQR" 
                    onclick="removeQues(this.parentNode.parentNode);" value="—" style="border-radius: 14px; 
                    background-color: crimson; color: white; font-weight: bold"></span></li>`;
        }
        document.getElementById("exQues").innerHTML = content;
    }
    if(pt.length > 0){
        for(i=0;i<pt.length; i++) {
            document.getElementsByName('points')[i].value = pt[i];
        }
    }
}

function reset(){
    var chkbox=document.getElementsByName("bnkc");
    for(var i=0;i<chkbox.length;i++){
        chkbox[i].checked = false;
    }
    resDisp();
}

function resDisp(){
    var c=0;
    var chkbox=document.getElementsByName("bnkc");
    var reset=document.getElementsByClassName('reset')[0];
    var qAdd=document.getElementsByClassName('qAddE')[0];
    for(var i=0;i<chkbox.length;i++){
        if(chkbox[i].checked == true)
            c++;
    }
    if(c > 0){
        reset.style.display='inline';
        qAdd
    } else reset.style.display='none';
}

function createExam(){
    catchAjax();
    Ajax.onreadystatechange = function () {//receive data from server
        if (Ajax.readyState == 4 && Ajax.status == 200) { //request finished and response is ready
            //var ajaxDisplay = document.getElementById('OE');
            //ajaxDisplay.innerHTML = Ajax.responseText;
            var res = Ajax.responseText;

            console.log(res);
            //"Your Exam Has Been Created!"
            if(res.includes("A minimum of 3 questions is required") == true){
                alert(res);
            }else if(res.includes("already exists")){
                alert("An Exam By This Name Already Exists. Please Choose Another Name");
            }else {
                tempAlert(res, 1400);
                setTimeout(function () {location.reload();}, 1300);
            }
        }
    }
    var prof = userSess;
    var examName= document.getElementById('exName').value;
    if(examName==="" || examName===null){
        alert("Exam Name Is Required");
        return false;
    }
    var q= document.getElementsByClassName('qChoice');
    var examQ={};

    for (i = 0; i < q.length; i++) {
        var qId = q[i].getAttribute('id');
        var points = document.getElementsByName('points')[i].value;

        if (points == "" || points== undefined){

            alert("Question(s) With Points Value Is Required");
            return false;

        }
        examQ["q"+ (i+1)] = qId;
        examQ["q"+ (i+1) +"w"] = points;
    }
    console.log(q.length);
    console.log(examName);

    var passArray = {
        "professor": prof,
        "examname": examName,
    };

    var passArr=extend(passArray,examQ);
    console.log(passArr);

   Ajax.open("POST", "createEx_sendBack.php", true); //POST, middle url
   Ajax.send(JSON.stringify(passArr));

}

function keySearch(text){

    catchAjax();
    Ajax.onreadystatechange = function () {//receive data from server
        if (Ajax.readyState == 4 && Ajax.status == 200) { //request finished and response is ready
            var res = Ajax.responseText;

            var response = JSON.parse(res);

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

        console.log(text);

        if (q.includes(text.toLowerCase())==true || t.includes(text.toLowerCase())==true){

            const question = obj[i].questionInput.trim();
            const topic = obj[i].questionKey.trim().toUpperCase();
            const id = obj[i].id;

            ques += `
  <li style="vertical-align: middle"><span style=" display:inline-block; width:90%;"><label style="text-align: center; " for="${id}" class="${id}" ><strong style="float: left; font-size: smaller">(${topic})</strong><br>${question}</label></span>
     <span style="display inline-block; float: right; width:10%;"><input id="${id}" name="bnkc" type="checkbox" onclick="resDisp()" value="${id}"></span></li>
   `
        }
    }
    return ques;
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

            ques += `
        <li style="vertical-align: middle"><span style=" display:inline-block; width:90%;"><label style="text-align: center; " for="${id}" class="${id}"><strong style="float: left; font-size: smaller">(${topic})</strong><br>${question}</label></span>
        <span style="display inline-block; float: right; width:10%;"><input id="${id}" name="bnkc" type="checkbox" onclick="resDisp()" value="${id}"></span></li>
         `
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

            ques += `
  <li style="vertical-align: middle"><span style=" display:inline-block; width:90%;"><label style="text-align: center; " for="${id}" class="${id}" ><strong style="float: left; font-size: smaller">(${topic})</strong><br>${question}</label></span>
     <span style="display inline-block; float: right; width:10%;"><input id="${id}" name="bnkc" type="checkbox" onclick="resDisp()" value="${id}"></span></li>
   `
        } else if (obj[i].questionKey.toLowerCase() != topic && topic == "") {
            const question = obj[i].questionInput.trim();
            const topic = obj[i].questionKey.trim().toUpperCase();
            const id = obj[i].id;

            ques += `
  <li style="vertical-align: middle"><span style=" display:inline-block; width:90%;"><label style="text-align: center; " for="${id}" class="${id}" ><strong style="float: left; font-size: smaller">(${topic})</strong><br>${question}</label></span>
     <span style="display inline-block; float: right; width:10%;"><input id="${id}" name="bnkc" type="checkbox" onclick="resDisp()" value="${id}"></span></li>
   `
        }
    }
    return ques;
}

function extend(dest, src) {
    for(var key in src) {
        dest[key] = src[key];
    }
    return dest;
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
        if (obj[i].difficulty == difficulty.toLowerCase() && obj[i].questionKey.toLowerCase() == topic) {

            const question = obj[i].questionInput.trim();
            const topic = obj[i].questionKey.trim().toUpperCase();
            const id = obj[i].id;

            ques += `
            <li style="vertical-align: middle"><span style=" display:inline-block; width:90%;"><label 
            style="text-align: center; " for="${id}" class="${id}" ><strong style="float: left; font-size: smaller">
            (${topic})</strong><br>${question}</label></span><span style="display inline-block; float: right; 
            width:10%;">
            <input id="${id}" name="bnkc" type="checkbox" onclick="resDisp()" value="${id}"></span></li>
            `
        }
    }
    return ques;
}

function totPoints(){
    var q = document.getElementsByClassName('qChoice');
    let sum = 0;
    for (i = 0; i < q.length; i++) {
        var pts = document.getElementsByName('points')[i].value;
        if(pts != "") {
            sum += parseInt(pts);
        }
    }
    document.getElementById('totalPts').innerHTML="Total: "+sum+" pts";
}

function removeQues(val){
    console.log(val);
    var q= val;
        q.parentNode.removeChild(q);
        totPoints();
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