enable :sessions

get '/' do
  erb :index
end

get '/play/:game_id/:user_id' do
  #user = User.find(params[:user_id])

  if session[:game_id] != nil
    puts "if"
    @game = Game.find(session[:game_id])
  else
    puts "else"
    @game = Game.find(params[:game_id])
    @game.users << User.find(session[:user_id]) 
    session[:game_id] = params[:game_id]
  end

  erb :game
end

get '/lobby' do
  session[:game_id] = nil
  @games = Game.all.select { |game| game.users.count < 2 }
  puts session[:game_id]
  erb :lobby
end

post '/games/create' do
  user = User.find(session[:user_id])
  game = user.games.create!
  session[:game_id] = game.id
  redirect to "/play/#{game.id}/#{user.id}"
end

post '/users/create' do
  user = User.create!(:username => params[:username])
  session[:user_id] = user.id
  redirect to '/lobby'
end

post '/pid' do
  puts params
  game = Game.find(session[:game_id])
  game.update_attributes(:pid => params[:pid])
end
