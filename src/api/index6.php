<?php
    include 'connect.php';
    $id = $_GET["id"];
    $sql = 'select * from goods';
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    $row = array_slice($row,$id*1,4);
    echo json_encode($row,JSON_UNESCAPED_UNICODE);;
    

?>