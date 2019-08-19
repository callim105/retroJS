class Game < ApplicationRecord
    belongs_to :player_1, :class_name => "Player"
    belongs_to :player_2, :class_name => "Player"
    has_many :players
end
