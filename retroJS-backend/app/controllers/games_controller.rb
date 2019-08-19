class GamesController < ApplicationController
    def index
        games = Game.all
        render json: games, include: [:player_1,:player_2]
    end

    def create
        game = Game.create
    end

end
