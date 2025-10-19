module Api
  class BaseController < ActionController::Base
    before_action :authenticate_user!
    skip_before_action :verify_authenticity_token

    private

    def current_user
      @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
    end

    def authenticate_user!
      unless current_user
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  end
end
