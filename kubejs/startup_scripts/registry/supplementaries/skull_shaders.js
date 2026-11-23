const SupplementariesSkullShaders = {
	gaia_head: {
		items: ['botania:gaia_head'],
		entity_types: ['botania:gaia_guardian'],
		shader: 'window_box:witch_pupil',
	},
	piglin_head: {
		items: ['minecraft:piglin_head'],
		entity_types: ['minecraft:piglin'],
		shader: 'aether:sun_spirit',
	},
	mutant_skeleton_skull: {
		items: ['mutantmonsters:mutant_skeleton_skull'],
		entity_types: ['mutantmonsters:mutant_skeleton'],
		shader: 'supplementaries:black_and_white',
	},
	draugr_head: {
		items: ['cataclysm:draugr_head'],
		entity_types: [
			'cataclysm:draugr',
			'cataclysm:elite_draugr',
			'cataclysm:royal_draugr'
		],
		shader: 'quark:cool',
	},
	chimpanzee_head: {
		items: ['neapolitan:chimpanzee_head'],
		entity_types: ['neapolitan:chimpanzee'],
		shader: 'quark:oversaturate',
	}
};

for (let [key, data] of Object.entries(SupplementariesSkullShaders)) {
	JsonIO.write('kubejs/assets/adj/mob_head_effects/' + key + '.json', data)
}
