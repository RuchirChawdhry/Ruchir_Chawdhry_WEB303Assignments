$(document).ready(function() {
    loadTableData();

    let originalData = []; 
    let sortOrder = {}; 

    function updateCountButtons() {
        let countAM = 0;
        let countNZ = 0;

        $('#characters tbody tr').each(function() {
            let firstName = $(this).find('td:first').text().toUpperCase();
            if (firstName >= 'A' && firstName <= 'M') {
                countAM++;
            } else if (firstName >= 'N' && firstName <= 'Z') {
                countNZ++;
            }
        });

        $('#filterAM').text('A-M (' + countAM + ')');
        $('#filterNZ').text('N-Z (' + countNZ + ')');
    }

    $('#characters th a').click(function(event) {
        event.preventDefault();
        let index = $(this).parent().index();
        let key = $(this).text().trim();

        // Changing the sort order when a heading is clicked
        if (sortOrder[key] === 'asc') {
            sortOrder[key] = 'desc';
        } else if (sortOrder[key] === 'desc') {
            sortOrder[key] = 'reset';
        } else {
            sortOrder[key] = 'asc';
        }

        if (sortOrder[key] === 'reset') {
            resetTable();
        } else {
            sortTable(index, sortOrder[key]);
        }

        updateChevrons();
    });

    // Search functionality
    $('#search').on('input', function() {
        let searchTerm = $(this).val().toLowerCase();

        $('#characters tbody tr').removeClass('highlight');

        if (searchTerm) {
            $('#characters tbody tr').filter(function() {
                let firstName = $(this).find('td:first').text().toLowerCase();
                return firstName.includes(searchTerm);
            }).addClass('highlight');
            console.log(`Searched for: ${searchTerm}`);
        }
    });

    // Sorting the table
    function sortTable(index, order) {
        let rows = $('#characters tbody tr').get();

        rows.sort(function(a, b) {
            let val1 = $(a).children('td').get(index).textContent.toLowerCase();
            let val2 = $(b).children('td').get(index).textContent.toLowerCase();

            if (order === 'asc') {
                return val1.localeCompare(val2);
            } else if (order === 'desc') {
                return val2.localeCompare(val1);
            }
        });

        $.each(rows, function(index, row) {
            $('#characters tbody').append(row);
        });
    }

    // Resetting the table
    function resetTable() {
        $('#characters tbody').empty();
        $.each(originalData, function(index, row) {
            $('#characters tbody').append(row);
        });
        console.log('Table has been reset to original data');
    }

    // Updating chevrons
    function updateChevrons() {
        $('.chevron').remove();
        for (let key in sortOrder) {
            let th = $('th:contains(' + key + ')');
            let chevron = $('<span>').addClass('chevron');
            if (sortOrder[key] === 'asc') {
                chevron.html('&#x25B2;').appendTo(th);
            } else if (sortOrder[key] === 'desc') {
                chevron.html('&#x25BC;').appendTo(th);
            }
        }
    }

    // Filtering the table
    $('#filterAM').on('click', function() {
        filterTable('A', 'M');
    });

    $('#filterNZ').on('click', function() {
        filterTable('N', 'Z');
    });

    function filterTable(startLetter, endLetter) {
        $('#characters tbody tr').each(function() {
            let firstName = $(this).find('td:first').text().toUpperCase();
            if (firstName >= startLetter && firstName <= endLetter) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // Clearing the search
    function clearSearch() {
        $('#search').val('');
        $('#characters tbody tr').removeClass('highlight').show();
        console.log('Search cleared');
    }

    // Reset button functionality
    $('#resetTable').click(function() {
        console.log('Reset button clicked');
        resetTable();
        clearSearch();
        $('.chevron').remove();
        sortOrder = {};
    });

    // Loading the table data
    function loadTableData() {
        $.ajax({
            url: 'data.json',
            dataType: 'json',
            success: function(data) {
                $.each(data.characters, function(i, character) {
                    let row = $('<tr>').append(
                        $('<td>').text(character.firstName),
                        $('<td>').text(character.lastName),
                        $('<td>').text(character.title),
                        $('<td>').text(character.role),
                        $('<td>').text(character.significantTrait),
                        $('<td>').text(character.date)
                    );
                    $('#characters tbody').append(row);
                });
                updateCountButtons();
                console.log('Data loaded');
                originalData = $('#characters tbody tr').clone();
            }
        });
    }
});
