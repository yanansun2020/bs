
const {httpServer} = require("../app")
const {serverPort} = require("../config")

const FakeDB = require('../fakedb')
const Target = require('../models/target')
const Executions = require('../models/execution')
const Result = require('../models/result')
const ResultStatus = require('../models/result_status')

const agent = require("superagent").agent()

describe("can the api allow user to", () => {

  beforeAll((done) => {

    // suppose we already have some data
    FakeDB.saveTarget(new Target(false, {name: 'Alice'}))
    FakeDB.saveTarget(new Target(true, {name: 'Bob'}))
    FakeDB.saveTarget(new Target(false, {name: 'Carlo'}))

    FakeDB.saveExecution(new Executions({code: "alert()"}, 15))
    FakeDB.saveExecution(new Executions({code: "console.log()"}, 13))

    FakeDB.saveResult(new Result(ResultStatus.failed, {err: "file not exist"}, 2, 4))
    FakeDB.saveResult(new Result(ResultStatus.pending, {}, 1, 3))


    httpServer.listen(9000, () => {
      console.log("launching server on port " + serverPort)
      done()
    })
  })

  afterAll((done) => {
    httpServer.close(() => done())
  })

  it('get one or more targets', (done) => {
    agent.get('http://localhost:9000/targets').then((res) => {
      expect(res.body.length).toBe(3)
      done()
    }).catch(err => {
      fail(err)
    })
  })

  it('post a new target', (done) => {
    agent.post('http://localhost:9000/targets').send({isOnline: false, profile: {name: 'Dave'}}).then((res) => {
      agent.get('http://localhost:9000/targets').then(r => {
        expect(r.body.length).toBe(4)
        done()
      })
    }).catch(err => {
      fail(err)
    })
  })

  it('select executions for target', (done) => {
    agent.get("http://localhost:9000/executions?targetId=15").then(res => {
      expect(res.body.length).toBe(1)
      expect(res.body[0]).toEqual({
        "executionId": 0,
        "payload": {
          "code": "alert()"
        },
        "targetId": 15
      })
      done()
    }).catch(err => fail(err))
  })

  it('select results for target', (done) => {
    agent.get("http://localhost:9000/results?targetId=3").then(res => {
      expect(res.body.length).toBe(1)
      expect(res.body[0]).toEqual({
        "resultId": 1,
        "status": "pending",
        "data": {},
        "executionId": 1,
        "targetId": 3
      })
      done()
    }).catch(err => fail(err))
  })

})

