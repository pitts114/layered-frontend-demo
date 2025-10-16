require "rails_helper"

RSpec.describe "Api::Users", type: :request do
  describe "GET /api/me" do
    context "when user is authenticated" do
      let(:user) { User.create!(email: "test@example.com", password: "password123") }

      before do
        post "/api/login", params: { email: user.email, password: "password123" }
      end

      it "returns the current user's information" do
        get "/api/me"

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response["id"]).to eq(user.id)
        expect(json_response["email"]).to eq(user.email)
        expect(json_response["created_at"]).to be_present
      end

      it "returns user data in correct format" do
        get "/api/me"

        json_response = JSON.parse(response.body)
        expect(json_response.keys).to contain_exactly("id", "email", "created_at")
      end
    end

    context "when user is not authenticated" do
      it "returns unauthorized status" do
        get "/api/me"

        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)
        expect(json_response["error"]).to eq("Unauthorized")
      end

      it "does not return any user information" do
        get "/api/me"

        json_response = JSON.parse(response.body)
        expect(json_response).not_to have_key("id")
        expect(json_response).not_to have_key("email")
      end
    end

    context "when session has expired or is invalid" do
      it "returns unauthorized status" do
        # Simulate an invalid session by setting a non-existent user_id
        get "/api/me", params: {}, headers: { "Cookie" => "session=invalid_session_data" }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
