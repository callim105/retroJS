class PlayersController < ApplicationController
    
    def create
        player = Player.create
    end
end
