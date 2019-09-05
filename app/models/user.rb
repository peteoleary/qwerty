# frozen_string_literal: true

class User < ActiveRecord::Base

  include DeviseTokenAuth::Concerns::User


  # Include default devise modules. Others available are:
  # and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable, :timeoutable,
         :recoverable, :rememberable, :trackable, :validatable, :lockable

  def reset_password_token
    raw, enc = Devise.token_generator.generate(self.class, :reset_password_token)

    self.reset_password_token   = enc
    self.reset_password_sent_at = Time.now.utc
    self.save(validate: false)

    raw
  end

  attr_accessor :skip_password_validation  # virtual attribute to skip password validation while saving

  protected

  # this overrides the method in DeviseTokenAuth::Concerns::User
  def password_required?
    return false if skip_password_validation
    super
  end

  # turn access off and on, you can change allow_unconfirmed_access_for in config/initializers/devise.rb
  def confirmation_required?
    true
  end

end
