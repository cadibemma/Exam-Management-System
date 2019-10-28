<?php

function curlTime($url, $send)
{
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($send));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $resp = curl_exec($ch);

    curl_close ($ch);

    return $resp;
}

?>