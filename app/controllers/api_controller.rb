class ApiController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :set_object, only: [:show, :update, :destroy]

  # NOTE: shut down unauthenticated access to ALL /api endpoints except a few
  # that are explicitly exposed such as POST /user
  before_action :authenticate_user!

  def filtered_scope
    if scope.method_defined? :user_id and current_user
      scope.where(user_id: current_user.id)
    else
      scope
    end
  end

  def index
    @objects = filtered_scope.all
    render json: @objects, params: allow_params
  end

  def show
    access_control can_show? do
      render json: @object
    end
  end


  def create
    @object = scope.new(allow_params)
    @object.user_id = current_user.id if @object.respond_to? 'user_id'
    render_new
  end

  def update
    access_control can_edit? do
      render_update allow_params
    end
  end

  # NOTE: the basic level of permission in ownership represented by user_id in some objects
  def can_show?
    can_edit?
  end

  def can_edit? 
    @object.respond_to?('user_id') && @object.user_id == current_user.id
  end

  def access_control which_permission, &block
    if which_permission
      yield
    else
      render json: {message: 'not allowed'}, status: 401
    end
  end

  def search
    @objects = filtered_scope.find_by(allow_params)
    render json: @objects
  end

  def destroy
    access_control can_edit? do
      @object.destroy
    end
  end

  protected

  def render_update update_params
    if @object.update!(update_params)
      render json: @object
    else
      render json: @object.errors, status: :unprocessable_entity
    end
  end

  def render_new
    if @object.save
      render json: @object, status: :created
    else
      render json: @object.errors, status: :unprocessable_entity
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_object
    @object = scope.find(params[:id])
  end

  def allow_params
    nil
  end
end
