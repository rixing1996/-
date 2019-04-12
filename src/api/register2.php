<?php
    include 'connect.php';
    $uname = $_GET["uname"];
    $pwd = $_GET["pwd"];
    $sql =  "insert into login (uname, pwd)
    values ('".$uname."', '".$pwd."')";
    $result = $conn->query($sql);
    $result->close();
    

?>