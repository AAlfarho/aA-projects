require 'json'

class Session

  COOKIE_ID = "_rails_lite_app"

  # find the cookie for this app
  # deserialize the cookie into a hash
  def initialize(req)
    @session = Hash.new { |k,v| k[v] = []}
    cookie = req.cookies[COOKIE_ID]
    if cookie
      parsed_cookie = JSON.parse(cookie)
      parsed_cookie.keys.each do |k|
        self[k] = parsed_cookie[k]
      end

    end
  end

  def [](key)
    @session[key]
  end

  def []=(key, val)
    @session[key] = val
  end

  # serialize the hash into json and save in a cookie
  # add to the responses cookies
  def store_session(res)
    res.set_cookie(COOKIE_ID,@session.to_json)
  end
end
