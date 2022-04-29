const { client } = require('../models');

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
            return res.status(500).json({
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
    
    }

}

module.exports = clientController;