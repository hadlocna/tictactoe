class CreateUsersGames < ActiveRecord::Migration
  def change
    create_table :users_games do |t|
      t.belongs_to :user
      t.belongs_to :game
    end
  end
end
