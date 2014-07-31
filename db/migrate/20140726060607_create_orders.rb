class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.string :uuid, :limit => 36
      t.references :item
      t.references :user
      t.datetime :purchase_at
      t.integer :priority

      t.timestamps
    end

    add_index :orders, :uuid
    add_index :orders, :item_id
    add_index :orders, :user_id
  end
end
