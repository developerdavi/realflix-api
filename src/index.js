// EXTERNAL MODULES
const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
require('dotenv').config();

// INTERNAL MODULES
const routes = require('./Routes');
const LogMiddleware = require('./Middlewares/LogMiddleware');
const SocketIOService = require('./Services/SocketIOService');

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(routes);

// FOR LOGGING
app.use(LogMiddleware);

// SERVICES
SocketIOService(http);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.info(`[!] REALFLIX API RUNNING ON PORT ${PORT}`);
});
