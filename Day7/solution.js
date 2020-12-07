const engine = require('../tools')

const findContainerColors = (rules, colorsToCheck, checkedColors = [], result = 0) => {
  
  const matchingColors = []
  tempResult = result


  console.log('------')
  console.log('||| INPUT COLORS |||')
  console.log(colorsToCheck)
  console.log('||| ALREADY CHECKED COLORS |||')
  console.log(checkedColors)
  console.log('------')

  /* A rule has been parsed like this :
    { 'posh cyan ':                // Container bag
      [ { 'dull teal':   2 },      // Contained bags
        { 'posh indigo': 3 } ] 
    }
  */

  rules.forEach(rule => {
    Object.keys(rule).forEach(primaryColor => {
      rule[primaryColor].forEach(secondaryRule => {
        Object.keys(secondaryRule).forEach(secondaryColor => {
          console.log('---')
          console.log(`is ${secondaryColor} in the colors to check ? =>`)
          console.log(colorsToCheck)
          console.log('---')
          if (colorsToCheck.includes(secondaryColor)) { 
            console.log('YES')
            console.log(`Then add ${primaryColor} to the to check array`)
            matchingColors.push(primaryColor)
          } else {
            console.log('NOPE')
          }
        })
      })
    })
    console.log('NEXT COLOR')
  })

  // Update array of checked colors
  const newAllColorsSet      = [...new Set(checkedColors.concat(colorsToCheck))]
  // Array of new colors to check
  const removedCheckedColors = [...new Set(matchingColors.filter(el => !newAllColorsSet.includes(el)))]
  tempResult += removedCheckedColors.length

  console.log('--------------')
  console.log('Initial input :')
  console.log(colorsToCheck)
  console.log('Colors checked before this run :')
  console.log(checkedColors)
  console.log('Colors check after this run :')
  console.log(newAllColorsSet)
  console.log('Colors for next run :')
  console.log(removedCheckedColors)
  console.log('Current result :')
  console.log(tempResult)
  console.log('--------------')

  if (removedCheckedColors.length === 0) return tempResult
  return findContainerColors(rules, removedCheckedColors, newAllColorsSet, tempResult)
}








const parseData = data => {
  const rules = data.split('\n')
  const solution = rules.map(rule => {
    const final = {}

    const color        = rule.split('bags')[0].trim()
    const primaryName  = (rule.split('contain')[1].split(' ')[2] + ' ' + rule.split('contain')[1].split(' ')[3]).trim()
    const primaryValue = parseInt(rule.split('contain')[1].split(' ')[1], 10)
    final[color] = [{ [primaryName]: primaryValue }]

    const secondary = rule.split(',')[1]
    if (secondary) {
      const secondaryName = (secondary.split(' ')[2] + ' ' + secondary.split(' ')[3]).trim()
      const secondaryValue = parseInt(secondary.split(' ')[1], 10)
      final[color].push({ [secondaryName]: secondaryValue })
    }
    return final
  })
  return solution
}

module.exports.part1 = filename => engine.launch(__dirname + filename, parseData, findContainerColors, ['shiny gold'])

console.log(engine.launch(__dirname + '/data/input.txt', parseData, findContainerColors, ['shiny gold']))  // 4
