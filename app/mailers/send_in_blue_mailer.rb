
class SendInBlueMailer < Devise::Mailer
  include Devise::Controllers::UrlHelpers
  include MailerTools


  def confirmation_instructions(record, token, opts={})
    # code to be added here later
    options = {
        :subject => "#{get_app_name} Sign Up confirmation",
        :to_email => record.email,
        :user_registration_link => "#{get_app_host}/signup?confirmation_code=#{token}",
        :template => "registration-confirmation"
    }
    send_in_blue_send options
  end

  def reset_password_instructions(record, token, opts={})
    options = {
        :subject => "#{get_app_name} Password Reset",
        :to_email => record.email,
        :user_registration_link => "#{get_app_host}/user/new_password?reset_password_token=#{token}",
        :template => "reset-password"
    }
    send_in_blue_send options
  end

  def send_in_blue_send options

    options[:from_email] = ENV['FROM_EMAIL']
    options[:from_name] = ENV['FROM_NAME']
    options[:company] = ENV['FROM_COMPANY']
    options[:description] = ENV['FROM_DESCRIPTION'] || "You are receiving this email because you have signed up for #{get_app_name}."
    options[:list_address_html] = ENV['FROM_ADDRESS']
    options[:mailer] = :send_in_blue
    perform options
  end
end
