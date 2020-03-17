class CreateQrCodes < ActiveRecord::Migration[5.2]
  def change
    create_table :qr_codes do |t|

      t.references  :user

      t.string            :shortened_url
      t.string            :shortened_url_id

      t.string            :url
      t.string            :title
      t.string            :description

      t.timestamps
    end
  end
end
