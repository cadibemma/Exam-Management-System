<?php

include "../curlTime.php";

$response = file_get_contents('php://input');
$send = json_decode($response,true);


#$send= array("Question" => "sample", "Answer" => "case", "topic" => "default","level"=>"easy");

$url="https://web.njit.edu/~jp594/group5/middle/m_createExam_.php";

echo curlTime($url, $send);

//echo $response;

?>