class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :image_url, :qr_code

  def qr_code
    object.qr_code.attributes.except('qr_code_svg', 'created_at', 'updated_at')
  end
end
