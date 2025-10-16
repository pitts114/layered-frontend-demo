require 'rails_helper'

RSpec.describe User, type: :model do
  it "creates a user" do
    expect { User.create!(email: "foo@bar.com", password: "password") }.to change { User.count }.by(1)
  end
end
