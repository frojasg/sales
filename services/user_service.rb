class UserService

  class NoUser < Struct.new(:access_token)
    def exist?
      false
    end
  end

  def self.user(access_token)
    fb_user = Facebook.me(access_token)
    user = User.find_or_initialize_by reference: fb_user[:id]
    params = fb_user.except(:id).merge(access_token: access_token)
    user.update_attributes(params)
    user
  rescue
    NoUser.new
  end

end

