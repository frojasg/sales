FactoryGirl.define do
  factory :item do
    ignore do
      orders_options {}
    end

    title 'some expensive item'
    description 'some descriptive text'
    price 10000

    images {
      create_list(:image, 2, item: @instance)
    }

    after(:build) do |item, evaluator|
      if evaluator.orders_options.present?
        item.orders << create(:order, {item: item}.merge(evaluator.orders_options))
      end
    end
  end

  factory :image do
    sequence(:capture) { |n| "Image Number #{n}" }
    sequence(:url) { |n| "www.example.org/image/#{n}" }

    item { create :item }
  end

  factory :user do
    first_name 'John'
    last_name 'Doe'
    reference '123'
    access_token 'fb_token'
  end

  factory :order do
    item { create(:item) }
    user { create(:user) }
    status 'requested'
    priority { item.orders.count }
    purchase_at { Time.now }
  end
end
