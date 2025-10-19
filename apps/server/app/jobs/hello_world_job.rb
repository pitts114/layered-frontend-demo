class HelloWorldJob < ApplicationJob
  queue_as :default

  def perform(*args)
    puts "hello world"
  end
end
