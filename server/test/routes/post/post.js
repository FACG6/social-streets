const test = require('tape');
const request = require('supertest');
const app = require('../../../app');
const dbBuild = require('../../../database/config/build');

test('Add new post at /api/v1/post/', (t) => {
  dbBuild()
    .then(() => {
      request(app)
        .post('/api/v1/post/')
        .send({
          firstname: 'firstname',
          lastname: 'lastname',
          phonenumber: '12345678',
          mobilenumber: '123456789',
          address: 'address',
          level: 5,
          password: 'password',
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          const student = (res.body.data);
          if (err) {
            t.error(err);
          } else {
            t.equal(student.password, 'password', 'Same password');
            t.equal(student.mobile_phone, '123456789', 'Same mobile_phone');
            t.equal(student.lastname, 'lastname', 'Same lastname');
            t.equal(student.home_phone, '12345678', 'Same home_phone');
            t.equal(student.level, 5, 'Same level');
            t.equal(student.address, 'address', 'Same address');
            t.equal(student.firstname, 'firstname', 'Same firstname');
            t.end();
          }
        });
    })
    .catch(err => t.error(err));
});
