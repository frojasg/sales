require 'simplecov'
SimpleCov.start do
  add_filter '/db/'
  add_filter '/config/'
  add_filter '/spec/'
  add_filter '/views/'
  add_filter '/app/'
end

RACK_ENV = "test"
require File.join(File.dirname(__FILE__), "..", "app.rb")
require "rack/test"
require "rspec"
require 'factory_girl'
require_relative 'factories'

Bundler.require(:default, settings.environment, 'test')
set :environment, :test
set :run, false
set :raise_errors, true
set :logging, false
ActiveRecord::Base.logger = nil

RSpec.configure do |conf|
  conf.include Rack::Test::Methods
  conf.include FactoryGirl::Syntax::Methods
  conf.before(:suite) do
    FactoryGirl.lint
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  conf.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end
end
