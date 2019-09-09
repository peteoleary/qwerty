ActiveAdmin.register User do

  permit_params :first_name, :last_name, :phone, :email

  form do |f|
    f.inputs do
      f.input :first_name
      f.input :last_name
      f.input :phone
      f.input :email
    end
    f.actions
  end

  controller do
    # This code is evaluated within the controller class

    def create
      @user = User.new(permitted_params[:user])
      if @user.save
        redirect_to admin_users_path, notice: 'Success!'
      else
        redirect_to admin_users_path, alert: 'Fail!'
      end
    end
  end

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

end
