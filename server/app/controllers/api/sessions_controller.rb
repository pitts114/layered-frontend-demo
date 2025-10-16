module Api
  class SessionsController < Api::BaseController
    skip_before_action :authenticate_user!, only: [ :create ]

    def create
      user = User.find_by(email: params[:email])

      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        render json: { message: "Logged in successfully", user: { id: user.id, email: user.email } }, status: :ok
      else
        render json: { error: "Invalid email or password" }, status: :unauthorized
      end
    end

    def destroy
      session[:user_id] = nil
      render json: { message: "Logged out successfully" }, status: :ok
    end
  end
end
