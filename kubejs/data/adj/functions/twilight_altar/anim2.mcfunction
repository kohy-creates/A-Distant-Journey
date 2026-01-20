scoreboard players add @s adj.misc 1

tp @s ~ ~ ~ ~-1 ~

# scoreboard players add @s adj.misc2 1
# execute if score @s adj.misc2 matches 3.. run function adj:twilight_altar/circle
# execute if score @s adj.misc2 matches 3.. run scoreboard players reset @s adj.misc2

particle end_rod ^ ^0.25 ^5
particle end_rod ^ ^0.25 ^-5
particle end_rod ^5 ^0.25 ^
particle end_rod ^-5 ^0.25 ^
