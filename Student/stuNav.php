<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="../Javascript/stuExam.js" language="JavaScript"></script>

    <style>
        body{
            margin:0;
        }

        .topnav{
            overflow:hidden;
            background-color:maroon;
            position:sticky;
            position: -webkit-sticky;
            top:0;
            z-index: 2;
        }
        .topnav a{
            float:left;
            display:block;
            color:#f2f2f2;
            text-align:center;
            padding: 14px 16px;
            text-decoration:none;
            font-size:17px;
        }
        .topnav a:hover{
            background-color:#ddd;
            color:black;
        }

    </style>



    <div class="topnav">
        <a href="stuMain.php">Home</a>
        <a href="stuStartex.php">Exam</a>
        <a href="stuGrade.php">View Scores</a>


        <a onclick="end()">Log Out</a>
    </div>

    <script>

        var url = window.location.pathname;
        var filename = url.substring(url.lastIndexOf('/')+1);

        function end()
        {
            if(filename==="stuExam.php"){
                if (confirm("Are you sure you would like to leave without submitting? Changes made to this exam will not be saved. ") == false)
                {
                    return false;
                }
            }

            if (confirm("Are you sure you would like to logout?") == true)
            {
                location.href="../logout.php";
            }

        }

        if(filename==="stuExam.php")
        {
            var a = document.getElementsByTagName('a');
            for(i=0;i<3;i++){
                a[i].onclick= function()
                {
                    if (confirm("Are you sure you would like to leave without submitting? Changes made to this exam will not be saved. ") == false)
                    {
                        return false;
                    }
                }
            }
        }

    </script>

</head>