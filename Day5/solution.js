const engine = require('../tools')

const ROW_SIZE = 128
const COL_SIZE = 8
const SEATS_ROWS = [...Array(ROW_SIZE).keys()];
const SEATS_COLS = [...Array(COL_SIZE).keys()]

// Part 1
const findHigherId  = seats => Math.max(...seats.map(findSeats))

// Part 2
const findMissingId = seats => {
  const totalIds   = buildAllSeats()
  const currentIds = seats.map(findSeats)
  const id = totalIds.filter(seat => !currentIds.includes(seat))[0]
  return id
}

const buildId = (row, col) => row * 8 + col

const buildAllSeats = () => {
  const result = []

  SEATS_ROWS.forEach(row => {
    SEATS_COLS.forEach(col => {
      if (row <= 1 || row > (ROW_SIZE - 1)) return
      result.push(buildId(row, col))
    })
  })

  return result
}

const findSeats = positions => {
  let rows = [...SEATS_ROWS]
  let cols = [...SEATS_COLS]

  positions.split('').forEach(position => {
    if (['F', 'B'].includes(position)) rows = findPos(position, rows)
    if (['L', 'R'].includes(position)) cols = findPos(position, cols)
  })
  
  return buildId(rows[0], cols[0])
}

const findPos = (currentPos, positionsLeft) => {
  const upper = positionsLeft.splice(positionsLeft.length / 2)
  const lower = positionsLeft

  if      (['F', 'L'].includes(currentPos)) return lower
  else if (['B', 'R'].includes(currentPos)) return upper
}

const parseData = data => data.split('\n')

module.exports.part1     = filename => engine.launch(__dirname + filename, parseData, findHigherId)
module.exports.part2     = filename => engine.launch(__dirname + filename, parseData, findMissingId)

module.exports.parseData = parseData
module.exports.findSeats = findSeats

console.log(engine.launch(__dirname + '/data/input.txt', parseData, findHigherId))  // 835
console.log(engine.launch(__dirname + '/data/input.txt', parseData, findMissingId)) // 649