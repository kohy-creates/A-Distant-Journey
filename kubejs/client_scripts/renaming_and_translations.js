ClientEvents.lang('en_us', event => {

	const extraTranslations = {
		'rarity.alexscaves.demonic': 'Demonic',
		'rarity.alexscaves.sweet': 'Sweet',
		'rarity.alexscaves.nuclear': 'Nuclear',
		'rarity.alexscaves.rainbow': 'Special',
		'rarity.integrated_stronghold.antique': 'Antique',
		'rarity.artifact': 'Artifact',
		'rarity.botanicadditionsgaiasteel': 'Gaiasteel',
		'rarity.twilight': 'Twilight',
		'rarity.alexscavesexemplified.gamma': 'Omega Level Threat',

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

		'heart_crystals:heart_crystal': 'Life Crystal'
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
		'enderstorage:ender_pouch': 'Shared Ender Pouch',
		'structure_gel:building_tool': 'Architect\'s Prism',
		'mythicmetals:durasteel_engine': 'Drill Engine',
		'suspicious_stew': 'Strange Stew',
		'sortilege:lapis_shield': 'Lazuli Buckler',
		'rediscovered:purple_arrow': 'Featherlight Arrow',
		'quark:flamerang': 'Netherite Pickarang',
		'artifacts:everlasting_beef': 'Eternal Beef',
		'tiered:armorers_hammer': 'Reforging Hammer',
		'mythicmetals:hallowed_ingot': 'Hallowed Alloy Ingot',
		'terra_curio:cobalt_shield': 'Heavy Steel Shield',

		'functionalstorage:l': 'Drawer Upgrade (Capacity)',
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

		'heart_crystals:heart_crystal': 'Life Crystal'
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

	global.rediscoveredFurniture.forEach(item => {
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
