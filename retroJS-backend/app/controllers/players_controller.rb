class PlayersController < ApplicationController
    def index
        players = Player.all
        render json: players
    end

    def show
        player = Player.find_by(id: params[:id])
        render json: player
    end
    
    def create
        player = Player.find_or_create_by(username: params[:username])
        render json: player
    end

    def update
        player = Player.find_by(id: params[:id])
        player.update(wins: params[:wins], losses: params[:losses], points: params[:points])
        render json: player      
    end
end
