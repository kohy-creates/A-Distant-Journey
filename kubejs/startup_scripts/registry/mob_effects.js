global.effectTick = {};

/**
 * 
 * @param {Internal.Entity} entity 
 * @param {integer} amplifier 
 */
global.effectTick.shadowApparitionsTick = function (entity, amplifier) {
	if (!entity.level.isClientSide()) {
		const chance = 3.5 * (amplifier + 1);

		if (global.ifRandomChance(chance)) {
			const damage = (7 + amplifier) * (global.getRandomNumber(0.85, 1.15));
			const level = entity.level;
			const pos = entity.pos;

			entity.attack(
				global.getDamageSource(level, "minecraft:magic", null, null),
				damage
			);

			// level.playSound(
			// 	null,
			// 	pos,
			// 	'simplyswords:dark_sword_attack_03',
			// 	'neutral'
			// );

			level.spawnParticles(
				global.ifRandomChance(50) ? 'sweep_attack' : 'mcdw:offhand_sweep',
				true,
				entity.x + entity.getBbWidth() * (global.getRandomNumber(-0.5, 0.5)) * 1.5,
				entity.y + entity.getEyeHeight() * (global.getRandomNumber(0, 0.5) + 0.45),
				entity.z + entity.getBbWidth() * (global.getRandomNumber(-0.5, 0.5)) * 1.5,
				0, 0, 0,
				1, 0
			);
		}
	}
};

/**
 * 
 * @param {Internal.Entity} entity 
 * @param {integer} amplifier 
 */
global.effectTick.voidStrikeTick = function (entity, amplifier, fromBow) {
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
			level.playSound(null, new Vec3d(entity.x, entity.y + entity.getEyeHeight(), entity.z), 'adj:enchantment.void_strike.activate', 'neutral');
		}

		const box = entity.getBoundingBox();
		const pX = box.minX + (Math.random() * (box.maxX - box.minX));
		const pY = box.minY + (Math.random() * (box.maxY - box.minY));
		const pZ = box.minZ + (Math.random() * (box.maxZ - box.minZ));

		level.spawnParticles(
			'born_in_chaos_v1:darkspots', true,
			pX, pY, pZ,
			0, 0, 0,
			1, 0
		);

		if (data.ticks === 160) {
			entity.getPersistentData().remove('voidStrike');
			level.playSound(null, new Vec3d(entity.x, entity.y + entity.getEyeHeight(), entity.z), 'adj:enchantment.void_strike.deactivate', 'neutral');
		}
	}
};

StartupEvents.registry('mob_effect', registry => {

	/**
	 * @param {string} id 
	 * @param {Internal.Color_} color 
	 * @param {string} description 
	 * @param {'beneficial' | 'harmful' | undefined} type 
	 * @returns {Internal.BasicMobEffect$Builder_}
	 */
	function create(id, color, description, type) {
		let builder = registry.create(id).color(color);
		global.addTranslation(`effect.kubejs.${id}.desc`, description);

		if (type == 'beneficial') builder.beneficial();
		else if (type == 'harmful') builder.harmful();

		return builder;
	}

	create('armor_shred', Color.of('#b6b6b6'), 'Reduces defense by 20% per level.', 'harmful')
		.modifyAttribute(
			global.attribute('armor'),
			global.uuid('armor_shred'),
			-0.2,
			'multiply_total'
		);

	create('rapid_healing', Color.of('#F82423'), 'Increased health regeneration.', 'beneficial')
		.modifyAttribute(
			global.attribute('health_regen'),
			global.uuid('rapid_healing'),
			2.0,
			'addition'
		);

	create('prometheum_regeneration', Color.of('#F82423'), 'Ahh, yes, photosynthesis <3', 'beneficial')
		.modifyAttribute(
			global.attribute('health_regen'),
			global.uuid('prometheum_regeneration'),
			2.5,
			'addition'
		);

	create('shadow_apparitions', Color.of('#5300c0'), 'Shadow apparitions claw at you from the shadows.', 'harmful')
		.effectTick((entity, amplifier) => global.effectTick.shadowApparitionsTick(entity, amplifier));

	create('void_strike', Color.of('#5300c0'), 'Applies a rising damage multiplier.', 'harmful')
		.effectTick((entity, amplifier) => global.effectTick.voidStrikeTick(entity, amplifier, false));

	create('void_shot', Color.of('#5300c0'), 'Applies a rising damage multiplier.', 'harmful')
		.effectTick((entity, amplifier) => global.effectTick.voidStrikeTick(entity, amplifier, true));

	create('echo_cooldown', Color.of('#FFFFFF'), 'Prevents Echo from working.');

	create('rampage', Color.DARK_RED, 'I\'M SO FOCKEN ANGRY!!', 'beneficial')
		.modifyAttribute(
			global.attribute('attack_speed'),
			global.uuid('rampage'),
			0.075,
			'multiply_base'
		)
		.modifyAttribute(
			global.attribute('damage'),
			global.uuid('rampage'),
			0.065,
			'multiply_base'
		);

	create('melfork_form', Color.of('#00FFFF'), 'Breathe underwater and swim as swfitly as a... well, melfork.', 'beneficial')
		.modifyAttribute(
			global.attribute('swim_speed'),
			global.uuid('melfork_form'),
			0.6,
			'multiply_base'
		);

	create('werewolf_form', Color.of('#ffffff83'), 'Minor improvement to all stats. Awoooo!', 'beneficial')
		.modifyAttribute(
			global.attribute('armor'),
			global.uuid('werewolf_form'),
			3,
			'addition'
		)
		.modifyAttribute(
			global.attribute('attack_damage'),
			global.uuid('werewolf_form'),
			0.051,
			'multiply_base'
		)
		.modifyAttribute(
			global.attribute('movement_speed'),
			global.uuid('werewolf_form'),
			0.05,
			'multiply_base'
		)
		.modifyAttribute(
			global.attribute('attack_speed'),
			global.uuid('werewolf_form'),
			0.051,
			'multiply_base'
		)
		.modifyAttribute(
			global.attribute('crit_chance'),
			global.uuid('werewolf_form'),
			0.02,
			'addition'
		)
		.modifyAttribute(
			global.attribute('health_regen'),
			global.uuid('werewolf_form'),
			0.5,
			'addition'
		);

	create('seed_of_hope', Color.WHITE, 'Feeling hopeful for the future of the forest.', 'beneficial')
		.modifyAttribute(
			global.attribute('movement_speed'),
			global.uuid('seed_of_hope'),
			0.25,
			'multiply_base'
		)
		.modifyAttribute(
			global.attribute('health_regen'),
			global.uuid('seed_of_hope'),
			1,
			'addition'
		);

	create('phoenix_defense', Color.ORANGE_DYE, 'Grants health regeneration and bonus armor.', 'beneficial')
		.modifyAttribute(
			global.attribute('health_regen'),
			global.uuid('phoenix_defense'),
			3.5,
			'addition'
		)
		.modifyAttribute(
			global.attribute('armor'),
			global.uuid('phoenix_defense'),
			2,
			'addition'
		);

	create('defensive_stance', Color.DARK_PURPLE, 'High armor and damage reduction at the cost of movement speed.', 'beneficial')
		.modifyAttribute(
			global.attribute('armor'),
			global.uuid('defensive_stance'),
			20,
			'addition'
		)
		.modifyAttribute(
			global.attribute('damage_reduction'),
			global.uuid('defensive_stance'),
			0.05,
			'addition'
		)
		.modifyAttribute(
			global.attribute('movement_speed'),
			global.uuid('defensive_stance'),
			-0.35,
			'multiply_total'
		);

	create('shield_of_fire', Color.ORANGE_DYE, 'May the flames be my shield.', 'beneficial')
		.modifyAttribute(
			global.attribute('armor'),
			global.uuid('shield_of_fire'),
			4,
			'addition'
		);

	create('palladium_hero_aegis', Color.ORANGE_DYE, 'May the flames be my shield.', 'beneficial')
		.modifyAttribute(
			global.attribute('armor'),
			global.uuid('palladium_hero_aegis'),
			6,
			'addition'
		);

	create('voidcaller_mark', Color.DARK_PURPLE, 'Marked by the Voidcaller.');

	create('shiny_stone', Color.ORANGE_DYE, 'Increased healing power.', 'beneficial')
		.displayName('Shining')
		.modifyAttribute(
			global.attribute('healing_power'),
			global.uuid('shiny_stone'),
			3,
			'addition'
		);

	create('wrath', Color.DARK_RED, 'Your rage builds with each hit.', 'beneficial')
		.modifyAttribute(
			global.attribute('attack_damage'),
			global.uuid('wrath'),
			0.02,
			'multiply_base'
		)
		.modifyAttribute(
			global.attribute('armor'),
			global.uuid('wrath'),
			-1,
			'addition'
		);

	create('fury', Color.DARK_RED, '40% increased damage', 'beneficial')
		.modifyAttribute(
			global.attribute('damage'),
			global.uuid('fury'),
			0.4,
			'multiply_base'
		)
		.modifyAttribute(
			global.attribute('armor'),
			global.uuid('fury'),
			-10,
			'addition'
		);
});
