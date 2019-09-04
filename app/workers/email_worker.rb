require 'mandrill'

class EmailWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'qwerty_email'

  def initialize
    @mandrill = Mandrill::API.new ENV['MANDRILL_API_KEY']
  end


  def mandrill_send(opts={})

    # passing opts through Sidekiq stringifys keys
    opts.symbolize_keys!

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
      Rails.logger.warn("#{sending}")
    end

  rescue Mandrill::Error => e
    Rails.logger.debug("#{e.class}: #{e.message}")
  end

  def perform(opts)
    mandrill_send opts
  end
end
