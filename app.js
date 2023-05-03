const { Console } = require('console');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/Partials'));



// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');

});

//! /beers route

app.get("/beers", (req, res)=>{

punkAPI.getBeers()

  .then ((response) =>{  

  console.log(response)  //! La respuesta es un array con muchos objetos (cerverzas) dentro con diferentes características 

  res.render("beers.hbs", 
  {     
  beers: response
  }) 

})

  .catch ((error)=>{   
  console.log(error)
  })  

});

//-------------------------------------------

//! random beer route

app.get("/random-beer", (req, res)=>{
punkAPI.getRandom()             //! En la info de punkAPI sale que getRandom() nos devuelve un array de longitud 1, que sería dicha cerveza aleatoria.
 .then((response) =>{
  res.render("random-beer.hbs", 
 response[0]               //! Al ser un array no habría que usar {} para "convertirlo" en un objeto, podemos usar directamente el array que getRandom() nos devuelve???? (teoría, no estoy segura)
  )
 })
 .catch ((error) =>{
  console.log(error)
 })

})

// --------------------------------------------------

app.listen(3000, () => console.log('🏃‍ on port 3000'));
