# == Schema Information
#
# Table name: images
#
#  id         :integer          not null, primary key
#  uuid       :string(36)
#  capture    :string(255)
#  url        :string(255)
#  item_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

require './lib/uuid_support'

class Image < ActiveRecord::Base
  include UUIDSupport

  belongs_to :item
end
