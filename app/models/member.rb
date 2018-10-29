class Member < ApplicationRecord
  has_one :user
  belongs_to :group
end
