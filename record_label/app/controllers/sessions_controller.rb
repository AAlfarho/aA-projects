class SessionsController < ApplicationController

  def new
    ## Fetch login form
    @user = User.new
    render :new
  end

  def create
    ##log the user in
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user
      login!(@user)
      redirect_to root_url
    else
      @user = User.new
      flash[:error] = "Invalid user/password."
      render :new
    end
  end

  def destroy
    logout!
  end

end
