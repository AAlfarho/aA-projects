class ApplicationController < ActionController::Base

  helper_method :current_user, :logged_in?, :flash_class
  #protect_from_forgery with: :exception

  def login!(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout!
    user = current_user
    if user
      current_user.reset_session_token!
      session[:session_token] = nil
      redirect_to root_url
    end
  end

  def logged_in?
    !!current_user
  end

  def current_user
    User.find_by(session_token: session[:session_token])
  end

  def user_params
    params.require(:user).permit(:email, :password, :username)
  end

  def band_params
    params.require(:band).permit(:name)
  end

  def flash_class(level)
    case level
    when 'notice' then "alert alert-info"
    when 'success' then "alert alert-success"
    when 'error' then "alert alert-danger"
    when 'alert' then "alert alert-warning"
    end
  end

end
