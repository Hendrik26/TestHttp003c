<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";
$sql = "select column01, column02 from tbltesthttp";
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $result = $conn->query($sql);
    $resultArray = array();
    if($result->rowCount() > 0) {
        $rows = $result->fetchAll();
        foreach ($rows as $row) {

            $X = $row['column01'];
            array_push($resultArray, array("column01"=>$row['column01'], "column02"=>$row['column02']));
        };
        $json = json_encode($resultArray);
    }
    $conn = null;
} catch (PDOException $e) {
    echo "read table failed: " . $e->getMessage();
}
echo $json;
?>
