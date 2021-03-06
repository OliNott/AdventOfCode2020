// mocha Day2
const assert    = require('assert')
const day1      = require('./solution')

describe('Day 1 / Part 1', () => {
  it('should return 2 when testing the test file', () => {
    assert.equal(day1.part1('/data/test1.txt'), 2);
  })
})

describe('Day 1 / Part 2', () => {
  it('should return 1 when testing the test file', () => {
    assert.equal(day1.part2('/data/test2.txt'), 1);
  })
})