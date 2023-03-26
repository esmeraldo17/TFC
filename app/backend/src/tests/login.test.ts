import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {

  const userList = [
    new User({
      id: 10,
      username: 'Alber',
      role: 'admin',
      email: 'albert@gmail.com',
      password: 'mypassword'
    })
  ]


  it('Testa erro senao passar password', async () => {
    const body = { email: 'albert@gmail.com', password: ''}
    sinon.stub(Model, 'findAll').resolves([userList[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await chai.request(app).post('/login').send(body);

    expect(result.status).to.be.equal(400);
    expect(result.body).to.deep.equal({ message: 'All fields must be filled'})
  });

  it('Testa erro senao passar email', async () => {
    const body = { email: '', password: 'mypassword'}
    sinon.stub(Model, 'findAll').resolves([userList[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await chai.request(app).post('/login').send(body);

    expect(result.status).to.be.equal(400);
    expect(result.body).to.deep.equal({ message: 'All fields must be filled'})
  });

  it('Testa erro se passar email invalido', async () => {
    const body = { email: '123', password: 'mypassword'}
    sinon.stub(Model, 'findAll').resolves([userList[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await chai.request(app).post('/login').send(body);

    expect(result.status).to.be.equal(401);
    expect(result.body).to.deep.equal({ message: 'Invalid email or password'})
  });


  it('Testa erro se passar password invalido', async () => {
    const body = { email: 'albert@gmail.com', password: '1111'}
    sinon.stub(Model, 'findAll').resolves([userList[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await chai.request(app).post('/login').send(body);

    expect(result.status).to.be.equal(401);
    expect(result.body).to.deep.equal({ message: 'Invalid email or password'})
  });

  afterEach(()=>{
    sinon.restore();
  })
});