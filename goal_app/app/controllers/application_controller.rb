class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :logged_in?, :current_user

  def login!(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout!
    if logged_in?
      current_user.reset_session_token!
      session[:session_token] = nil
      redirect_to new_session_url
    end
  end

  def current_user
    User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
