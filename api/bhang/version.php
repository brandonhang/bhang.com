<?php
    try {
        $document = new DomDocument;
        $document->loadHtml(file_get_contents('http://brandonhang.com/components/html/footer.html'));
        $h4List = $document->getElementsByTagName('h4');
        $lastH4 = $h4List->item(2)->nodeValue;
        $version = str_replace('Version ', '', $lastH4);
        $data = ['version' => $version];
        echo json_encode($data);
    }
    catch (Exception $exc) {
        $data = ['version' => '???'];
        echo json_encode($data);
    }
?>