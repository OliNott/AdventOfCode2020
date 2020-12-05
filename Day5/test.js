// mocha Day5
const assert = require('assert')
const engine = require('../tools')
const day5   = require('./solution')

describe('Day 5 / Part 1', () => {
  it('Should return the corrects seat IDs for test file', () => {
    data = day5.parseData(engine.open(__dirname + '/data/test.txt'))
    assert.equal(JSON.stringify(data.map(day5.findSeats)), JSON.stringify([357, 567, 119, 820]))
  })

  it('Should return the higher ID of the ID array', () => {
    assert.equal(day5.part1('/data/test.txt'), 820);
  })
})
