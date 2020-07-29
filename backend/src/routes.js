const express = require("express");

const routes = express.Router();

const UserCreateController = require('./Controllers/UserCreateController.js');
const SessionController = require('./Controllers/SessionController.js');
const PostController = require('./Controllers/PostController.js');


routes.get('/', (req, res) => {
    res.send('Hello Guardians')
})

routes.post('/account', UserCreateController.CepRequest);
routes.get('/api', UserCreateController.index);

routes.get('/Post', PostController.index);
routes.post('/Post', PostController.create);
routes.delete('/Post/:id', PostController.delete);

routes.get('/login', SessionController.autho);


module.exports = routes;