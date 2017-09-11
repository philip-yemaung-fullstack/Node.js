var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
const Rx = require('@reactivex/rxjs');
var jsonUrl = 'http://jsonplaceholder.typicode.com/users/';

function loadJsonData() {
  return new Promise(resolve => {
    fetch(jsonUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        var users = [];
        for (let row of json) {
          const { id, name, username, email, address, website } = row;
          users.push({
            id: id,
            name: name,
            username: username,
            email: email,
            city: address.city,
            zipcode: address.zipcode,
            lat: address.geo.lat,
            lng: address.geo.lng,
            website: website
          });
        }

        resolve(users);
      })
      .catch((err) => { console.error(err); });
  });
}

async function loadDataAsync(res) {
  console.log('Loading user data Async...');
  var users = await loadJsonData();
  res.render('users', { users: users, loadingMethod: 'Async/Await' });
  console.log(`Completed loading ${users.length} records.`);
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  //Using Promises
  loadJsonData().then(function (results) {
    res.render('users', { users: results, loadingMethod: 'Promises' });
  });

  //-------------------------------------------------------------
  //Using Reactive Programming (Observables)
  /* fetch(jsonUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {    
    var users = [];
    Rx.Observable.from(json)      
    .subscribe(
        (row) => {
          const { id, name, username, email, address, website } = row;
          users.push({
            id: id,
            name: name,
            username: username,
            email: email,
            city: address.city,
            zipcode: address.zipcode,
            lat: address.geo.lat,
            lng: address.geo.lng,
            website: website
          });
        },
        null,
        () => res.render('users', { users: users, loadingMethod: 'Reactive Programming (Observables)' })
      );
    })
    .catch((err) => { console.error(err); }); */
  //------------------------------------------------------------- 

  //Using Async/Await
  //loadDataAsync(res);
});

module.exports = router;
