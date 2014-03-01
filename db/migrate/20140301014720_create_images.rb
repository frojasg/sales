class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :capture
      t.string :url
      t.references :item, index: true
      t.timestamps
    end
  end
end
