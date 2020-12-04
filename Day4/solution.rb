def call
  data = get_file_data(__dir__ + '/input.txt')
  validations(data)
end

REQ = [:byr, :iyr, :eyr, :hgt, :hcl, :ecl, :pid]

def validations(table)
  p "Original length : #{table.length}"
  table.filter! { |passport| (REQ - passport.keys).length === 0       }
  table.filter! { |passport| valid_year?(passport[:byr], 1920, 2002) }
  table.filter! { |passport| valid_year?(passport[:iyr], 2010, 2020) }
  table.filter! { |passport| valid_year?(passport[:eyr], 2020, 2030) }
  table.filter! { |passport| valid_height?(passport[:hgt])           }
  table.filter! { |passport| valid_color?(passport[:hcl])            }
  table.filter! { |passport| valid_eye?(passport[:ecl])              }
  table.filter! { |passport| valid_pid?(passport[:pid])              }
  p "Valid passports : #{table.length}"
  table.length
end

def valid_year?(y, min, max)
  return false unless y
  return false if y.length != 4

  year = y.to_i
  year >= min && year <= max 
end

def valid_height?(h)
  unit  = h.chars.last(2).join('')
  value = h.chars.first(3).join('').to_i

  if unit == 'cm'
    value >=150 && value <= 193
  elsif unit == 'in'
    value >= 59 && value <= 76
  else
    false
  end
end

def valid_color?(col)
  return false unless col[0] == '#'

  col[0] = ''
  color = col.chars
  valid = true
  color.each { |char| valid = false unless [*('a'..'z'), *('0'..'9')].include?(char) }
  valid
end

def valid_eye?(eye)
  ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].include?(eye)
end

def valid_pid?(pid)
  pid.length == 9
end

def get_file_data(filepath)
  file = File.open(filepath)

  # Breaking on empty newlines
  data = file.read.split(/^\s*$\n/)
  
  # Replacing non empty new lines with regular spaces, then split
  passports_string = data.map { |pass| pass.gsub(/\n/, ' ').split(' ') }
  
  # Building hash for each "key:value" string
  passports_hash = passports_string.map do |line|
    passport = {}
    line.each { |pair| key, value = pair.split(/:/); passport[key.to_sym] = value }
    passport
  end

  # Returning array of hashes
  passports_hash
end

# Calling method
call