<?php

$base_url = /* REDACTED */;
$album_id = isset($_GET['album']) ? $_GET['album'] : null;
$photo_id = isset($_GET['photo']) ? $_GET['photo'] : null;

$bookends = array(
    array(
        id    => null,
        title => null
    ),
    array(
        id    => null,
        title => null
    )
);

$url = '';

if (!is_null($photo_id) && is_null($album_id)) {
    $url = /* REDACTED */;
}
elseif (!is_null($album_id) && !is_null($photo_id)) {
    $url = /* REDACTED */;
}

if (!empty($url)) {
    $response = /* REDACTED */;

    if (preg_match('/<a.*linkPrev.*>/', $response, $prev_matches)) {
        preg_match('#href.*[.]php[?][/](\d+)#', $prev_matches[0], $prev_href);
        preg_match('/title=".*: (.*)" rel/', $prev_matches[0], $prev_title);

        $bookends[0]['id']    = $prev_href[1];
        $bookends[0]['title'] = $prev_title[1];
    }
    if (preg_match('/<a.*linkNext.*>/', $response, $next_matches)) {
        preg_match('#href.*[.]php[?][/](\d+)#', $next_matches[0], $next_href);
        preg_match('/title=".*: (.*)" rel/', $next_matches[0], $next_title);

        $bookends[1]['id']    = $next_href[1];
        $bookends[1]['title'] = $next_title[1];
    }
}

header('Content-type:application/json; charset=utf-8');

echo json_encode($bookends);

?>
