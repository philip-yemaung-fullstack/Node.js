var fetch = require('node-fetch');
var express = require('express');
var app = express();
var port = 3000;

app.set('x-powered-by', false);
app.set('view cache', true);
app.enable('trust proxy');
app.enable('case sensitive routing');

app.get('*', function (request, response) {
    response.status(200);
    response.set('Content-Type', 'text/html');
    fetch('http://jsonplaceholder.typicode.com/users/')
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            var result = `
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <br />
        <div class="container-fluid">
        <table class="table table-bordered table-striped table-condensed">
            <thead class="thead-inverse">
                <tr>
                <th>id</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>City</th>
                <th>Zip code</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Website</th>
                </tr>
            </thead>
        `;
            for (var rowIndex in json) {
                var row = json[rowIndex];
                var id = row['id'];
                var name = row['name'];
                var username = row['username'];
                var email = row['email'];
                var address = row['address'];
                var street = address['street'];
                var suite = address['suite'];
                var city = address['city'];
                var zipcode = address['zipcode'];
                var geo = address['geo'];
                var lat = geo['lat'];
                var lng = geo['lng'];
                var phone = row['phone'];
                var website = row['website'];
                var company = row['company'];
                var company_name = company['name'];
                var catchPhrase = company['catchPhrase'];
                var bs = company['bs'];
                result += `<tr>
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${username}</td>
                    <td>${email}</td>
                    <td>${city}</td>
                    <td>${zipcode}</td>
                    <td>${lat}</td>
                    <td>${lng}</td>
                    <td>${website}</td>
                </tr>`;
            }
            result += `</table>
        </div>`;
            response.send(result);
            response.end();
        });

});
app.listen(port, function () {
    console.log('The server is running on port %s', port);
});