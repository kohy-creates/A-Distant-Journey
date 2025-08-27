scoreboard players add @s adj.misc 1

execute if score @s adj.misc matches 30 run function adj:eye/animations/start

execute if score @s adj.misc matches 30..120 run particle portal ~ ~ ~ 0 0 0 7 5 force @a[distance=..32]
execute if score @s adj.misc matches 120 run particle portal ~ ~ ~ 0 0 0 12 300 force @a[distance=..32]

execute if score @s adj.misc matches 160 run function adj:eye/animations/appear

execute if score @s adj.misc matches 160.. run function adj:eye/sound_loop
execute if score @s adj.misc matches 160.. unless entity @e[type=item,distance=..0.5] run kill @s
