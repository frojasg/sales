class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t| 
      t.string :uuid, limit: 36
      t.string :username
      t.string :first_name
      t.string :last_name
      t.string :reference
      t.timestamps
    end

    add_index :users, :uuid
  end
end
