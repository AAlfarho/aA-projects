# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string
#  password_digest :string
#  session_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user_a) { User.create!(username: 'user_1', password: 'password') }
  describe "modal validations" do
    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_presence_of(:session_token)}
    it { should validate_length_of(:password).is_at_least(6) }
  end

  describe "::find_by_credentials" do
    it "looks with incorrect credentials" do
      expect(User.find_by_credentials("user_1", "incorrect")).to be_nil
    end

    it "looks with correct credentials" do
      expect(User.find_by_credentials(user_a.username, "password")).not_to be_nil
    end
  end

end
