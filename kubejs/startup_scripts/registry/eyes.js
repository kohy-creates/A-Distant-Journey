const $Player = Java.loadClass('net.minecraft.world.entity.player.Player');

global.eyeEffects = {};

/**
 * Eye of Cinders on-tick effects:
 *  - Fire Resistance if not on fire, similarly to Turtle Helmet's Water Breathing
 * 	- Immunity to Wither
 * 
 * @param {Internal.SlotContext} slotContext 
 * @param {Internal.ItemStack} stack 
 */
global.eyeEffects.cindersTick = function (slotContext, stack) {
	const wearer = slotContext.getWearer();
	if (!wearer.isOnFire()) {
		wearer.addEffect(new $MobEffectInstance("fire_resistance", 18, 0, true, false, false));
	}
	wearer.removeEffect('minecraft:wither');
};

/**
 * Eye of Angels on-tick effects:
 * 	- Slow Falling if sneaking
 * 
 * @param {Internal.SlotContext} slotContext 
 * @param {Internal.ItemStack} stack 
 */
global.eyeEffects.angelsTick = (slotContext, stack) => {
	const wearer = slotContext.getWearer();
	if (wearer instanceof $Player && wearer.isShiftKeyDown()) {
		wearer.addEffect(new $MobEffectInstance('slow_falling', 10, 0, false, false, false));
	}
};

/**
 * Eye of Desolation on-tick effects:
 * 	- Life regeneration bonus that increases as health goes down
 * @param {Internal.SlotContext} slotContext 
 * @param {Internal.ItemStack} stack 
 */
global.eyeEffects.desolationTick = function (slotContext, stack) {
	if (!stack.hasNBT()) {
		stack.nbt = {};
	}
	stack.nbt.t = !(stack.nbt.getBoolean('t') || false);
};
/**
 * @param {Internal.CapabilityCurios$AttributeModificationContext_} ctx 
 */
global.eyeEffects.desolationAttributeTick = function (ctx) {
	const wearer = ctx.slotContext.getWearer();
	if (!wearer) return;
	const regenStrength = Math.max((1 - (wearer.getHealth() / wearer.getMaxHealth())) - 0.25, 0) * 8;
	ctx.modify('adjcore:generic.health_regeneration', 'kubejs.dynamic.eye_of_desolation', regenStrength, 'addition');
}

/**
 * Eye of Ethercraft on-tick effects:
 * 	- Block reach bonus that gets doubled while sneaking
 * @param {Internal.SlotContext} slotContext 
 * @param {Internal.ItemStack} stack 
 */
global.eyeEffects.ethercraftTick = function (slotContext, stack) {
	if (!stack.hasNBT()) {
		stack.nbt = {};
	}
	stack.nbt.t = !(stack.nbt.getBoolean('t') || false);
};
/**
 * @param {Internal.CapabilityCurios$AttributeModificationContext_} ctx 
 */
global.eyeEffects.ethercraftAttributeTick = function (ctx) {
	const wearer = ctx.slotContext.getWearer();
	if (wearer && wearer instanceof $Player) {
		ctx.modify('forge:block_reach', 'kubejs.dynamic.eye_of_ethercraft', (wearer.isShiftKeyDown()) ? 6 : 3, 'addition');
	}
};

/**
 * 
 * @param {Internal.SlotContext} slotContext 
 * @param {Internal.ItemStack} stack 
 */
global.eyeEffects.dreamsTick = function (slotContext, stack) { };

/**
 * 
 * @param {Internal.SlotContext} slotContext 
 * @param {Internal.ItemStack} stack 
 */
global.eyeEffects.arcanumTick = function (slotContext, stack) { };

/**
 * 
 * @param {Internal.SlotContext} slotContext 
 * @param {Internal.ItemStack} stack 
 */
global.eyeEffects.verdancyTick = function (slotContext, stack) {
	// const wearer = slotContext.getWearer();
	// const blockBelow = wearer.getLevel().getBlock(wearer.blockPosition.below());
	// if (blockBelow.id === 'minecraft:dirt') {
	// 	blockBelow.set('minecraft:grass_block', {
	// 		snowy: 'false'
	// 	});
	// }
};

/**
 * Eye of Hedonism on-tick effects:
 * 	- 0.5% chance per tick to feed the player by one point
 * 
 * @param {Internal.SlotContext} slotContext 
 * @param {Internal.ItemStack} stack 
 */
global.eyeEffects.hedonismTick = function (slotContext, stack) {
	const wearer = slotContext.getWearer();
	if (wearer instanceof $Player) {
		if (Math.random() <= 0.005) {
			const hunger = wearer.getFoodLevel();
			if (hunger >= 20) {
				wearer.setSaturation(wearer.getSaturation() + 1)
			}
			else {
				wearer.setFoodLevel(hunger + 1)
			}
		}
	}
};

/**
 * Eye of Curiosity on-tick effects:
 * 	- Immunity to Slowness
 * 
 * @param {Internal.SlotContext} slotContext 
 * @param {Internal.ItemStack} stack 
 */
global.eyeEffects.curiosityTick = function (slotContext, stack) {
	const wearer = slotContext.getWearer();
	wearer.removeEffect('minecraft:slowness');
};

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
			console.error('Maximum amount of Eye slots was reached!');
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
			.displayName(`<shake a=0.2><neon r=1.2><pulse><color col=${color}>${name}</color></pulse></shake></neon>`)
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
				'minecraft:generic.attack_speed',
				getAttrUuid(),
				-0.1,
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
				0.09,
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
			.modifyAttribute((ctx) => global.eyeEffects.desolationAttributeTick(ctx))
	);

	registerEye(
		'eye_of_ethercraft',
		'Eye of Ethercraft',
		'#dd57ff',
		'\'I tried to make Create enjoyable again\'',
		CuriosJSCapabilityBuilder.create()
			.curioTick((slotContext, stack) => global.eyeEffects.ethercraftTick(slotContext, stack))
			.modifyAttribute(ctx => global.eyeEffects.ethercraftAttributeTick(ctx))
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

	registerEye(
		'eye_of_hedonism',
		'Eye of Hedonism',
		'#b60000',
		'\'The cheaper the wine, the better it is for the soul\'',
		CuriosJSCapabilityBuilder.create()
			.curioTick((slotContext, stack) => global.eyeEffects.hedonismTick(slotContext, stack))
	)

	registerEye(
		'eye_of_exploration',
		'Eye of Curiosity',
		'#28f19e',
		'\'This one was frustrating, wasn\'t it?\'',
		CuriosJSCapabilityBuilder.create()
			.curioTick((slotContext, stack) => global.eyeEffects.curiosityTick(slotContext, stack))
	)
})
