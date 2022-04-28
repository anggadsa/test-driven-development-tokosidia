const { client } = require('../models');

const clientController = {

    getAllClient: async (req, res) => {
        try{
            const options = {
                attributes: { exclude: ['createdAt', `updatedAt`] }
            }
            const allClient = await client.findAll(options)
            console.log(allClient)
            if(!allClient) throw new Error(`Internal Server Error`)
            res.status(200).json({
                status: `Succes`,
                result: allClient
            })
        } catch (error) {
            res.status(500).json({
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
            if(!clientById) throw new Error(`Client with id ${id} not founded`)
            res.status(200).json({
                status: `Success`,
                result: clientById
            })
        } catch (error) {
            res.status(400).json({
                status: `Fail`,
                result: error.message
            })
        }

    },

    createClient: async (req, res) => {
        
    }

}

module.exports = clientController;