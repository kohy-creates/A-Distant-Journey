StartupEvents.postInit(event => {

	// Other order overwrites
	const EMIEdit = [
		['kubejs:eye_of_verdant_bloom', 'structure_gel:building_tool'],

		["minecraft:furnace", "alloy_forgery:cracked_stone_bricks_forge_controller"],
		["alloy_forgery:cracked_stone_bricks_forge_controller", "alloy_forgery:cracked_deepslate_bricks_forge_controller"],
		["alloy_forgery:cracked_deepslate_bricks_forge_controller", "alloy_forgery:nether_bricks_forge_controller"],
		["alloy_forgery:nether_bricks_forge_controller", "alloy_forgery:adamantite_forge_casing_forge_controller"],
		["alloy_forgery:adamantite_forge_casing_forge_controller", "alloy_forgery:ender_forge_casing_forge_controller"],

		["alloy_forgery:ender_forge_casing_forge_controller", "adj:ender_forge_casing"],
		["alloy_forgery:adamantite_forge_casing_forge_controller", "adj:adamantite_forge_casing"],

		["minecraft:furnace", "quark:deepslate_furnace"],
		["quark:deepslate_furnace", "quark:blackstone_furnace"],

		["minecraft:leather", "minecraft:bundle"],
		["minecraft:string", "minecraft:fishing_rod"],

		["galosphere:sterling_boots", "minecraft:iron_helmet"],
		["minecraft:iron_helmet", "minecraft:iron_chestplate"],
		["minecraft:iron_chestplate", "minecraft:iron_leggings"],
		["minecraft:iron_leggings", "minecraft:iron_boots"],
		["sortilege:lapis_shield", "minecraft:leather_helmet"],
		["minecraft:leather_helmet", "minecraft:leather_chestplate"],
		["minecraft:leather_chestplate", "minecraft:leather_leggings"],
		["minecraft:leather_leggings", "minecraft:leather_boots"],

		["quark:glowing_glass_item_frame", "minecraft:painting"],
		["minecraft:ender_chest", "ender_storage:ender_chest"],
		["ender_storage:ender_chest", "ender_storage:ender_tank"],
		["ender_storage:ender_tank", "ender_storage:pouch"],
		["minecraft:spore_blossom", "ars_elemental:spore_blossom_up"],
		["enchantinginfuser:enchanting_infuser", "kubejs:enchanters_guide"],
		["minecraft:firework_rocket{Fireworks:{Flight:3b}}", "witherstormmod:firework_bundle"],
		["enchantinginfuser:advanced_enchanting_infuser", "sortilege:limitite"],
		["minecraft:armor_stand", "dummmmmmy:target_dummy"],

		['ars_nouveau:greater_experience_gem', 'create:experience_block']
	];

	// Detect available materials
	let woodTypes = [],
		musicDiscs = [],
		flagList = [],
		candles = [],
		verticalSlabs = [],
		potterySherds = [],
		bannerPatterns = [],
		smithingTemplates = [],
		spawnEggs = [],
		archwoodLogs = [];

	const ignoredWoodTypes = [
		'ecologics:azalea',
		'ecologics:flowering_azalea',
		'botania:mossy_livingwood',
		'botania:mossy_dreamwood',
		'botania:shimmerwood',
		'twilight_forest:sorting',
		'twilight_forest:mangrove',
		'evilcraft:reinforced_undead'
	]

	Item.list.toArray().forEach(item => {
		const id = item.id;
		if (id.includes('_planks') && !id.includes('_planks_') && !id.includes('vertical')) {
			const type = id.replace('_planks', '');
			if (!ignoredWoodTypes.includes(type)) {
				woodTypes.push(type);
			};
		}
		else if (id.includes('music_disc') || id.includes('record')) {
			musicDiscs.push(id);
		}
		else if (id.includes('flag')) {
			flagList.push(id);
		}
		else if (id.includes('candle') && !id.includes('holder')) {
			candles.push(id)
		}
		else if (id.includes('v_slab_compat')) {
			verticalSlabs.push(id)
		}
		else if (id.includes('sherd')) {
			potterySherds.push(id)
		}
		else if (id.includes('banner_pattern')) {
			bannerPatterns.push(id);
		}
		else if (id.includes('smithing_template')) {
			smithingTemplates.push(id);
		}
		else if (id.includes('archwood_log') && !id.includes('stripped')) {
			archwoodLogs.push(id);
			archwoodLogs.sort();
		}
		else if (id.includes('spawn_egg')
			|| id.endsWith('_se')) {
			spawnEggs.push(id)
		}
	});

	// Ordered woodset item structure
	const woodsetOrder = [
		'log',
		'block',
		'stem',
		'wood',
		'hyphae',
		'quark:post',
		'stripped_X_log',
		'stripped_X_block',
		'stripped_X_stem',
		'stripped_X_wood',
		'stripped_X_hyphae',
		'quark:stripped_X_post',
		'planks',
		'mosaic',
		'architects_palette:boards',
		'bookshelf',
		'quark:bookshelf',
		'handcrafted:bench',
		'handcrafted:chair',
		'handcrafted:couch',
		'handcrafted:dining_bench',
		'handcrafted:side_table',
		'handcrafted:desk',
		'handcrafted:nightstand',
		'handcrafted:table',
		'handcrafted:counter',
		'farmersdelight:cabinet',
		'alexscavesdelight:cabinet',
		'twilightdelight:cabinet',
		'chest',
		'quark:chest',
		// 'trapped_chest',
		// 'quark:trapped_chest',
		'handcrafted:fancy_bed',
		'stairs',
		'mosaic_stairs',
		'slab',
		'planks_slab',
		'mosaic_slab',
		'quark:vertical_slab',
		'architects_palette:vertical_slab',
		'quark:mosaic_vertical_slab',
		'quark:planks_vertical_slab',
		'suppsquared:item_shelf',
		'fence',
		'architects_palette:railing',
		'fence_gate',
		'door',
		'trapdoor',
		'ladder',
		'quark:ladder',
		'hearth_and_home:lattice',
		'pressure_plate',
		'button',
		'sign',
		'supplementaries:sign_post',
		'hanging_sign',
		'boat',
		// 'chest_boat',
		'raft',
		// 'chest_raft'
	];

	// Woodset appearance order
	const woodTypeOrder = [
		'minecraft:oak',
		'minecraft:birch',
		'minecraft:spruce',
		'minecraft:jungle',
		'minecraft:acacia',
		'minecraft:dark_oak',
		'minecraft:mangrove',
		'minecraft:cherry',
		'minecraft:bamboo',
		'ecologics:coconut',
		'ecologics:walnut',
		'botania:livingwood',
		'botania:dreamwood',
		'window_box:chthonic_yew',
		'window_box:alfthorne',
		'ars_nouveau:archwood',
		'evilcraft:undead',
		'minecraft:mushroom',
		'enhanced_mushrooms:mushroom',
		'quark:azalea',
		'alexscaves:thornwood',
		'alexscaves:pewen',
		'quark:blossom',
		'quark:ancient',
		'snifferplus:stone_pine',
		'upgrade_aquatic:driftwood',
		'betterarcheology:rotten',
		'born_in_chaos_v1:scorched',
		'upgrade_aquatic:river',
		'minecraft:crimson',
		'minecraft:warped',
		'mynethersdelight:powdery',
		'netherexp:smokestalk',
		'architects_palette:twisted',
		'twilight_forest:twilight_oak',
		'twilight_forest:canopy',
		'twilight_forest:dark',
		'twilight_forest:time',
		'twilight_forest:transformation',
		'twilight_forest:mining',
		'netherexp:claret',
		'aether:skyroot',
		'aether_redux:fieldsproot',
		'aether_redux:crystal',
		'aether_redux:glacia',
		'aether_redux:cloudcap',
		'aether_redux:blightwillow',
		'aether_redux:jellyshroom',
		'cataclysm:chorus',
		'unusualend:chorus_nest',
		'unusualend:stripped_chorus_nest',
		'phantasm:pream',
		'witherstormmod:tainted',

	]
	const orderedWoodTypes = [];
	woodTypeOrder.forEach(type => {
		if (woodTypes.includes(type)) orderedWoodTypes.push(type);
	});
	woodTypes.forEach(type => {
		if (!orderedWoodTypes.includes(type)) orderedWoodTypes.push(type);
	});
	woodTypes = orderedWoodTypes;

	function everyComp(namespace) {
		switch (namespace) {
			case 'quark': return 'q';
			case 'handcrafted': return 'hc';
			case 'hearth_and_home': return 'hnhome';
			case 'farmersdelight': return 'fd';
			case 'twilightforest': return 'tf';
			case 'architects_palette': return 'ap';
			default: return namespace;
		}
	}

	// Datagen for some stuff begigs here
	for (let j = 0; j < flagList.length; j++) {
		let flag = flagList[j];
		let bannerID = `minecraft:${flag.replace('supplementaries:flag_', '')}_banner`;

		EMIEdit.push([bannerID, flag]);
	}

	function addOneAfterAnother(list, after) {
		let sortedList = list.sort();
		let lastAdded = sortedList[0];
		EMIEdit.push([after, lastAdded])
		for (let j = 1; j < sortedList.length; j++) {
			let entry = sortedList[j]
			EMIEdit.push([lastAdded, entry])
			lastAdded = entry;
		}
	}
	addOneAfterAnother(musicDiscs, 'minecraft:jukebox')
	addOneAfterAnother(potterySherds, 'minecraft:decorated_pot')
	addOneAfterAnother(bannerPatterns, 'minecraft:loom')
	addOneAfterAnother(smithingTemplates, 'minecraft:smithing_table')
	addOneAfterAnother(spawnEggs, 'minecraft:spawner')

	candles.forEach(candle => {
		if (candle === 'minecraft:candle') {
			EMIEdit.push([candle, 'the_bumblezone:super_candle']);
			EMIEdit.push(['the_bumblezone:super_candle', 'supplementaries:candle_holder']);
			EMIEdit.push(['supplementaries:candle_holder', 'suppsquared:gold_candle_holder']);
		}
		else {
			let color = candle.replace('minecraft:', '').replace('_candle', '');

			let superCandle = `the_bumblezone:super_candle_${color}`,
				holder = `supplementaries:candle_holder_${color}`,
				goldenHolder = `suppsquared:gold_candle_holder_${color}`;

			EMIEdit.push([candle, superCandle]);
			EMIEdit.push([superCandle, holder]);
			EMIEdit.push([holder, goldenHolder]);
		}
	})

	// Build item order chain for each wood type
	let latestAddedCache = "minecraft:oak_log";
	for (let j = 0; j < woodTypes.length; j++) {
		let woodType = woodTypes[j];
		let woodTypeSplit = woodType.split(':');
		let typeNamespace = woodTypeSplit[0]; // e.g. "minecraft" or "biomesoplenty"
		let typeName = woodTypeSplit[1];      // e.g. "oak"

		for (let i = 0; i < woodsetOrder.length; i++) {
			let furnitureType = woodsetOrder[i];

			switch (woodType) {
				case 'minecraft:oak': {
					switch (furnitureType) {
						case 'quark:bookshelf':
							itemID = 'minecraft:bookshelf'
							EMIEdit.push([latestAddedCache, itemID]);
							latestAddedCache = itemID;
							continue;
						case 'quark:ladder':
							itemID = 'minecraft:ladder'
							EMIEdit.push([latestAddedCache, itemID]);
							latestAddedCache = itemID;
							continue;
						case 'suppsquared:item_shelf':
							itemID = 'supplementaries:item_shelf'
							EMIEdit.push([latestAddedCache, itemID]);
							latestAddedCache = itemID;
							continue;
					}
					break;
				}
				case 'ecologis:flowering_azalea':
				case 'ecologics:azalea': {
					continue;
				}
				case 'upgrade_aquatic:driftwood': {
					switch (furnitureType) {
						case 'wood':
							itemID = 'upgrade_aquatic:driftwood'
							EMIEdit.push([latestAddedCache, itemID]);
							latestAddedCache = itemID;
							continue;
						case 'stripped_X_wood':
							itemID = 'upgrade_aquatic:stripped_driftwood'
							EMIEdit.push([latestAddedCache, itemID]);
							latestAddedCache = itemID;
							continue;
					}
				}
				// case 'ars_nouveau:archwood': {
				// 	switch (furnitureType) {
				// 		case 'log': {
				// 			for (let l = 0; l < archwoodLogs.length; l++) {
				// 				let log = archwoodLogs[l];
				// 				EMIEdit.push([latestAddedCache, log]);
				// 				latestAddedCache = log;
				// 			}
				// 			continue;
				// 		}
				// 		case 'stripped_X_log': {
				// 			for (let l = 0; l < archwoodLogs.length; l++) {
				// 				let log = archwoodLogs[l].replace(':', ':stripped_');
				// 				EMIEdit.push([latestAddedCache, log]);
				// 				latestAddedCache = log;
				// 			}
				// 			continue;
				// 		}
				// 		case 'wood': {
				// 			for (let l = 0; l < archwoodLogs.length; l++) {
				// 				let log = archwoodLogs[l].replace('log', 'wood');
				// 				EMIEdit.push([latestAddedCache, log]);
				// 				latestAddedCache = log;
				// 			}
				// 			continue;
				// 		}
				// 		case 'wood': {
				// 			for (let l = 0; l < archwoodLogs.length; l++) {
				// 				let log = archwoodLogs[l].replace('log', 'wood').replace(':', ':stripped_');
				// 				EMIEdit.push([latestAddedCache, log]);
				// 				latestAddedCache = log;
				// 			}
				// 			continue;
				// 		}
				// 	}
				// }
			}

			// Replace _X_ placeholder with actual wood type (e.g. "oak")
			if (furnitureType.includes('_X_')) {
				furnitureType = furnitureType.replace('_X_', `_${typeName}_`);
			}

			let itemID = null;

			if (furnitureType.includes(':')) {
				let [ns, path] = furnitureType.split(':');

				// If the entry already includes the actual wood type name (after _X_ replacement),
				// we should try that exact string first
				if (path.includes(typeName)) {
					itemID = `${ns}:${path}`;
					if (!Item.exists(itemID)) {
						// fallback: everycomp variant
						itemID = `everycomp:${everyComp(ns)}/${typeNamespace}/${path}`;
					}
				} else if (ns === 'supplementaries' || ns === 'suppsquared') {
					itemID = `${ns}:${path}_${typeName}`;
					if (!Item.exists(itemID)) {
						itemID = `${ns}:${typeNamespace}/${path}_${typeName}`;
					}
				} else {
					itemID = `${ns}:${typeName}_${path}`;
					if (!Item.exists(itemID)) {
						if (furnitureType === 'quark:vertical_slab') {
							itemID = `v_slab_compat:${typeNamespace}/${typeName}_${path}`;
						} else {
							itemID = `everycomp:${everyComp(ns)}/${typeNamespace}/${typeName}_${path}`;
						}
					}
				}
			} else {
				// non-namespaced entries, decide how to construct id:
				// If furnitureType already contains the typeName (e.g. "stripped_oak_log"),
				// then the correct id is "namespace:furnitureType" (e.g. "minecraft:stripped_oak_log")
				if (furnitureType.includes(typeName)) {
					itemID = `${typeNamespace}:${furnitureType}`;
				} else {
					// normal case (e.g. "log" -> "minecraft:oak_log")
					itemID = `${woodType}_${furnitureType}`; // e.g. "minecraft:oak_log"
					if (!Item.exists(itemID)) {
						// fallback e.g. "minecraft:oak_planks_stairs" vs "minecraft:oak_planks_stairs" edgecases
						itemID = `${woodType}_planks_${furnitureType}`;
					}
				}
			}

			if (!itemID || itemID === "minecraft:oak_log" || !Item.exists(itemID)) continue;

			EMIEdit.push([latestAddedCache, itemID]);
			latestAddedCache = itemID;
		}
	}



	// const colorOrder = [
	// 	'white',
	// 	'light_gray',
	// 	'gray',
	// 	'black',
	// 	'brown',
	// 	'red',
	// 	'orange',
	// 	'yellow',
	// 	'lime',
	// 	'green',
	// 	'cyan',
	// 	'light_blue',
	// 	'blue',
	// 	'purple',
	// 	'magenta',
	// 	'pink',
	// ]

	// colorOrder.forEach(color => {

	// })

	verticalSlabs.forEach(vSlab => {
		for (let e = 0; e < EMIEdit.length; e++) {
			let entry = EMIEdit[e];
			if (entry[1] === vSlab) return;
		}

		let slab = vSlab.replace('v_slab_compat:', '').replace('_vertical', '').split('/');
		EMIEdit.push([`${slab[0]}:${slab[1]}`, vSlab]);
	})

	// Build EMI JSON
	let edit = {
		removed: [
			// 'item:minecraft:enchanted_book',
			'item:minecraft:suspicious_stew',
			'item:minecraft:lingering_potion',
			'item:minecraft:splash_potion',
			'item:minecraft:tipped_arrow',
			'item:alexscaves:jelly_bean',
			'item:mythicmetals:tipped_runite_arrow'
		],
		added: [],
		filters: [
			// '/minecraft:enchanted_book/',
			'/minecraft:suspicious_stew/',
			'/minecraft:lingering_potion/',
			'/minecraft:splash_potion/',
			'/minecraft:tipped_arrow/',
			'/mythicmetals:tipped_runite_arrow/',
			'/alexscaves:jelly_bean/',
			'/spawn_egg/'
		]
	};

	function stack(id) {
		return `item:${id}`;
	}
	EMIEdit.forEach(([after, item]) => {
		edit.removed.push(stack(item));
		edit.added.push({ stack: stack(item), after: stack(after) });
		edit.filters.push(`/${item.replace('/', '\\/')}/`);
	});

	// // Add enchantment books
	// const $ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
	// const $EnchantmentsBegone = Java.loadClass('org.violetmoon.quark.content.experimental.module.EnchantmentsBegoneModule')
	// /** @type {Internal.Enchantment_[]} */
	// const allEnchants = $ForgeRegistries.ENCHANTMENTS.getValues().toArray().sort();

	// let addAfter = 'enchantinginfuser:enchanting_infuser'
	// for (let e = 0; e < allEnchants.length; e++) {
	// 	let enchant = allEnchants[e];

	// 	if ($EnchantmentsBegone.shouldBegone(enchant) || enchant.getDescriptionId() === 'enchantment.cofh_core.disabled') continue;

	// 	let book = `minecraft:enchanted_book{StoredEnchantments:[{id:"${enchant.getId()}", lvl:${enchant.getMaxLevel().toString().replace('.0', '')}s}]}`

	// 	edit.added.push({ stack: stack(book), after: stack(addAfter) });

	// 	addAfter = book;
	// }

	JsonIO.write('kubejs/assets/emi/index/stacks/edit_item_order.json', edit);
});
