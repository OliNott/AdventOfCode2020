const fs = require('fs')

const open  = path => fs.readFileSync(path, 'utf8')
const parse = (data, parser) => parser(data)

const launch = (path, parser, callback, arg = null) => {
  const data   = open(path)
  const parsed = parse(data, parser)
  return callback(parsed, arg)
}

module.exports.open   = open
module.exports.parse  = parse
module.exports.launch = launch