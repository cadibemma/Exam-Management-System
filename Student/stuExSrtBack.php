<?php

include "../curlTime.php";

$response = file_get_contents('php://input');
$send = json_decode($response,true);



$url="https://web.njit.edu/~jp594/group5/middle/m_showexam_.php";

echo curlTime($url, $send);

//echo $response;

?>
