<?php
    include 'connect.php';
    $sql = 'select * from goods';
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    $row = array_slice($row,8,6);
    echo json_encode($row,JSON_UNESCAPED_UNICODE);;
    

?>