particle explosion_emitter
particle netherexp:redstone_explosion_emitter

kill @e[type=marker,limit=1,sort=nearest,tag=adj.altar_anim]
kill @e[type=marker,limit=1,sort=nearest,tag=adj.altar_anim2]

playsound minecraft:item.trident.thunder block @a[distance=0..] ~ ~ ~ 2 1
