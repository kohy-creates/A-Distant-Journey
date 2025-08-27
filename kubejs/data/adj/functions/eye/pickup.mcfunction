playsound adj:eye.collect master @a[distance=0..] ~ ~ ~ 3 1
playsound adj:eye.collect_bg master @a[distance=0..] ~ ~ ~ 3 1
playsound entity.ender_eye.death master @a[distance=0..] ~ ~ ~ 3 1

stopsound @a * adj:eye.loop

witherstormmod screenShake @a[distance=..32] 18t 4

execute positioned ~ ~1 ~ run function adj:eye/animations/wave
