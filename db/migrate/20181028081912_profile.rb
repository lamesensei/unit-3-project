class Profile < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.string :username
      t.string :fullname
      t.integer :age
    end
  end
end
