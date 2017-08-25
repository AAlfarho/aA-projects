class UsersController < ApplicationController

  before_action :already_logged
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      self.log_in!
    else
      render :new
    end
  end

end
