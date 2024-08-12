$(document).ready(function() {
    const apiStatusElement = $('#api_status');

    function updateApiStatus() {
        $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
            if (data.status === 'OK') {
                apiStatusElement.addClass('available');
            } else {
                apiStatusElement.removeClass('available');
            }
        }).fail(function() {
            apiStatusElement.removeClass('available');
        });
    }

    // Check API status on page load
    updateApiStatus();
});
