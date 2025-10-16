require "rails_helper"

RSpec.describe "Api::Sessions", type: :request do
  let(:user) { User.create!(email: "test@example.com", password: "password123") }

  describe "POST /api/login" do
    context "with valid credentials" do
      it "logs in the user and returns success message" do
        post "/api/login", params: { email: user.email, password: "password123" }

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response["message"]).to eq("Logged in successfully")
        expect(json_response["user"]["id"]).to eq(user.id)
        expect(json_response["user"]["email"]).to eq(user.email)
      end

      it "sets the session user_id" do
        post "/api/login", params: { email: user.email, password: "password123" }

        expect(session[:user_id]).to eq(user.id)
      end

      it "allows subsequent authenticated requests" do
        post "/api/login", params: { email: user.email, password: "password123" }
        get "/api/me"

        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid email" do
      it "returns unauthorized status" do
        post "/api/login", params: { email: "wrong@example.com", password: "password123" }

        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)
        expect(json_response["error"]).to eq("Invalid email or password")
      end

      it "does not set the session" do
        post "/api/login", params: { email: "wrong@example.com", password: "password123" }

        expect(session[:user_id]).to be_nil
      end
    end

    context "with invalid password" do
      it "returns unauthorized status" do
        post "/api/login", params: { email: user.email, password: "wrongpassword" }

        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)
        expect(json_response["error"]).to eq("Invalid email or password")
      end

      it "does not set the session" do
        post "/api/login", params: { email: user.email, password: "wrongpassword" }

        expect(session[:user_id]).to be_nil
      end
    end

    context "with missing parameters" do
      it "handles missing email" do
        post "/api/login", params: { password: "password123" }

        expect(response).to have_http_status(:unauthorized)
      end

      it "handles missing password" do
        post "/api/login", params: { email: user.email }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "DELETE /api/logout" do
    before do
      post "/api/login", params: { email: user.email, password: "password123" }
    end

    it "logs out the user and returns success message" do
      delete "/api/logout"

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response["message"]).to eq("Logged out successfully")
    end

    it "clears the session user_id" do
      delete "/api/logout"

      expect(session[:user_id]).to be_nil
    end

    it "prevents authenticated requests after logout" do
      delete "/api/logout"
      get "/api/me"

      expect(response).to have_http_status(:unauthorized)
    end
  end
end
