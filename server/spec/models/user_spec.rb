require "rails_helper"

RSpec.describe User, type: :model do
  describe "validations" do
    it "creates a valid user with email and password" do
      user = User.new(email: "test@example.com", password: "password123")
      expect(user).to be_valid
    end

    describe "email" do
      it "is required" do
        user = User.new(password: "password123")
        expect(user).not_to be_valid
        expect(user.errors[:email]).to include("can't be blank")
      end

      it "must be unique" do
        User.create!(email: "test@example.com", password: "password123")
        duplicate_user = User.new(email: "test@example.com", password: "password123")
        expect(duplicate_user).not_to be_valid
        expect(duplicate_user.errors[:email]).to include("has already been taken")
      end

      it "is case-insensitive for uniqueness" do
        User.create!(email: "test@example.com", password: "password123")
        duplicate_user = User.new(email: "TEST@EXAMPLE.COM", password: "password123")
        expect(duplicate_user).not_to be_valid
      end
    end

    describe "password" do
      it "is required" do
        user = User.new(email: "test@example.com")
        expect(user).not_to be_valid
        expect(user.errors[:password]).to include("can't be blank")
      end

      it "must be at least 6 characters" do
        user = User.new(email: "test@example.com", password: "short")
        expect(user).not_to be_valid
        expect(user.errors[:password]).to include("is too short (minimum is 6 characters)")
      end

      it "accepts passwords with 6 or more characters" do
        user = User.new(email: "test@example.com", password: "valid123")
        expect(user).to be_valid
      end
    end
  end

  describe "authentication" do
    let(:user) { User.create!(email: "test@example.com", password: "password123") }

    it "authenticates with correct password" do
      expect(user.authenticate("password123")).to eq(user)
    end

    it "does not authenticate with incorrect password" do
      expect(user.authenticate("wrongpassword")).to be false
    end

    it "does not authenticate with nil password" do
      expect(user.authenticate(nil)).to be false
    end

    it "does not authenticate with empty password" do
      expect(user.authenticate("")).to be false
    end
  end

  describe "password_digest" do
    it "stores password securely (not in plain text)" do
      user = User.create!(email: "test@example.com", password: "password123")
      expect(user.password_digest).not_to eq("password123")
      expect(user.password_digest).to be_present
    end

    it "changes when password is updated" do
      user = User.create!(email: "test@example.com", password: "password123")
      original_digest = user.password_digest
      user.update!(password: "newpassword456")
      expect(user.password_digest).not_to eq(original_digest)
    end
  end

  describe "creation" do
    it "increments user count" do
      expect {
        User.create!(email: "test@example.com", password: "password123")
      }.to change { User.count }.by(1)
    end

    it "sets timestamps" do
      user = User.create!(email: "test@example.com", password: "password123")
      expect(user.created_at).to be_present
      expect(user.updated_at).to be_present
    end
  end
end
