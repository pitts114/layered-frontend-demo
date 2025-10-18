module Api
  class UsersController < Api::BaseController
    skip_before_action :authenticate_user!, only: [ :create ]

    def create
      user = User.create!(user_params)

      session[:user_id] = user.id

      render json: {
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at
        }
      }, status: :created
    rescue ActiveRecord::RecordInvalid => e
      render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    rescue ActionController::ParameterMissing => e
      render json: { error: e.message }, status: :bad_request
    end

    def show
      render json: {
        id: current_user.id,
        email: current_user.email,
        created_at: current_user.created_at
      }, status: :ok
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
  end
end
