class AddGroupToMember < ActiveRecord::Migration[5.2]
  def change
    add_reference :members, :group, foreign_key: true
  end
end
