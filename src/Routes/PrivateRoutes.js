const express = require('express');

const MediaController = require('../Controllers/MediaController');
const RoomsController = require('../Controllers/RoomsController');
const UsersController = require('../Controllers/UsersController');

const PrivateRoutes = express.Router();

// MEDIA
PrivateRoutes.get('/media/list', MediaController.list);
PrivateRoutes.post('/media', MediaController.upload);

// ROOMS
PrivateRoutes.get('/rooms', RoomsController.list);
PrivateRoutes.post('/room', RoomsController.create);

// USERS
PrivateRoutes.get('/users', UsersController.list);
PrivateRoutes.post('/user', UsersController.create);
PrivateRoutes.post('/user/logout', UsersController.logout);

module.exports = PrivateRoutes;
