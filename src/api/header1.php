<?php
    include 'connect.php';
    $sql = 'select * from register';
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    echo json_encode($row,JSON_UNESCAPED_UNICODE);;
    

?>