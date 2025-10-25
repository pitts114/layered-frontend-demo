module Api
  class SessionsController < Api::BaseController
    skip_before_action :authenticate_user!, only: [ :create ]

    def create
      user = User.find_by(email: session_params[:email])

      if user&.authenticate(session_params[:password])
        session[:user_id] = user.id
        render json: { message: "Logged in successfully", user: { id: user.id, email: user.email } }, status: :ok
      else
        render json: { error: "Invalid email or password" }, status: :unauthorized
      end
    rescue ActionController::ParameterMissing => e
      render json: { error: e.message }, status: :bad_request
    end

    def destroy
      session[:user_id] = nil
      render json: { message: "Logged out successfully" }, status: :ok
    end

    private

    def session_params
      params.permit(:email, :password)
    end
  end
end
