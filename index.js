$(document).ready(function () {
    $('.short').hide();
    $('#switch').hide();
    if (navigator.geolocation) {
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition(function (position) {
            currentPosition = position;
            var lat = currentPosition.coords.latitude;
            var long = currentPosition.coords.longitude;
            var url = 'http://api.weatherstack.com/current?access_key=71756be25b9c73e9a68835deff527f2b&query=';
            $.getJSON(url + lat + ',' + long, function (data) {
                var country = data.location.country;
                var city = data.location.name;
                var state = data.location.region;
                var temp = data.current.temperature;
                var tempf = temp * 9/5 + 32; 
                var lastUpdated = data.current.observation_time;
                var wind = data.current.wind_speed;
                var humidity = data.current.humidity;
                var time = data.location.localtime.split(' ')[1];
                var cloud = data.current.cloudcover;
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
