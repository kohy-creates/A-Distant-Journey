execute positioned ~-13 ~-1 ~-12 run place template adj:summoning_altar ~ ~ ~ none
execute as @a[distance=..15] at @s rotated as @s run tp @s ~ ~2 ~ ~ ~

particle explosion_emitter ~ ~ ~ 1 1 1 0 3 force

playsound adj:summoning_altar_spawn block @a[distance=0..] ~ ~ ~ 3 0
playsound adj:eye.appear block @a[distance=0..] ~ ~ ~ 3 0.85
playsound adj:eye.appear_choir block @a[distance=0..] ~ ~ ~ 3 0.85
