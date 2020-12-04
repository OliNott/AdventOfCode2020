const fs = require('fs')

const launch = (path, parser, callback) => {
  const data   = fs.readFileSync(path, 'utf8')
  const parsed = parser(data)
  const result = callback(parsed)
  return result
}

module.exports.call = launch