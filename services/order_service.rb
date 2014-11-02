class OrderService

  Error = Class.new(StandardError)
  ItemAlreadyRequested = Class.new(Error)
  SoldOut = Class.new(Error)

  def self.purchase(item, user)
    fail ItemAlreadyRequested.new if item.orders.requested.any?
    fail SoldOut.new if item.orders.confirmed.any?

    item.orders.create(
      user: user,
      purchase_at: Time.now,
      priority: item.orders.count
    )
  end

end
