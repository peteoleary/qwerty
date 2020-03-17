class QrCode < ApplicationRecord

  belongs_to :user
  before_commit :shorten_url, :only => [:create]
  before_commit :update_shortened_url, :only => [:update]
  after_commit :destroy_shortened_url, :only => [:destroy]

  def handle_shortened_url_response shortened_url_response
    shortened_url = shortened_url_response['shortUrl']
    shortened_url_id = shortened_url_response['id']
  end

  def shorten_url
    handle_shortened_url_response RebrandlyService.new.new_link(url, title, description)
  end

  def update_shortened_url
    handle_shortened_url_response RebrandlyService.new.update_link(shortened_url_id, url, title, description)
  end

  def destroy_shortened_url
    RebrandlyService.new.destroy_link(shortened_url_id)
  end

end
