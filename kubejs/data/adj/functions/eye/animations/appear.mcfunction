playsound adj:eye.appear master @a[distance=0..] ~ ~ ~ 3 1
playsound adj:eye.appear_choir master @a[distance=0..] ~ ~ ~ 3 1

witherstormmod screenShake @a[distance=..32] 2s 20

particle flash ~ ~ ~ 0 0 0 0 1 force @a[distance=..64]

execute if entity @s[tag=adj.eye_of_cinders] run summon item ~ ~ ~ {Item:{id:"kubejs:eye_of_cinders",Count:1b},Age:-32768,NoGravity:1b,Glowing:1b}
execute if entity @s[tag=adj.eye_of_angels] run summon item ~ ~ ~ {Item:{id:"kubejs:eye_of_angels",Count:1b},Age:-32768,NoGravity:1b,Glowing:1b}
execute if entity @s[tag=adj.eye_of_dreams] run summon item ~ ~ ~ {Item:{id:"kubejs:eye_of_dreams",Count:1b},Age:-32768,NoGravity:1b,Glowing:1b}
execute if entity @s[tag=adj.eye_of_desolation] run summon item ~ ~ ~ {Item:{id:"kubejs:eye_of_desolation",Count:1b},Age:-32768,NoGravity:1b,Glowing:1b}

execute if entity @s[tag=adj.eye_of_desolation] run particle cataclysm:shock_wave ~ ~ ~ 0 0 0 0 1 force @a[distance=..64]


function adj:eye/animations/wave
