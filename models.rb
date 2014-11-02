Dir[File.join(File.dirname(__FILE__), 'models', '*.rb')] .each { |file| require file }
