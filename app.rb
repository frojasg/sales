require 'sinatra'
require "sinatra/activerecord"
require 'rabl'

require "./models/item"
require "./models/image"

set :database, "sqlite3:///blog.db"

Rabl.register!

Rabl.configure do |config|
  config.include_child_root = false
  config.include_json_root = false
end

get '/' do
  @items = Item.all
  rabl :items, format: "json"
end

