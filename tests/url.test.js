const supertest = require('supertest');
const app = require('../app');
const connectDb = require('../config/db');
const request = supertest(app);

beforeAll(async (done) => {
  try{
      await connectDb();
      done()
  }catch (err) {
      throw new Error  ("DB  connection failed")
  }
});

describe('POST /short-url/links', ()=>{
    it('create new short url ',async(done)=>{
        const response = await request.post('/short-url/links')
          .send({'url' : "https://www.google.com/search?q=do+a+barrel+roll"})
          .set('Accept', 'application/json')
          expect(response.status).toBe(201)
          expect(response.header['content-type']).toEqual('application/json; charset=utf-8')
          expect(response.body.status).toEqual(true)
          expect(response.body.status).toEqual(true)
        done()
    })
})


