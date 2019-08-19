class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.string :username
      t.integer :wins, default: 0
      t.integer :losses, default: 0
      t.integer :points, default: 0 
      t.timestamps
    end
  end
end
