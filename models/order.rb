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
#  status      :string(255)
#

require './lib/uuid_support'

class Order < ActiveRecord::Base
  include UUIDSupport

  belongs_to :user
  belongs_to :item

  scope :requested, ->{ where(status: 'requested') }
  scope :confirmed, ->{ where(status: 'confirmed') }

  state_machine :status, initial: :requested do
    event :confirm do
      transition requested: :confirmed
    end

    event :reject do
      transition :requested => :rejected
    end

    event :cancel do
      transition :requested => :canceled
    end

    event :refund do
      transition :confirmed => :refunded
    end

    state :requested
    state :confirmed
    state :rejected
    state :canceled
    state :refunded
  end
end
