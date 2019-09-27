<?php
header("Access-Control-Allow-Origin: *");
include("db_conn.php");
$sql = "select column01, column02 from tbltesthttp";
$dbReadError = "{\"dbReadError\":\"dbReadError\"}";
try {
    $conn = new PDO($strConn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $result = $conn->query($sql);
    $result->setFetchMode(PDO::FETCH_ASSOC);
    $rows = $result->fetchAll();
    $json = json_encode($rows);
    $conn = null;

    echo $json;
} catch (PDOException $e) {
    // echo ("123abc");
    // echo "read table failed: " . $e->getMessage();
    echo $dbReadError;
}
// $x = 1;
// $y = 2;
// echo $json;
// echo ("890xyz");
// echo $dbReadError;
?>
