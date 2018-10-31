class CreateFaves < ActiveRecord::Migration[5.2]
  def change
    create_table :faves do |t|
      t.string :name
      t.string :place
      t.decimal :lat
      t.decimal :lon
    end
  end
end
