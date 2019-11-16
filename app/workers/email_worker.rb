# require 'mandrill'
require 'sib-api-v3-sdk'
require 'dotenv/load'

class EmailWorker
  if Rails.env != 'test'
    include Sidekiq::Worker
    sidekiq_options queue: 'qwerty_email'
  end

  def initialize
    @mandrill = Mandrill::API.new ENV['MANDRILL_API_KEY'] if ENV['MANDRILL_API_KEY']

    if ENV['SENDINBLUE_API_KEY']
      # Setup Send In Blue
      SibApiV3Sdk.configure do |config|
        # Configure API key authorization: api-key
        config.api_key['api-key'] = ENV['SENDINBLUE_API_KEY']
        config.debugging =  true
        # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
        #config.api_key_prefix['api-key'] = 'Bearer'

        # Configure API key authorization: partner-key
        # config.api_key['partner-key'] = 'YOUR API KEY'
        # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
        #config.api_key_prefix['partner-key'] = 'Bearer'
      end
    end
  end


  def mandrill_send(opts={})

    message = {
        :subject=> "#{opts[:subject]}",
        :from_name=> "#{opts[:from_name]}",
        :from_email=> "#{opts[:from_email]}",
        :to=>
            [{"name"=>"Some User",
              "email"=>"#{opts[:email]}",
              "type"=>"to"}],
        :global_merge_vars => opts[:global_merge_vars]
    }
    sending = @mandrill.messages.send_template opts[:template], [], message

    if sending[0]['status'] != 'sent'
      raise Mandrill::Error.new sending
    end

  rescue Mandrill::Error => e
    logger.error("#{e.class}: #{e.message}")
    raise
  end

  def test_send_in_blue_account
    begin
      #Get your account informations, plans and credits details
      result = SibApiV3Sdk::AccountApi.new.get_account

      templates_results = SibApiV3Sdk::SMTPApi.new.get_smtp_templates
      templates_results.templates.each do |t|
        print "id=#{t.id} name=#{t.name}\n"
      end

    rescue SibApiV3Sdk::ApiError => e
      puts "Exception when calling AccountApi->get_account: #{e}"
    end
  end

  def test_send_in_blue_send to
    send_in_blue_send({to: to, from_email: 'pete@timelight.com'})
  end

  def send_in_blue_send(params={})

    # TODO: convert template name into id

    send_email = SibApiV3Sdk::SendSmtpEmail.new sender: SibApiV3Sdk::SendSmtpEmailSender.new(email: params[:from_email], name: params[:from_name]), templateId: 1, params: params, to: [SibApiV3Sdk::SendSmtpEmailTo.new(email: params[:to_email])], subject: 'Test email'

    begin
      #Send a template
      result = SibApiV3Sdk::SMTPApi.new.send_transac_email(send_email)
      p result
    rescue SibApiV3Sdk::ApiError => e
      puts "Exception when calling SMTPApi->send_in_blue_send: #{e}"
    end


  end

  def perform(opts)

    # passing opts through Sidekiq stringifys keys
    opts.symbolize_keys!

    # mandrill_send opts
    if opts[:mailer] = 'send_in_blue'
      send_in_blue_send opts
    elsif opts[:mailer] = 'mandrill'
      raise 'Unknown mailer in EmailWorker'
    end
  end
end
