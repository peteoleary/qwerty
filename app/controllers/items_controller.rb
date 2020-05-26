class ItemsController < ApiController

  def scope
    Item
  end

  protected

  def allow_params
    params.permit(:image_url, :title, :description, :user_id, :qr_code_id)
  end
end
