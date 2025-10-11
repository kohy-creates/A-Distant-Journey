StartupEvents.postInit(event => {

	// put after | item
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

		// ["minecraft:oak_trapdoor", "minecraft:ladder"]

	]

	// Bootleg datagen for those
	let woodTypes = [];
	Item.list.toArray().forEach(item => {
		const id = item.id;

		// let has = false;
		// EMIEdit.forEach(entry => {
		// 	if (entry[1] === id) {
		// 		has = true;
		// 	}
		// })

		if (id.includes('_planks') && !id.includes('_planks_')) {
			woodTypes.push(id.replace('_planks', ''))
		}

		// if (has) return;

		// if (id.includes('v_slab_compat')) {
		// 	const itemid = id.split(':');

		// 	EMIEdit.push([`${itemid[0]}:${itemid[1].replace('_vertical', '')}`, id])
		// }
		// else if (id.includes('sign')) {
		// 	if (id.includes('hanging')) {

		// 		EMIEdit.push([id.replace('_hanging', ''), id])
		// 	}
		// 	else if (id.includes('post')) {
		// 		if (id.includes('/')) {
		// 			const itemid = id.split(':')[1].split('/');

		// 			EMIEdit.push([`${itemid[0]}:${itemid[1].replace('sign_post_', '')}_sign`, id])
		// 		}
		// 		else {
		// 			EMIEdit.push([id.replace('supplementaries', '').replace('sign_post_', '').append('_sign'), id])
		// 		}
		// 	}
		// 	else {
		// 		EMIEdit.push([id.replace('_sign', '_button'), id])
		// 	}
		// }
		// else if (id.includes('ladder')) {
		// 	if (id.include('everycomp')) {
		// 		const itemid = id.split('/');
		// 		EMIEdit.push([`${itemid[1]}:${itemid[2]}`])
		// 	}
		// 	else {
		// 		let trapdoorId = id.replace('_ladder', '_trapdoor');
		// 		if (!Item.exists(trapdoorId)) {
		// 			trapdoorId = `minecraft:${trapdoorId.split(':')[1]}`
		// 		}
		// 		EMIEdit.push([trapdoorId, id])
		// 	}
		// }
	})

	const woodsetOrder = [
		'log',
		'wood',
		'quark:post',
		'stripped_X_log',
		'stripped_X_wood',
		'quark:stripped_X_post',
		'planks',
		'quark:bookshelf',
		'handcrafted:bench',
		'handcrafted:chair',
		'handcrafted:dining_bench',
		'handcrafted:side_table',
		'handcrafted:desk',
		'handcrafted:nightstand',
		'handcrafted:table',
		'handcrafted:counter',
		'farmersdelight:cabinet',
		'handcrafted:fancy_bed',
		'supplementaries:item_shelf',
		'stairs',
		'slab',
		'quark:vertical_slab',
		'fence',
		'fence_gate',
		'door',
		'trapdoor',
		'quark:ladder',
		'hearth_and_home:lattice',
		'pressure_plate',
		'button',
		'sign',
		'supplementaries:sign_post',
		'hanging_sign',
		'boat',
		'chest_boat'
	]

	function everyComp(namespace) {
		switch (namespace) {
			case 'quark':
				return 'q';
			case 'handcrafted':
				return 'hc';
			case 'hearth_and_home':
				return 'hnhome';
		}
	}

	let latestAddedCache = "minecraft:oak_log";
	for (let j = 0; j < woodTypes.length; j++) {
		let woodType = woodTypes[j];

		for (let i = 0; i < woodsetOrder.length; i++) {
			let furnitureType = woodsetOrder[i];
			let itemID;

			if (furnitureType.includes(':')) {
				let type = furnitureType.split(':');

				if (type[0] === 'supplementaries') {
					let woodTypeSplit = woodType.split(':');

					itemID = `supplementaries:${type[1]}_${woodTypeSplit[1]}`
					if (!Item.exists(itemID)) {

						itemID = `supplementaries:${woodTypeSplit[0]}/${type[1]}_${woodTypeSplit[1]}`
					}
				}
				else {

					itemID = `${woodType}_${type[1]}`;
					if (!Item.exists(itemID)) {

						let woodTypeSplit = woodType.split(':');

						itemID = `${type[0]}_${woodTypeSplit[1]}_${type[1]}`;
						if (!Item.exists(itemID)) {
							if (furnitureType == 'quark:vertical_slab') {
								itemID = `v_slab_compat:${woodTypeSplit[0]}/${woodTypeSplit[1]}_${type[1]}`
							}
							else {
								itemID = `everycomp:${everyComp(type[0])}/${woodTypeSplit[0]}/${woodTypeSplit[1]}_${type[1]}`
							}
						}
					}
				}
			}
			else {
				itemID = `${woodType}_${furnitureType}`;
				if (!Item.exists(itemID)) {
					itemID = `${woodType}_planks_${furnitureType}`;
				}
			}
			if (itemID === "minecraft:oak_log") continue;

			if (!Item.exists(itemID)) continue;

			EMIEdit.push([latestAddedCache, itemID])
			latestAddedCache = itemID;
		}
	}

	let edit = {
		removed: [],
		added: [],
		filters: []
	};

	EMIEdit.forEach(entry => {

		function stack(item) {
			return `item:${item}`
		}

		const after = entry[0], item = entry[1];

		edit.removed.push(stack(item));

		edit.added.push({
			stack: stack(item),
			after: stack(after)
		});

		edit.filters.push(`/${item.replace('/', '\/')}/`)

	})

	JsonIO.write('kubejs/assets/emi/index/stacks/edit_item_order.json', edit)
});