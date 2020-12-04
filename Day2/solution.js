const launch = require('../tools')

// Rule 1 and 2 are the min/max number of occurencies of letter in password
const passwordMatcher1 = rule => {
  const { rule1, rule2, letter, password } = rule
  const occurencies = password.split('').filter(l => l === letter)
  return occurencies.length >= rule1 && occurencies.length <= rule2
}

// Rule 1 and 2 are one of the positions that must includes letter
const passwordMatcher2 = rule => {
  const { rule1, rule2, letter, password } = rule
  if (password[rule1 - 1] === letter && password[rule2 - 1] !== letter) return true
  if (password[rule1 - 1] !== letter && password[rule2 - 1] === letter) return true
  return false
}

const parseData = data => {
  const splitted = data.split('\n').map(line => line.split(' '))
  
  const array = splitted.map(line => ({
    rule1:    parseInt(line[0].split('-')[0], 10),
    rule2:    parseInt(line[0].split('-')[1], 10),
    letter:   line[1][0],
    password: line[2]
  }))

  return array
}

const verifyPasswords1 = rules => rules.filter(passwordMatcher1).length
const verifyPasswords2 = rules => rules.filter(passwordMatcher2).length

const launchPart1 = filename => launch.call(__dirname + filename, parseData, verifyPasswords1)
const launchPart2 = filename => launch.call(__dirname + filename, parseData, verifyPasswords2)

module.exports.part1 = launchPart1
module.exports.part2 = launchPart2

console.log(launchPart1('/data/input.txt'))
console.log(launchPart2('/data/input.txt'))