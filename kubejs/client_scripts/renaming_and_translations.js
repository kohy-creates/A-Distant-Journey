ClientEvents.lang('en_us', event => {

	const extraTranslations = {

		'effect.mutantmonsters.chemical_x.description': 'Causes certain mobs to mutate into their way stronger variants; has no effect on players.',
		'effect.adjcore.cozy_campfire.description': 'So warm, so cozy! Slowly regenerates lost life',

		'enchantment.minecraft.bane_of_arthropods': 'Lurkers\'s Bane',

		'biome.clifftree.bog': 'Bog',
		'biome.clifftree.caves': 'Caves',
		'biome.clifftree.cold_caves': 'Cold Caves',
		'biome.clifftree.cold_river': 'Cold River',
		'biome.clifftree.desert_cliff': 'Desert Cliff',
		'biome.clifftree.diorite_shore': 'Diorite Shore',
		'biome.clifftree.dirt_caves': 'Dirt Caves',
		'biome.clifftree.frozen_caves': 'Frozen Caves',
		'biome.clifftree.glacier_cliff': 'Glacier Cliff',
		'biome.clifftree.glacier_valley': 'Glacier Valley',
		'biome.clifftree.granite_shore': 'Granite Shore',
		'biome.clifftree.gravelly_beach': 'Gravelly Beach',
		'biome.clifftree.inferno': 'Inferno',
		'biome.clifftree.lukewarm_caves': 'Lukewarm Caves',
		'biome.clifftree.mushroom_caves': 'Mushroom Caves',
		'biome.clifftree.oasis': 'Oasis',
		'biome.clifftree.shrubland': 'Shrubland',
		'biome.clifftree.snowy_diorite_shore': 'Snowy Diorite Shore',
		'biome.clifftree.snowy_old_growth_taiga': 'Snowy Old Growth Taiga',
		'biome.clifftree.sparse_forest': 'Sparse Forest',
		'biome.clifftree.stone_ocean': 'Stone Ocean',
		'biome.clifftree.temperate_beach': 'Temperate Beach',
		'biome.clifftree.tropical_river': 'Tropical River',
		'biome.clifftree.tundra': 'Tundra',
		'biome.clifftree.warm_caves': 'Warm Caves',
		'biome.clifftree.warm_river': 'Warm River',
		'biome.ars_elemental.blazing_forest': 'Blazing Forest',
		'biome.ars_elemental.cascading_forest': 'Cascading Forest',
		'biome.ars_elemental.flashing_forest': 'Flashing Forest',
		'biome.ars_elemental.flourishing_forest': 'Flourishing Forest',
		'biome.nullscape.void_barrens': 'Void Barrens',
		'biome.nullscape.crystal_peaks': 'Crystal Peaks',
		'biome.nullscape.shadowlands': 'Shadowlands',
		'biome.netherexp.sorrowsquash_pastures': 'Sorrowsquash Pastures',

		'block.alloy_forgery.adamantite_forge_casing_forge_controller': 'Adamantite Forge',
		'block.alloy_forgery.cracked_deepslate_bricks_forge_controller': 'Deepslate Bricks Forge',
		'block.alloy_forgery.cracked_stone_bricks_forge_controller': 'Stone Bricks Forge',
		'block.alloy_forgery.ender_forge_casing_forge_controller': 'Ender Forge',
		'block.alloy_forgery.nether_bricks_forge_controller': 'Hellforge',
		'block.adj.ender_forge_casing': 'Ender Forge Casing',
		'block.adj.adamantite_forge_casing': 'Adamantite Forge Casing',

		'architects_palette.info.dimension.rediscovered.skylands': 'the Skylands',

		'block.aether.potted_skyroot_sapling': 'Potted Skyroot Sapling',

	}

	/** @type {Record<Internal.Block_, string>} */
	const blockRenames = {
		'netherexp:soul_candle': 'Large Soul Candle',
		'enchantinginfuser:enchanting_infuser': 'Enchanting Table',
		'enchantinginfuser:advanced_enchanting_infuser': 'Advanced Enchanting Table',
		'enderstorage:ender_chest': 'Shared Ender Chest',
		'grass': 'Short Grass',
		'quark:glow_shroom': 'Shimmershroom',
		'quark:glow_shroom_block': 'Shimmershroom Block',
		'quark:glow_shroom_ring': 'Shimmershroom Ring',
		'quark:glow_shroom_stem': 'Shimmershroom Stem',
		'quark:potted_glow_shroom': 'Potted Shimmershroom',
		'ars_nouveau:rune': 'Spell Rune',
		'mythicmetals:hallowed_block': 'Block of Hallowed Alloy',
		'quark:pipe': 'Brass Item Pipe',
		'quark:encased_pipe': 'Encased Brass Item Pipe',
		'functionalstorage:oak_1': 'Storage Drawer (1x1)',
		'functionalstorage:oak_2': 'Storage Drawer (1x2)',
		'functionalstorage:oak_4': 'Storage Drawer (2x2)',
		'architects_palette:unobtanium_block': 'Missing Tiles',
		'architects_palette:entrails': 'Flesh Block',
		'architects_palette:entrails_slab': 'Flesh Slab',
		'architects_palette:entrails_vertical_slab': 'Flesh Vertical Slab',
		'architects_palette:entrails_stairs': 'Flesh Stairs',
		'summoningrituals:altar': 'Twilight Altar',
		'summoningrituals:indestructible_altar': 'Twilight Altar (Unbreakable)',

		'heart_crystals:heart_crystal': 'Life Crystal',

		'create:cut_limestone': 'Cut Marble',
		'create:cut_limestone_stairs': 'Cut Marble Stairs',
		'create:cut_limestone_slab': 'Cut Marble Slab',
		'v_slab_compat:create/cut_limestone_vertical_slab': 'Cut Marble Vertical Slab',
		'create:cut_limestone_wall': 'Cut Marble Wall',
		'create:polished_cut_limestone': 'Polished Cut Marble',
		'create:polished_cut_limestone_stairs': 'Polished Cut Marble Staris',
		'create:polished_cut_limestone_slab': 'Polished Cut Marble Slab',
		'v_slab_compat:create/polished_cut_limestone_vertical_slab': 'Polished Cut Marble Vertical Slab',
		'create:polished_cut_limestone_wall': 'Polished Cut Marble Wall',
		'create:cut_limestone_bricks': 'Cut Marble Bricks',
		'create:cut_limestone_brick_stairs': 'Cut Marble Brick Stairs',
		'create:cut_limestone_brick_slab': 'Cut Marble Brick Slab',
		'v_slab_compat:create/cut_limestone_brick_vertical_slab': 'Cut Marble Brick Vertical Slab',
		'create:cut_limestone_brick_wall': 'Cut Marble Brick Wall',
		'create:small_limestone_bricks': 'Small Marble Bricks',
		'create:small_limestone_brick_stairs': 'Small Marble Brick Stairs',
		'create:small_limestone_brick_slab': 'Small Marble Brick Slab',
		'v_slab_compat:create/small_limestone_brick_vertical_slab': 'Small Marble Brick Vertical Slab',
		'create:small_limestone_brick_wall': 'Small Marble Brick Wall',
		'create:layered_limestone': 'Layered Marble',
		'create:limestone_pillar': 'Marble Pillar',
		'create:limestone': 'Marble',

		'create:cut_veridium': 'Cut Viridstone',
		'create:cut_veridium_stairs': 'Cut Viridstone Stairs',
		'create:cut_veridium_slab': 'Cut Viridstone Slab',
		'v_slab_compat:create/cut_veridium_vertical_slab': 'Cut Viridstone Vertical Slab',
		'create:cut_veridium_wall': 'Cut Viridstone Wall',
		'create:polished_cut_veridium': 'Polished Cut Viridstone',
		'create:polished_cut_veridium_stairs': 'Polished Cut Viridstone Staris',
		'create:polished_cut_veridium_slab': 'Polished Cut Viridstone Slab',
		'v_slab_compat:create/polished_cut_veridium_vertical_slab': 'Polished Cut Viridstone Vertical Slab',
		'create:polished_cut_veridium_wall': 'Polished Cut Viridstone Wall',
		'create:cut_veridium_bricks': 'Cut Viridstone Bricks',
		'create:cut_veridium_brick_stairs': 'Cut Viridstone Brick Stairs',
		'create:cut_veridium_brick_slab': 'Cut Viridstone Brick Slab',
		'v_slab_compat:create/cut_veridium_brick_vertical_slab': 'Cut Viridstone Brick Vertical Slab',
		'create:cut_veridium_brick_wall': 'Cut Viridstone Brick Wall',
		'create:small_veridium_bricks': 'Small Viridstone Bricks',
		'create:small_veridium_brick_stairs': 'Small Viridstone Brick Stairs',
		'create:small_veridium_brick_slab': 'Small Viridstone Brick Slab',
		'v_slab_compat:create/small_veridium_brick_vertical_slab': 'Small Viridstone Brick Vertical Slab',
		'create:small_veridium_brick_wall': 'Small Viridstone Brick Wall',
		'create:layered_veridium': 'Layered Viridstone',
		'create:veridium_pillar': 'Viridstone Pillar',
		'create:veridium': 'Viridstone',

		'aether:altar': 'Aether Altar',
		'spelunkers_charm:dead_grass': 'Cave Grass',

		'aether:cold_aercloud': 'Cloud Block',
		'aether:blue_aercloud': 'Bouncy Cloud Block',
		'ancient_aether:violet_aercloud': 'Weird Cloud Block',
		'aether:golden_aercloud': 'Golden Cloud Block',
		'aether_redux:blighted_aercloud': 'Blighted Cloud Block',
		'lost_aether_content:pink_aercloud': 'Pink Cloud Block',
		'lost_aether_content:enchanted_pink_aercloud': 'Enchanted Pink Cloud Block',
		'twilightforest:rainy_cloud': 'Rainy Cloud Block',
		'twilightforest:snowy_cloud': 'Snowy Cloud Block',
		'alexscaves:vanilla_ice_cream': 'Vanilla Ice Cream Block',
		'alexscaves:chocolate_ice_cream': 'Chocolate Ice Cream Block',
		'alexscaves:strawberry_ice_cream': 'Strawberry Ice Cream Block',

		'alexscaves:waste_drum': 'Toxic Waste Drum',

		'create:fluid_pipe': 'Copper Fluid Pipe',
		'create:mechanical_pump': 'Copper Fluid Pump',
	}

	/** @type {Record<Internal.InputItem_, string>} */
	const itemRenames = {
		'rediscovered:gear': 'Redstone Gear',
		'quartz': 'Quartz',
		'ender_eye': 'Awakened Ender Pearl',
		'rediscovered:ruby_eye': 'Awakened Ender Pearl (Ruby Attunment)',
		'cataclysm:mech_eye': 'Awakened Ender Pearl (Mechanical Attunment)',
		'cataclysm:flame_eye': 'Awakened Ender Pearl (Flame Attunment)',
		'cataclysm:void_eye': 'Awakened Ender Pearl (Void Attunment)',
		'cataclysm:monstrous_eye': 'Awakened Ender Pearl (Monstrous Attunment)',
		'cataclysm:abyss_eye': 'Awakened Ender Pearl (Abyss Attunment)',
		'cataclysm:desert_eye': 'Awakened Ender Pearl (Desert Attunment)',
		'cataclysm:cursed_eye': 'Awakened Ender Pearl (Cursed Attunment)',
		'cataclysm:storm_eye': 'Awakened Ender Pearl (Storm Attunment)',
		'create:dough': 'Wheat Dough',
		'structure_gel:building_tool': 'Architect\'s Prism',
		'mythicmetals:durasteel_engine': 'Drill Engine',
		'suspicious_stew': 'Strange Stew',
		'sortilege:lapis_shield': 'Lazuli Buckler',
		'rediscovered:purple_arrow': 'Featherlight Arrow',
		'artifacts:everlasting_beef': 'Eternal Beef',
		'mythicmetals:hallowed_ingot': 'Hallowed Alloy Ingot',
		'terra_curio:cobalt_shield': 'Steel Shield',

		'functionalstorage:copper_upgrade': 'Drawer Upgrade (Capacity)',
		'functionalstorage:collector_upgrade': 'Drawer Upgrade (Collector)',
		'functionalstorage:puller_upgrade': 'Drawer Upgrade (Puller)',
		'functionalstorage:pusher_upgrade': 'Drawer Upgrade (Pusher)',
		'functionalstorage:void_upgrade': 'Drawer Upgrade (Void)',
		'functionalstorage:redstone_upgrade': 'Drawer Upgrade (Redstone)',

		'terra_curio:demon_heart': 'Aerwhale King\'s Heart',
		'immersive_paintings:painting': 'Magic Painting',
		'tiab:time_in_a_bottle': 'Time In a Bottle',

		'minecraft:enchanted_golden_apple': 'Enchanted Golden Apple',

		'ars_nouveau:wilden_horn': 'Fang',
		'ars_nouveau:wilden_spike': 'Guardian Spike',

		'heart_crystals:heart_crystal': 'Life Crystal',
		'farmersdelight:skillet': 'Frying Pan',
		'alexscaves:sombrero': 'Desert Sombrero',
		'twilightforest:ice_bow': 'Winter\'s Touch',
		'mythicmetals:metallurgium_sword': 'Rageblade',
		'twilightforest:fiery_sword': 'Volcano',
		'evilcraft:burning_gem_stone': 'Burning Gemstone',
		'terra_curio:honey_comb': 'Enchanted Comb',

		'evilcraft:promise_acceptor_iron': 'Mana Promise Acceptor',
		'evilcraft:promise_acceptor_gold': 'Midas Gold Promise Acceptor',
		'evilcraft:promise_acceptor_diamond': 'Veridium Promise Acceptor',

		'alexscaves:pearl': 'Pink Pearl',
		'constructionwand:iron_wand': 'Iron Construction Wand',
		'constructionwand:diamond_wand': 'Diamond Construction Wand',
		'constructionwand:infinity_wand': 'Unobtanium Construction Wand',
		'toms_storage:ts.item_filter': 'Storage Filter',
		'toms_storage:ts.polymorphic_item_filter': 'Polymorphic Storage Filter',
		'toms_storage:ts.tag_item_filter': 'Tag Storage Filter'
	}

	const entityRenames = {
		'immersive_paintings:painting': 'Magic Painting',
	}

	for (const [key, value] of Object.entries(extraTranslations)) {
		event.add(key, value);
	}

	for (const [key, value] of Object.entries(blockRenames)) {
		event.renameBlock(key, value);
	}

	for (const [key, value] of Object.entries(itemRenames)) {
		event.renameItem(key, value);
	}

	for (const [key, value] of Object.entries(entityRenames)) {
		event.renameEntity(key, value)
	}

	global.rediscoveredFurniture().forEach(item => {
		let name = item
			.replace('rediscovered:', '')
			.replace('_', ' ')
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
		event.renameItem(item, 'Ancient ' + name);
	})

	// global.quarkVerticalSlabs.forEach(slab => {
	// 	let name = slab
	// 		.replace('quark:', '')
	// 		.replace('_vertical', '')
	// 		.replace(/\_/g, ' ')
	// 		.toLowerCase()
	// 		.split(' ')
	// 		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
	// 		.join(' ');
	// 	event.renameBlock(slab, name)
	// })
})
