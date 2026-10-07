const POTION_REGISTRY = {
	MOB_EFFECTS: $DeferredRegisterCreate($ForgeRegistries.MOB_EFFECTS, "kubejs"),
	POTIONS: $DeferredRegisterCreate($ForgeRegistries.POTIONS, "kubejs"),

	effects: {
		'iron_skin': new $MobEffectBuilder('iron_skin')
			.beneficial()
			.color(0x8C8C8C)
			.displayName('Iron Skin')
			.modifyAttribute(
				'generic.armor',
				'b074a3d4-dff0-44e9-b72d-f31d8488668f',
				3,
				'addition'
			),
		'archery': new $MobEffectBuilder('archery')
			.beneficial()
			.color(0xF79900)
			.displayName('Archery')
			.modifyAttribute(
				'attributeslib:arrow_damage',
				'c1e3f5b0-4d8a-4f2e-9c6b-1f2e3d4c5b6a',
				0.1,
				'addition'
			)
			.modifyAttribute(
				'attributeslib:arrow_velocity',
				'c1e3f5b0-4d8a-4f2e-9c6b-1f2e3d4c5b6a',
				0.2,
				'addition'
			),
		'magic_power': new $MobEffectBuilder('magic_power')
			.beneficial()
			.displayName('Magic Power')
			.color(0x0090F7)
			.modifyAttribute(
				'ars_nouveau:ars_nouveau.perk.spell_damage',
				'b423d950-69fa-4a9e-adc7-c976108ff0e0',
				15,
				'addition'
			),
		'builder': new $MobEffectBuilder('builder')
			.beneficial()
			.displayName('Builder')
			.color(0xAD5D00)
			.modifyAttribute(
				'forge:block_reach',
				'c1e3f5b0-4d8a-4f2e-9c6b-1f2e3d4c5b6a',
				1.5,
				'addition'
			),
		'thorns': new $MobEffectBuilder('thorns')
			.beneficial()
			.color(0x00910B),
	},

	effectObjects: {},

	potions: {
		endurance: [{ effect: 'minecraft:resistance', duration: '4:00' }],
		decay: [{ effect: 'minecraft:wither', duration: '0:30' }],
		levitation: [{ effect: 'minecraft:levitation', duration: '0:10' }],
		iron_skin: [{ effect: 'kubejs:iron_skin', duration: '8:00' }],
		archery: [{ effect: 'kubejs:archery', duration: '8:00' }],
		magic_power: [{ effect: 'kubejs:magic_power', duration: '4:00' }],
		builder: [{ effect: 'kubejs:builder', duration: '45:00' }],
		thorns: [{ effect: 'kubejs:thorns', duration: '8:00' }]
	}
};

// Safeguard against an error that occurs on /kubejs reload startup_scripts
try {
	POTION_REGISTRY.MOB_EFFECTS.register(ForgeModEvents.eventBus());
	POTION_REGISTRY.POTIONS.register(ForgeModEvents.eventBus());
}
catch (e) {
	console.log(
		'Tried to register potions and effects, but failed.',
		'If this is due to a secondary startup script reload, this is expected and can be ignored.',
		e
	)
}

StartupEvents.init(event => {

	Object.keys(POTION_REGISTRY.effects).forEach((effect) => {
		/** @type {Internal.MobEffectBuilder_} */
		const effectBuilder = POTION_REGISTRY.effects[effect];
		POTION_REGISTRY.effectObjects[effect] = POTION_REGISTRY.MOB_EFFECTS.register(effect, () => effectBuilder.createObject());
	});

	Object.keys(POTION_REGISTRY.potions).forEach((potion) => {
		const potionData = POTION_REGISTRY.potions[potion];
		const potionBuilder = Utils.lazy(() => {
			const builder = new $PotionBuilder(`kubejs:${potion}`);
			potionData.forEach((effect) => {
				builder.addEffect(global.newMobEffectInstance(
					(effect.effect.startsWith('kubejs:')
						? POTION_REGISTRY.effectObjects[effect.effect.replace('kubejs:', '')].get()
						: effect.effect
					), global.duration(effect.duration), global.getOrDefault(effect.amplifier, 0)));
			});
			return builder;
		});
		POTION_REGISTRY.POTIONS.register(potion, () => potionBuilder.get().createObject());
	});
});

MoreJSEvents.registerPotionBrewing((event) => {

	// Custom alchemy recipes
	event.addCustomBrewing(
		'tide:glowfish',
		Item.of('minecraft:potion', "{Potion:'minecraft: water'}"),
		'majruszsdifficulty:recall_potion'
	);

	event.addCustomBrewing(
		'ender_pearl',
		Item.of('minecraft:potion', "{Potion:'minecraft: water'}"),
		'wormholepotion:wormhole_potion'
	);

	event.addCustomBrewing(
		'alexsmobs:bone_serpent_tooth',
		'alexsmobs:lava_bottle',
		Item.of('minecraft:potion', "{Potion:'netherdepthsupgrade: lava_vision'}")
	);

	event.addCustomBrewing(
		'netherdepthsupgrade:eyeball',
		'alexsmobs:lava_bottle',
		Item.of('minecraft:potion', "{Potion:'netherdepthsupgrade: lava_vision'}")
	);

	event.addCustomBrewing(
		'netherdepthsupgrade:eyeball_fish',
		'alexsmobs:lava_bottle',
		Item.of('minecraft:potion', "{Potion:'netherdepthsupgrade: lava_vision'}")
	);

	// Universal Glowing
	event.addPotionBrewing('netherdepthsupgrade:glowdine', 'awkward', 'alexscaves:glowing');

	// Replace ingredients
	event.addPotionBrewing('alexsmobs:bear_fur', 'strength', 'alexsmobs:knockback_resistance');

	// Remove doubled or useless potions
	const removedPotions = [
		'netherdepthsupgrade:glowdine_glowing',
		'netherdepthsupgrade:glowdine_long_glowing',
		'ars_elemental:shock_potion',
		'ars_elemental:shock_potion_long',
		'netherdepthsupgrade:obsidianfish_long_resistance',
		'netherdepthsupgrade:obsidianfish_resistance',
		'netherdepthsupgrade:obsidianfish_strong_resistance',
		'netherdepthsupgrade:lava_puffer_long_wither',
		'netherdepthsupgrade:lava_puffer_long_wither',
		'witherstormmod:wither',
		'witherstormmod:strong_wither',
		'witherstormmod:long_wither',
		'unusualend:health_boost',
		'alexsmobs:knockback_resistance',
		'alexsmobs:strong_knockback_resistance',
		'alexsmobs:long_knockback_resistance',
		'unusualend:haste',
		'unusualend:advanced_haste',
		'additionaladditions:haste_potion',
		'additionaladditions:long_haste_potion',
		'additionaladditions:strong_haste_potion',
		'alexsmobs:lava_vision',
		'alexsmobs:long_lava_vision',
		'netherdepthsupgrade:lava_vision'
	];

	$ForgeRegistries.POTIONS.getKeys().toArray().forEach((potion) => {
		if (potion.toString().includes('long') || potion.toString().includes('strong')) {
			removedPotions.push(potion);
		}
	});

	removedPotions.forEach(potion => {
		event.removeByPotion(null, null, potion);
	});
});
