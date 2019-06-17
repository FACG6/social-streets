const test = require('tape');
const request = require('supertest');
const app = require('../../app');

const { buildDb, buildFakeData, buildStaticData } = require('../../database/config/build');

test('get live posts at /api/v1/post/live', async (t) => {
  try {
    await buildDb()
    await buildStaticData()
    await buildFakeData()
    request(app)
      .get('/api/v1/post/live')
      .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        t.equal(res.body.data.length, 0, 'length should be 0')
        t.end()
      })
  }
  catch (err) {
    t.error(err)
  }
});

test.onFinish(() => process.exit(0));
