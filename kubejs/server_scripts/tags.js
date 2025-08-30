ServerEvents.tags('item', event => {

	event.add('adj:basic_furnaces', [
		'furnace',
		/quark\:.*_furnace/
	])

	event.add('adj:petal_apothecary', [
		/botania\:apothecary.*/
	])

	event.add('adj:horse_armor', [
		/.*horse_armor/
	])

	event.add('adj:clock', [
		'minecraft:clock',
		'mythicmetals:platinum_watch'
	])

	event.remove('forge:glass_panes/colorless', [
		'aether:quicksoil_glass_pane'
	])

	const silverTags = [
		'c:silver_ores',
		'c:silver_ingots',
		'c:silver_nuggets',
		'c:silver_blocks',
		'c:raw_silver_ores',
		'c:raw_silver_blocks',
	]
	silverTags.forEach(tag => {
		event.remove(tag, [/mythicmetals/])
	})

	// Reforges cause nothing is unified (ofc)
	// EDIT: Reforges are gone but tags like those are nice, so I'll keep them
	// Armor
	const types = [
		'helmet',
		'chestplate',
		'leggings',
		'boots'
	]
	types.forEach(type => {
		let str = type;
		if (!type.endsWith('s')) str = str + 's';
		event.add('adj:equipment/' + str, [
			new RegExp(type)
		])
		event.add('adj:reforges/armor', [
			'#adj:equipment/' + str
		])
	})
	// Bows
	event.add('adj:reforges/bows', [
		'bow',
		'crossbow',
		'additionaladditions:crossbow_with_spyglass',
		/botania\:.*_bow/,
		'aether:phoenix_bow',
		'aether_redux:subzero_crossbow',
		'cataclysm:cursed_bow',
		'alexscaves:dreadbow',

	])
	// Melee
	event.add('adj:reforges/melee', [
		/sword/,
		/knife/,
		/axe/,
		'trident'
	])
	// Shields
	event.add('adj:reforges/shields', [
		/shield/
	])

	event.removeAllTagsFrom(/mythicmetals:silver/)
	event.removeAllTagsFrom(/mythicmetals:raw_silver/)
	event.removeAllTagsFrom('farmersdelight:wheat_dough')
	event.removeAll('supplementaries:ropes')
	event.add('supplementaries:ropes', [
		'supplementaries:rope'
	])

	event.add('adj:any_map', [
		'map',
		'filled_map',
		'supplementaries:slice_map',
		'alexscaves:cave_map'
	])

	const removedItems = [
		"ars_nouveau:sorcerer_boots",
		"ars_nouveau:sorcerer_leggings",
		"ars_nouveau:sorcerer_robes",
		"ars_nouveau:sorcerer_hood",
		"ars_nouveau:battlemage_boots",
		"ars_nouveau:battlemage_leggings",
		"ars_nouveau:battlemage_robes",
		"ars_nouveau:battlemage_hood"
	]
	removedItems.forEach(item => {
		event.removeAllTagsFrom(item)
	})

	event.add('adj:alloy_forge', [
		'alloy_forgery:adamantite_forge_casing_forge_controller',
		'alloy_forgery:cracked_deepslate_bricks_forge_controller',
		'alloy_forgery:cracked_stone_bricks_forge_controller',
		'alloy_forgery:ender_forge_casing_forge_controller',
		'alloy_forgery:nether_bricks_forge_controller',
	])

	event.add('adj:alloy_forge_casing', [
		/adj\:.*casing/
	])

	event.add('adj:music_disc', [
		/.*\:music_disc_/,
		'etched:etched_music_disc',
		'supplementaries:pancake',
		/botania\:record_/,
		'born_in_chaos_v1:anluka_doors',
		'born_in_chaos_v1:serpumpkinhead_m',
		'aether_redux:ancient_sentrite_music_disc'
	])
})

ServerEvents.tags('block', event => {

	event.remove('minecraft:needs_stone_tool', [
		'minecraft:copper_ore',
		'minecraft:deepslate_copper_ore'
	])
	event.add('minecraft:needs_wooden_tool', [
		'minecraft:copper_ore',
		'minecraft:deepslate_copper_ore'
	])
	event.add('adj:stone', [
		"minecraft:andesite",
		"minecraft:diorite",
		"minecraft:granite",
		"minecraft:stone",
		"minecraft:deepslate",
		"minecraft:tuff",
		"unusualend:raw_purpur_block",
		"unusualend:warped_stone",
		"minecraft:infested_stone",
		"minecraft:polished_andesite",
		"minecraft:polished_diorite",
		"minecraft:polished_granite",
		"minecraft:polished_deepslate",
		"minecraft:infested_deepslate",
		"quark:jasper",
		"quark:limestone",
		"quark:permafrost",
		"quark:shale",
		"quark:myalite",
		"quark:polished_jasper",
		"quark:polished_limestone",
		"quark:polished_calcite",
		"quark:polished_shale",
		"quark:polished_myalite",
	])

	event.add('forge:needs_netherite_tool', [
		/waystones\:/
	])

	event.remove('minecraft:mineable/axe', [
		/aquamirae\:painting\_/
	])

	event.remove('minecraft:mineable/pickaxe', [
		'ecologics:pot'
	])

	event.add('adj:alloy_forge', [
		'alloy_forgery:cracked_stone_bricks_forge_controller',
		'alloy_forgery:cracked_deepslate_bricks_forge_controller',
		'alloy_forgery:nether_bricks_forge_controller',
		'alloy_forgery:adamantite_forge_casing_forge_controller',
		'alloy_forgery:ender_forge_casing_forge_controller'
	])

	event.add('adj:alloy_forge_casing', [
		/adj\:.*casing/
	])

	event.add('minecraft:needs_iron_tool', [
		/deepslate/
	])

	event.remove('minecraft:mineable/axe', [
		/grass/,
		/fern/
	])
})

ServerEvents.tags('entity_type', event => {
})

ServerEvents.tags('damage_type', event => {
	event.add('adjcore:bypasses_cooldown', [
		'botania:relic_damage',
		'botania:player_attack_armor_piercing',
		'botania:key_explosion',
		'ars_nouveau:spell',
	])

	event.remove('adjcore:bypasses_cooldown', [
		/cataclysm/
	])

	event.add('adjcore:dot', [
		'majruszsdifficulty:bleeding',
		'ars_elemental:poison',
		'ars_elemental:hellfire'
	])

	event.add('adj:magic', [
		'ars_nouveau:spell',
		'ars_nouveau:crush',
		'#minecraft:witch_resistant_to'
	])
	event.add('dummmmmmy:is_cold', [
		'ars_nouveau:frost',
		'aether:ice_crystal'
	])
	event.add('dummmmmmy:is_explosion', [
		'supplementaries:bomb_explosion'
	])
	event.add('dummmmmmy:is_fire', [
		'ars_nouveau:flare',
		'ars_elemental:hellfire',
		'aether:fire_crystal'
	])
	event.add('dummmmmmy:is_thorn', [
		'ars_elemental:poison'
	])
	event.add('dummmmmmy:is_wither', [
		'attributeslib:current_hp_damage'
	])
})

ServerEvents.tags('worldgen/structure', event => {
	event.add('adj:locator/bronze_dungeon', [
		'aether:bronze_dungeon'
	])
	event.add('adj:locator/silver_dungeon', [
		'aether:silver_dungeon'
	])
	event.add('adj:locator/gold_dungeon', [
		'aether:gold_dungeon'
	])
	event.add('adj:locator/platinum_dungeon', [
		'lost_aether_content:platinum_dungeon'
	])
}) 