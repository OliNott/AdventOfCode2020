
const launch = require('../tools')


const matchingNum = (currentNumbers, array, goal) => {
  let currentTry

  const match = array.find(number => {
    currentTry = [...currentNumbers, number]
    return currentTry.reduce((total, num) => total + num, 0) === goal
  })
  
  return match ? currentTry : null
}

// Part 1
const find2020Part1 = numbers => {  
  let result = []
  numbers.some(num1 => result = matchingNum([num1], numbers, 2020))

  return result.reduce((total, num) => total * num, 1)
}

// Part 2
const find2020Part2 = numbers => {
  let result = []
  numbers.some(num1 => numbers.some(num2 => result = matchingNum([num1, num2], numbers, 2020)))

  return result.reduce((total, num) => total * num, 1)
}

// With deepness of 5 to test
// const find2020Part3 = numbers => {
//   let result = []
//   numbers.some(num1 => numbers.some(num2 => numbers.some(num3 => numbers.some(num4 => result = matchingNum([num1, num2, num3, num4], numbers, 2020)))))

//   return result.reduce((total, num) => total * num, 1)
// }

const parseData = data => data.split('\n').map(n => parseInt(n, 10))

module.exports.part1 = filename => launch.call(__dirname + filename, parseData, find2020Part1)
module.exports.part2 = filename => launch.call(__dirname + filename, parseData, find2020Part2)

console.log(launch.call(__dirname + '/data/input.txt', parseData, find2020Part1))
console.log(launch.call(__dirname + '/data/input.txt', parseData, find2020Part2))
console.log(launch.call(__dirname + '/data/input.txt', parseData, find2020Part3))