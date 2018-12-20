<?php
    $server = 'localhost';
    $user = 'brandonh_read_o';
    $pass = 'tF=O{8@AZxO~';
    $db = 'brandonh_asia_mall';
    $sql = 'SELECT * FROM movies';

    $connection = new mysqli($server, $user, $pass, $db);

    if ($connection->connect_error) {
        $err = array();
        echo json_encode($err);
    }

    $result = $connection->query($sql);
    $data = array();

    while ($row = $result->fetch_assoc()) {
        $utf8_row = array();

        foreach($row as $key => $value) {
            $utf8_row[$key] = $value;
        }

        $data[] = $utf8_row;
    }

    echo json_encode($data);
    $connection->close();
?>
