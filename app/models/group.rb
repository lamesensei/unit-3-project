class Group < ApplicationRecord
  has_many :members

  def to_param
    code
  end

  def is_not_full?
    self.members.size != self.size
  end
end
