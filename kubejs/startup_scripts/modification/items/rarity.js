ItemEvents.modification(event => {

	event.modify('@confluence', item => {
		item.rarity = 'common';
	});

	event.modify([
		/.*diamond.*/,
		'turtle_helmet',
		/orichalcum/,
		/mythril/,
		/palladium/,
		'ars_nouveau:novice_spell_book'
	], item => {
		item.rarity = 'uncommon';
	});

	event.modify([
		'ancient_debris',
		/.*netherite.*/,
		'netherexp:nether_pizza',
		/adamantite/,
		'ars_nouveau:apprentice_spell_book',
		/gravitite/
	], item => {
		item.rarity = 'rare';
	});

	event.modify([
		/majruszsdifficulty\:enderium\_.*/,
		/moresnifferflowers\:giant_/,
		/creative/,
		'ars_nouveau:archmage_spell_book',
		/treasure_bag/
	], item => {
		item.rarity = 'epic'
	});

	// event.modify([
	// 	'majruszsdifficulty:evoker_fang_scroll',
	// 	'majruszsdifficulty:sonic_boom_scroll',
	// 	'majruszsdifficulty:ender_pouch',
	// 	'majruszsdifficulty:enderium_shard_locator',
	// 	'majruszsdifficulty:soul_jar',
	// 	'majruszsdifficulty:wither_sword',
	// 	/treasure_bag/
	// ], item => {
	// 	item.rarity = 'alexscaves:rainbow'
	// });

	// event.modify([
	// 	'botania:gaia_pylon',
	// 	'botania:gaia_head',
	// 	'botanicadds:gaia_plate',
	// 	'botania:gaia_spreader',
	// ], item => {
	// 	item.rarity = 'botanicaddsgaiasteel'
	// })
});
