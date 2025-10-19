class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }

  before_save :downcase_email

  private

  def downcase_email
    self.email = email.downcase if email.present?
  end
end
