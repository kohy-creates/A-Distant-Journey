global.potionRegistry = {
	dissolved_daybloom: { effects: [], ingredients: ['kubejs:daybloom'], },
	dissolved_moonglow: { effects: [], ingredients: ['kubejs:moonglow'], },
	dissolved_blinkroot: { effects: [], ingredients: ['kubejs:blinkroot'], },
	dissolved_deathweed: { effects: [], ingredients: ['kubejs:deathweed'], },
	dissolved_waterleaf: { effects: [], ingredients: ['kubejs:waterleaf'], },
	dissolved_fireblossom: { effects: [], ingredients: ['kubejs:fireblossom'], },
	dissolved_shiverthorn: { effects: [], ingredients: ['kubejs:shiverthorn'], },
	endurance: {
		effects: [
			{ effect: 'minecraft:resistance', duration: '4:00' }
		],
		ingredient: ['minecraft:iron_block'],
	},
	decay: {
		effects: [
			{ effect: 'minecraft:wither', duration: '0:30' }
		],
		ingredients: ['netherexp:fossil_fuel']
	},
	levitation: {
		effects: [
			{ effect: 'minecraft:levitation', duration: '0:10' }
		],
		ingredients: ['minecraft:shulker_shell']
	},
	iron_skin: {
		effects: [
			{ effect: 'kubejs:iron_skin', duration: '8:00' }
		],
		ingredients: ['minecraft:iron_ingot']
	},
	archery: {
		effects: [
			{ effect: 'kubejs:archery', duration: '8:00' }
		],
		ingredients: ['minecraft:arrow']
	},
	magic_power: {
		effects: [
			{ effect: 'kubejs:magic_power', duration: '4:00' },
		],
		ingredients: ['ars_nouveau:source_gem']
	},
	builder: {
		effects: [
			{ effect: 'kubejs:builder', duration: '45:00' }
		],
		ingredients: ['minecraft:brick_block']
	},
	thorns: {
		effects: [
			{ effect: 'kubejs:thorns', duration: '8:00' }
		],
		ingredients: ['minecraft:rose_bush']
	}
};

StartupEvents.registry('potion', event => {
	Object.keys(global.potionRegistry).forEach((potion) => {
		const potionData = global.potionRegistry[potion];
		const hasRedstoneVariant = potionData.redstone_duration_multiplier !== undefined;
		const hasGlowstoneVariant = potionData.glowstone_duration_multiplier !== undefined;
		let builder = event.create(potion);
		potionData.effects.forEach((effect) => {
			builder.addEffect(global.newMobEffectInstance(effect.effect, global.duration(effect.duration), global.getOrDefault(effect.amplifier, 0)));
		});
	});
});

MoreJSEvents.registerPotionBrewing((event) => {

	Object.keys(global.potionRegistry).forEach((potion) => {
		const potionData = global.potionRegistry[potion];
		const hasRedstoneVariant = potionData.redstone_duration_multiplier !== undefined;
		const hasGlowstoneVariant = potionData.glowstone_duration_multiplier !== undefined;

		potionData.ingredients.forEach((ingredient) => event.addPotionBrewing(potionData.ingredient, 'awkward', `kubejs:${potion}`));
	});

	// Custom alchemy recipes
	event.addCustomBrewing(
		'tide:glowfish',
		Item.of('minecraft:potion', '{Potion:"minecraft:water"}'),
		'majruszsdifficulty:recall_potion'
	);

	event.addCustomBrewing(
		'ender_pearl',
		Item.of('minecraft:potion', '{Potion:"minecraft:water"}'),
		'wormholepotion:wormhole_potion'
	);

	event.addCustomBrewing(
		'alexsmobs:bone_serpent_tooth',
		'alexsmobs:lava_bottle',
		Item.of('minecraft:potion', '{Potion:"netherdepthsupgrade:lava_vision"}')
	);

	event.addCustomBrewing(
		'netherdepthsupgrade:eyeball',
		'alexsmobs:lava_bottle',
		Item.of('minecraft:potion', '{Potion:"netherdepthsupgrade:lava_vision"}')
	);

	event.addCustomBrewing(
		'netherdepthsupgrade:eyeball_fish',
		'alexsmobs:lava_bottle',
		Item.of('minecraft:potion', '{Potion:"netherdepthsupgrade:lava_vision"}')
	);

	// Universal Glowing
	event.addPotionBrewing('netherdepthsupgrade:glowdine', 'awkward', 'alexscaves:glowing');

	// Replace ingredients
	event.addPotionBrewing('alexsmobs:bear_fur', 'strength', 'alexsmobs:knockback_resistance');
	event.addPotionBrewing('miners_delight:copper_carrot', 'swiftness', 'alexscaves:haste');

	// Remove doubled or useless potions
	const removedPotions = [
		'netherdepthsupgrade:glowdine_glowing',
		'netherdepthsupgrade:glowdine_long_glowing',
		'davespotioneering:strong_invisibility',
		'miners_delight:mining_fatigue',
		'miners_delight:long_mining_fatigue',
		'miners_delight:strong_mining_fatigue',
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
		'miners_delight:haste',
		'miners_delight:long_haste',
		'miners_delight:strong_haste',
		'additionaladditions:haste_potion',
		'additionaladditions:long_haste_potion',
		'additionaladditions:strong_haste_potion',
		'alexsmobs:lava_vision',
		'alexsmobs:long_lava_vision',
		'netherdepthsupgrade:lava_vision'
	];
	removedPotions.forEach(potion => {
		event.removeByPotion(null, null, potion);
	});
});
