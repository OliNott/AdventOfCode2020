TREE = "#"

def count_trees(matrix, step_x, step_y)
  row_size = matrix.first.size
  x = 0
  
  (0...matrix.size).step(step_y).count do |y|
    square = matrix.fetch(y).fetch(x % row_size)
    x += step_x
    square == TREE
  end
end

def call(x, y)
  input = get_file_data(__dir__ + '/input.txt')
  count_trees(input, x, y)
end

def get_file_data(filepath)
  file = File.open(filepath)
  file.readlines.map(&:chomp).map(&:chars)
end

def part_1
  call(3, 1)
end

def part_2
  approaches = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
  approaches.map { |x, y| call(x, y) }.inject(:*)
end

p part_1
p part_2