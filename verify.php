<?php

session_start();

$str_json = file_get_contents("php://input");
$response = json_decode($str_json, true); // decoding received JSON to array

$user=$response['name'];

$res_project=login_project($response['name'],$response['pass']);

function login_project($user,$pass)
{
    $data = array('username' => $user,'password' => $pass);
    $url = "https://web.njit.edu/~jp594/group5/middle/m_login_.php";

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close ($ch);
    return $response;
}
//------------------------

$ans = json_decode($res_project,true);

if(($ans["permission"] == "instructor") || ($ans["permission"] =="student")){

    $_SESSION['username'] = $user;

    if ($ans['permission'] == "instructor") {
        $_SESSION['role'] = "instructor";

        $_SESSION['name'] = $ans['fName'];
    } else {
        $_SESSION['role'] = "student";
        $_SESSION['name'] = $ans['fName'];
    }

    echo json_encode($ans["permission"]);

}else {
    echo json_encode($res_project);
}

?>