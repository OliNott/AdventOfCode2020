# ruby Day4/test.rb 

require 'rspec/autorun'
require_relative './solution'

describe Passport do
  validator = Passport.new

  describe "Part 1" do
    # KEY PRESENCE
    describe "Presence of keys" do
      it "Should be valid when keys are present" do
        valids = validator.valid_keys?({
          hcl: '#ae17e1',
          iyr: 2013,
          eyr: 2024,
          ecl: 'brn',
          pid: 760753108,
          byr: 1931,
          hgt: '179cm'
        })
        expect(valids).to be_truthy
      end

      it "Should not be valid when missing keys" do
        valids = validator.valid_keys?({
          hcl: '#cfa07d',
          eyr: 2025,
          pid: 166559648,
          iyr: 2011,
          ecl: 'brn',
          hgt: '59in'
        })
        expect(valids).to be_falsey
      end
    end

    describe "Part 1 overall test" do
      it "Should pass part1 test file" do
        valids = validator.call('data/test1.txt', false)
        expect(valids).to eq(2)
      end
    end
  end

  describe "Part 2" do
    
    # BIRTHDATE
    describe "Birthdate" do
      it "Should accept valid birthyear" do
        expect(validator.valid_year?('2002', 1920, 2002)).to be_truthy
      end
      it "Should reject unvalid birthyear" do
        expect(validator.valid_year?('2003', 1920, 2002)).to be_falsey
      end
    end
    
    # HEIGHT
    describe "Height" do
      it "Should accept valid cm height" do
        expect(validator.valid_height?('190cm')).to be_truthy
      end
      it "Should accept valid in height" do
        expect(validator.valid_height?('60in')).to be_truthy
      end
      it "Should reject unvalid in height" do
        expect(validator.valid_height?('190in')).to be_falsey
      end
      it "Should reject when nonpresent unit" do
        expect(validator.valid_height?('190')).to be_falsey
      end
      it "Should reject when wrong unit" do
        expect(validator.valid_height?('190fo')).to be_falsey
      end
    end
    
    # COlOR
    describe "Color" do
      it "Should accept when valid color" do
        expect(validator.valid_color?('#123abc')).to be_truthy
      end
      it "Should reject when unallowed characater" do
        expect(validator.valid_color?('#123abz')).to be_falsey
      end
      it "Should reject when missing '#'" do
        expect(validator.valid_color?('123abc')).to be_falsey
      end
    end
    
    # EYE COLOR
    describe "Eye color" do
      it "Should accept when correct eye color" do
        expect(validator.valid_eye?('brn')).to be_truthy
      end
      it "Should reject when wrong eye color" do
        expect(validator.valid_eye?('wat')).to be_falsey
      end
    end

    # PID
    describe "PID" do
      it "Should accept when correct PID" do
        expect(validator.valid_pid?('000000001')).to be_truthy
      end
      it "Should reject when wrong PID" do
        expect(validator.valid_pid?('0123456789')).to be_falsey
      end
    end

    describe "Part 2 overall test" do
      it "Should pass the part2 test file" do
        valids = validator.call('data/test2.txt', false)
        expect(valids).to eq(4)
      end
    end
  end
end