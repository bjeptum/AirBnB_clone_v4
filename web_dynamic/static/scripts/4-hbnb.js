$(document).ready(function() {
    const apiStatusElement = $('#api_status');
    const placesSection = $('.places');
    const searchButton = $('#search_button');

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

    function loadPlaces(amenities) {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: amenities }),
            success: function(places) {
                placesSection.empty();
                places.forEach(function(place) {
                    const article = `
                    <article>
                      <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                      </div>
                      <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                      </div>
                      <div class="description">
                        ${place.description}
                      </div>
                    </article>`;
                    placesSection.append(article);
                });
            }
        });
    }

    function getCheckedAmenities() {
        const amenities = [];
        $('input[type="checkbox"]:checked').each(function() {
            amenities.push($(this).data('id'));
        });
        return amenities;
    }

    // Check API status on page load
    updateApiStatus();

    // Load places when the button is clicked
    searchButton.click(function() {
        const amenities = getCheckedAmenities();
        loadPlaces(amenities);
    });
});
