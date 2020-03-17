class QrCodesController < ApiController

  def scope
    QrCode
  end

  protected

    def allow_params
      params.permit(:url, :title, :description, :user_id)
    end
end
