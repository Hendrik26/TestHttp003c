<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
$json = file_get_contents("php://input");
$rows = json_decode($json);
$dbWriteError01 = "dbWriteError";
$dbWriteError02 = "{\"dbWriteError\":\"dbWriteError\"}";
if ($json != "") {
    include("db_conn.php");
    $sql = "START TRANSACTION; delete from tbltesthttp";
    try {
        $conn = new PDO($strConn, $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->exec($sql);

        // ------------------------------------------------
        foreach ($rows as $key => $value) {
            $stmt = $conn->prepare("insert into tbltesthttp (column01, column02) values
                                                    (:column01, :column02)");
            $stmt->bindParam(':column01', $value->column01);
            $stmt->bindParam(':column02', $value->column02);
            $stmt->execute();
        }
        // -----------------------------------

        $sql = "COMMIT";
        $conn->exec($sql);
        $conn = null;
    } catch (PDOException $e) {
        // echo "write table failed: " . $e->getMessage();
        echo $dbWriteError02;
    }
}
?>
