class GamesController < ApplicationController
    def index
        games = Game.all
        render json: games, include: [:player_1,:player_2]
    end

    def show
        game = Game.find_by(id: params[:id])
        render json: game, include: [:player_1,:player_2]
    end

    def create
        game = Game.create(player_1_id: params[:player_1_id], player_2_id: params[:player_2_id])

        render json: game, include: [:player_1, :player_2]
    end

    def update
        game = Game.find_by(id: params[:id])
        game.update(p1_score: params[:p1_score], p2_score: params[:p2_score], winner: params[:winner])

        render json: game, include: [:player_1, :player_2]
    end

end
