module Api
  class FactoryController < Api::BaseController
    skip_before_action :authenticate_user!
    before_action :prevent_production_access

    def create_user
      # Generate defaults if params not provided using Faker
      user_params = {
        email: params[:email] || Faker::Internet.unique.email,
        password: params[:password] || Faker::Internet.password(min_length: 6)
      }

      # Store password before encryption for response
      plaintext_password = user_params[:password]

      user = User.create!(user_params)

      render json: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        password: plaintext_password
      }, status: :created
    end

    def generate_email
      email = Faker::Internet.unique.email
      render json: { email: email }, status: :ok
    end

    private

    def prevent_production_access
      if Rails.env.production?
        raise ActionController::RoutingError.new("Not Found")
      end
    end
  end
end
