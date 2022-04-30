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

    test(`get brands by id`, async () => {
        const auth = `?username=superadmin&password=Password123`
        const id = 1
        const response = await request(app).get(`/api/v1.0/brands/${id}/${auth}`)
        const { status, result } = response.body
        expect(response.status).toBe(200)
        expect(status).toBe(`Success`)
        expect(result.id).toBe(id)
    })

    test(`fail get brands by id`, async () => {
        const auth = `?username=superadmin&password=Password123`
        const id = 122
        const response = await request(app).get(`/api/v1.0/brands/${id}/${auth}`)
        const { status, result } = response.body
        expect(response.status).toBe(400)
        expect(status).toBe(`Fail`)
        expect(result).toBe(`Brand with id ${id} not found`)
    })
})

describe(`POST /brands`, () => {
    // Measure that brands is not exist before uncomment this create test 
    // test(`create new brands`, async () => {
    //     const auth = `?username=superadmin&password=Password123`
    //     const randomNumber = Math.floor(Math.random() * (99 - 1) + 1)
    //     const response = await request(app).post(`/api/v1.0/brands/create/${auth}`).send({
    //         "name": `Nike Adidas Puma v${randomNumber}`,
    //         "is_big_brand": true,
    //         "client_id": 3
    //     })
    //     const { status, result } = response.body
    //     expect(response.status).toBe(200)
    //     expect(status).toBe(`Success`)
    //     expect(result.name).toBe(`Nike Adidas Puma v${randomNumber}`)
    // })

    test(`fail auth create new brands`, async () => {
        const auth = `?username=superadmin&password=Password12334`
        const randomNumber = Math.floor(Math.random() * (99 - 1) + 1)
        const response = await request(app).post(`/api/v1.0/brands/create/${auth}`).send({
            "name": `Nike Adidas Puma v22`,
            "is_big_brand": true,
            "client_id": 3
        })
        const { status, result } = response.body
        expect(response.status).toBe(400)
        expect(status).toBe(`Fail`)
        expect(result).toBe(`Forbidden`)
    })

    test(`fail create because brand already exist`, async () => {
        const auth = `?username=superadmin&password=Password123`
        const response = await request(app).post(`/api/v1.0/brands/create/${auth}`).send({
            "name": `Nike Adidas Puma v3`,
            "is_big_brand": true,
            "client_id": 3
        })
        const { status, result } = response.body
        expect(response.status).toBe(400)
        expect(status).toBe(`Fail`)
        expect(result).toBe(`Brand Name is already registered`)
    })
})


describe(`PUT /brands`, () => {
    test(`update existing brands`, async () => {
        const auth = `?username=superadmin&password=Password123`
        const response = await request(app).put(`/api/v1.0/brands/update/${auth}`).send({
            "name": "Nike Adidas Puma v22",
            "newName": `Nike Adidas Puma v22`,
            "is_big_brand": true,
            "client_id": 3
        })
        const { status, result } = response.body
        expect(response.status).toBe(200)
        expect(status).toBe(`Success`)
        expect(result.updateBrand[0]).toBe(1)
    })

    test(`fail auth update existing brands`, async () => {
        const auth = `?username=superadmin&password=Password123123`
        const response = await request(app).put(`/api/v1.0/brands/update/${auth}`).send({
            "name": "Nike Adidas Puma v3",
            "newName": `Nike Adidas Puma v3`,
            "is_big_brand": true,
            "client_id": 3
        })
        const { status, result } = response.body
        expect(response.status).toBe(400)
        expect(status).toBe(`Fail`)
        expect(result).toBe(`Forbidden`)
    })
})


describe(`DELETE /brands`, () => {
    // Find the existing brand before uncomment this delete test 
    // test(`delete clients`, async () => {
    //     const auth = `?username=superadmin&password=Password123`
    //     const response = await request(app).delete(`/api/v1.0/brands/delete/${auth}`).send({
    //         "name": "Nike Adidas Puma v3",
    //         "client_id": 3
    //     })
    //     const { status, result } = response.body;
    //     expect(response.status).toBe(200);
    //     expect(result.deleteBrand[0]).toBe(1)
    // })

    test(`fail to find before delete clients`, async () => {
        const auth = `?username=superadmin&password=Password123`
        const response = await request(app).delete(`/api/v1.0/brands/delete/${auth}`).send({
            "name": "Puma1",
            "client_id": 3
        })
        const { status, result } = response.body;
        expect(response.status).toBe(400);
        expect(result).toBe(`Brand is not exist`)
    })
})


