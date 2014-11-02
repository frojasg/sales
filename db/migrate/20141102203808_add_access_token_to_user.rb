class AddAccessTokenToUser < ActiveRecord::Migration
  def up
    add_column :users, :access_token, :string, after: :reference
  end

  def down
    remove_column :users, :access_token
  end

end
