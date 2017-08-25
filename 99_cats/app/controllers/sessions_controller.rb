class SessionsController < ApplicationController
  before_action :already_logged, only: [:new, :create]
  
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(user_params[:user_name], user_params[:password])
    if @user
      self.log_in!
    else
      @user = User.new(user_params)
      render :new
    end
  end

  def destroy
    self.log_out
  end


end
