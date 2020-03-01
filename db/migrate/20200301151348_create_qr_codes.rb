class CreateQrCodes < ActiveRecord::Migration[5.2]
  def change
    create_table :qr_codes do |t|

      t.references  :user
      t.string            :permanent_url
      t.string            :current_url

      t.timestamps
    end
  end
end
