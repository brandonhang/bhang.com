<?php
header('Content-type:application/json; charset=utf-8');
$sys_root = /* REDACTED */;

$image = $_GET['image'];
if (!$image) { exit; }

$tokens = explode('.com/', $image, 2);
$image_path = $tokens[1];
$image_path = urldecode($image_path);
if (!$image_path) { exit; }
if (strpos($image_path, '../') !== false) { exit; }

$exif_dump = /* REDACTED */;
$exif_array = explode("\n", $exif_dump);
$exif_data = array();

foreach ($exif_array as $exif_row) {
    $exif_tokens = explode(':', $exif_row, 2);
    $field = trim($exif_tokens[0]);
    $value = trim($exif_tokens[1]);

    if (preg_match('/^shutter speed$/i', $field) && !array_key_exists('shutter_speed', $exif_data)) {
        $exif_data['shutter_speed'] = $value;
    }
    elseif (preg_match('/^aperture(?: value)$/i', $field) && !array_key_exists('aperture', $exif_data)) {
        $exif_data['aperture'] = $value;
    }
    elseif (preg_match('/^focal length$/i', $field) && !array_key_exists('focal_length', $exif_data)) {
        $exif_data['focal_length'] = $value;
    }
    elseif (preg_match('/^iso$/i', $field) && !array_key_exists('iso', $exif_data)) {
        $exif_data['iso'] = $value;
    }
    elseif (preg_match('/^flash/i', $field) && !array_key_exists('flash', $exif_data)) {
        $exif_data['flash'] = preg_match('/^(off|false)/i', $value) ? 'false' : 'true';
    }
    elseif (preg_match('/^exposure compensation$/i', $field) && !array_key_exists('exposure', $exif_data)) {
        $exif_data['exposure'] = $value;
    }
    elseif (preg_match('/^camera model/i', $field) && !array_key_exists('camera', $exif_data)) {
        $exif_data['camera'] = $value;
    }
    // elseif (preg_match('/^make$/i', $field) && !array_key_exists('make', $exif_data)) {
    //     $exif_data['make'] = $value;
    // }
    elseif (preg_match('/^lens$/i', $field) && !array_key_exists('lens', $exif_data)) {
        $exif_data['lens'] = $value;
    }
}

echo '{';

$i = 0;
$num_exif = count($exif_data);

foreach ($exif_data as $key => $value) {
    if ($key === 'flash' || is_numeric($value)) {
        echo "\"$key\":$value";
    }
    else {
        echo "\"$key\":\"$value\"";
    }

    if (++$i < $num_exif) {
        echo ',';
    }
}

echo '}';
?>
