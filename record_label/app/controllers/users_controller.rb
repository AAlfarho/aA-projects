class UsersController < ApplicationController

  def new
    ## Fetch sign up form
    @user = User.new
    render :new
  end

  def create
    ##create a user
    @user = User.new(user_params)
    if @user.save
      ## user was successfully created, log the user in
      login!(@user)
      redirect_to user_url(@user)
    else
      flash[:error] = @user.errors.full_messages
      render :new
    end
  end

  def destroy
    ## destroy a user
    self.destroy!
  end

  def show
    @user = User.find(params[:id])
    render :show
  end
end
