class Group < ApplicationRecord
  validates :code, uniqueness: true
  has_many :members

  def to_param
    code
  end

  def is_not_full?
    self.members.size != self.size
  end

  def owner
    self.members.first.user
  end
end
