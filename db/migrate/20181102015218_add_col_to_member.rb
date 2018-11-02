class AddColToMember < ActiveRecord::Migration[5.2]
  def change
    add_column  :members, :icon , :integer
  end
end
