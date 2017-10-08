// VexFlow has some stupid bug where the minified production version still
// outputs information to the console
console.log = function() {};

angular.element(document).ready(function() {
    const VF = Vex.Flow;
    var body = document.getElementsByTagName('body')[0];
    var contentWidth = document.querySelector('.content-section .title').offsetWidth;
    if (contentWidth > 900) { contentWidth = 900; }

    playTrombone();
    playSaxophone();
    playPiano();

    function makeSystem(factory, x, y, width) {
        return factory.System({
            x: x,
            y: y,
            width: width,
            spaceBetweenStaves: 10
        });
    }

    function id(registry, id) {
        return registry.getElementById(id);
    }

    function playTrombone() {
        document.getElementById('j-j-johnson').innerHTML = '';

        var x = 0;
        var y = 20;
        var vf = new VF.Factory({
            renderer: {
                elementId: 'j-j-johnson',
                width: contentWidth,
                height: 110
            }
        });
        var registry = new VF.Registry();
        VF.Registry.enableDefaultRegistry(registry);

        var score = vf.EasyScore();
        score.set({time: '4/4'});
        var system = makeSystem(vf, x, y, 0.42 * contentWidth);
        x += 0.42 * contentWidth;
        system.addStave({
            voices: [
                score.voice(
                    score.beam(score.notes('C4/8, D4, E4, F4', {clef: 'bass'}))
                    .concat(score.notes('G4/h', {clef: 'bass'}))
                )
            ]
        }).addClef('bass').addTimeSignature('4/4');

        system = makeSystem(vf, x, y, 0.42 * contentWidth);
        x += 0.42 * contentWidth;
        system.addStave({
            voices: [
                score.voice(
                    score.beam(score.notes('B4/8, C5, B4, A4', {clef: 'bass'}))
                    .concat(score.notes('G#4/q[id="jjj-1"]', {clef: 'bass'}))
                    .concat(score.beam(score.notes('F4/8, D4', {clef: 'bass'})))
                )
            ]
        });
        id(registry, 'jjj-1').addModifier(0, vf.Articulation({
            type: 'a.',
            position: 'above'
        }));

        score.set({time: '1/4'});
        system = makeSystem(vf, x, y, 0.21 * contentWidth);
        system.addStave({
            voices: [
                score.voice(
                    score.notes('E4/q', {clef: 'bass'})
                )
            ]
        });

        vf.draw();
    }

    function playPiano() {
        document.getElementById('billy-joel').innerHTML = '';

        var x = 0;
        var y = 20;
        var vf = new VF.Factory({
            renderer: {
                elementId: 'billy-joel',
                width: contentWidth,
                height: 130
            }
        });
        var registry = new VF.Registry();
        VF.Registry.enableDefaultRegistry(registry);

        var score = vf.EasyScore();
        score.set({time: '4/4'});
        var system = makeSystem(vf, x, y, 1.01 * contentWidth);
        system.addStave({
            voices: [
                score.voice(
                    score.notes('B4/8/r', {clef: 'treble'})
                    .concat(score.beam(
                        score.notes('(G6 D6)/32[id="bj-1"], E6, D6/16', {clef: 'treble'})
                    ))
                    .concat(score.beam(
                        score.notes('(D6 A5)/16[id="bj-2"], G5', {clef: 'treble'})
                    ))
                    .concat(score.notes('B4/8/r', {clef: 'treble'}))
                    .concat(score.beam(
                        score.notes('(G6 D6)/32[id="bj-3"], E6, D6/16, (D6 A5)[id="bj-4"], G5', {
                            clef: 'treble'
                        })
                    ))
                    .concat(score.beam(
                        score.notes('(G5 D5)/16[id="bj-5"], B4, (D5 A4)[id="bj-6"], G4', {
                            clef: 'treble', stem: 'down'
                        })
                    ))
                )
            ]
        }).addClef('treble').addTimeSignature('4/4').addKeySignature('G');
        id(registry, 'bj-1').addModifier(0, vf.Articulation({
            type: 'a>',
            position: 'above'
        }));
        id(registry, 'bj-2').addModifier(0, vf.Articulation({
            type: 'a>',
            position: 'above'
        }));
        id(registry, 'bj-3').addModifier(0, vf.Articulation({
            type: 'a>',
            position: 'above'
        }));
        id(registry, 'bj-4').addModifier(0, vf.Articulation({
            type: 'a>',
            position: 'above'
        }));
        id(registry, 'bj-5').addModifier(0, vf.Articulation({
            type: 'a>',
            position: 'above'
        }));
        id(registry, 'bj-6').addModifier(0, vf.Articulation({
            type: 'a>',
            position: 'above'
        }));

        vf.draw();
    }

    function playSaxophone() {
        document.getElementById('paul-desmond').innerHTML = '';

        var x = 0;
        var y = 0;
        var vf = new VF.Factory({
            renderer: {
                elementId: 'paul-desmond',
                width: contentWidth,
                height: 100
            }
        });
        var registry = new VF.Registry();
        VF.Registry.enableDefaultRegistry(registry);

        var score = vf.EasyScore();
        score.set({time: '3/8'});
        var system = makeSystem(vf, x, y, 0.35 * contentWidth);
        x += 0.35 * contentWidth;
        system.addStave({
            voices: [
                score.voice(
                    score.notes('D5', {clef: 'treble'})
                    .concat(score.beam(score.notes('A4, C5', {clef: 'treble', stem: 'down'})))
                )
            ]
        }).addClef('treble').addTimeSignature('4/4').addKeySignature('F');

        score.set({time: '4/4'});
        system = makeSystem(vf, x, y, 0.7 * contentWidth);
        x += 0.7 * contentWidth;
        system.addStave({
            voices: [
                score.voice(
                    score.beam(score.notes('B4/8, F5', {clef: 'treble'}))
                    .concat(score.beam(
                        score.tuplet(score.notes('A4/16, B4, A4', {
                            clef: 'treble', stem: 'up'
                        }))
                        .concat(score.notes('F4/8'))
                    ))
                    .concat(score.beam(score.notes('G4/8, C5', {clef: 'treble', stem: 'up'})))
                    .concat(score.notes('A4/q[id="pd-1"]', {clef: 'treble'}))
                )
            ]
        });
        id(registry, 'pd-1').addModifier(0, vf.Articulation({
            type: 'a.',
            position: 'below'
        }));

        vf.draw();
    }

    window.addEventListener('resize', function() {
        contentWidth = document.querySelector('.content .title').offsetWidth;
        if (contentWidth > 900) { contentWidth = 900; }

        playTrombone();
        playSaxophone();
        playPiano();
    });
});
