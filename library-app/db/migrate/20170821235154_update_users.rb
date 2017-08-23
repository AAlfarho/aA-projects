class UpdateUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :email
    rename_column :users, :name, :username
    add_index :users, :username, unique: true
  end
end
