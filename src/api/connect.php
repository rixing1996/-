<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'project';
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset('utf-8');
    $conn->query("SET NAMES utf8");



?>