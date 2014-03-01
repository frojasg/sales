class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :uuid, :limit => 36
      t.string :capture
      t.string :url
      t.references :item, index: true
      t.timestamps
    end

    add_index :images, :uuid
  end
end
