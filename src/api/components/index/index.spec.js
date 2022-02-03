const request = require('supertest');
const server = require('../../../config/server')


describe('GET /api/v1/index', ()=>{
    it("should return Hello World [status code 200] in JSON format", async()=>{
       await request('http://localhost:8089')
       .get('/api/v1/index')
       .expect(200)
       .expect('Content-type', /json/)
    })
})


