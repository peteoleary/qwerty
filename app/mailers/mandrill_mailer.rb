
class MandrillMailer < Devise::Mailer
  include Devise::Controllers::UrlHelpers

  def get_app_host
    ENV['CLIENT_APP_HOST'] || "http://localhost:3001"
  end

  def get_app_name
    ENV['CLIENT_APP_NAME'] || "Qwerty"
  end

  def confirmation_instructions(record, token, opts={})
    # code to be added here later
    options = {
        :subject => "#{get_app_name} Sign Up confirmation",
        :email => record.email,
        :global_merge_vars => [
            {
                name: "user_registration_link",
                content: "#{get_app_host}/user/confirmation?user_confirmation_token=#{token}"
            }
        ],
        :template => "email-verification"
    }
    mandrill_send options
  end

  def reset_password_instructions(record, token, opts={})
    options = {
        :subject => "#{get_app_name} Password Reset",
        :email => record.email,
        :global_merge_vars => [
            {
                name: "password_reset_link",
                content: "#{get_app_host}/user/new_password?reset_password_token=#{token}"
            }
        ],
        :template => "reset-password"
    }
    mandrill_send options
  end

  def mandrill_send options

    options[:from_email] = ENV['FROM_EMAIL']
    options[:from_name] = ENV['FROM_NAME']
    options[:global_merge_vars] += [
        {name: 'COMPANY', content:  ENV['FROM_COMPANY']},
        {name: 'DESCRIPTION', content: ENV['FROM_DESCRIPTION'] || "You are receiving this email because you have signed up for #{get_app_name}."},
        {name: 'LIST_ADDRESS_HTML', content: ENV['FROM_ADDRESS']}
    ]

    EmailWorker.perform_async(options)
  end

end
