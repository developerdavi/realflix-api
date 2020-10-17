const express = require('express');

const MediaController = require('../Controllers/MediaController');
const RoomsController = require('../Controllers/RoomsController');
const UsersController = require('../Controllers/UsersController');

const PublicRoutes = express.Router();

// MEDIA
PublicRoutes.get('/media', MediaController.get);

// ROOMS
PublicRoutes.get('/room/:id', RoomsController.get);

// USERS
PublicRoutes.post('/user/login', UsersController.login);

module.exports = PublicRoutes;
