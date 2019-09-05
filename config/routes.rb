Rails.application.routes.draw do
  scope '/api' do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    }
    resources :users
  end

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #

  require 'sidekiq/web'
  mount Sidekiq::Web => '/admin/sidekiq'

  get '/', to: proc { [200, {}, ['']] }

end
