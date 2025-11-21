execute as @e[type=marker,tag=adj.eye_marker] at @s run function adj:eye/marker_loop
execute as @a[tag=adj.qd_can_reset,advancements={the_bumblezone:the_queens_desire/journeys_end=false}] run function adj:queens_desire_reset

execute as @e[type=item,predicate=adj:item_on_botania_plate,tag=!adj.lasts_longer] run function adj:items_last_longer_on_botania_plates
