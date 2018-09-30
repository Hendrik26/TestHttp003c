<?php
  $json = file_get_contents("php://input");
  $file = fopen('json.txt','w+');
  fwrite($file, $json);
  fclose($file);
?>
