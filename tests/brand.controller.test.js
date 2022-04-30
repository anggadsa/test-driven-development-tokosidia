const brandController = require(`../controllers/brand.controller`);
// const { sequelize } = require('../models');
const app = require('../app');
const request = require('supertest');

describe(`GET /brands`, () => {
    test(`get all brands`, async () => {
        const auth = `?username=superadmin&password=Password123`
        const response = await request(app).get(`/api/v1.0/brands/${auth}`)
        const { status, result } = response.body
        expect(response.status).toBe(200)
        expect(status).toBe(`Success`)
        expect(result.length).toBeGreaterThan(0)
    })

    test(`fail get all brands`, async () => {
        const auth = `?username=superadmin&password=Password12345`
        const response = await request(app).get(`/api/v1.0/brands/${auth}`)
        const { status, result } = response.body
        expect(response.status).toBe(400)
        expect(status).toBe(`Fail`)
        expect(result).toBe(`Forbidden`)
    })
})