require 'rebrandly'

class RebrandlyService
  def initialize
    @api = Rebrandly::Api.new
  end

  def new_link url, title = nil, description = nil
    @api.shorten(url, domain: ENV['REBRANDLY_DOMAIN'], title: title, description: description, favourite: true)
  end
end