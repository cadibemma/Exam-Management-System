var user;

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

        content += `<div class="exMain" style="margin-top: 3%"><p><span>Question ${i}:</span><br>
                    <div style="width: 75%"><p>${question}</p><br><span><label style="padding-left:17% ">
                    Your Answer:</label><span style="float: right">Points: <span class="pts">${ptsS}/${ptsW}</span>
                    </span><br><div id="q${i}a" class="qa">${ans}</div></span><br>
                    <span style="padding-right: 70%; font-family: Lato, sans-serif; font-weight: 100; font-style: italic;">
                    Addt'l. Comments:</span><div class="qc">${pcom}</div></div></div><br><br><br><br><br><br>`;
    }
    content += `<br></div>`;

    document.getElementById('exR').innerHTML = exR;
    document.getElementById('examsR').innerHTML = content;
}

function listStuData(data) {
    if (!data) return;

    var content = document.getElementById('grBR').innerHTML;
    console.log(data);
    console.log(Object.keys(data).length);

    const stuTot = data[0]['grade'];
    const tot = data[0]['total'];

    for(i=1;i<data.length; i++) {
        const funEx = data[i]['questionName'];
        const funA = data[0]['q' + i + 'f'];
        const funApt = data[0]['q' + i + 'fs'];
        const ptsS = data[0]['q' + i + 'aw'];
        const topN = (Object.keys(data[i]).length - 4) / 4;
        const synPts = data[0]['q'+i+'syn'];
        const com = data[0]['q' + i + 'c'];

        if(synPts != 0){
            var synM="NO";
            var synA="";
        } else{
            synM="YES";
            synA=":";
        }

        if (funEx === funA) {
            var funM = "YES";
        } else funM = "NO";

        content += `Question ${i}:<br><br>
        <table id="stuData${i}" style="width: 90%">
        <thead>
        <tr>
            <th style="min-width:146px" colspan="2" scope="col"></th>
            <th scope="colgroup">Expected Result</th>
            <th scope="colgroup">Actual Result</th>
            <th scope="colgroup">Match?</th>
            <th scope="colgroup">Points Lost</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th colspan="2" scope="row">Function Name</th>
            <td>${funEx}</td>
            <td>${funA}</td>
            <td>${funM}</td>
            <td>${funApt}</td>
        </tr>
        </tbody>
        <tbody>
        <tr>
            <th colspan="2" scope="row">Syntax</th>
            <td>:</td>
            <td>${synA}</td>
            <td>${synM}</td>
            <td>${synPts}</td>
        </tr>
        </tbody>
        <tbody id="tcases${i}">
        <tr>
        <th class="ro" rowspan="${topN}" scope="rowgroup"><div><p>Test Cases</p></div></th>`;

        for (n = 1; n < topN; n++) {
            const inP = data[i]['input'+n];
            const exO = data[i]['output'+n];
            var stuO = data[i]['studentoutput'+n];
            const inPts = data[i]['q'+i+'s'+n];

            if(stuO === null){
                stuO = "";
            }

            if (exO === stuO) {
                var outM = "YES";
            } else outM = "NO";

        content += `<th class="tc" scope="row">${inP}</th>
            <td>${exO}</td>
            <td>${stuO}</td>
            <td>${outM}</td>
            <td>${inPts}</td>
        </tr>
        <tr>`;
    }
        const inP = data[i]['input'+topN];
        const exO = data[i]['output'+topN];
        var stuO = data[i]['studentoutput'+topN];
        const inPts = data[i]['q'+i+'s'+topN];

        if(stuO === null){
            stuO = "";
        }

        if (exO === stuO) {
            var outM = "YES";
        } else outM = "NO";

        content += `<th class="tc" scope="row">${inP}</th>
            <td>${exO}</td>
            <td>${stuO}</td>
            <td>${outM}</td>
            <td>${inPts}</td>
        </tr>
        </tbody>
        <tbody class="con">`;

        const forQ = data[i]['for'];
        var forPts = data[0]['q' + i + 'for'];
        const whileQ = data[i]['while'];
        var whilePts = data[0]['q' + i + 'while'];
        const printQ = data[i]['print'];
        var printPts = data[0]['q' + i + 'print'];

        if(forQ==0){
            var forM = "";
            forPts = "";
        }else if(forPts==0){
            forM = "YES";
        }else forM = "NO";

        if(whileQ==0){
            var whileM = "";
            whilePts = "";
        }else if(whilePts==0){
            whileM = "YES";
        }else whileM = "NO";

        if(printQ==0){
            var printM = "";
            printPts = "";
        }else if(printPts==0){
            printM = "YES";
        }else printM = "NO";

        content += `<tr> 
            <th class="ro" rowspan="3" scope="rowgroup" ><div><p>Constraints</p></div></th>
            <td  class="c" colspan="3" scope="row"><strong>for</strong></td>
            <td>${forM}</td>
            <td>${forPts}</td>
        </tr>
        <tr>
            <td class="c" colspan="3" scope="row"><strong>while</strong></td>
            <td>${whileM}</td>
            <td>${whilePts}</td>
        </tr>
        <tr>
            <td class="c" colspan="3" scope="row"><strong>print</strong></td>
            <td>${printM}</td>
            <td>${printPts}</td>
        </tr>
        </tbody>
        <tbody>
        <tr>
            <td colspan="4" style="border: none"></td><td colspan="2">Total: ${ptsS}pts</td>
        </tr>
        </tbody>
    </table><br><br>`;
    }
    content += `</div>`;

    document.getElementById('grBR').innerHTML = content;

    console.log(tot);
    console.log(stuTot);

    var g= (parseFloat(stuTot/tot)*100).toFixed(2);
    console.log(g);
    document.getElementById('totOvrl').innerHTML = "Overall Grade: "+stuTot+"/"+tot+" ("+g+"%)";


    for(x=1;x < data.length;x++){
        var cHeight = document.getElementById('tcases'+x);
        var tcase = cHeight.getElementsByTagName('tr').length;
        var newH = cHeight.clientHeight/tcase;
        for(i=0; i<tcase; i++) {
            var tc = cHeight.getElementsByClassName('tc')[i];
            tc.style.height = newH + "px";
        }

        var t = document.getElementById('stuData'+x);
        var z = t.getElementsByTagName('td').length;
        var r = t.getElementsByTagName('td');
        for (y=0; y<z; y++) {
            if (r[y].innerHTML === "YES") {
                r[y].style.backgroundColor = "lightgreen";
                r[y].style.borderColor="blue violet";
            } else if (r[y].innerHTML === "NO") {
                r[y].style.backgroundColor = "lightcoral";
                console.log(r[y].nextElementSibling.innerHTML);
                r[y].style.borderColor="blue violet";
            }

            if (r[y].innerText == "for" && r[y].nextElementSibling.innerHTML=="") {
                r[y].style.backgroundColor = "lightslategrey";
                r[y].nextElementSibling.style.backgroundColor = "lightslategrey";
                r[y].nextElementSibling.nextElementSibling.style.backgroundColor = "lightslategrey";
            }
            if (r[y].innerText == "while" && r[y].nextElementSibling.innerHTML=="") {
                r[y].style.backgroundColor = "lightslategrey";
                r[y].nextElementSibling.style.backgroundColor = "lightslategrey";
                r[y].nextElementSibling.nextElementSibling.style.backgroundColor = "lightslategrey";
            }
            if (r[y].innerText == "print" && r[y].nextElementSibling.innerHTML=="") {
                r[y].style.backgroundColor = "lightslategrey";
                r[y].nextElementSibling.style.backgroundColor = "lightslategrey";
                r[y].nextElementSibling.nextElementSibling.style.backgroundColor = "lightslategrey";
            }
        }
    }

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