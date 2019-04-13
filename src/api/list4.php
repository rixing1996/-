<?php
    include 'connect.php';
    $id = $_GET["id"];
    $title = $_GET["title"];
    $url = $_GET["url"];
    $oldprice = $_GET["oldprice"];
    $newprice = $_GET["newprice"];
    $sql1 = "select * from gouwuche where id=".$id;
    $result1 = $conn->query($sql1);
    if($result1->num_rows<=0){
        $sql =  "insert into gouwuche (id,title,newprice,oldprice,url)
        values ('".$id."','".$title."','".$newprice."','".$oldprice."','".$url."')";
        $result = $conn->query($sql);
        
    }
    $result1->close();
    $result->close();
    

?>