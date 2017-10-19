require 'rails_helper'
require 'spec_helper'

feature 'Goal#NEW' do
  context "when logged out" do
    scenario 'redirects to the login page' do
      visit goals_url
      expect(page).to have_content 'Sign In'
    end
  end

  context "when logged in" do
    before(:each) do
      sign_up_user_a
      visit goals_url
      click_on('Add Goal')
    end

    context "with invalid params" do
      scenario "show error" do
        create_goal("", "my default description", false, false)
        expect(page).to have_content "Title can't be blank"
      end
      scenario "saves the form state" do
        expect(page).to have_content "my default description"
      end
    end

    context "with valid params" do
      scenario "redirects to show goal" do
        create_goal("my default goal", "my default description", false, false)
        expect(flash[:errors]).to be_nil
        expect(page).to have_content "My default goal"
      end
    end

  end
end

feature "Seeing goals" do
  context "when logged out" do
    scenario 'redirects to the login page' do
      visit goals_url
      expect(page).to have_content 'Sign In'
    end
  end

  context "when logged in" do
    ##localhost/goals/
    context "global goals" do
      before(:each) do
        create_users_and_goals
      end
      scenario "does not show other user's private goals" do
        expect(page).not_to have_content "My private goal"
      end
      scenario "shows recenlty created goal" do
        expect(page).to have_content "My public goal"
      end
    end

    ##localhost/user/:id/goals
    context "user specific goals" do
      scenario "does not show other user's private goals" do
        expect(page).not_to have_content "My private goal"
      end
      scenario "shows recenlty created goal" do
        expect(page).to have_content "My other user private goal"
      end
    end
  end

end

feature "showing a goal" do
  before(:each) do
    create_users_and_goals
  end
  context "when logged out" do
    scenario 'redirects to the login page' do
      sign_out
      visit goals_url
      expect(page).to have_content 'Sign In'
    end
  end

  context "when logged in" do
    scenario "cant access other people private goals" do
      private_goal = Goal.find_by(title: 'My private goal')
      visit goal_url(private_goal)
      expect(page).not_to have_content "My private goal"
    end
    scenario "shows goal" do
      user_private_goal = Goal.find_by(title: 'My private goal').id
      visit goal_url(user_private_goal)
      expect(page).to have_content "My other user private goal"
    end
  end

end

feature "editing a goal" do
  before(:each) do
    create_users_and_goals
  end
  context "when logged out" do
    scenario 'redirects to the login page' do
      sign_out
      visit goal_url(Goal.last)
      expect(page).to have_content 'Sign In'
    end
  end

  context "when logged in" do
    context "when the goal does not belongs to the user" do
      scenario "redirect to goals index" do
        private_goal = Goal.find_by(title: 'My private goal')
        visit goals_url(private_goal)
        expect(page).to have_content "Cant access resource"
      end
    end

    context "when the goal belongs_to the user" do
      scenario "shows edit form" do
        user_owned_goal = User.last.goals.last
        visit goals_url(user_owned_goal)
        expect(page).to have_content "My other user private goal"
      end
    end
  end

end

feature "updating a goal" do
  before(:each) do
    create_users_and_goals
  end

  context "when logged out" do
    scenario 'redirects to the login page' do
      sign_out
      visit edit_goal_url(Goal.last)
      expect(page).to have_content 'Sign In'
    end
  end

  context "when logged in" do
    context "with invalid params" do
      before(:each) do
        visit edit_goal_url(Goal.last)
        fill_in "Title", with: ""
        fill_in "Description", with: "New and updated description"
        click_button "Update Goal"
      end
      scenario "shows errors on the page" do
        expect(page).to have_content "Title can't be blank"
      end
      scenario "saves the form state" do
        expect(find_field('Description').value).to eq("New and updated description")
      end


    context "with valid params" do
      before(:each) do
        visit edit_goal_url(Goal.last)
        fill_in "Title", with: "New updated title"
        fill_in "Description", with: "New and updated description"
        click_button "Update Goal"
      end
      scenario "no errors found" do
        expect(flash[:errors]).to be_nil
      end
      scenario "shows updated goal" do
        expect(page).to have_content "New updated title"
        expect(page).to have_content "New and updated description"
      end
    end
    end
  end
end
