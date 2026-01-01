// 
// Item Tags
// 
ServerEvents.tags('item', tags => {

	tags.removeAllTagsFrom(global.blacklistedItems)

	tags.add('adj:vanity', [
		/etcetera:.*_hat/,
		/etcetera:.*_sweater/,
		/etcetera:trader_.*/,
		/botania:cosmetic_.*/,
		'supplementaries:enderman_head',
		'minecraft:creeper_head',
		'minecraft:player_head',
		'minecraft:zombie_head',
		'minecraft:skeleton_skull',
		'minecraft:dragon_head',
		'minecraft:piglin_head',
		'minecraft:wither_skeleton_skull',
		'the_bumblezone:flower_headgear',
		'cataclysm:amptrgangr_head',
		'cataclysm:draugr_head',
		/_fossil_head/,
		'cataclysm:koboldediator_skull',

	])

	tags.add('adj:fnaf_plushie', [
		/fnaf_plushie_remastered:.*_plush/
	])

	tags.add('adj:blahaj/recolorable', [
		'just_blahaj:white_blahaj',
		'just_blahaj:orange_blahaj',
		'just_blahaj:magenta_blahaj',
		'just_blahaj:light_blue_blahaj',
		'just_blahaj:yellow_blahaj',
		'just_blahaj:lime_blahaj',
		'just_blahaj:pink_blahaj',
		'just_blahaj:gray_blahaj',
		'just_blahaj:light_gray_blahaj',
		'just_blahaj:cyan_blahaj',
		'just_blahaj:purple_blahaj',
		'just_blahaj:blue_blahaj',
		'just_blahaj:brown_blahaj',
		'just_blahaj:green_blahaj',
		'just_blahaj:red_blahaj',
		'just_blahaj:black_blahaj',
		'just_blahaj:blahaj',
	])

	tags.add('adj:blahaj/colored', [
		'just_blahaj:white_blahaj',
		'just_blahaj:orange_blahaj',
		'just_blahaj:magenta_blahaj',
		'just_blahaj:light_blue_blahaj',
		'just_blahaj:yellow_blahaj',
		'just_blahaj:lime_blahaj',
		'just_blahaj:pink_blahaj',
		'just_blahaj:gray_blahaj',
		'just_blahaj:light_gray_blahaj',
		'just_blahaj:cyan_blahaj',
		'just_blahaj:purple_blahaj',
		'just_blahaj:blue_blahaj',
		'just_blahaj:brown_blahaj',
		'just_blahaj:green_blahaj',
		'just_blahaj:red_blahaj',
		'just_blahaj:black_blahaj',
	])


	tags.add('adj:blahaj/expressive', [
		'just_blahaj:creeperhaj',
		'just_blahaj:palestine_blahaj',
		'just_blahaj:trans_blahaj',
		'just_blahaj:pride_blahaj',
		'just_blahaj:intersex_blahaj',
		'just_blahaj:bi_blahaj',
		'just_blahaj:panhaj',
		'just_blahaj:lesbian_blahaj',
		'just_blahaj:gay_blahaj',
		'just_blahaj:enby_blahaj',
		'just_blahaj:gender_fluid_blahaj',
	])

	tags.add('adj:basic_furnaces', [
		'furnace',
		/quark\:.*_furnace/
	])

	tags.add('adj:petal_apothecary', [
		/botania\:apothecary.*/
	])

	tags.add('adj:horse_armor', [
		/.*horse_armor/
	])

	tags.add('adj:clock', [
		'minecraft:clock',
		'mythicmetals:platinum_watch'
	])

	tags.remove('forge:glass_panes/colorless', [
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
		tags.remove(tag, [/mythicmetals/])
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
		tags.add('adj:equipment/' + str, [
			new RegExp(type)
		])
		tags.add('adj:reforges/armor', [
			'#adj:equipment/' + str
		])
	})
	// Bows
	tags.add('adj:reforges/bows', [
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
	tags.add('adj:reforges/melee', [
		/sword/,
		/knife/,
		/axe/,
		'trident'
	])
	// Shields
	tags.add('adj:reforges/shields', [
		/shield/
	])

	tags.removeAllTagsFrom(/mythicmetals:silver/)
	tags.removeAllTagsFrom(/mythicmetals:raw_silver/)
	tags.removeAllTagsFrom('farmersdelight:wheat_dough')
	tags.removeAll('supplementaries:ropes')
	tags.add('supplementaries:ropes', [
		'supplementaries:rope'
	])

	tags.add('adj:any_map', [
		'map',
		'filled_map',
		'supplementaries:slice_map',
		'alexscaves:cave_map'
	])

	tags.add('adj:alloy_forge', [
		'alloy_forgery:adamantite_forge_casing_forge_controller',
		'alloy_forgery:cracked_deepslate_bricks_forge_controller',
		'alloy_forgery:cracked_stone_bricks_forge_controller',
		'alloy_forgery:ender_forge_casing_forge_controller',
		'alloy_forgery:nether_bricks_forge_controller',
	])

	tags.add('adj:alloy_forge_casing', [
		/adj\:.*casing/
	])

	tags.add('adj:music_disc', [
		/.*\:music_disc_/,
		'etched:etched_music_disc',
		'supplementaries:pancake',
		/botania\:record_/,
		'born_in_chaos_v1:anluka_doors',
		'born_in_chaos_v1:serpumpkinhead_m',
		'aether_redux:ancient_sentrite_music_disc'
	])

	tags.removeAllTagsFrom('create:copper_nugget')

	tags.add('adj:attuned_pearls', [
		/cataclysm:.*eye.*/,
		'rediscovered:ruby_eye'
	])

	tags.add('adj:ars/glyphs', [
		/.*\:glyph_.*/
	])

	tags.add('adj:ars/rituals', [
		/.*\:ritual_.*/
	])
	tags.remove('adj:ars/rituals', [
		'ars_nouveau:ritual_brazier'
	])

	tags.add('adj:ars/lesser_spell_focus', [
		/ars_elemental:lesser_*/
	])

	tags.add('adj:ars/spell_focus', [
		/ars_elemental:.*_focus/
	])
	tags.remove('adj:ars/spell_focus', [
		/ars_elemental:lesser_*/
	])

	tags.add('adj:ars/sourcelinks', [
		/ars_nouveau:.*_sourcelink/
	])

	tags.add('adj:ars/relay', [
		/ars_nouveau:relay.*/
	])

	tags.add('adj:ars/essence', [
		/ars_nouveau:.*_essence/
	])

	tags.add('adj:ars/bangle', [
		/ars_elemental:.*_bangle/
	])

	tags.add('adj:canvas', [
		/xercapaint:.*canvas.*/
	])

	tags.add('adj:tidesinger_upgrade_coral', [
		/^(?!.*dead).*:.*_coral_block$/
	])

	tags.add('adj:treasure_bag', [
		/treasure_bag/
	])

	tags.add('adj:archwood_leaves', [
		/_archwood_leaves/
	])

	tags.add('adjcore:curios_dropped_on_death', [
		'backpacked:backpack'
	])

	tags.add('forge:buckets/entity_water', [
		/tide:.*_bucket/,
		/alexscaves:.*_bucket/
	])

	tags.remove('botania:floating_flowers', [
		'#botania:special_floating_flowers'
	])

	tags.remove('twilightforest:portal/activator', [
		'minecraft:diamond'
	])
	tags.add('twilightforest:portal/activator', [
		'botania:dragonstone'
	])
})

// 
// Block tags
// 
ServerEvents.tags('block', tags => {

	const blockNeedsTieredTool = {
		'minecraft:needs_wooden_tool': [
			'minecraft:copper_ore',
			'minecraft:deepslate_copper_ore',
		],
		'minecraft:needs_stone_tool': [
			'-minecraft:copper_ore',
			'-minecraft:deepslate_copper_ore'
		],
		'minecraft:needs_iron_tool': [
			/deepslate/
		],
		'minecraft:needs_diamond_tool': [
			/end_stone/,
			/purpur/,
			/myalite/
		],
		'forge:needs_netherite_tool': [
			/waystones\:/,
			/enderium/
		],
		'adjcore:needs_tier_5_tool': [
			/metallurgium/,
			/celestium/
		],
		'adjcore:needs_tier_6_tool': [
			'summoningrituals:altar'
		],
	}

	for (const [tag, entries] of Object.entries(blockNeedsTieredTool)) {
		let map = {
			remove: [],
			add: []
		}

		entries.forEach(block => {
			if (typeof block === "string" && block.startsWith('-')) {
				map.remove.push(block.substring(1))
			} else {
				map.add.push(block)
			}
		})

		tags.remove(tag, map.remove)
		tags.add(tag, map.add)
	}

	tags.add('adj:stone', [
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

	tags.remove('minecraft:mineable/axe', [
		/aquamirae\:painting\_/,
		'summoningrituals:altar'
	])

	tags.remove('minecraft:mineable/pickaxe', [
		'ecologics:pot'
	])

	tags.add('minecraft:mineable/pickaxe', [
		'summoningrituals:altar'
	])

	tags.add('adj:alloy_forge', [
		'alloy_forgery:cracked_stone_bricks_forge_controller',
		'alloy_forgery:cracked_deepslate_bricks_forge_controller',
		'alloy_forgery:nether_bricks_forge_controller',
		'alloy_forgery:adamantite_forge_casing_forge_controller',
		'alloy_forgery:ender_forge_casing_forge_controller'
	])

	tags.add('adj:alloy_forge_casing', [
		/adj\:.*casing/
	])

	tags.remove('minecraft:mineable/axe', [
		/grass/,
		/fern/
	])
})

// 
// Entity type tags
// 
ServerEvents.tags('entity_type', tags => {
	tags.add('witherstormmod:wither_storm_targeting_blacklist', [
		'evilcraft:vengeance_spirit'
	])
})

// 
// Damage type tags
// 
ServerEvents.tags('damage_type', tags => {
	tags.add('adjcore:bypasses_cooldown', [
		'botania:relic_damage',
		'botania:player_attack_armor_piercing',
		'botania:key_explosion',
		'ars_nouveau:spell',
	])

	tags.remove('adjcore:bypasses_cooldown', [
		/cataclysm/
	])

	tags.add('adjcore:dot', [
		'majruszsdifficulty:bleeding',
		'ars_elemental:poison',
		'ars_elemental:hellfire'
	])

	tags.add('adj:magic', [
		'ars_nouveau:spell',
		'ars_nouveau:crush',
		'#minecraft:witch_resistant_to'
	])
})

// 
// Structure tags
// 
ServerEvents.tags('worldgen/structure', tags => {
	tags.remove('quark:soul_bead_target', [
		'minecraft:fortress',
		'betterfortresses:fortress'
	])
})

// Fluid tags
ServerEvents.tags('fluid', tags => {
	tags.add('create:bottomless/allow', [
		'the_bumblezone:sugar_water_still',
		'the_bumblezone:honey_fluid_still',
		'netherexp:ectoplasm'
	])
})
