const express = require('express');
const MediaController = require('../Controllers/MediaController');

const PublicRoutes = express.Router();

PublicRoutes.get('/media/:id', MediaController.get);

module.exports = PublicRoutes;
