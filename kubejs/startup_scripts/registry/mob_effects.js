const $UUID = Java.loadClass('java.util.UUID')

StartupEvents.registry('mob_effect', registry => {
	registry.create('armor_shred')
		.color(Color.of('#b6b6b6'))
		.harmful()
		.modifyAttribute('generic.armor',
			'da18d70a-3381-4a10-a22a-340a537cb714',
			-0.25,
			"multiply_total"
		);

	registry.create('rapid_healing')
		.color(Color.of('#F82423'))
		.beneficial()
		.effectTick((entity, level) => {
			if (entity.age % 10 == 0) {
				entity.heal(1);
			}
		})

	registry.create('prometheum_regeneration')
		.color(Color.of('#F82423'))
		.beneficial()
		.effectTick((entity, level) => {
			if (entity.age % 20 == 0) {
				entity.heal(0.5);
			}
		})
})
