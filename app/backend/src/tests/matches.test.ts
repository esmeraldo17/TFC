import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';
import { Model } from 'sequelize';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /matches', () => {
  const MatcheList = [
    {
        id:1,
        homeTeamId:16,
        homeTeamGoals:1,
        awayTeamId:8,
        awayTeamGoals:1,
        inProgress:false,
    },
    {
        id:2,
        homeTeamId:9,
        homeTeamGoals:1,
        awayTeamId:14,
        awayTeamGoals:1,
        inProgress:true, 
    }
  ]

  const createErr = {
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 2,
    inProgress: true,
  };

  const create = {
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 2,
    inProgress: true,
  };

  it('Testa FindAll', async () => {
    sinon.stub(Model, 'findAll').resolves(MatcheList as Matches[])

    const result = await chai.request(app).get('/teams');

    expect(result.status).to.deep.equal(200);
    expect(result.body).to.deep.equal(MatcheList);
  });

  it('Testa get com inProgress true', async () => {
    sinon.stub(Model, 'findAll').resolves(MatcheList as Matches[]);

    const result = await chai.request(app).get('/matches?inProgress=true');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([MatcheList[1]]);
  });

  it('Testa get com inProgress false', async () => {
    sinon.stub(Model, 'findAll').resolves(MatcheList as Matches[]);

    const result = await chai.request(app).get('/matches?inProgress=false');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([MatcheList[0]]);
  });

  it('Testa finish com  token invalido', async () => {
    sinon.stub(Model, 'update').resolves();

    const result = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set(
        'Authorization',
        'aaa',
      );

    expect(result.status).to.be.equal(401);
    expect(result.body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Testa finish sem o token', async () => {
    sinon.stub(Model, 'update').resolves();

    const result = await chai.request(app).patch('/matches/1/finish');

    expect(result.status).to.be.equal(401);
    expect(result.body).to.deep.equal({ message: 'Token not found' });
  });

  it('Testa create do matche', async () => {
    sinon.stub(Model, 'create').resolves(MatcheList[1] as Matches);

    const result = await chai
      .request(app)
      .post('/matches')
      .send(create)
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiQWRtaW4ifSwiaWF0IjoxNjc3NTkxODEwLCJleHAiOjE2Nzg0NTU4MTB9.49swV3jOhW_qumAUVQBQqRpTUsJkD1JMqeXxoV8VZmI',
      );

    expect(result.status).to.be.equal(201);
    expect(result.body).to.deep.equal(MatcheList[1]);
  });

  it('Testa create do matche (dois times iguais)', async () => {
    sinon.stub(Model, 'create').resolves(MatcheList[1] as Matches);

    const result = await chai
      .request(app)
      .post('/matches')
      .send(createErr)
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiQWRtaW4ifSwiaWF0IjoxNjc3NTkxODEwLCJleHAiOjE2Nzg0NTU4MTB9.49swV3jOhW_qumAUVQBQqRpTUsJkD1JMqeXxoV8VZmI',
      );

    expect(result.status).to.be.equal(422);
    expect(result.body).to.deep.equal({
      message: 'It is not possible to create a match with two equal teams',
    });
  });

  it('Testa create do matche (caso de quando um id ou os dois nao existem)', async () => {
    sinon.stub(Model, 'findByPk').resolves(null);
    sinon.stub(Model, 'create').resolves(MatcheList[1] as Matches);

    const result = await chai
      .request(app)
      .post('/matches')
      .send(createErr)
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiQWRtaW4ifSwiaWF0IjoxNjc3NTkxODEwLCJleHAiOjE2Nzg0NTU4MTB9.49swV3jOhW_qumAUVQBQqRpTUsJkD1JMqeXxoV8VZmI',
      );

    expect(result.status).to.be.equal(404);
    expect(result.body).to.deep.equal({
      message: 'There is no team with such id!',
    });
  });

  afterEach(()=>{
      sinon.restore();
    })
});
