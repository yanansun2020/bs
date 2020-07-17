const FakeDB = require('../fakedb')
const Target = require('../models/target')
const Executions = require('../models/execution')
const Result = require('../models/result')
const ResultStatus = require('../models/result_status')

describe('can the fake db', () => {

  it('add and get targets', () => {
    FakeDB.saveTarget(new Target(false, {name: 'Alice'}))
    FakeDB.saveTarget(new Target(true, {name: 'Bob'}))
    FakeDB.saveTarget(new Target(false, {name: 'Carlo'}))

    expect(FakeDB.getTargetsSize()).toBe(3)
    expect(FakeDB.getOneTargetById(0)).toEqual({targetId: 0, isOnline: false, profile: {name: 'Alice'}})
    expect(FakeDB.getOneTargetById(1)).toEqual({targetId: 1, isOnline: true, profile: {name: 'Bob'}})
    expect(FakeDB.getOneTargetById(2)).toEqual({targetId: 2, isOnline: false, profile: {name: 'Carlo'}})
    expect(FakeDB.getOneTargetById(3)).toBeNull()

    expect(FakeDB.getAllTargets()).toEqual([
      {targetId: 0, isOnline: false, profile: {name: 'Alice'}},
      {targetId: 1, isOnline: true, profile: {name: 'Bob'}},
      {targetId: 2, isOnline: false, profile: {name: 'Carlo'}}
    ])
  })

  it('add and get executions', () => {
    FakeDB.saveExecution(new Executions({code: "alert()"}, 15))
    FakeDB.saveExecution(new Executions({code: "console.log()"}, 13))

    const first = { executionId: 0, payload: { code: "alert()" }, targetId: 15 }
    const second = { executionId: 1, payload: { code: "console.log()" }, targetId: 13 }

    expect(FakeDB.getExecutionsSize()).toBe(2)
    expect(FakeDB.getOneExecutionById(0)).toEqual(first)
    expect(FakeDB.getOneExecutionById(1)).toEqual(second)
    expect(FakeDB.getAllExecutions()).toEqual([first, second])
  })


  it('add and get results', () => {
    FakeDB.saveResult(new Result(ResultStatus.failed, {err: "file not exist"}, 2, 4))
    FakeDB.saveResult(new Result(ResultStatus.pending, {}, 1, 3))

    const first = {data: {err: "file not exist"}, executionId: 2, resultId: 0, status: "failed", targetId: 4}
    const second = {data: {}, executionId: 1, resultId: 1, status: "pending", targetId: 3}

    expect(FakeDB.getResultsSize()).toBe(2)
    expect(FakeDB.getOneResultById(0)).toEqual(first)
    expect(FakeDB.getOneResultById(1)).toEqual(second)
    expect(FakeDB.getAllResults()).toEqual([first, second])
  })

})



