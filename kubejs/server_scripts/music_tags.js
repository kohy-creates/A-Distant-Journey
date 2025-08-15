ServerEvents.tags('worldgen/biome', (event) => {
	event.add("adj:snowy", [
		'snowy_beach',
		'clifftree:snowy_diorite_shore',
		'clifftree:glacier_valley',
		'#forge:is_snowy',
		'#c:is_snowy',
		'clifftree:snowy_diorite_shore',
		'clifftree:snowy_old_growth_taiga',
	]);

	event.add("adj:cherry_grove", [
		'cherry_grove'
	]);

	event.add("adj:mountains", [
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

	event.add("adj:forest", [
		"#c:is_forest"
	]);

	event.add("adj:swamp", [
		/swamp/
	]);

	event.add("adj:badlands", [
		/badlands/
	]);

	event.add("adj:desert", [
		/desert/,
		'clifftree:warm_river'
	]);

	event.add("adj:beach", [
		'beach',
		'clifftree:gravelly_beach',
		'stony_shore',
		'clifftree:temperate_beach',
		'clifftree:diorite_shore',
		'clifftree:granite_shore',
	]);

	event.add("adj:ocean", [
		/ocean/
	]);

	event.add("adj:warm_ocean", [
		'minecraft:warm_ocean'
	]);

	event.add("adj:mushroom_island", [
		'mushroom_fields',
		'clifftree:mushroom_caves'
	]);

	event.add("adj:caves", [
		/caves/
	]);

	event.add("adj:warm_caves", [
		'clifftree:warm_caves'
	]);

	event.add("adj:soul_sand_valley", [
		'soul_sand_valley',
		'incendium:weeping_valley'
	]);

	event.add("adj:withered_forest", [
		'incendium:withered_forest',
	]);

	event.add("adj:crimson_forest", [
		'crimson_forest',
		'incendium:infernal_dunes'
	]);

	event.add("adj:warped_forest", [
		'warped_forest',
		'incendium:inverted_forest'
	]);

	event.add("adj:basalt_deltas", [
		'basalt_deltas',
		'incendium:volcanic_deltas'

	]);
})