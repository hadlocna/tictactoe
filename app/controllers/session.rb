get '/login' do
  erb :login
end

get '/register' do
  erb :register
end

post '/login' do
  user = User.find_by_username(params[:user][:username])
  if !user.nil?
    auth_user = user.authenticate(params[:user][:password])
    if auth_user
      session[:user_id] = auth_user.id
      redirect '/'
    else
      @errors = ["Password incorrect"]
      erb :login
    end
  else
    @errors = ["Email not found"]
    erb :login
  end
end

post '/register' do
  user = User.create(params[:user])
  if user.valid?
    session[:user_id] = user.id
    redirect '/'
  else
    @errors = user.errors.full_messages
    erb :register
  end
end

get '/logout' do
  session.clear
  redirect '/'
end
