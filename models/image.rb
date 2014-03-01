# == Schema Information
#
# Table name: images
#
#  id         :integer          not null, primary key
#  capture    :string(255)
#  url        :string(255)
#  item_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

class Image < ActiveRecord::Base
  belongs_to :item
end
