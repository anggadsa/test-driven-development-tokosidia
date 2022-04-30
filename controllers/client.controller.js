require('dotenv').config()
const { client } = require('../models');
const { Op } = require("sequelize");

const clientController = {

    jestTest: (req, res) => {
        try{
            const { a, b } = req.body;
            const result =  a + b
            if(!a || !b) throw new Error(`a or b is not defined`)
            return res.status(200).json({
                status: `Success`,
                result: result
            })
        } catch (error) {
            return res.status(400).json({
                status: `Fail`,
                result: error.message
            })
        }
    
    },

    getAllClient: async (req, res) => {
        try{
            // AUTHENTICATION
            const { username, password } = req.query
            if(username !== process.env.USER_ADMIN || password !== process.env.USER_ADMIN_PASS) throw new Error(`Forbidden`)
            
            const options = {
                attributes: { exclude: ['createdAt', `updatedAt`] }
            }
            const allClient = await client.findAll(options)
            if(!allClient) throw new Error(`Internal Server Error`)
            return res.status(200).json({
                status: `Success`,
                result: allClient
            })
        } catch (error) {
            return res.status(400).json({
                status: `Fail`,
                result: error.message
            })
        }
    
    },

    getClientById: async (req, res) => {
        try{ 
            const { id } = req.params
            const options = {
                attributes: { exclude: ['createdAt', `updatedAt`] }
            }
            const clientById = await client.findByPk(id, options)
            if(!clientById) throw new Error(`Client with id ${id} not found`)
            return res.status(200).json({
                status: `Success`,
                result: clientById
            })
        } catch (error) {
            return res.status(400).json({
                status: `Fail`,
                result: error.message
            })
        }

    },

    createClient: async (req, res) => {
        try{
            const {legal_name, npwp_number, address, client_type_id } = req.body;
            const checkNpwp = await client.findOne( { where: { npwp_number: `${npwp_number}` } } )
            if(checkNpwp) throw new Error(`NPWP is already registered`)
            const insertNewClient = await client.create({
                legal_name: legal_name,
                npwp_number: npwp_number,
                address: address, 
                client_type_id: client_type_id,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            return res.status(200).json({
                status: `Success`,
                result: insertNewClient
            })
        } catch (error) {
            return res.status(400).json({
                status: `Fail`,
                result: error.message
            })
        }
    
    },

    updateClient: async (req, res) => {
        try {
            // AUTHENTICATION
            const { username, password } = req.query;
            if(username !== process.env.USER_ADMIN || password !== process.env.USER_ADMIN_PASS) throw new Error(`Forbidden`)
            
            const { legal_name, npwp_number, address} = req.body;
            const checkNpwp = await client.findOne({ 
                where: { 
                    legal_name: {
                        [Op.like]: `%${legal_name}`
                    },
                    npwp_number: `${npwp_number}` 
                }
                
            })
            // console.log(checkNpwp.dataValues) //checkNpwp

            if(!checkNpwp) throw new Error(`Cannot find that users`)
            // console.log(checkNpwp.dataValues.id)
            const update = await client.update(
                {
                    address: `${address}`,
                    updatedAt: new Date()
                },
                {
                    where: {id: checkNpwp.dataValues.id}
                },
            )
            return res.status(200).json({
                status: `Success`,
                result: checkNpwp.dataValues
            })
        } catch (error) {
            return res.status(400).json({
                status: `Bad Request`,
                result: error.message
            })
        }
    },

    deleteClient: async (req, res) =>  {
        try{
            const { username, password } = req.query;
            const { legal_name, npwp_number } = req.body;
            if(username !== process.env.USER_ADMIN || password !== process.env.USER_ADMIN_PASS) throw new Error(`Forbidden`);
            const options = {
                where: {
                    legal_name: legal_name,
                    npwp_number: `${npwp_number}`
                }
            }
            // Check is client is exist
            const findClient = await client.findOne(options)
            if(findClient === null) throw new Error(`Client is not found`)
            // delete user if exist
            const deleteUser = await client.destroy(options)
            res.status(200).json({
                status: `Success`,
                result: deleteUser.dataValues
            })
        } catch (error) {
            res.status(400).json({
                status: `Bad Request`,
                result: error.message
            })
        } 
    }

}

module.exports = clientController;