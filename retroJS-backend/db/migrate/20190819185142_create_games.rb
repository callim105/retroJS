class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.references :player_1
      t.references :player_2
      t.integer :p1_score
      t.integer :p2_score
      t.integer :winner
      t.timestamps
    end
  end
end
