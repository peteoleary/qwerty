require 'httparty'

class QrCodeService
  def initialize
    @url_base = "https://api.qrserver.com/v1"
  end

  def make_code url
    # http://goqr.me/api/doc/create-qr-code/
    response = HTTParty.get(@url_base + "/create-qr-code/?#{url.to_query('data')}&size=400x400&format=svg")
    response.body
  end
end