<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";
$sql = "select column01, column02 from tbltesthttp";
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $result = $conn->query($sql);
    $result->setFetchMode(PDO::FETCH_ASSOC);
    $rows = $result->fetchAll();
    $json = json_encode($rows);
    $conn = null;
} catch (PDOException $e) {
    echo "read table failed: " . $e->getMessage();
}
echo $json;
?>
