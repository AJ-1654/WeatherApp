$(document).ready(function () {
    $('.short').hide();
    $('#switch').hide();
    if (navigator.geolocation) {
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition(function (position) {
            currentPosition = position;
            var lat = currentPosition.coords.latitude;
            var long = currentPosition.coords.longitude;
            var url = 'https://api.apixu.com/v1/current.json?key=bda2228b67104986ac794643182309&q=';
            $.getJSON(url + lat + ',' + long, function (data) {
                var country = data.location.country;
                var city = data.location.name;
                var state = data.location.region;
                var temp = data.current.temp_c;
                var tempf = data.current.temp_f;
                var lastUpdated = data.current.last_updated;
                var wind = data.current.wind_kph;
                var humidity = data.current.humidity;
                var time = data.location.localtime.split(' ')[1];
                var cloud = data.location.cloud;
                $('.short').show();
                $('#switch').show();
                $('#weather').html(city + ', ' + state + ', ' + country);
                $('#info1').html(time);
                $('#info2').html('wind ' + wind + ' kph');
                $('#info3').html(temp + '&#8451');

                var yes = true;
                $('#switch').on('click', function () {
                    if (yes) {
                        $('#info3').html(tempf + '&#8457');
                        yes = false;
                        $('#switch').html('Show in Celcius');
                    } else {
                        $('#info3').html(temp + '&#8451');
                        yes = true;
                        $('#switch').html('Show in Farenheit');
                    }
                });
                if (cloud <= 30) {
                    $('#info5').html('Clear Sky');
                    $('.main').css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2014/10/03/16/52/natural-471949__340.jpg)'
                    });

                } else {
                    $('#info5').html('Cloudy');
                    $('.main').css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2015/12/25/13/03/sky-1107579__340.jpg)'
                    });
                }
                $('#info6').html('Humidity ' + humidity + '%');
            });
        });
    }
});