scoreboard players add #wave adj.misc 1
execute rotated ~2.5 0 run particle end_rod ^ ^ ^ ^ ^ ^10000000000000 0.0000000000001 0 normal
execute rotated ~3.75 0 run particle end_rod ^ ^ ^ ^ ^ ^10000000000000 0.00000000000005 0 normal
execute unless score #wave adj.misc matches 144.. rotated ~2.5 ~ run function adj:eye/animations/wave
execute if score #wave adj.misc matches 144.. run scoreboard players reset #wave adj.misc
