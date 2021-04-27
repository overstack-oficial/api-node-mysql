const { Router } = require('express');

const AuthMidleware = require("./app/Midlewares/AuthMidleware");

const LoginController = require('./app/Controllers/LoginController');
const UserController = require('./app/Controllers/UserController');

const routes = new Router();

routes.post('/login', LoginController.index);

routes.post('/user', UserController.store);
routes.get('/users', AuthMidleware, UserController.index);
routes.get('/user/:id', UserController.show);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

module.exports = routes;