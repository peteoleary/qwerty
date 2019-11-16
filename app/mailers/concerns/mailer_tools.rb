module MailerTools
  include ActiveSupport::Concern

  def get_app_host
    ENV['CLIENT_APP_HOST'] || "http://localhost:3000"
  end

  def get_app_name
    ENV['CLIENT_APP_NAME'] || "Qwerty"
  end

  def perform options
    if Rails.env == 'test'
      EmailWorker.new.perform(options)
    else
      EmailWorker.perform_async(options)
    end
  end
end