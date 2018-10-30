class AddPlaceToMembers < ActiveRecord::Migration[5.2]
  def change
    add_column :members, :place, :text
  end
end
