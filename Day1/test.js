// mocha Day1
const assert    = require('assert')
const day1      = require('./solution')

describe('Day 1 / Part 1', () => {
  it('should return 514579 when testing the test file', () => {
    assert.equal(day1.part1('/data/test.txt'), 514579);
  })
})

describe('Day 1 / Part 2', () => {
  it('should return 241861950 when testing the test file', () => {
    assert.equal(day1.part2('/data/test.txt'), 241861950);
  })
})