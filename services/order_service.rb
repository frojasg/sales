class OrderService

  def self.purchase(item, user)
    item.orders.create(
      user: user,
      purchase_at: Time.now,
      priority: item.orders.count
    )
  end

end
