class CreateSubs < ActiveRecord::Migration[5.1]
  def change
    create_table :subs do |t|
      t.string :title, null: false, index: true, unique: true
      t.text :description, null: false
      t.integer :moderator_id, null: false, index: true
      t.timestamps
    end
  end
end
