const express = require('express');
const clientRoutes = require(`./client.router`);
const brandRoutes = require(`./brand.router`)
const router = express.Router();

router.use(`/clients`, clientRoutes)
router.use(`/brands`, brandRoutes)

module.exports = router