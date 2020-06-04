class Item < ApplicationRecord
  belongs_to :qr_code
  belongs_to  :user
end
