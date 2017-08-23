class CreateQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :questions do |t|
      t.text :text, null: false
      t.integer :polls_id, null: false
      t.timestamps
    end
  end
end
