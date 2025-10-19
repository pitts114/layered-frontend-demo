require "rails_helper"

RSpec.describe "Api::Users", type: :request do
  describe "POST /api/register" do
    context "with valid parameters" do
      let(:valid_params) do
        {
          user: {
            email: "newuser@example.com",
            password: "password123",
            password_confirmation: "password123"
          }
        }
      end

      it "creates a new user" do
        expect {
          post "/api/register", params: valid_params
        }.to change(User, :count).by(1)
      end

      it "returns created status" do
        post "/api/register", params: valid_params

        expect(response).to have_http_status(:created)
      end

      it "returns success message and user data" do
        post "/api/register", params: valid_params

        json_response = JSON.parse(response.body)
        expect(json_response["message"]).to eq("User registered successfully")
        expect(json_response["user"]["email"]).to eq("newuser@example.com")
        expect(json_response["user"]["id"]).to be_present
        expect(json_response["user"]["created_at"]).to be_present
      end

      it "does not return sensitive information" do
        post "/api/register", params: valid_params

        json_response = JSON.parse(response.body)
        expect(json_response["user"]).not_to have_key("password")
        expect(json_response["user"]).not_to have_key("password_digest")
      end

      it "automatically logs in the user" do
        post "/api/register", params: valid_params

        expect(session[:user_id]).to eq(User.last.id)
      end

      it "allows authenticated requests after registration" do
        post "/api/register", params: valid_params
        get "/api/me"

        expect(response).to have_http_status(:ok)
      end

      it "downcases the email before saving" do
        params_with_uppercase = {
          user: {
            email: "NEWUSER@EXAMPLE.COM",
            password: "password123"
          }
        }
        post "/api/register", params: params_with_uppercase

        json_response = JSON.parse(response.body)
        expect(json_response["user"]["email"]).to eq("newuser@example.com")
      end
    end

    context "with invalid parameters" do
      it "returns error when email is missing" do
        post "/api/register", params: { user: { password: "password123" } }

        expect(response).to have_http_status(:unprocessable_content)
        json_response = JSON.parse(response.body)
        expect(json_response["errors"]).to include(match(/Email can't be blank/))
      end

      it "returns error when password is too short" do
        post "/api/register", params: { user: { email: "test@example.com", password: "123" } }

        expect(response).to have_http_status(:unprocessable_content)
        json_response = JSON.parse(response.body)
        expect(json_response["errors"]).to include(match(/Password is too short/))
      end

      it "returns error when email is already taken" do
        User.create!(email: "existing@example.com", password: "password123")
        post "/api/register", params: { user: { email: "existing@example.com", password: "password123" } }

        expect(response).to have_http_status(:unprocessable_content)
        json_response = JSON.parse(response.body)
        expect(json_response["errors"]).to include(match(/Email has already been taken/))
      end

      it "does not create a user when validation fails" do
        expect {
          post "/api/register", params: { user: { email: "", password: "123" } }
        }.not_to change(User, :count)
      end

      it "does not set session when registration fails" do
        post "/api/register", params: { user: { email: "", password: "123" } }

        expect(session[:user_id]).to be_nil
      end
    end

    context "with missing user wrapper" do
      it "returns error when user params are not wrapped" do
        post "/api/register", params: { email: "test@example.com", password: "password123" }

        expect(response).to have_http_status(:bad_request)
      end

      it "does not create a user when params are not wrapped" do
        expect {
          post "/api/register", params: { email: "test@example.com", password: "password123" }
        }.not_to change(User, :count)
      end
    end
  end

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
