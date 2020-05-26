class AddItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|

      t.references  :user

      # for now, clothing can have only one QR code on it
      t.references  :qr_code

      t.string            :title
      t.string            :description
      t.string            :image_url

      t.timestamps
    end
  end
end
