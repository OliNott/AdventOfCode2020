
const launch = require('../tools')

let result

// Part 1
const find2020_Part1 = numbers => {  
  numbers.forEach(num1 => {
    const matchingNum = numbers.filter(num2 => num1 + num2 === 2020)[0]
    if (matchingNum) result = num1 * matchingNum
  })
  
  return result
}

// Part 2
const find2020_Part2 = numbers => {
  numbers.forEach(num1 => {
    numbers.forEach(num2 => {
      const matchingNum = numbers.filter(num3 => num1 + num2 + num3 === 2020)[0]
      if (matchingNum) result = num1 * num2 * matchingNum
    })
  })
  
  return result
}

const parseData = data => data.split('\n').map(n => parseInt(n, 10))

const launchPart1 = filename => launch.call(__dirname + filename, parseData, find2020_Part1)
const launchPart2 = filename => launch.call(__dirname + filename, parseData, find2020_Part2)

module.exports.part1 = launchPart1
module.exports.part2 = launchPart2

console.log(launchPart1('/input.txt'))
console.log(launchPart2('/input.txt'))