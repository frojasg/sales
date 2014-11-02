$LOAD_PATH.unshift(File.expand_path("../..", __FILE__))

configure :development do
  set :database, 'sqlite3:blog.db'
  set :show_exceptions, true
  set :public_folder, 'app'
end

configure :production do
  set :public_folder, 'dist'

  db = URI.parse(ENV['DATABASE_URL'] || 'postgres:///localhost/mydb')

  ActiveRecord::Base.establish_connection(
    :adapter  => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
    :host     => db.host,
    :username => db.user,
    :password => db.password,
    :database => db.path[1..-1],
    :encoding => 'utf8'
  )
end

Rabl.register!

Rabl.configure do |config|
  config.include_child_root = false
  config.include_json_root = false
end

after do
  # Close the connection after the request is done so that we don't
  # deplete the ActiveRecord connection pool.
  # ActiveRecord::Base.connection.close
end
