const crops = {
	year_round: [
		'phantasm:pream_sapling',
		'quark:purple_blossom_sapling',
		'ars_nouveau:purple_archwood_sapling',
		'architects_palette:twisted_sapling',
		'evilcraft:undead_sapling',
		'windowbox:chthonic_yew_sapling',
		'windowbox:alfthorne_sapling',
		'twilightforest:time_sapling',
		'twilightforest:transformation_sapling',
		'twilightforest:mining_sapling',
		'twilightforest:hollow_oak_sapling',
		'twilightforest:twilight_oak_sapling',
		'aether:skyroot_sapling',
		'aether:golden_oak_sapling',
	],
	spring: [
		'quark:red_blossom_sapling',
		'ars_nouveau:green_archwood_sapling',
		'rediscovered:ancient_cherry_sapling',
		'cherry_sapling',
		'vinery:dark_cherry_sapling',
		'ancient_aether:sakura_sapling',
		'evilcraft:undead_sapling',
		'snifferplus:stone_pine_sapling',
		'twilightforest:canopy_sapling',
		'aether_redux:blightwillow_sapling',
		'aether_redux:purple_glacia_sapling',
		'aether_redux:gilded_oak_sapling',
		'aether_redux:fieldsproot_sapling',
		'ancient_aether:skyroot_pine_sapling',
	],
	summer: [
		'quark:yellow_blossom_sapling',
		'vinery:dark_cherry_sapling',
		'ars_elemental:yellow_archwood_sapling',
		'rediscovered:ancient_cherry_sapling',
		'cherry_sapling',
		'upgrade_aquatic:river_sapling',
		'evilcraft:undead_sapling',
		'twilightforest:rainbow_oak_sapling',
		'alexscaves:pewen_sapling',
		'alexscaves:ancient_sapling',
		'twilightforest:canopy_sapling',
		'aether_redux:blighted_skyroot_sapling',
		'aether_redux:crystal_sapling',
	],
	autumn: [
		'quark:orange_blossom_sapling',
		'ars_nouveau:red_archwood_sapling',
		'minecraft:sugar_cane',
		'upgrade_aquatic:river_sapling',
		'evilcraft:undead_sapling',
		'ecologics:walnut_sapling',
		'twilightforest:canopy_sapling',
		'twilightforest:darkwood_sapling',
		'aether_redux:blightwillow_sapling',
		'aether_redux:gilded_oak_sapling',
		'aether_redux:crystal_sapling',
		'aether_redux:crystal_fruit_sapling',
		'aether_redux:fieldsproot_sapling',
		'ancient_aether:skyroot_pine_sapling',
	],
	winter: [
		'quark:blue_blossom_sapling',
		'ars_nouveau:blue_archwood_sapling',
		'snifferplus:stone_pine_sapling',
		'quark:ancient_sapling',
		'lost_aether_contet:holiday_sapling',
		'twilightforest:darkwood_sapling',
		'ancient_aether:crystal_skyroot_sapling',
		'ancient_aether:enchanted_skyroot_sapling',
		'aether_redux:glacia_sapling',
		'aether_redux:purple_glacia_sapling',
		'aether_redux:fieldsproot_sapling',
		'ancient_aether:highsproot_sapling',
		'ancient_aether:skyroot_pine_sapling'
	]
}

const removeFromSeasonTags = [
	'minecraft:sweet_berry',
	'glow_berries'
]

ServerEvents.tags('item', tags => {
	tags.add('sereneseasons:year_round_crops', [
		crops.year_round,
		'berry_good:sweet_berry_pips',
		'berry_good:glow_berry_pips'
	])
	tags.add('sereneseasons:spring_crops', [
		crops.spring,
		'vinery:cherry',
		'ars_nouveau:magebloom'
	])
	tags.add('sereneseasons:summer_crops', [
		crops.summer,
		'minecraft:potato',
		'vinery:cherry',
		'supplementaries:flax',
		'supplementaries:flax_seeds',
		'ars_nouveau:magebloom'
	])
	tags.add('sereneseasons:autumn_crops', [
		crops.autumn,
		'supplementaries:flax',
		'supplementaries:flax_seeds',
		'ars_nouveau:magebloom',
		'ars_nouveau:sourceberry'
	])
	tags.add('sereneseasons:winter_crops', [
		crops.winter,
		'ars_nouveau:sourceberry',
		'berry_good:sweet_berry_pips'
	])

	tags.remove('sereneseasons:year_round_crops', removeFromSeasonTags)
	tags.remove('sereneseasons:spring_crops', removeFromSeasonTags)
	tags.remove('sereneseasons:summer_crops', removeFromSeasonTags)
	tags.remove('sereneseasons:autumn_crops', removeFromSeasonTags)
	tags.remove('sereneseasons:winter_crops', removeFromSeasonTags)
})

ServerEvents.tags('block', tags => {
	tags.add('sereneseasons:year_round_crops', [
		crops.year_round
	])
	tags.add('sereneseasons:spring_crops', [
		crops.spring,
		'ars_nouveau:magebloom_crop'
	])
	tags.add('sereneseasons:summer_crops', [
		crops.summer,
		'minecraft:potatoes',
		'supplementaries:flax',
		'ars_nouveau:magebloom_crop'
	])
	tags.add('sereneseasons:autumn_crops', [
		crops.autumn,
		'supplementaries:flax',
		'ars_nouveau:magebloom_crop',
		'ars_nouveau:sourceberry_bush'
	])
	tags.add('sereneseasons:winter_crops', [
		crops.winter,
		'ars_nouveau:sourceberry_bush'
	])
})