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
end
