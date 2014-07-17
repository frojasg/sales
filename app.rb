require 'sinatra'
Bundler.require(:default, settings.environment)
require './config/environments'
require './models/all'
require './services/all'

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
  @user = UserService.user params['access_token']
  if @user.exist?
    rabl :user, format: 'json'
  else
    status 404
  end
end

def html view
  File.read(File.join(settings.public_folder, "#{view}.html"))
end

