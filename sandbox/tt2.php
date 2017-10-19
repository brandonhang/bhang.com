<?php $root = $_SERVER['DOCUMENT_ROOT']; ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="author" content="Brandon S. Hang"/>
        <base href="/">
        <link href="https://fonts.googleapis.com/css?family=Sansita+One" rel="stylesheet">
        <link type="text/css" rel="stylesheet" href="/css/tt2.min.css"/>
        <link type="image/x-icon" rel="shortcut icon" href="/img/icons/icon.ico"/>
        <link rel="apple-touch-icon" href="/img/icons/apple-logo.png"/>
        <title>Triple Triad</title>
    </head>
    <body>
        <div class="what-else-floats"></div>
        <div class="pointer-container">
            <div class="pointer"></div>
        </div>
        <div class="game-container">
            <div class="deck-container">
                <ul id="p0-deck" class="deck">
                    <?php
                        for ($i = 0; $i < 5; $i++) {
                            echo "<li class='card hand' player='0' num='$i'></li>";
                        }
                    ?>
                </ul>
            </div>
            <div class="deck-container">
                <ul id="p1-deck" class="deck">
                    <?php
                        for ($i = 0; $i < 5; $i++) {
                            echo "<li class='card hand' player='1' num='$i'></li>";
                        }
                    ?>
                </ul>
            </div>
            <div class="board-container">
                <table id="tt">
                    <?php
                        for ($i = 0; $i < 9; $i += 3) {
                            echo '<tr>';
                            for ($j = 0; $j < 3; $j++) {
                                echo '<td><div id="card' . ($i + $j) . '" class="card">' .
                                    '<div class="front"></div><div class="back"></div></div></td>';
                            }
                            echo '</tr>';
                        }
                    ?>
                </table>
            </div>
            <div class="scoreboard">
                <table class="sb-table">
                    <tr>
                        <th>0</th><th>&nbsp</th><th>0</th>
                    </tr>
                </table>
            </div>
            <div id="msg"><span></span></div>
            <button class="button" id="reset">New Game</button>
        </div>
        <form class="pick-hand">
            <!-- <p><a href="https://www.youtube.com/watch?v=BgOHKCks5hs" target="_blank">Start the music!</a></p> -->
            <p>Choose the <a href="http://finalfantasy.wikia.com/wiki/Triple_Triad_(Final_Fantasy_VIII)#Mechanics" target="_blank">rules</a> to play by</p>
            <div class="game-options">
                <div class="game-op-1">
                    <label><input type="radio" name="rules-1" value="closed" checked="checked"/>Closed</label>
                    <label><input type="radio" name="rules-1" value="open"/>Open</label>
                    <label><input type="radio" name="rules-1" value="random"/>Random</label>
                    <!--<label><input type="checkbox" name="sudden-death" value="sudden-death"/>Sudden Death</label>-->
                </div>
                <div class="game-op-2">
                    <label><input type="radio" name="rules-2" value="basic" checked="checked"/>Basic</label>
                    <!--<label><input type="radio" name="rules-2" value="same"/>Same</label>
                    <label><input type="radio" name="rules-2" value="same wall"/>Same Wall</label>
                    <label><input type="radio" name="rules-2" value="plus"/>Plus</label>-->
                    <label><input type="checkbox" name="elemental" value="elemental"/>Elemental</label>
                </div>
            </div>
            <p>Pick 5 cards to build your hand!</p>
            <div class="card-list">
                <?php
                    $jsonBourne = array("FF6", "FF8", "FF9", "FF10", "FF12", "FF13", "SE");

                    foreach ($jsonBourne as $index => $file) {
                        $jfile = file_get_contents("$root/config/$file.json");
                        $json = json_decode($jfile);

                        echo "<div class='sorted-deck'><h3>$json->name</h3>";
                        foreach ($json->set as $deck) {
                            echo "<div class='deck-level'><h5>$deck->level</h5>";
                            foreach ($deck->cards as $card) {
                                if (file_exists("$root/img/cards/$file/$card.jpg")) {
                                    echo "<label><input id='select-$card' class='hidden' type='checkbox' deck='$file' value='$card'/>";
                                    echo "<img class='card-img' src='/img/cards/$file/$card.jpg'/></label>";
                                }
                                else {
                                    echo '<img class="locked" src="/img/cards/TTlocked.jpg"/>';
                                }
                            }
                            echo "</div>";
                        }
                        echo "</div>";
                    }
                ?>
            </div>
            <button class="button">Let's Duel!</button>
        </form>
		<div id="shuffle-or-boogie"></div>
        <div id="controls">
            <button id="control-play">Play &#9654;</button><button id="control-pause">Pause &#9208;</button>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdn.rawgit.com/nnattawat/flip/master/dist/jquery.flip.min.js"></script>
        <script type="text/javascript" src="https://www.youtube.com/iframe_api"></script>
        <script src="/js/konami.min.js"></script>
        <script src="/js/tt3.min.js"></script>
    </body>
</html>
