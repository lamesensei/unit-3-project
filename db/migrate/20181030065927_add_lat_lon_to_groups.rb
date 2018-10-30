class AddLatLonToGroups < ActiveRecord::Migration[5.2]
  def change
    add_column :groups, :lat, :decimal
    add_column :groups, :lon, :decimal
  end
end
