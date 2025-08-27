
execute if predicate adj:eye_particle_chance run particle aquamirae:shine ~ ~ ~ 0.15 0.15 0.15 0.1 1 normal

scoreboard players add @s adj.eye_sound_loop 1

execute if score @s adj.eye_sound_loop matches 1 run playsound adj:eye.loop master @a[distance=0..] ~ ~ ~ 3 1
execute if score @s adj.eye_sound_loop matches 90 run scoreboard players reset @s adj.eye_sound_loop
