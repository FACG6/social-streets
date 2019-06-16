const test = require('tape');
const supertest = require('supertest');

const app = require('../../app');

test('Testing login route with valid username and password', (t) => {
  supertest(app)
    .post('/api/v1/login')
    .send({ email: 'ahmedisam9922@gmail.com', password: '123' })
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      const resUser = JSON.parse(res.text);
      t.equal(resUser.first_name, 'Ahmed', 'First name must be Ahmed');
      t.equal(resUser.last_name, 'Abdellatif', 'Last name must be Abdellatif');
      t.equal(resUser.address, 'Omar Al-Mukhtar St.', 'Address must be Omar Al-Mukhtar St.');
      t.end();
    });
});

test('Testing login route with wrong password', (t) => {
  supertest(app)
    .post('/api/v1/login')
    .send({ email: 'ahmedisam9922@gmail.com', password: '124' })
    .expect(400)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.text, 'Wrong password', 'expect password to be wrong');
      t.end();
    });
});

test('Testing login route with wrong email', (t) => {
  supertest(app)
    .post('/api/v1/login')
    .send({ email: 'ahmed.isam@gmail.com', password: '123' })
    .expect(400)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(
        res.text,
        "User with email 'ahmed.isam@gmail.com' does not exist",
        'expect email to be wrong',
      );
      t.end();
    });
});
