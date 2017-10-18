(function($) {
    $('#query').on('submit', function(e) {
        e.preventDefault();
    });

    var minYear = 1800;
    var maxYear = 2100;
    var minLength = 0;
    var maxLength = 300;
    var yearSlider = document.getElementById('year-slider');
    var lengthSlider = document.getElementById('length-slider');
    var currentYear = new Date().getFullYear();
    var yearDisplay = [
        document.getElementById('min-year'),
        document.getElementById('max-year')
    ];
    var lengthDisplay = document.getElementById('length');
    var searching = false;
    var buildTable;

    $.ajax({
        url: '/config/movies.json',
        type: 'GET',
        dataType: 'JSON',
        success: function(data) {
            movies = data;
            buildSliders();
        }
    });

    function buildSliders() {
        noUiSlider.create(yearSlider, {
            start: [minYear, maxYear],
            connect: true,
            range: {
                'min': [minYear, 100],
                '10%': [minYear + 100, 1],
                '90%': [currentYear, maxYear - currentYear],
                'max': [maxYear]
            }
        });

        noUiSlider.create(lengthSlider, {
            start: [maxLength],
            range: {
                'min': [minLength],
                'max': [maxLength]
            }
        });

        updateTable();

        yearSlider.noUiSlider.on('update', function(values, handle) {
            if (values[handle] == minYear) {
                yearDisplay[handle].innerHTML = '&minus;&infin;';
            }
            else if (values[handle] == maxYear) {
                yearDisplay[handle].innerHTML = '&infin;';
            }
            else {
                yearDisplay[handle].innerHTML = Math.round(values[handle], 0);
            }

            clearTimeout(buildTable);
            buildTable = setTimeout(updateTable(), 0);
        });

        lengthSlider.noUiSlider.on('update', function(value) {
            if (value == maxLength) {
                lengthDisplay.innerHTML = '&infin;';
            }
            else {
                lengthDisplay.innerHTML = Math.round(value, 0);
            }

            clearTimeout(buildTable);
            buildTable = setTimeout(updateTable(), 0);
        });
    }

    $('.genre-filter input[type=checkbox]').on('change', function() {
        clearTimeout(buildTable);
        buildTable = setTimeout(updateTable(), 0);
    });

    function updateTable() {
        var yearFloor = yearSlider.noUiSlider.get()[0];
        var yearCeiling = yearSlider.noUiSlider.get()[1];
        var lengthCeiling = lengthSlider.noUiSlider.get();
        var table =
            '<table id="results">'
                + '<thead>'
                    + '<tr>'
                        + '<th>Title</th>'
                        + '<th>Year</th>'
                        + '<th>Length (min.)</th>'
                        + '<th>Rating</th>'
                        + '<th>Genre</th>'
                    + '</tr>'
                + '</thead>'
                + '<tbody></tbody>'
            + '</table>';

        $('#results_wrapper').before(table).remove();


        $.each(movies, function(index, movie) {
            var addRow = true;

            if (movie.year >= yearFloor
                    && movie.year <= yearCeiling
                    && movie.length <= lengthCeiling) {
                $.each($('.genre-filter input:checkbox:checked'), function(index, genre) {
                    if (!movie.genre.includes($(genre).val())) {
                        addRow = false;
                    }
                });

                if (addRow) {
                    $('#results tbody').append(
                        '<tr>'
                            + '<td>' + movie.title + '</td>'
                            + '<td>' + movie.year + '</td>'
                            + '<td>' + movie.length + '</td>'
                            + '<td>' + movie.rating + '</td>'
                            + '<td>' + movie.genre + '</td>'
                        + '</tr>'
                    );
                }
            }
        });

        $('#results').DataTable();
    }

    $('.filter-img-wrapper').on('click', function() {
        $('.filters').toggleClass('hidden');
        $('.filter-fxn img').toggleClass('flipped');
        $('.filter-fxn-text').toggleClass('closed');
    });
})(jQuery);
