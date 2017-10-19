class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    if @user
      login!(@user)
      redirect_to new_session_url
    else
      @user = User.new(user_params)
      flash[:errors] = ["Invalid username/password"]
      render :new
    end
  end

  def destroy
    logout!
  end
end
