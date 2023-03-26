import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import { Model } from 'sequelize';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  const TeamList = [
    {
      id: 1,
      teamName: 'Vasco' 
    },
    {
      id: 2,
      teamName: 'Palmeiras' 
    }
  ]

  const team = {id: 1, teamname: 'Vasco'};

  it('Testa FindAll', async () => {
    sinon.stub(Model, 'findAll').resolves(TeamList as Team[])

    const result = await chai.request(app).get('/teams');

    expect(result.status).to.deep.equal(200);
    expect(result.body).to.deep.equal(TeamList);
  });

  it('Testa FindById', async () => {
    sinon.stub(Model, 'findByPk').resolves(team as unknown as Team)

    const result = await chai.request(app).get('/teams/1');

    expect(result.status).to.deep.equal(200);
    expect(result.body).to.deep.equal({id: 1, teamname: 'Vasco'});
  });

  afterEach(()=>{
     sinon.restore();
  })
});
