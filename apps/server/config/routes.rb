require "sidekiq/web"

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Sidekiq Web UI
  mount Sidekiq::Web => "/sidekiq"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  namespace :api do
    # User registration
    post "register", to: "users#create"

    # Session routes
    get "login", to: "sessions#new", as: :login
    post "login", to: "sessions#create"
    delete "logout", to: "sessions#destroy", as: :logout

    # Current user info
    get "me", to: "users#show"

    # Factory routes (only available in development and test environments)
    if Rails.env.development? || Rails.env.test?
      post "factory/create_user", to: "factory#create_user"
      post "factory/generate_email", to: "factory#generate_email"
    end
  end

  # Defines the root path route ("/")
  # root "posts#index"
end
