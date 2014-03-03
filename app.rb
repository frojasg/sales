Bundler.require(:default)

require "./models/item"
require "./models/image"
require "./models/user"
require "./params/user_parameters"

set :database, "sqlite3:///blog.db"
#set :public_folder, File.dirname(__FILE__) + '/public'
set :public_folder, ENV['RACK_ENV'] == 'production' ? 'dist' : 'app'
configure do
    enable :logging 
    set :public_folder, ENV['RACK_ENV'] == 'production' ? 'dist' : 'app'
  end

Rabl.register!

Rabl.configure do |config|
  config.include_child_root = false
  config.include_json_root = false
end

get '/' do
  html :index
end

get '/items' do
  @items = Item.all
  rabl :items, format: "json"
end

post '/users' do
  @user = User.find_by username: params[:username]
  unless @user
    @user = User.create(UserParameters.new(params).permit)
  end
  rabl :user, format: 'json'
end

def html view
  File.read(File.join(settings.public_folder, "#{view}.html"))
end
