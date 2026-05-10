ServerEvents.tags('block', tags => {

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
	]);

	tags.remove('minecraft:mineable/axe', [
		/aquamirae\:painting\_/,
		'summoningrituals:altar'
	]);

	tags.add('minecraft:mineable/pickaxe', [
		'summoningrituals:altar'
	]);

	tags.add('adj:alloy_forge', [
		'alloy_forgery:cracked_stone_bricks_forge_controller',
		'alloy_forgery:cracked_deepslate_bricks_forge_controller',
		'alloy_forgery:nether_bricks_forge_controller',
		'alloy_forgery:adamantite_forge_casing_forge_controller',
		'alloy_forgery:ender_forge_casing_forge_controller'
	]);

	tags.add('adj:alloy_forge_casing', [
		/adj\:.*casing/
	]);

	tags.remove('minecraft:mineable/axe', [
		/grass/,
		/fern/
	]);

	tags.remove('c:chests', [
		'evilcraft:blood_chest'
	]);

	tags.removeAll('jumbofurnace:jumbofurnaceable');

	tags.add('adj:temp_twilight_mangrove', [
		/twilight.*mangrove_/,
		/tf.*mangrove_/
	]);

	tags.removeAll('twilightforest:portal/fluid');
	tags.add('twilightforest:portal/fluid', [
		'supplementaries:lumisene'
	]);

	tags.add('alexsmobs:frostalker_fears', [
		'cataclysm:altar_of_fire'
	]);

	tags.add('cataclysm:ignis_can_destroy_cracked_block', [
		/.*\:cracked_.*/
	]);

	tags.add('twilightforest:trophies', [
		/trofers/
	]);

	tags.add('snowrealmagic:offset_y', [
		'adjblocks:twig',
		'adjblocks:pebble'
	]);

	tags.add('snowrealmagic:containables', [
		'adjblocks:twig',
		'adjblocks:pebble',
		/placeablemaxwell/
	]);

	tags.add('botania:horn_of_the_covering_breakable', [
		'snowrealmagic:snow'
	]);

	tags.add('botania:horn_of_the_wild_breakable', [
		'adjblocks:twig'
	]);

	tags.add('snowrealmagic:cannot_accumulate_on', [
		/placeablemaxwell/
	]);

	const fluidloggableMap = {
		both: [],
		loggable: [
			'ars_nouveau:arcane_platform',
			'ars_nouveau:arcane_pedestal',
			'ars_nouveau:arcane_core',
			'ars_nouveau:imbuement_chamber',
			'ars_nouveau:arcane_platform',
			/mana_jar/,
			/ars.*sconce/,
			/spell_turret/,
			/ars.*sbed/,
			/ars.*relay/,
			'ars_nouveau:alteration_table',
			'ars_nouveau:alteration_table',
			'ars_nouveau:whirlisprig_flower',
			'supplementaries:urn',
			/botania:floating_/,
			/botanicadds:.*floating.*/,
			/windowbox:.*floating.*/,
			/botania:apothecary/,
			'botania:starfield',
			'botania:cocoon',
			/botania:.*pylon.*/,
			/botanicadds:.*pylon.*/,
			/botania:.*spreader.*/
		],
		permeable: [],
	};
	tags.add('adj:fluidloggable', fluidloggableMap.both.concat(fluidloggableMap.loggable));
	tags.add('adj:fluid_permeable', fluidloggableMap.both.concat(fluidloggableMap.permeable));

	tags.add('base_stone_overworld', [
		'kubejs:cinnabar'
	]);

	tags.add('base_stone_overworld', [
		'botania:metamorphic_fungal_stone'
	]);

	tags.add('minecraft:stone_ore_replaceables', [
		'botania:metamorphic_fungal_stone'
	]);
});
