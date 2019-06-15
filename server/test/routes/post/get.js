const test = require('tape');
const request = require('supertest');
const app = require('../../../app');

const { buildDb, buildFakeData, buildStaticData } = require('../../../database/config/build');

test('Add new post at /api/v1/post/', async (t) => {
  try {
    await buildDb()
    await buildStaticData()
    await buildFakeData()
    request(app)
      .get('/api/v1/post/')
      .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          t.error(err);
        } else {
          if(res.body.data.allPosts[0]) {
            t.deepEqual(Object.keys(res.body.data), [ 'allPosts' ], 'Get all posts sucssfully')
            t.equal(res.body.data.allPosts[0].id, 2, 'Same id for the Post')
            t.end();
          } else {
            t.deepEqual(Object.keys(res.body.data), [ 'allPosts' ], 'Get all posts sucssfully')
            t.equal(res.body.data.allPosts.length, 0, 'No posts in the database')
            t.end()
          }
        }
      });
  } catch (err) {
    t.error(err)
  }
});

test.onFinish(() => process.exit(0));
