module Api
  class UsersController < Api::BaseController
    def show
      render json: {
        id: current_user.id,
        email: current_user.email,
        created_at: current_user.created_at
      }, status: :ok
    end
  end
end
