jon = Player.create(username:"jonathon")
steve = Player.create(username:"steave")
kyle = Player.create(username:"kale", wins: 5, losses: 40, points: 11)
timmy = Player.create(username:"timmeh", wins: 10, losses: 1, points: 100)
wendy = Player.create(username:"demonslayer69", wins: 420, points: 4200)



game_1 = Game.create(player_1_id: 3, player_2_id: 5, p1_score: 3, p2_score: 10, winner: 5)
game_2 = Game.create(player_1_id: 4, player_2_id: 3, p1_score: 2, p2_score: 10, winner: 3)
game_3 = Game.create(player_1_id: 4, player_2_id: 5, p1_score: 0, p2_score: 10, winner: 5)
game_4 = Game.create(player_1_id: 5, player_2_id: 3, p1_score: 10, p2_score: 9, winner: 5)
game_5 = Game.create(player_1_id: 3, player_2_id: 4, p1_score: 6, p2_score: 10, winner: 4)