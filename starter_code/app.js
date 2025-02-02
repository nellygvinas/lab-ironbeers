
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res, next) => res.render('index'));
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(responseFromAPI => {
    // console.log(responseFromAPI)
    res.render('beers.hbs', {beers: responseFromAPI })
  })
  .catch(error => console.log(error))
});

app.get('/random-beer', (req, res, next) => {
  const randomBeer = punkAPI.getRandom()
    randomBeer.then(beer => {
      res.render('random-beer.hbs', {beer}) 
    })
    .catch(error => {
      console.log(error)
    })  
});

app.get('/randombeer', (req, res, next) => res.render('random-beer'));





// Set up server connection
app.listen(3000);
