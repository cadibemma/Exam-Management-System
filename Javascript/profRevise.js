var user;
var orig=[];
var tot;

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

function listStuData(data) {
    if (!data) return;

    var content = document.getElementById('grBR').innerHTML;
    console.log(data);
    console.log(Object.keys(data).length);

    let stuTot = 0;
    tot=0;
    for(i=1;i<data.length; i++) {
        const funEx = data[i]['questionName'];
        const funA = data[0]['q' + i + 'f'];
        const ptsS = data[0]['q' + i + 'aw'];
        const topN = (Object.keys(data[i]).length - 4) / 4;
        const synPts = data[0]['q'+i+'syn'];
        const com = data[0]['q' + i + 'c'];
        var oW = data[0]['q' + i + 'w'];

        if(synPts != 0){
            var synM="NO";
            var synA="";
        } else{
            synM="YES";
            synA=":";
        }

        stuTot += parseFloat(ptsS);
        tot += parseFloat(oW);
        console.log(tot);
        console.log(stuTot);

        if (funEx === funA) {
            var funM = "YES";
        } else funM = "NO";

        content += `Question ${i}:<br><br>
        <table id="stuData${i}" class="stuData" style="width: 90%">
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
            <td><input type="number" class="funPts${i}" oninput="totPoints()" min="0" max="${parseInt(oW)}" style="width: 50%; text-align: center"></td>
        </tr>
        </tbody>
        <tbody>
        <tr>
            <th colspan="2" scope="row">Syntax</th>
            <td>:</td>
            <td>${synA}</td>
            <td>${synM}</td>
            <td><input type="number" class="synPts${i}" oninput="totPoints()" min="0" max="${parseInt(oW)}" style="width: 50%; text-align: center"></td>
        </tr>
        </tbody>
        <tbody id="tcases${i}" class="tcases">
        <tr>
        <th class="ro" rowspan="${topN}" scope="rowgroup"><div><p>Test Cases</p></div></th>`;

        for (n = 1; n < topN; n++) {
            var inP = data[i]['input'+n];
            var exO = data[i]['output'+n];
            var stuO = data[i]['studentoutput'+n];


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
            <td><input type="number" class="pts${i}" oninput="totPoints()" min="0" max="${parseInt(oW)}" style="width: 50%; text-align: center"></td>
        </tr>
        <tr>`;
        }
        inP = data[i]['input'+topN];
        exO = data[i]['output'+topN];
        stuO = data[i]['studentoutput'+topN];

        if(stuO === null){
            stuO = "";
        }

        if (exO === stuO) {
             outM = "YES";
        } else outM = "NO";


        content += `<th class="tc" scope="row">${inP}</th>
            <td>${exO}</td>
            <td>${stuO}</td>
            <td>${outM}</td>
            <td><input type="number" class="pts${i}" oninput="totPoints()" min="0" max="${parseInt(oW)}" style="width: 50%; text-align: center"></td>
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
            <td id="fPts${i}">${forPts}</td>
        </tr>
        <tr>
            <td class="c" colspan="3" scope="row"><strong>while</strong></td>
            <td>${whileM}</td>
            <td id="wPts${i}">${whilePts}</td>
        </tr>
        <tr>
            <td class="c" colspan="3" scope="row"><strong>print</strong></td>
            <td>${printM}</td>
            <td id="pPts${i}">${printPts}</td>
        </tr>
        </tbody>
        <tbody>
        <tr>
            <td colspan="4" style="border: none"></td><td colspan="2">Total: <span class="totalPts">${ptsS}</span> pts</td>
        </tr>
        </tbody>
    </table><br><br>`;
    }
    content += `</div>`;

    document.getElementById('grBR').innerHTML = content;
    var g= (parseFloat(stuTot/tot)*100).toFixed(2);
    console.log(g);
    document.getElementById('totOvrl').innerHTML += `<span id="overall"></span>`;
    document.getElementById('overall').innerHTML="Overall Grade: "+`<span id="overPts">${stuTot}</span>`+"/"+
        tot+" ("+`<span id='per'>${g}</span>`+"%)";

    for(i=1;i<data.length; i++) {

        var fts = document.getElementsByClassName('funPts'+i)[0];
        var sts = document.getElementsByClassName('synPts'+i)[0];

        if(data[0]['q' + i + 'fs'] === '0')
            fts.value = parseFloat(data[0]['q' + i + 'fs']);
        else fts.value = parseFloat(data[0]['q' + i + 'fs']).toFixed(2);

        if(data[0]['q'+i+'syn'] === '0')
            sts.value = parseFloat(data[0]['q'+i+'syn']);
        else sts.value = parseFloat(data[0]['q'+i+'syn']).toFixed(2);

        var len = document.getElementsByClassName('pts'+i);
        for (m = 0; m < len.length; m++) {
            var y=1;
            while (typeof data[i]['q'+i+'s'+y] !== 'undefined') {

                if(data[i]['q'+i+'s'+y] === '0')
                    len[m].value = parseFloat(data[i]['q'+i+'s'+y]);
                else len[m].value = parseFloat(data[i]['q'+i+'s'+y]).toFixed(2);
            y++;
            m++;
            console.log(data[i]['q'+i+'s'+y]);
            }
        }
        var fPt =document.getElementById('fPts'+i);
        var wPt =document.getElementById('wPts'+i);
        var pPt =document.getElementById('pPts'+i);
        oW = data[0]['q' + i + 'w'];
        if(fPt.innerHTML!=""){
            fPt.innerHTML = `<input type="number" class="fPts${i}" oninput="totPoints()" min="0" max="${parseInt(oW)}" style="width: 50%; text-align: center">`;
            if(data[0]['q' + i + 'for']==='0')
                document.getElementsByClassName('fPts'+i)[0].value = parseFloat(data[0]['q' + i + 'for']);
            else document.getElementsByClassName('fPts'+i)[0].value = parseFloat(data[0]['q' + i + 'for']).toFixed(2);
        }
        if(wPt.innerHTML!=""){
            wPt.innerHTML = `<input type="number" class="wPts${i}" oninput="totPoints()" min="0" max="${parseInt(oW)}" style="width: 50%; text-align: center">`;
            if(data[0]['q' + i + 'while']==='0')
                document.getElementsByClassName('wPts'+i)[0].value = parseFloat(data[0]['q' + i + 'while']);
            else document.getElementsByClassName('wPts'+i)[0].value = parseFloat(data[0]['q' + i + 'while']).toFixed(2);
        }
        if(pPt.innerHTML!=""){
            pPt.innerHTML = `<input type="number" class="pPts${i}" oninput="totPoints()" min="0" max="${parseInt(oW)}" style="width: 50%; text-align: center">`;
            if(data[0]['q' + i + 'print']==='0')
                document.getElementsByClassName('pPts'+i)[0].value = parseFloat(data[0]['q' + i + 'print']);
            else document.getElementsByClassName('pPts'+i)[0].value = parseFloat(data[0]['q' + i + 'print']).toFixed(2);
        }
    }

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
                r[y].style.borderColor="blue violet";
            }

            if (r[y].innerText == "for" && r[y].nextElementSibling.innerHTML=="") {
                r[y].style.backgroundColor = "lightslategrey";
                r[y].style.borderColor="blue violet";
                r[y].nextElementSibling.style.backgroundColor = "lightslategrey";
                r[y].nextElementSibling.style.borderColor="blue violet";
                r[y].nextElementSibling.nextElementSibling.style.backgroundColor = "lightslategrey";
                r[y].nextElementSibling.nextElementSibling.style.borderColor="blue violet";
            }
            if (r[y].innerText == "while" && r[y].nextElementSibling.innerHTML=="") {
                r[y].style.backgroundColor = "lightslategrey";
                r[y].style.borderColor="blue violet";
                r[y].nextElementSibling.style.backgroundColor = "lightslategrey";
                r[y].nextElementSibling.style.borderColor="blue violet";
                r[y].nextElementSibling.nextElementSibling.style.backgroundColor = "lightslategrey";
                r[y].nextElementSibling.nextElementSibling.style.borderColor="blue violet";
            }
            if (r[y].innerText == "print" && r[y].nextElementSibling.innerHTML=="") {
                r[y].style.backgroundColor = "lightslategrey";
                r[y].style.borderColor="blue violet";
                r[y].nextElementSibling.style.backgroundColor = "lightslategrey";
                r[y].nextElementSibling.style.borderColor="blue violet";
                r[y].nextElementSibling.nextElementSibling.style.backgroundColor = "lightslategrey";
                r[y].nextElementSibling.nextElementSibling.style.borderColor="blue violet";
            }
        }
    }

}
function totPoints(){

    var sum=[];
    var s= document.getElementsByClassName('stuData');
    for (i = 0; i < s.length; i++) {
        sum[i]=parseFloat(orig[i]);

        var fun = s[i].getElementsByClassName('funPts'+(i+1))[0].value;
        var syn = s[i].getElementsByClassName('synPts'+(i+1))[0].value;
        if(fun != ""){
            sum[i] -= parseFloat(fun);
            console.log(parseFloat(fun));
        }
        if(syn != ""){
            sum[i] -= parseFloat(syn);
        }
        var t = s[i].getElementsByClassName('tcases');
        var p = t[0].getElementsByClassName('pts'+(i+1));
        for(n=0;n<p.length;n++){
        var pts = p[n].value;
        if (pts != "") {
            sum[i] -= parseFloat(pts);
            }
        }

        var fPt =document.getElementById('fPts'+(i+1));
        var wPt =document.getElementById('wPts'+(i+1));
        var pPt =document.getElementById('pPts'+(i+1));
        if(fPt.innerHTML!=""){
            var ftP = s[i].getElementsByClassName('fPts'+(i+1))[0].value;
            if (ftP != "") {
            sum[i] -= parseFloat(ftP);
            }
        }
        if(wPt.innerHTML!=""){
            var wtP = s[i].getElementsByClassName('wPts'+(i+1))[0].value;
            if (wtP != "") {
            sum[i] -= parseFloat(wtP);
            }
        }
        if(pPt.innerHTML!=""){
            var ptP = s[i].getElementsByClassName('pPts'+(i+1))[0].value;
            if (ptP != "") {
            sum[i] -= parseFloat(ptP);
            }
        }
        s[i].getElementsByClassName('totalPts')[0].innerHTML=sum[i].toFixed(2);
        console.log(sum[i]);
        document.getElementsByClassName('stuPoints')[i].innerHTML=sum[i].toFixed(2);
    }
    grade();
}