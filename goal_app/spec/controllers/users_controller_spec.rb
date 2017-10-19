require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "GET #new" do
    it "renders new template" do
      get :new
      expect(response).to render_template(:new)
      expect(response).to have_http_status(200)
    end
  end

  describe "GET #create" do
    context "invalid params" do
      it "shows errors when password to short" do
        post :create, params: { user: { username: 'test', password: 'short'}}
        expect(flash[:errors]).not_to be_empty
      end

      it "renders new template after unsuccesfull creation" do
        post :create, params: { user: { username: 'test', password: 'short'}}
        expect(response).to render_template(:new)
      end

    end


    context "valid params" do
      it "does not displays errors" do
        post :create, params: { user: { username: 'test', password: 'password'}}
        expect(flash[:errors]).to be_nil
      end

      it "redirects to root" do
        post :create, params: { user: { username: 'test', password: 'password'}}
        expect(response).to redirect_to(new_session_url)
      end
    end
  end

end
