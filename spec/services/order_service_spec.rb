require 'full_spec_helper'

describe OrderService do

  describe '#purchase' do
    let(:user) { create :user }

    it 'purchase item without orders' do
      item = create :item
      order = OrderService.purchase(item, user)
      expect(order.purchase_at).not_to be nil
      expect(order.valid?).to be true
      expect(item.orders.count).to eq 1
    end

    it 'purchase item with refuned orders' do
      item = create :item, orders_options: {status: 'refunded'}
      order = OrderService.purchase(item, user)
      expect(order.purchase_at).not_to be nil
      expect(order.valid?).to be true
      expect(item.orders.count).to eq 2
    end

    it 'purchase item with canceled orders' do
      item = create :item, orders_options: {status: 'canceled'}
      order = OrderService.purchase(item, user)
      expect(order.purchase_at).not_to be nil
      expect(order.valid?).to be true
      expect(item.orders.count).to eq 2
    end

    it 'purchase item with rejected orders' do
      item = create :item, orders_options: {status: 'rejected'}
      order = OrderService.purchase(item, user)
      expect(order.purchase_at).not_to be nil
      expect(order.valid?).to be true
      expect(item.orders.count).to eq 2
    end

    it 'fail when item is already requested' do
      item = create :item, orders_options: {status: 'requested'}
      expect { OrderService.purchase(item, user) }.to \
        raise_error(OrderService::ItemAlreadyRequested)
    end

    it 'fail when item is already bought' do
      item = create :item, orders_options: {status: 'confirmed'}
      expect { OrderService.purchase(item, user) }.to \
        raise_error(OrderService::SoldOut)
    end
  end
end
