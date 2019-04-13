<?php
    include 'connect.php';
    $page = isset($_GET["page"]) ? $_GET["page"] : 1;
    $sql = 'select * from goods';
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $data = array_slice($row,($page-1)*12,12);
    $result->close();
    $res = array(
        "total" => count($row),
        "data" => $data
    );
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    

?>