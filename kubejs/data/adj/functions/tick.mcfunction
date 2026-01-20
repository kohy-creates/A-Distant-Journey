 execute as @a[tag=adj.qd_can_reset,advancements={the_bumblezone:the_queens_desire/journeys_end=false}] run function adj:queens_desire_reset

# I am running so few datapacks that I won't even bother with doing stuff like adj.marker
execute as @e[type=marker] at @s run function adj:as_markers

execute as @e[type=item,predicate=adj:item_on_botania_plate,tag=!adj.lasts_longer] run function adj:items_last_longer_on_botania_plates
