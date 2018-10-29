class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :code
      t.integer :size
      t.timestamps
    end
  end
end
