class QrCode < ApplicationRecord

  belongs_to :user
  before_save :shorten_url, on: :create
  before_commit :update_shortened_url, on: :update
  before_commit :destroy_shortened_url, on: :destroy

  def handle_shortened_url_response shortened_url_response
    Rails.logger.info "handle_shortened_url_response: #{self.shortened_url}=#{shortened_url_response.destination}"

    if self.shortened_url.nil?
      self.shortened_url = shortened_url_response.short_url
    elsif self.shortened_url != shortened_url_response.short_url
      throw "handle_shortened_url_response changed shortened_url for id=#{self.id}"
    end

    if self.shortened_url_id.nil?
      self.shortened_url_id = shortened_url_response.id
    elsif self.shortened_url_id != shortened_url_response.id
      throw "handle_shortened_url_response changed shortened_url_id for id=#{self.id}"
    end
  end

  def shorten_url
    if self.shortened_url_id.nil?
      handle_shortened_url_response(RebrandlyService.new.new_link(url, title))
    end

    if self.qr_code_svg.nil?
      self.qr_code_svg = QrCodeService.new.make_code self.shortened_url
    end
  end

  def update_shortened_url
    handle_shortened_url_response RebrandlyService.new.update_link(shortened_url_id, url, title)
  end

  def destroy_shortened_url
    RebrandlyService.new.destroy_link(shortened_url_id)
  end

end
