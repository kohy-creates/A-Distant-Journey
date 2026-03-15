global.eyeEffects = {}

global.eyeEffects.cindersTick = function (slotContext, stack) {
	slotContext.getWearer()
		.addEffect(new $MobEffectInstance("fire_resistance", 10, 0, true, false, false))
};

global.eyeEffects.angelsTick = (slotContext, stack) => {
	const wearer = slotContext.getWearer();
	if (wearer.isPlayer() && wearer.isCrouching())
		wearer.addEffect(new $MobEffectInstance('slow_falling', 10, 0, false, false, false))
};

global.eyeEffects.desolationTick = function (slotContext, stack) { };

global.eyeEffects.ethercraftTick = function (slotContext, stack) { };

global.eyeEffects.dreamsTick = function (slotContext, stack) { };

global.eyeEffects.arcanumTick = function (slotContext, stack) { };

global.eyeEffects.verdancyTick = function (slotContext, stack) { };


StartupEvents.registry('item', event => {

	const eyeUUIDs = [
		'2021e614-1d59-455f-98cc-361f21d2e4fa',
		'9567f7ed-156d-4c8f-b2c0-a2ef4e354d73',
		'9b7095b8-d792-49d1-a207-027ab83b667b',
		'232a185a-556c-4985-a5ff-b82f5e84cdf3',
		'87ed9349-1039-426b-bd00-961208f5e013',
		'5a08c4a7-d33a-4950-9558-12b01a61a143',
		'882946a8-6345-45e9-b9ee-ce5fd1ee4168',
		'f5e05e13-a45c-495e-a7c9-87cf0cb8c5d9',
		'c88c1900-904e-4e37-845c-79b91d57d315',
		'42a00c68-a3ef-4f20-8bad-8b268ad0b61a'
	];

	let i = 0;

	function getAttrUuid() {
		if (!eyeUUIDs[i]) {
			console.error('Maximum amount of Eye slots were reached!');
			return null;
		}
		return eyeUUIDs[i];
	}

	/**
	 * Registers an Eye item
	 * @param {string} id 
	 * @param {string} name 
	 * @param {$CapabilityCurios$CuriosCapabilityBuilder} capability 
	 */
	function registerEye(id, name, color, description, capability) {
		event.create(id)
			.attachCuriosCapability(capability)
			.fireResistant()
			.glow(true)
			.unstackable()
			.texture(`kubejs:item/${id}`)
			.rarity('epic')
			.tooltip(`§7${description}`)
			.displayName(`<neon><shake><pulse><color col=${color}>${name}</color></pulse></shake></neon>`)
			.tag('curios:accessory')
			.tag('adj:eyes');
		i++;
	}

	registerEye(
		'eye_of_cinders',
		'Eye of Cinders',
		'#fa6722',
		'\'I am Phoenix!\'',
		CuriosJSCapabilityBuilder.create()
			.curioTick((slotContext, stack) => global.eyeEffects.cindersTick(slotContext, stack))
			.makesPiglinsNeutral((slotContext, stack) => true)
			.addAttribute(
				'attributeslib:fire_damage',
				getAttrUuid(),
				6,
				'addition'
			)
			.addAttribute(
				'attributeslib:crit_chance',
				getAttrUuid(),
				0.15,
				'addition'
			)
			.addAttribute(
				'minecraft:generic.attack_speed',
				getAttrUuid(),
				-0.15,
				'multiply_total'
			)
	);

	registerEye(
		'eye_of_angels',
		'Eye of Angels',
		'#fffd8b',
		'\'For the love of all that is holy...\'',
		CuriosJSCapabilityBuilder.create()
			.curioTick((slotContext, stack) => global.eyeEffects.angelsTick(slotContext, stack))
			.addAttribute(
				'minecraft:generic.max_health',
				getAttrUuid(),
				20,
				'addition'
			)
			.addAttribute(
				'generic.attack_speed',
				getAttrUuid(),
				-0.15,
				'multiply_total'
			)
			.addAttribute(
				'attributeslib:life_steal',
				getAttrUuid(),
				0.13,
				'addition'
			)
	);

	registerEye(
		'eye_of_desolation',
		'Eye of Desolation',
		'#9024ce',
		'\'It\'s empty. Just like me\'',
		CuriosJSCapabilityBuilder.create()
			.curioTick((slotContext, stack) => global.eyeEffects.desolationTick(slotContext, stack))
			.addAttribute(
				'minecraft:generic.attack_damage',
				getAttrUuid(),
				0.2,
				'multiply_total'
			)
			.addAttribute(
				'minecraft:generic.attack_speed',
				getAttrUuid(),
				0.15,
				'multiply_total'
			)
			.addAttribute(
				'attributeslib:armor_shred',
				getAttrUuid(),
				15,
				'addition'
			)
	);

	registerEye(
		'eye_of_ethercraft',
		'Eye of Ethercraft',
		'#dd57ff',
		'\'I tried to make Create enjoyable again\'',
		CuriosJSCapabilityBuilder.create()
			.curioTick((slotContext, stack) => global.eyeEffects.ethercraftTick(slotContext, stack))
			.addAttribute(
				'forge:block_reach',
				getAttrUuid(),
				3,
				'addition'
			)
	);

	registerEye(
		'eye_of_dreams',
		'Eye of Dreams',
		'#ff4444',
		'\'Rediscovered was one of my first fav mods of all time\'',
		CuriosJSCapabilityBuilder.create()
			.curioTick((slotContext, stack) => global.eyeEffects.dreamsTick(slotContext, stack))
			.canWalkOnPowderedSnow((slotContext, stack) => true)
			.addAttribute(
				'minecraft:generic.movement_speed',
				getAttrUuid(),
				0.16,
				'multiply_total'
			)
			.addAttribute(
				'attributeslib:armor_shred',
				getAttrUuid(),
				10,
				'addition'
			)
	)

	registerEye(
		'eye_of_arcanum',
		'Eye of Arcanum',
		'#54acff',
		'\'It used to be purple before 1.4\'',
		CuriosJSCapabilityBuilder.create()
			.curioTick((slotContext, stack) => global.eyeEffects.arcanumTick(slotContext, stack))
			.addAttribute(
				'ars_nouveau:ars_nouveau.perk.mana_regen',
				getAttrUuid(),
				6,
				'addition'
			)
			.addAttribute(
				'ars_nouveau:ars_nouveau.perk.max_mana',
				getAttrUuid(),
				40,
				'addition'
			)
			.addAttribute(
				'ars_nouveau:ars_nouveau.perk.spell_damage',
				getAttrUuid(),
				5,
				'addition'
			)
	)

	registerEye(
		'eye_of_verdant_bloom',
		'Eye of Verdancy',
		'#21df41',
		'\'Tech mod disguised as a magic mod tbh\'',
		CuriosJSCapabilityBuilder.create()
			.curioTick((slotContext, stack) => global.eyeEffects.verdancyTick(slotContext, stack))
	)
})
