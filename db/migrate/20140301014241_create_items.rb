class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :uuid, :limit => 36
      t.string :title
      t.string :status, default: 'available'
      t.text :description
      t.integer :price
      t.timestamps
    end

    add_index :items, :status
    add_index :items, :uuid
  end
end
