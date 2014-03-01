class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :title
      t.string :status
      t.text :description
      t.integer :price
      t.timestamps
    end

    add_index :items, :status
  end
end
