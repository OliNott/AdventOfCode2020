# ruby Day4/test.rb 

require 'rspec/autorun'
require_relative './solution'

describe Survey do
  survey = Survey.new('/data/test.txt')

  describe "Part 1" do 
    it "Should count different answers for one participant" do
      counter = survey.count_replies([["a", "b", "c"]])
      expect(counter).to eq(3)
    end
    
    it "Should ignore answers to the same question for one participant" do
      counter = survey.count_replies([["a", "a", "a", "a"]])
      expect(counter).to eq(1)
    end

    it "Should count only questions with same replies as one" do
      counter = survey.count_replies([[["a"], ["a"], ["a"], ["a"]]])
      expect(counter).to eq(1)
    end

    it "Should count only questions with same replies as one" do
      counter = survey.count_replies([[["a", "b"], ["a", "c"]]])
      expect(counter).to eq(3)
    end

    it "Should correctly count the number of replies" do
      counter = survey.count_replies
      expect(counter).to eq(11)
    end
  end
  
  describe "Part 2" do 
    it "Should count all replies as identic replies per group with one participant" do
      counter = survey.check_identic_replies([[["a", "b", "c"]]])
      expect(counter).to eq(3)
    end
    
    it "Should count no replies if each participant of a survey replied differently" do
      counter = survey.check_identic_replies([[["a"], ["b"], ["c"]]])
      expect(counter).to eq(0)
    end
    
    it "Should only count the common replies" do
      counter = survey.check_identic_replies([[["a", "b"], ["a", "c"]]])
      expect(counter).to eq(1)
    end

    it "Should correctly count the number of identic replies per survey" do
      counter = survey.check_identic_replies
      expect(counter).to eq(6)
    end
  end
end