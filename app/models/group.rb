class Group < ApplicationRecord
  has_many :members

  def to_param
    code
  end
end
