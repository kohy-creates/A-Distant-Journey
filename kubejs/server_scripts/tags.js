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
		'@too_many_bows'

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

	// event.add('adj:smoking_items', [
	// 	'baked_potato',
	// 	/\:baked\_/,
	// 	/boiled/,
	// 	'#forge:foods/meat/cooked',
	// 	/cooked_/,
	// 	'#alexscaves:gelatins',
	// 	'bread',
	// 	'farmersdelight:fried_egg',
	// 	/roasted/
	// ])

	event.add('adj:alloy_forge', [
		'adamantite_forge_casing_forge_controller',
		'cracked_deepslate_bricks_forge_controller',
		'cracked_stone_bricks_forge_controller',
		'ender_forge_casing_forge_controller',
		'nether_bricks_forge_controller',
	])

	event.add('adj:alloy_forge_casing', [
		/adj\:.*casing/
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
		'kubejs:hellforge',
		'kubejs:stone_brick_forge',
		'kubejs:deepslate_brick_forge',
		'kubejs:adamantite_forge',
		'kubejs:ender_forge'
	])

	event.add('adj:alloy_forge_casing', [
		/kubejs\:.*casing/
	])

	event.add('minecraft:needs_iron_tool', [
		/deepslate/
	])
})

ServerEvents.tags('entity_type', event => {

	event.add('adj:size_variation_mobs', [
		'skeleton',
		'wither_skeleton',
		'stray',
		'zombie',
		'drowned',
		'husk',
		'enderman',
		'creeper',
		'skeleton',
		'corpse_fish',
		'born_in_chaos_v1:decaying_zombie',
		'born_in_chaos_v1:decaying_zombie_not_despawn',
		'born_in_chaos_v1:decreipt_skeleton',
		'born_in_chaos_v1:door_knight',
		'born_in_chaos_v1:door_knight_not_despawn',
		'born_in_chaos_v1:dead_hound',
		'born_in_chaos_v1:dead_hound_not_despawn',
		// 'born_in_chaos_v1:phantom_creeper',
		// 'born_in_chaos_v1:phantom_creeper_copy',
		'born_in_chaos_v1:restless_spirit',
		'born_in_chaos_v1:skeleton_demoman',
		'born_in_chaos_v1:skeleton_thrasher',
		'born_in_chaos_v1:skeleton_thrasher_not_despawn',
		'born_in_chaos_v1:zombie_bruiser',
		'born_in_chaos_v1:zombie_fisherman',
		'born_in_chaos_v1:zombie_lumberjack',
		'#minecraft:raiders'
	]);
	event.remove('adj:size_variation_mobs', [
		'born_in_chaos_v1:missionary_raider'
	]);

	event.add('adj:fish', [
		'#tide:freshwater_fish',
		'#tide:saltwater_fish',
		'naturalist:bass',
		'upgrade_aquatic:perch',
		'upgrade_aquatic:pike',
		'upgrade_aquatic:nautilus',
		'upgrade_aquatic:box_jellyfish'
	])
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