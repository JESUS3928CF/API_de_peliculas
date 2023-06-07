const routesComments = require("./routesComments");
const routesSessions = require('./routesSessions');
const routesMovies = require('./routesMovies');
const routesTheaters = require('./routesTheaters');
const routesUsers = require('./routesUsers');
// const dotenv = require("dotenv/config");


function routerApi(app){
    app.use("/movies", routesMovies); //* La app que creamos con express va a asociar la ruta movies con el controlador routesMovies
    app.use('/comments', routesComments);
    app.use('/users', routesUsers);
    app.use('/sessions', routesSessions);
    app.use('/theaters', routesTheaters);
}

module.exports = routerApi;