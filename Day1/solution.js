
const engine = require('../tools')

// TODO : Use Currying
// const myFunc = (arg1) => (arg2) => (arg3) => arg1 * arg2 * arg3

// Recursive currying
// const curry = (fn, arity = fn.length, ...args) =>
//   arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

// console.log(curry(Math.pow)(2)(8));
// console.log(curry(Math.min, 3)(10)(50)(2));

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

const matchingNum = (currentNumbers, array, goal) => {
  let currentTry

  const match = array.find(number => {
    currentTry = [...currentNumbers, number]
    return currentTry.reduce((total, num) => total + num, 0) === goal
  })
  
  return match ? currentTry : null
}

const parseData = data => data.split('\n').map(n => parseInt(n, 10))

module.exports.part1 = filename => engine.launch(__dirname + filename, parseData, find2020Part1)
module.exports.part2 = filename => engine.launch(__dirname + filename, parseData, find2020Part2)

console.log(engine.launch(__dirname + '/data/input.txt', parseData, find2020Part1))
console.log(engine.launch(__dirname + '/data/input.txt', parseData, find2020Part2))