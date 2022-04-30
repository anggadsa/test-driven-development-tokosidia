require('dotenv').config()
const { brand } = require('../models');
const { Op } = require("sequelize");


const brandController = {
    getAllBrand: async (req, res) => {
        try {
            const { username, password } = req.query
            if(username !== process.env.USER_ADMIN || password !== process.env.USER_ADMIN_PASS) throw new Error(`Forbidden`)
            const allBrand = await brand.findAll()
            return res.status(200).json({
                status: `Success`,
                result: allBrand
            })
        } catch (error) {
            return res.status(400).json({
                status: `Fail`,
                result: error.message
            })
        }
    },

    getBrandById: async(req, res) => {
        try{
            const id = req.params.id
            const { username, password } = req.query
            if(username !== process.env.USER_ADMIN || password !== process.env.USER_ADMIN_PASS) throw new Error(`Forbidden`);
            const options = {
                attributes: { exclude: ['createdAt', `updatedAt`] }
            }
            const findById = await brand.findByPk(id, options)
            if(!findById) throw new Error(`Brand with id ${id} not found`)
            return res.status(200).json({
                status: `Success`,
                result: findById
            })
        } catch (error) {
            return res.status(400).json({
                status: `Fail`,
                result: error.message
            })
        }
    },

    createNewBrand: async(req,res) => {
        try{
            const { username, password } = req.query
            if(username !== process.env.USER_ADMIN || password !== process.env.USER_ADMIN_PASS) throw new Error(`Forbidden`);
            const { name, is_big_brand, client_id} = req.body;
            const findBrand = await brand.findOne( { where: { name: `${name}` } } )
            if(findBrand) throw new Error(`Brand Name is already registered`)
            const insertNewBrand = await brand.create({
                name: name,
                is_big_brand: is_big_brand,
                createdAt: new Date(),
                updatedAt: new Date(),
                client_id: client_id
            })
            return res.status(200).json({
                status: `Success`,
                result: insertNewBrand
            })
        } catch (error) {
            return res.status(400).json({
                status: `Fail`,
                result: error.message
            })
        }
    },
     
    updateBrandById: async (req, res) => {
        try{
            const { username, password } = req.query
            if(username !== process.env.USER_ADMIN || password !== process.env.USER_ADMIN_PASS) throw new Error(`Forbidden`);
            const { name, newName, is_big_brand, client_id} = req.body
            const checkBrandIsExist = await brand.findOne({
                where: {
                    name: name,
                    client_id: client_id
                }, 
            })
            if(!checkBrandIsExist) throw new Error(`Cannot find that brand`)
            const updateBrand = await brand.update(
                {
                    name: newName,
                    updatedAt: new Date()
                },
                {
                    where: {id: checkBrandIsExist.dataValues.id}
                }
            )
            return res.status(200).json({
                status: `Success`,
                result: {updateBrand, created: true}
            })
        } catch (error) {
            return res.status(400).json({
                status: `Fail`,
                result: error.message
            })
        }
    }
}

module.exports = brandController