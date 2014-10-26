class Facebook
  def self.me(access_token)
    response = Typhoeus.get("https://graph.facebook.com/me?access_token=#{access_token}")
    body = JSON.parse(response.body, symbolize_names: true)
    raise ArgumentError, body[:error][:message] unless response.code == 200
    body.slice(:first_name, :last_name, :id)
  end
end
