const fs = require('fs');

//sql injection payloads
let payloads = fs.readFileSync('./injections/payloads.txt', {encoding: 'utf-8'});
let errorBased = fs.readFileSync('./injections/errorBased.txt', {encoding: 'utf-8'});
let payloadsInjections = payloads.split('\n');
let errorBasedInjections = errorBased.split('\n');

const request = require('supertest')('http://localhost:3000')
const expect = require('chai').expect;

describe('SQL injection payloads', ()=>{
    payloadsInjections.forEach((v, i)=>{
        it('should return 400', async ()=>{
            let payload = await request
                .post('/api/login')
                .set('Accept', "application/json")
                .send({username: payloadsInjections[i], password:"anything"})
            expect(payload.status).to.eql(400)
        })
    })
})

describe('error based injection payloads', ()=>{
    errorBasedInjections.forEach((v, i)=>{
        it('should return 400', async ()=>{
            let payload = await request
                .post('/api/login')
                .set('Accept', 'application/json')
                .send({username: errorBasedInjections[i], password:"anything"})
            expect(payload.status).to.eql(400)
        })
    })
})
