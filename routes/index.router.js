const express = require('express');
const clientRoutes = require(`./client.router`);
const router = express.Router();

router.use(`/clients`, clientRoutes)

module.exports = router