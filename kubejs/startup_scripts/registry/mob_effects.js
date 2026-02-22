/**
 * 
 * @param {Internal.Entity} entity 
 * @param {integer} amplifier 
 */
global.shadowApparitionsTick = function (entity, amplifier) {
	if (!entity.level.isClientSide()) {
		const chance = 0.05 * (amplifier + 1);

		if (Math.random() < chance) {
			const damage = 8 + amplifier;

			entity.attack(
				global.getDamageSource(entity.level, "minecraft:magic", null, null),
				damage
			);

			entity.level.playSound(
				null,
				entity.getPos(),
				'simplyswords:dark_sword_attack_03',
				'neutral'
			);
		}
	}
};

/**
 * 
 * @param {Internal.Entity} entity 
 * @param {integer} amplifier 
 */
global.voidStrikeTick = function (entity, amplifier, fromBow) {
	const level = entity.getLevel();
	if (!level.isClientSide()) {
		const data = entity.getPersistentData().voidStrike;
		if (!data) return;

		// Yes they are identical, but the point is I can edit them whenever
		const maxMul = (fromBow) ? 120 * (amplifier + 1) : 120 * (amplifier + 1);

		data.maxMul = maxMul;
		data.ticks++;

		const step = maxMul / 160;
		data.mul += step;

		if (data.ticks === 1) {
			level.playSound(null, new Vec3d(entity.x, entity.y + entity.getEyeHeight(), entity.z), 'adj:enchantment.void_strike.activate', 'neutral')
		}

		const box = entity.getBoundingBox();
		const pX = box.minX + (Math.random() * (box.maxX - box.minX))
		const pY = box.minY + (Math.random() * (box.maxY - box.minY))
		const pZ = box.minZ + (Math.random() * (box.maxZ - box.minZ))

		level.spawnParticles(
			'born_in_chaos_v1:darkspots', true,
			pX, pY, pZ,
			0, 0, 0,
			1, 0
		)

		if (data.ticks === 160) {
			entity.getPersistentData().remove('voidStrike');
			level.playSound(null, new Vec3d(entity.x, entity.y + entity.getEyeHeight(), entity.z), 'adj:enchantment.void_strike.deactivate', 'neutral');
		}
	}
}

StartupEvents.registry('mob_effect', registry => {
	registry.create('armor_shred')
		.color(Color.of('#b6b6b6'))
		.harmful()
		.modifyAttribute(
			'generic.armor',
			'da18d70a-3381-4a10-a22a-340a537cb714',
			-0.25,
			"multiply_total"
		);

	registry.create('pierced')
		.color(Color.of('#b6b6b6'))
		.harmful()
		.modifyAttribute(
			'generic.armor',
			'bb16f1eb-2b11-462f-820a-dcfc26f44228',
			-5,
			'addition'
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
		.effectTick((entity, amplifier) => global.shadowApparitionsTick(entity, amplifier))

	registry.create('void_strike')
		.color(Color.of('#5300c0'))
		.harmful()
		.effectTick((entity, amplifier) => global.voidStrikeTick(entity, amplifier, false))

	registry.create('void_shot')
		.color(Color.of('#5300c0'))
		.harmful()
		.effectTick((entity, amplifier) => global.voidStrikeTick(entity, amplifier, true))

	registry.create('echo_cooldown')
		.color(Color.of('#FFFFFF'))
		.beneficial()

	registry.create('rampage')
		.color(Color.DARK_RED)
		.beneficial()
		.modifyAttribute(
			'minecraft:generic.attack_speed',
			'72cb6926-2df2-4fd2-b1af-99ee1199ef91',
			'0.075',
			'multiply_base'
		)
		.modifyAttribute(
			'minecraft:generic.attack_damage',
			'72cb6926-2df2-4fd2-b1af-99ee1199ef91',
			'0.065',
			'multiply_base'
		)
})
