$(document).ready(function() {
    // Initialize an empty list to keep track of checked amenities
    let selectedAmenities = [];

    // Function to update the h4 tag inside the div Amenities
    function updateAmenitiesList() {
        const amenityNames = selectedAmenities.map(id => {
            return $(`input[data-id="${id}"]`).data('name');
        }).join(', ');

        $('.amenities h4').text(amenityNames || ' ');
    }

    // Event listener for checkbox changes
    $('.amenities input[type="checkbox"]').change(function() {
        const amenityId = $(this).data('id');
        
        if ($(this).is(':checked')) {
            // Add the amenity ID to the list
            selectedAmenities.push(amenityId);
        } else {
            // Remove the amenity ID from the list
            selectedAmenities = selectedAmenities.filter(id => id !== amenityId);
        }
        
        // Update the amenities list
        updateAmenitiesList();
    });
});
