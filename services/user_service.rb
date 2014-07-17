class UserService

  class NoUser < Struct.new(:access_token)
    def exist?
      false
    end
  end

  def self.user(access_token)
    fb_user = Facebook.me(access_token)
    user = User.find_or_create_by username: fb_user[:username]
    fb_user[:reference] = fb_user[:id]
    user.update_attributes(fb_user.except(:username, :id))
    user
  rescue
    NoUser.new
  end

end

