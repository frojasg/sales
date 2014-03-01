# == Schema Information
#
# Table name: items
#
#  id          :integer          not null, primary key
#  title       :string(255)
#  status      :string(255)
#  description :text
#  price       :integer
#  created_at  :datetime
#  updated_at  :datetime
#

require './lib/uuid_support'

class Item < ActiveRecord::Base
  include UUIDSupport

  has_many :images
end
