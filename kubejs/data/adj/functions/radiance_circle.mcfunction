scoreboard players add #wave adj.misc 1
execute rotated ~3.6 0 positioned ^ ^0.1 ^1.5 rotated ~ -10 run particle aquamirae:shine ^ ^ ^ ^ ^ ^10000000000000 0.0000000000002 0 force @a[distance=..48]
execute rotated ~1.8 0 run particle dust_color_transition 1 0.8 0.243 1.2 1 0.898 0.443 ^ ^0.1 ^4.5 0 0 0 0 1 force @a[distance=..48]
execute unless score #wave adj.misc matches 100.. rotated ~3.6 ~ run function adj:radiance_circle
execute if score #wave adj.misc matches 100.. run scoreboard players reset #wave adj.misc
