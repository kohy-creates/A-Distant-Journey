ServerEvents.tags('worldgen/biome', (tags) => {
	tags.add("adj:snowy", [
		'snowy_beach',
		'clifftree:snowy_diorite_shore',
		'clifftree:glacier_valley',
		'#forge:is_snowy',
		'#c:is_snowy',
		'clifftree:snowy_diorite_shore',
		'clifftree:snowy_old_growth_taiga',
	]);

	tags.add("adj:cherry_grove", [
		'cherry_grove'
	]);

	tags.add("adj:mountains", [
		'minecraft:snowy_slopes',
		'minecraft:frozen_peaks',
		'minecraft:jagged_peaks',
		'minecraft:stony_peaks',
		'minecraft:windswept_hills',
		'minecraft:windswept_gravelly_hills',
		'minecraft:windswept_forest',
		'minecraft:windswept_savanna',
		'meadow'
	]);

	tags.add("adj:forest", [
		"#c:is_forest"
	]);

	tags.add("adj:swamp", [
		/swamp/
	]);

	tags.add("adj:badlands", [
		/badlands/
	]);

	tags.add("adj:desert", [
		/desert/,
		'clifftree:warm_river',
		'clifftree:shrubland',
		'clifftree:oasis'
	]);

	tags.add("adj:beach", [
		'beach',
		'clifftree:gravelly_beach',
		'stony_shore',
		'clifftree:temperate_beach',
		'clifftree:diorite_shore',
		'clifftree:granite_shore',
	]);

	tags.add("adj:ocean", [
		/ocean/
	]);

	tags.add("adj:warm_ocean", [
		'minecraft:warm_ocean'
	]);

	tags.add("adj:mushroom_island", [
		'mushroom_fields',
		'clifftree:mushroom_caves'
	]);

	tags.add("adj:caves", [
		/caves/
	]);

	tags.add("adj:warm_caves", [
		'clifftree:warm_caves'
	]);

	tags.add("adj:soul_sand_valley", [
		'soul_sand_valley',
		'incendium:weeping_valley'
	]);

	tags.add("adj:withered_forest", [
		'incendium:withered_forest',
	]);

	tags.add("adj:crimson_forest", [
		'crimson_forest',
		'incendium:infernal_dunes'
	]);

	tags.add("adj:warped_forest", [
		'warped_forest',
		'incendium:inverted_forest'
	]);

	tags.add("adj:basalt_deltas", [
		'basalt_deltas',
		'incendium:volcanic_deltas'

	]);
})