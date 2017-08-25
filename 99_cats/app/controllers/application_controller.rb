class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  helper_method :current_user, :log_out, :fetch_log_in

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def user_params
    params.require(:user).permit(:user_name, :password)
  end

  def log_out
    user = current_user
    if user
      user.reset_session_token!
      session[:session_token] = nil
      redirect_to root_url
    end
  end

  def fetch_log_in
    redirect_to sessions_url
  end

  def log_in!
    session[:session_token] = @user.reset_session_token!
    redirect_to root_url
  end

  def already_logged
    redirect_to root_url if current_user
  end

end
