StartupEvents.registry('fluid', event => {
	const vineryWines = {
		'vinery:noir_wine': 0x1C193B,
		'vinery:red_wine': 0xB8273B,
		'vinery:strad_wine': 0x362624,
		'vinery:cherry_wine': 0x7D100F,
		'vinery:cristel_wine': 0xEB7C7C,
		'vinery:lilitu_wine': 0xA42838,
		'vinery:jo_special_mixture': 0xE62C3C,
		'vinery:bolvar_wine': 0xE35E5E,
		'vinery:chorus_wine': 0xAF1FBF,
		'vinery:magnetic_wine': 0x641F32,
		'vinery:stal_wine': 0xDF2424,
		'vinery:chenet_wine': 0xB54646,
		'vinery:bottle_mojang_noir': 0x4A444C,
		'nethervinery:blazewine_pinot': 0xF25523,
		'nethervinery:netherite_nectar': 0xDA1D2B,
		'nethervinery:lava_fizz': 0xC42200,
		// 'nethervinery:improved_lava_fizz': 'none',
		'vinery:mellohi_wine': 0x9FB589,
		'vinery:glowing_wine': 0xFCCF54,
		'vinery:solaris_wine': 0xCEAE57,
		'vinery:creepers_crush': 0xC5E755,
		'vinery:kelp_cider': 0x4AF6A8,
		'vinery:eiswein': 0x82D7FC,
		'vinery:aegis_wine': 0xEBD382,
		'vinery:villagers_fright': 0x8F96AE,
		'vinery:clark_wine': 0xA7A7A7,
		'vinery:jellie_wine': 0xDB7786,
		'vinery:apple_cider': 0xD1AD75,
		'vinery:apple_wine': 0xD6D375,
		// 'vinery:mead': 'none',
		'nethervinery:ghastly_grenache': 0x28BE92,
		'nethervinery:nether_fizz': 0xC86EC5,
		// 'nethervinery:improved_nether_fizz': 'none',

		'vinery:red_grapejuice': 0x412345,
		'vinery:white_grapejuice': 0x6A8268,
		'vinery:red_taiga_grapejuice': 0x412345,
		'vinery:white_taiga_grapejuice': 0x6A8268,
		'vinery:red_jungle_grapejuice': 0x46144A,
		'vinery:white_jungle_grapejuice': 0x1B714D,
		'vinery:red_savanna_grapejuice': 0x5C316F,
		'vinery:white_savanna_grapejuice': 0x668056,
		'nethervinery:crimson_grapejuice': 0xBD0645,
		'nethervinery:warped_grapejuice': 0x208B87,

		'croptopia:apple_juice': 0xE0AB1F,
	}

	for (const [wine, color] of Object.entries(vineryWines)) {
		let id = wine.split(':')[1];
		event.create(id)
			.thinTexture(color)
			.bucketColor(0x00FFFF)
			.displayName(global.toTitleCase(id.replace('_', ' ').replace('_', ' ').replace('_', ' ')))
			.noBucket()
			.noBlock()
	}
})
