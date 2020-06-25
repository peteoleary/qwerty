class QrCodesController < ApiController

  def scope
    QrCode
  end

  protected

    def allow_params
      params.permit(:url, :title, :description, :user_id, :id, :qr_code_svg, :shortened_url)
    end
end
