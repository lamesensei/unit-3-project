class CreateMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :members do |t|
      t.string :name
      t.decimal :lat, {:precision => 10, :scale => 6}
      t.decimal :lon, {:precision => 10, :scale => 6}
      t.timestamps
    end
  end
end
