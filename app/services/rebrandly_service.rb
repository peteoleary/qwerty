require 'rebrandly'

class RebrandlyService
  def initialize
    @api = Rebrandly::Api.new
  end

  def make_options options
    options.merge!({'domain': {'id': ENV['REBRANDLY_DOMAIN_ID']}}) if ENV['REBRANDLY_DOMAIN_ID'].present?
    options
  end

  def new_link url, title = nil
    @api.shorten(url, make_options({title: title}))
  end

  def update_link id, url, title = nil
    @api.update_link(id, make_options({destination:url, title: title}))
  end

  def destroy_link id
    @api.delete(id )
  end
end