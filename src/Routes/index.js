const express = require('express');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const PrivateRoutes = require('./PrivateRoutes');
const PublicRoutes = require('./PublicRoutes');

const Routes = express.Router();

Routes.use(PublicRoutes);

Routes.use(AuthMiddleware);
Routes.use(PrivateRoutes);

module.exports = Routes;
