<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
$json = file_get_contents("php://input");
$rows = json_decode($json);
if ($json != "") {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "test";
    $sql = "START TRANSACTION; delete from tbltesthttp";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //echo "Connected successfully";
        $conn->exec($sql);
        foreach ($rows as $key => $value) {
            $column01 = $value->column01;
            $column02 = $value->column02;
            $sql = "insert into tbltesthttp (Spalte01, Spalte02) values ('$column01', '$column02')";
            $conn->exec($sql);
        }
        $sql = "COMMIT";
        $conn->exec($sql);
        $conn = null;
        echo "table written successfully";
    } catch (PDOException $e) {
        echo "write table failed: " . $e->getMessage();
    }


}

?>
