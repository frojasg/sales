# == Schema Information
#
# Table name: orders
#
#  id          :integer          not null, primary key
#  uuid        :string(36)
#  item_id     :integer
#  user_id     :integer
#  purchase_at :datetime
#  priority    :integer
#  created_at  :datetime
#  updated_at  :datetime
#

require './lib/uuid_support'

class Order < ActiveRecord::Base
  include UUIDSupport

  belongs_to :user
  belongs_to :item
end
