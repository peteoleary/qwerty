class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
  def access_denied(exception)
    Rails.logger.error "access denied! '#{exception.message}'"
  end
end