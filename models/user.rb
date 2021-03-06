# == Schema Information
#
# Table name: users
#
#  id           :integer          not null, primary key
#  uuid         :string(36)
#  first_name   :string(255)
#  last_name    :string(255)
#  reference    :string(255)
#  created_at   :datetime
#  updated_at   :datetime
#  access_token :string(255)
#

require './lib/uuid_support'

class User < ActiveRecord::Base
  include UUIDSupport

  def exist?
    true
  end
end
