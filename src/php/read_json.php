<?php
header("Access-Control-Allow-Origin: *");
$json = file_get_contents('json.txt');
echo $json;
?>
