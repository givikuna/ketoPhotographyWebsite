require "process"

git_add = Process.run("git", args: ["add", "."])
puts git_add

puts "commit name: "
commit_name = gets
commit_name = commit_name.chomp if commit_name
git_commit = Process.run("git", args: ["commit", "-m", "\"#{commit_name}\""])
puts git_commit

puts "do you want to push? (y/n): "
_input = gets
_input = _input.chomp if _input
push = _input == "y" ? true : false

if push
  git_push = Process.run("git", args: ["push"])
  puts git_push
end