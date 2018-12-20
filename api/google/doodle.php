<?php
    function default_doodle() {
        $data = [
            'src' => 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png',
            'type' => 'img',
            'default' => true
        ];
        echo json_encode($data);
    }

    libxml_use_internal_errors(true);
    header('Content-Type: application/json');

    try {
        $document = new DomDocument;
        $document->loadHtml(file_get_contents('https://www.google.com/'));
        $doodle = $document->getElementById('hplogo');
        if ($doodle->tagName === 'img') {
            $data = [
                'src' => 'https://www.google.com' . $doodle->getAttribute('src'),
                'type' => 'img'
            ];
            echo json_encode($data);
        }
    }
    catch (Exception $exc) {
        default_doodle();
    }
?>