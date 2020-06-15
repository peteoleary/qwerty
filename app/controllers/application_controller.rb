class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
  def access_denied(exception)
    Rails.logger.error "access denied! '#{exception.message}'"
  end

  def fallback_index_html
    render :file => 'public/index.html'
  end
end