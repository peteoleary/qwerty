class UsersController < ApiController

  # NOTE: POST /users should be the only endpoint here (or /patients, /doctors and
  # /therapists) that does not require a token to authenticate

  skip_before_action :authenticate_user!, only: [:create]

  def scope
    User
  end

  def index
    raise 'Not allowed'
  end

  protected

  # Only allow a trusted parameter "white list" through.
  def allow_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :skip_password_validation, :password_reset_token, :redirect_url)
  end
end
