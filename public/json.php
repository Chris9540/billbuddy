<?php
$json = file_get_contents('./polo-variants.json');
$jsonData = json_decode($json, true);
header('Content-Type: application/json');
echo json_encode($jsonData);
?>