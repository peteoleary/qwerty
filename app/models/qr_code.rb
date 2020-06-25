class QrCode < ApplicationRecord

  belongs_to :user
  before_save :shorten_url, on: :create
  before_commit :update_shortened_url, on: :update
  before_commit :destroy_shortened_url, on: :destroy

  def handle_shortened_url_response shortened_url_response
    Rails.logger.info "handle_shortened_url_response: #{shortened_url_response.destination}"
    self.shortened_url = shortened_url_response.short_url
    self.shortened_url_id = shortened_url_response.id
  end

  def shorten_url
    handle_shortened_url_response RebrandlyService.new.new_link(url, title)

    self.qr_code_svg = QrCodeService.new.make_code self.shortened_url
  end

  def update_shortened_url
    handle_shortened_url_response RebrandlyService.new.update_link(shortened_url_id, url, title)
  end

  def destroy_shortened_url
    RebrandlyService.new.destroy_link(shortened_url_id)
  end

end
