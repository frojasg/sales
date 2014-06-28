require 'sinatra'
Bundler.require(:default, settings.environment)

require './config/environments'

require './models/all'
require "./params/user_parameters"

get '/' do
  html :index
end

get '/items' do
  @items = Item.all
  rabl :'items/index', format: 'json'
end

get '/items/:item_id' do |item_id|
  @item = Item.find_by_uuid(item_id)
  rabl :'items/show', :format => 'json'
end

post '/users' do
  params = MultiJson.decode request.body.read
  @user = User.find_by username: params['username']
  unless @user
    @user = User.create(UserParameters.new(params).permit)
  end
  rabl :user, format: 'json'
end

def html view
  File.read(File.join(settings.public_folder, "#{view}.html"))
end

after do
  # Close the connection after the request is done so that we don't
  # deplete the ActiveRecord connection pool.
  ActiveRecord::Base.connection.close
end
