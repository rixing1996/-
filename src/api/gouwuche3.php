<?php
    include 'connect.php';
    $id = $_GET["id"];
    $sql = 'delete from gouwuche where id='.$id;
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    echo json_encode($row,JSON_UNESCAPED_UNICODE);;
    

?>