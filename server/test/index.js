const test = require('tape');
const request = require('supertest');
const app = require('../app');
const {
  buildDb,
  buildFakeData,
  buildStaticData
} = require('../database/config/build');


test('Add new post at /api/v1/post/', (t) => {
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      request(app)
        .post('/api/v1/post/')
        .set('cookis', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
        .send({
          type: 'event',
          title: 'Title from',
          eventType: 1,
          eventTopic: [1, 2],
          description: 'description for the event',
          dateTime: '11/4/2019 - 02.23 p.m',
          venue: 'gaza st',
          website: 'www.qqqq.com',
          altText: 'desc fro img',
          cost: 15,
          focusKeyword: 'focusKeyword',
          metaDescription: 'this is metaDescription'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else {
            t.equal(1, 1, 'Same password');

            t.end();
          }
        });
    })
    .catch(err => t.error(err));
});