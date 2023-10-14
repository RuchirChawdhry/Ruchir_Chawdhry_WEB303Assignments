/*
    Assignment #4
    Ruchir Chawdhry
*/

$(function () {
    // your code here

    // Check for Geolocation 
    if (!navigator.geolocation) {
        $('#content').append('Geolocation is not supported by your browser...');
        return;
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        const locationDiv = $('#locationhere');
        locationDiv.html(`Latitude: ${latitude} (Accuracy: ±${accuracy} meters), Longitude: ${longitude} (Accuracy: ±${accuracy} meters)`);

        // Check LocalStorage for previous location
        const prevLocation = localStorage.getItem('location');

        if (prevLocation) {
            const parsedLocation = JSON.parse(prevLocation);
            const prevAcc = parsedLocation.accuracy;
            const newTag = $(`<p>Previous Location - Latitude: ${parsedLocation.latitude} (Accuracy: ±${prevAcc} meters), Longitude: ${parsedLocation.longitude} (Accuracy: ±${prevAcc} meters)</p>`);
            locationDiv.append(newTag);

            const welcomeBackMsg = $('<h2>Welcome back!</h2>');
            locationDiv.append(welcomeBackMsg);

            const distance = calcDistanceBetweenPoints(parsedLocation.latitude, parsedLocation.longitude, latitude, longitude) / 1000; // Convert to km
            const distanceMsg = $(`<p>You traveled ${distance.toFixed(2)} km since your last visit.</p>`);
            locationDiv.append(distanceMsg);
        } else {
            const welcomeMsg = $('<h2>Welcome to the page for the first time!</h2>');
            locationDiv.append(welcomeMsg);
        }

        // Store the current location in LocalStorage
        localStorage.setItem('location', JSON.stringify({ latitude, longitude, accuracy }));
    }

    function error() {
        // alert('You must allow geolocation in order to use this application.');
        $('#content').append('<p>You must allow geolocation in order to use this application.</p>');
    }

    navigator.geolocation.getCurrentPosition(success, error);



    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});


