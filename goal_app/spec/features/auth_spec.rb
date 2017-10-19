require 'spec_helper'
require 'rails_helper'

feature 'the signup process' do
  before(:each) do
    sign_up("user_a", "password")
  end

  feature 'has a new user page' do
    scenario 'renders new user template' do
      visit new_user_url
      expect(page).to have_content "Sign Up"
    end

    scenario 'takes a username and password' do
      visit new_user_url
      expect(page).to have_content "Username"
      expect(page).to have_content "Password"
    end
  end

  feature 'signing up a user' do
    scenario 'shows username on the homepage after signup' do
      expect(page).to have_content "user_a"
    end
  end
end

feature 'logging in' do
  scenario 'shows username on the homepage after login' do
    sign_up("user_a", "password")
    sign_out
    sign_in("user_a", "password")
    expect(page).to have_content "user_a"
  end

end

feature 'logging out' do
  before(:each) do
    sign_up("user_a", "password")
  end
  scenario 'begins with a logged out state' do
    sign_out
    expect(page).not_to have_content "user_a"
    sign_in("user_a", "password")
    expect(page).to have_content "user_a"
    expect(page).to have_button "Sign Out"
    sign_out
    expect(page).not_to have_content "user_a"
  end

  scenario 'doesn\'t show username on the homepage after logout' do
    sign_out
    expect(page).not_to have_content "user_a"
  end

end
