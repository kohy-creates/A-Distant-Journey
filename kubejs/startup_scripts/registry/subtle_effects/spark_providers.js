

const SubtleEffectsSparkColors = {
	torch: [0xFFD800, 0xFF6A00],
	copper: [0x46824D, 0x99EB99],
	bluestone: [0x2B5CFF, 0x142A75],
	animated: [0xFF5511, 0x752708],
	powdery: [0xFFC422, 0x755A0F],
	jelly: [0xA6E7FF, 0x4C6A75],
	dream: [0x9999FF, 0x464675],
	ancient: [0xD91E2A, 0x630E13],
	ambrosium: [0xF5F2B8, 0x706F54],
	tainted: [0xC832FF, 0x5C1775],
	palm: [0xFF7B00, 0x753800],
	bioluminescent: [0xA6E7FF, 0x4C6A75],
	remembrance: [0xF2C2A2, 0x6F594A],
	squid: [0x2B9E9E, 0x144848],
	living: [0xB8E64C, 0x546923],
	redstone: [0xFF1A00, 0x750C00],
	ender: [0xD98CFF, 0x634075],
	magic_fire: [0xF7EB9C, 0xE5A978, 0xC44553, 0xCFA3E8],
	heart_lantern: [0xFF2E4C, 0x751523],
	tooth_lantern: [0x8CE5FF, 0x406975],
	plasma_lantern: [0x33FF44, 0x17751F],
	wynd_lantern: [0x9CF2E2, 0x476F67],
	sun_lantern: [0xFF7A1A, 0x75380C],
	acidian_lantern: [0xCC00FF, 0x5D0075],
};

const SubtleEffectsSparkProviders = {
	copper_torch: {
		states: [
			'minecraft:copper_torch'
		],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.copper,
		addWallTorch: true
	},
	dream_torch: {
		states: ['antarchy:dream_torch'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.dream,
		addWallTorch: true
	},
	remembrance_torch: {
		states: ['antarchy:remembrance_torch'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.remembrance,
		addWallTorch: true
	},
	ender_torch: {
		states: ['endergetic:ender_torch'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.ender,
		addWallTorch: true
	},
	redstone_torch: {
		states: ['minecraft:redstone_torch'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.redstone,
		addWallTorch: true
	},
	squid_lamp: {
		states: ['etcetera:squid_lamp'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.squid
	},
	wall_squid_lamp: {
		states: ['etcetera:wall_squid_lamp'],
		preset: 'wall_torch',
		colors: SubtleEffectsSparkColors.squid
	},
	living_torch: {
		states: ['brazier:living_torch'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.living,
		addWallTorch: true
	},
	bluestone_torch: {
		states: ['antarchy:bluestone_torch'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.bluestone,
		addWallTorch: true
	},
	gem_stone_torch: {
		states: ['evilcraft:gem_stone_torch'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.torch,
		addWallTorch: true
	},
	animated_torch: {
		states: ['botania:animated_torch'],
		preset: 'lantern',
		colors: SubtleEffectsSparkColors.redstone,
		addWallTorch: true
	},
	powdery_torch: {
		states: ['mynethersdelight:powdery_torch'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.powdery,
		addWallTorch: true
	},
	jelly_torch: {
		states: ['tide:jelly_torch'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.jelly,
		addWallTorch: true
	},
	ancient_torch: {
		states: ['netherexp:ancient_torch'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.ancient,
		addWallTorch: true
	},
	ambrosium_torch: {
		states: ['aether:ambrosium_torch'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.ambrosium,
		addWallTorch: true
	},
	tainted_torch: {
		states: ['witherstormmod:tainted_torch'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.tainted,
		addWallTorch: true
	},
	palm_torch: {
		states: ['beachparty:palm_torch'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.palm,
		addWallTorch: true
	},
	tall_palm_torch: {
		states: [{ name: 'beachparty:tall_palm_torch', Properties: { half: 'upper' } }],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.palm
	},
	bioluminescent_torch: {
		states: ['alexscaves:bioluminescent_torch'],
		preset: 'torch',
		colors: SubtleEffectsSparkColors.bioluminescent,
		addWallTorch: true
	},
	dream_campfire: {
		states: [{ name: 'antarchy:dream_campfire', Properties: { lit: 'true' } }],
		preset: 'campfire',
		colors: SubtleEffectsSparkColors.dream
	},
	ender_campfire: {
		states: [{ name: 'endergetic:ender_campfire', Properties: { lit: 'true' } }],
		preset: 'campfire',
		colors: SubtleEffectsSparkColors.ender
	},
	ancient_campfire: {
		states: [{ name: 'netherexp:ancient_campfire', Properties: { lit: 'true' } }],
		preset: 'campfire',
		colors: SubtleEffectsSparkColors.ancient
	},
	ambrosium_campfire: {
		states: [{ name: 'ancient_aether:ambrosium_campfire', Properties: { lit: 'true' } }],
		preset: 'campfire',
		colors: SubtleEffectsSparkColors.ambrosium
	},
	ender_fire: {
		states: ['endergetic:ender_fire'],
		preset: 'fire',
		colors: SubtleEffectsSparkColors.ender
	},
	ancient_fire: {
		states: ['netherexp:ancient_fire'],
		preset: 'fire',
		colors: SubtleEffectsSparkColors.ancient
	},
	magic_fire: {
		states: ['ars_nouveau:magic_fire'],
		preset: 'fire',
		colors: SubtleEffectsSparkColors.magic_fire
	},
	life_crystal: {
		states: ['heart_crystals:heart_crystal'],
		preset: 'campfire',
		colors: SubtleEffectsSparkColors.heart_lantern
	},
	heart_lantern: {
		states: ['heart_crystals:heart_lantern'],
		preset: 'lantern',
		colors: SubtleEffectsSparkColors.heart_lantern
	},
	tooth_lantern: {
		states: ['upgrade_aquatic:tooth_lantern'],
		preset: 'lantern',
		colors: SubtleEffectsSparkColors.tooth_lantern
	},
	plasma_lantern: {
		states: ['scguns:plasma_lantern'],
		preset: 'lantern',
		colors: SubtleEffectsSparkColors.plasma_lantern
	},
	copper_lantern: {
		states: [
			'minecraft:copper_lantern',
			'minecraft:exposed_copper_lantern',
			'minecraft:weathered_copper_lantern',
			'minecraft:oxidized_copper_lantern',
			'minecraft:waxed_copper_lantern',
			'minecraft:waxed_exposed_copper_lantern',
			'minecraft:waxed_weathered_copper_lantern',
			'minecraft:waxed_oxidized_copper_lantern'
		],
		preset: 'lantern',
		colors: SubtleEffectsSparkColors.copper
	},
	living_lantern: {
		states: ['brazier:living_lantern'],
		preset: 'lantern',
		colors: SubtleEffectsSparkColors.living
	},
	wynd_lantern: {
		states: ['ancient_aether:wynd_lantern'],
		preset: 'lantern',
		colors: SubtleEffectsSparkColors.wynd_lantern
	},
	sun_lantern: {
		states: ['ancient_aether:sun_lantern'],
		preset: 'lantern',
		colors: SubtleEffectsSparkColors.sun_lantern
	},
	ancient_lantern: {
		states: ['netherexp:ancient_lantern'],
		preset: 'lantern',
		colors: SubtleEffectsSparkColors.ancient
	},
	ars_nouveau_lanterns_and_fairylights: {
		states: [
			'ars_additions:sourcestone_lantern',
			'ars_additions:polished_sourcestone_lantern',
			'ars_additions:archwood_lantern',
			'ars_additions:golden_lantern',
			{ name: 'fairylights:oil_lantern', Properties: { lit: 'true' } },
			{ name: 'fairylights:candle_lantern', Properties: { lit: 'true' } },
			{ name: 'fairylights:ghost_light', Properties: { lit: 'true' } },
			{ name: 'fairylights:paper_lantern', Properties: { lit: 'true' } },
			{ name: 'fairylights:orb_lantern', Properties: { lit: 'true' } },
			{ name: 'fairylights:oil_lantern_light', Properties: { lit: 'true' } },
			{ name: 'fairylights:candle_lantern_light', Properties: { lit: 'true' } },
			{ name: 'fairylights:jack_o_lantern', Properties: { lit: 'true' } },
			{ name: 'fairylights:moon_light', Properties: { lit: 'true' } },
			{ name: 'fairylights:star_light', Properties: { lit: 'true' } }
		],
		preset: 'lantern',
		colors: SubtleEffectsSparkColors.torch
	},
	wayward_lantern: {
		states: ['domesticationinnovations:wayward_lantern'],
		preset: 'campfire',
		colors: SubtleEffectsSparkColors.torch
	},
	amrosium_lantern: {
		states: [
			'ancient_aether:ambrosium_lantern',
			'aether_redux:sentrite_lantern'
		],
		preset: 'lantern',
		colors: SubtleEffectsSparkColors.ambrosium
	},
	ender_lantern: {
		states: ['endergetic:ender_lantern'],
		preset: 'lantern',
		colors: SubtleEffectsSparkColors.ender
	},
	dream_lantern: {
		states: ['antarchy:dream_lantern'],
		preset: 'lantern',
		colors: SubtleEffectsSparkColors.dream
	},
	acidian_lantern: {
		states: ['endergetic:acidian_lantern'],
		preset: 'campfire',
		colors: SubtleEffectsSparkColors.acidian_lantern
	},
};

for (let [key, data] of Object.entries(SubtleEffectsSparkProviders)) {
	let json = {
		states: [],
		options: {
			preset: data.preset,
			color: {
				type: 'subtle_effects:list',
				providers: []
			}
		},
	};

	data.states.forEach(state => {
		if (global.isString(state)) json.states.push({ name: state });
		else json.states.push(state);
	});

	data.colors.forEach(col => {
		json.options.color.providers.push({
			type: 'subtle_effects:constant',
			color: col
		});
	});

	JsonIO.write('kubejs/assets/adj/subtle_effects/spark_providers/' + key + '.json', json);

	if (data.addWallTorch) {
		for (let i = 0; i < json.states.length; i++) {
			let state = json.states[i];
			state.name = state.name.replace('torch', 'wall_torch');
			json.states[i] = state;
		}
		json.options.preset = 'wall_torch';
		JsonIO.write('kubejs/assets/adj/subtle_effects/spark_providers/' + key.replace('torch', 'wall_torch') + '.json', json);
	}
}
