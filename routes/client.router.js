const express = require(`express`);
const router = express.Router();
const clientController = require(`../controllers/client.controller`)

router.get(`/`, clientController.getAllClient);
router.get(`/:id`, clientController.getClientById);
router.post(`/create`, clientController.createClient)

module.exports = router;