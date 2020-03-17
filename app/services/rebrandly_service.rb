require 'rebrandly'

class RebrandlyService
  def initialize
    @api = Rebrandly::Api.new
  end

  def new_link url, title = nil, description = nil
    @api.shorten(url, domain: ENV['REBRANDLY_DOMAIN'], title: title, description: description, favourite: true)
  end

  def update_link id, url, title = nil, description = nil
    @api.update_link(id, destination:url, title: title, description: description )
  end

  def destroy_link id
    @api.delete(id )
  end
end