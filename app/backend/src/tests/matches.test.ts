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

  afterEach(()=>{
      sinon.restore();
    })
});
