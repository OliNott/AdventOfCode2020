class Survey

  def initialize(filename)
    @data = get_file_data(__dir__ + '/' + filename)
  end

  def call
    p "Number of replies : #{count_replies}"
    p "Number of same replies : #{check_identic_replies}"     
  end

  def count_replies(custom_data = nil, result = 0)
    data = custom_data ? custom_data : @data # For custom test

    data.each { |line| result += line.flatten.uniq.length }

    return result
  end

  def check_identic_replies(custom_data = nil, result = 0)
    data = custom_data ? custom_data : @data # For custom test

    data.each do |survey|
      counter = {}
      survey.each do |participant| 
        participant.each { |letter| counter.has_key?(letter) ? counter[letter] += 1 : counter[letter] = 1 }
        result += counter.select { |letter| counter[letter] === survey.length }.length
      end
    end

    return result
  end

  private

  def get_file_data(filepath)
    file = File.open(filepath)

    # Breaking on empty newlines
    data = file.read.split(/^\s*$\n/)

    # Splitting on newlines and for each person
    data.map { |survey| survey.split(/\n/).map { |line| line.split('') } }
  end
end

# Survey.new('data/test.txt').call
# Survey.new('data/input.txt').call