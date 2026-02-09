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
		.modifyAttribute(
			'adjcore:generic.health_regeneration',
			'07d281d2-87ab-4078-b80f-d813aaf670c6',
			2.0,
			'addition'
		)

	registry.create('prometheum_regeneration')
		.color(Color.of('#F82423'))
		.beneficial()
		.modifyAttribute(
			'adjcore:generic.health_regeneration',
			'aeb5b123-26b9-454d-bff2-b80730a3369d',
			0.5,
			'addition'
		)

	registry.create('shadow_apparitions')
		.color(Color.of('#5300c0'))
		.harmful()
		.effectTick((entity, amplifier) => {
			if (Math.random() < (0.02 * (amplifier + 1))) {
				entity.attack(entity.level.damageSources().magic(), 8 + level);
				entity.level.playSound(null, entity.getPos(), 'simplyswords:dark_sword_attack_03');
			}
		})
})
