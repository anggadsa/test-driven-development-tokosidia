const express = require(`express`);
const router = express.Router();
const brandController = require(`../controllers/brand.controller`)

router.get(`/`, brandController.getAllBrand);
router.get(`/:id`, brandController.getBrandById);
router.post(`/create`, brandController.createNewBrand);
router.put(`/update`, brandController.updateBrandById);
router.delete(`/delete`, brandController.deleteBrand)

module.exports = router