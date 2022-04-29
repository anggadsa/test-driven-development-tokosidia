const clientController = require(`../controllers/client.controller`);
const { sequelize } = require('../models');
const app = require('../app');
const request = require('supertest');

const mock = jest.fn();
const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
    const res = {};
    res.json = mock.mockReturnValue(res);
    res.status = mock.mockReturnValue(res);
    return res;
}

describe(`controller jestTest`, () =>  {
    test(`get jestTest controller`, (done) => {
        const req = mockRequest( {a:4, b:4} );
        const res = mockResponse();
        clientController.jestTest(req, res);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: `Success`,
            result: req.body.a + req.body.b
        });
        done()
    })

    test(`fail get jestTest test`, (done) => {
        const req = mockRequest( {a:4} );
        const res = mockResponse();
        clientController.jestTest(req, res);
        expect(res.status).toBeCalledWith(400);
        done()
    })
})

describe('GET /users', () => {
   test(`get all clients all data`, async () => {
       const response = await request(app).get(`/api/v1.0/clients`);
       const { status, result } = response.body
       expect(response.status).toBe(200)
       expect(status).toBe(`Success`)
       expect(result.length).toBeGreaterThan(0)
   })

   test(`get user by id`, async () => {
        const response = await request(app).get(`/api/v1.0/clients/1`)
        const { status, result } = response.body
        expect(response.status).toBe(200)
    })

    test(`fail get user by id`, async () => {
        const id = 100
        const response = await request(app).get(`/api/v1.0/clients/${id}`)
        const { status, result } = response.body
        console.log(result)
        expect(response.status).toBe(400)
        expect(result).toBe(`Client with id ${id} not found`)
    })

    test(`fail create user`, async () => {
        const response = await request(app).post(`/api/v1.0/clients/create`).send({
            "legal_name": "Angga Dwi Satria",
            "npwp_number": "09.254.294.3-499900",
            "address": "Ngaban RT6 RW2 Tanggulangin Sidoarjo",
            "client_type_id": 1
        })
        const { status, result } = response.body
        // console.log(result)
        expect(response.status).toBe(400)
        expect(result).toBe(`NPWP is already registered`)
    })

});