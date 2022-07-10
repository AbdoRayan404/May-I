const request = require('supertest')('http://localhost:3000');
const expect = require('chai').expect;

describe('GET /', ()=>{
    it('should be 404', async ()=> {
        const response = await request.get('/')
        expect(response.status).to.eql(404)
    })
})

var cred = {address:null, username:`test${Math.floor(Math.random() * 999)}`, password:'qwerty123', public_key:'anything'}
var valid_data = {
    '0x2217':'dont have one right now',
    '0x1f45':'dont have one right now',
    '0x750':'dont have one right now',
    '0x291b':'dont have one right now',
    '0x22bb':'dont have one right now',
    '0x2657':'dont have one right now'
}

describe('Register /api/register API endpoint', ()=>{
    it('GET returns 404', async ()=> {
        const response = await request.get('/api/register')
        expect(response.status).to.eql(404)
    })
    it('return 400, misc input', async ()=>{
        const response = await request
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({username: 'good100%!@#!', password: '12345678', public_key:'ehm'})

        expect(response.status).to.eql(400)
        expect(response.body).to.eql({ error: "miscellaneous characters has been found"})
    })
    it('return 400, short input', async ()=>{
        const response = await request
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({username: 's', password: '123', public_key:"a"})

        expect(response.status).to.eql(400)
        expect(response.body).to.eql({ error: "too long, too short input"})
    })
    it('return 400, long input', async ()=>{
        const response =  await request
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({username: 'qwertyuiopasdfghjklzxcvbnm', password:"qwertyuiopasdfghjklzxcvbnm", public_key:new Array(150).fill("A").join('')})

        expect(response.status).to.eql(400)
        expect(response.body).to.eql({ error: "too long, too short input"})
    })
    it('return 200, with Object that has address, username, public_key', async ()=>{
        let payload = {username:cred.username, password:cred.password, public_key:cred.public_key}
        
        const response = await request
        .post('/api/register')
        .set('Accept', 'application/json')
        .send(payload)

        cred.address = response.body.address

        expect(response.status).to.eql(200)
        expect(response.body.username).to.eql(payload.username)
        expect(response.body.public_key).to.eql(payload.public_key)
    })
})

describe('Login /api/login API endpoint', ()=>{
    it('GET returns 404', async ()=> {
        const response = await request.get('/api/login')
        expect(response.status).to.eql(404)
    })
    it('return 400, for an address that doesnt exist', async ()=>{
        const response = await request
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({address:"peekaPoo", password:cred.password})

        expect(response.status).to.eql(400)
        expect(response.body).to.eql({ error:'this address doesnt exist'})
    })
    it('return 400, for wrong password and correct address', async ()=>{
        const response = await request
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({address:cred.address, password:'anything'})

        expect(response.status).to.eql(400)
        expect(response.body).to.eql({ error: 'password is incorrect'})
    })
    it('return 200, correct cred, Object that has address,username,public_key', async ()=>{
        const response = await request
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({address:cred.address, password:cred.password})

        expect(response.status).to.eql(200)
        expect(response.body.address).to.eql(cred.address)
        expect(response.body.username).to.eql(cred.username)
        expect(response.body.public_key).to.eql(cred.public_key)
    })
})

describe('Public key record /api/record/:address', ()=>{
    it('return 404, cannot GET /api/record/', async ()=>{
        const response = await request
        .get('/api/record')

        expect(response.status).to.eql(404)
    })
    it('return 400, wrong address', async ()=>{
        const response = await request
        .get('/api/record/0xCODE')

        expect(response.status).to.eql(400)
        expect(response.body).to.eql({ error:'this address doesnt exist'})
    })
    it('return 200, correct address', async ()=>{
        const responseOfFirstValid = await request
        .get(`/api/record/${Object.keys(valid_data)[0]}`)

        expect(responseOfFirstValid.status).to.eql(200)
        expect(responseOfFirstValid.body.address).to.eql(Object.keys(valid_data)[0])
        expect(responseOfFirstValid.body.public_key).to.eql(valid_data[Object.keys(valid_data)[0]])

        const responseOfSecondValid = await request
        .get(`/api/record/${Object.keys(valid_data)[1]}`)

        expect(responseOfSecondValid.status).to.eql(200)
        expect(responseOfSecondValid.body.address).to.eql(Object.keys(valid_data)[1])
        expect(responseOfSecondValid.body.public_key).to.eql(valid_data[Object.keys(valid_data)[1]])
    })

describe("User settings updating /api/user/settings", ()=>{
    it('return 400, wrong address', async ()=>{
        const response = await request
        .put('/api/user/settings')
        .set('Accept', "application/json")
        .send({address:"0xAnythingLol", password:cred.password})

        expect(response.status).to.eql(400)
        expect(response.body.error).to.eql("this address doesnt exist")
    })

    it('return 400, wrong password', async ()=>{
        const response = await request
        .put('/api/user/settings')
        .set('Accept', 'application/json')
        .send({address:cred.address, password:"blahblah"})

        expect(response.status).to.eql(400)
        expect(response.body.error).to.eql("password is incorrect")
    })

    it('reutrn 200, with store_messages field', async ()=>{
        const response = await request
        .put('/api/user/settings')
        .set('Accept', 'application/json')
        .send({address:cred.address, password:cred.password, update:{store_messages: true}})

        expect(response.status).to.eql(200)
        expect(response.body.store_messages).to.eql(true)
    })

    it('return 200, with public_key field', async ()=>{
        const response = await request
        .put('/api/user/settings')
        .set('Accept', 'application/json')
        .send({address:cred.address, password:cred.password, update:{public_key: "working"}})

        expect(response.status).to.eql(200)
        expect(response.body.public_key).to.eql("working")
    })

    it('return 200, with public_key, store_messages fields', async ()=>{
        const response = await request
        .put('/api/user/settings')
        .set('Accept', 'application/json')
        .send({address:cred.address, password:cred.password, update:{public_key: "another one", store_messages: false}})

        expect(response.status).to.eql(200)
        expect(response.body.public_key).to.eql("another one")
        expect(response.body.store_messages).to.eql(false)
    })
})
})