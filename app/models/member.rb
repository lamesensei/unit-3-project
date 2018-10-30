class Member < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :group
end
