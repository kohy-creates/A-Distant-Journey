scoreboard players add @s adj.misc 1

tp @s ~ ~ ~ ~1 ~

scoreboard players add @s adj.misc2 1
execute if score @s adj.misc2 matches 3.. run particle cataclysm:spark ~ ~0.8 ~ 0 0 0 0.15 1 force @a[distance=..64]
execute if score @s adj.misc2 matches 3.. run scoreboard players reset @s adj.misc2

particle end_rod ^ ^0.25 ^3.5
particle end_rod ^ ^0.25 ^-3.5
particle end_rod ^3.5 ^0.25 ^
particle end_rod ^-3.5 ^0.25 ^

particle minecraft:enchant ~ ~ ~ 0 0 0 10 4 normal

particle adjcore:shimmer ~ ~0.05 ~ 4 0 4 0 1 normal
