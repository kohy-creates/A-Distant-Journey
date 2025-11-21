const $MobEffectInstance = Java.loadClass(`net.minecraft.world.effect.MobEffectInstance`);

StartupEvents.registry('potion', event => {
	event.create('endurance').addEffect(new $MobEffectInstance('minecraft:resistance', 4800));
	event.create('long_endurance').addEffect(new $MobEffectInstance('minecraft:resistance', 7200));
	event.create('strong_endurance').addEffect(new $MobEffectInstance('minecraft:resistance', 2400, 1));

	event.create('decay').addEffect(new $MobEffectInstance('minecraft:wither', 600, 0));
	event.create('long_decay').addEffect(new $MobEffectInstance('minecraft:wither', 1200, 0));
	event.create('strong_decay').addEffect(new $MobEffectInstance('minecraft:wither', 400, 1));

})

MoreJSEvents.registerPotionBrewing((event) => {
	event.addCustomBrewing(
		'tide:glowfish',
		Item.of('minecraft:potion', '{Potion:"minecraft:water"}'),
		Item.of('majruszsdifficulty:recall_potion')
	);

	// Universal Glowing
	event.removeByPotion(null, null, 'netherdepthsupgrade:glowdine_glowing');
	event.removeByPotion(null, null, 'netherdepthsupgrade:glowdine_long_glowing');
	event.addPotionBrewing("netherdepthsupgrade:glowdine", "awkward", "alexscaves:glowing");

	// Remove doubled or useless potions
	event.removeByPotion(null, null, 'davespotioneering:strong_invisibility');
	event.removeByPotion(null, null, 'miners_delight:mining_fatigue');
	event.removeByPotion(null, null, 'miners_delight:long_mining_fatigue');
	event.removeByPotion(null, null, 'miners_delight:strong_mining_fatigue');
	event.removeByPotion(null, null, 'ars_elemental:shock_potion');
	event.removeByPotion(null, null, 'ars_elemental:shock_potion_long');
	event.removeByPotion(null, null, 'netherdepthsupgrade:obsidianfish_long_resistance');
	event.removeByPotion(null, null, 'netherdepthsupgrade:obsidianfish_resistance');
	event.removeByPotion(null, null, 'netherdepthsupgrade:obsidianfish_strong_resistance');
	event.removeByPotion(null, null, 'netherdepthsupgrade:lava_puffer_long_wither');
	event.removeByPotion(null, null, 'netherdepthsupgrade:lava_puffer_long_wither');
	event.removeByPotion(null, null, 'witherstormmod:wither');
	event.removeByPotion(null, null, 'witherstormmod:strong_wither');
	event.removeByPotion(null, null, 'witherstormmod:long_wither');

	// Universal Knockback Resistance
	event.removeByPotion(null, null, 'alexsmobs:knockback_resistance');
	event.removeByPotion(null, null, 'alexsmobs:strong_knockback_resistance');
	event.removeByPotion(null, null, 'alexsmobs:long_knockback_resistance');

	event.addPotionBrewing("alexsmobs:bear_fur", "strength", "alexsmobs:knockback_resistance");

	// Universal Haste
	event.removeByPotion(null, null, 'unusualend:haste');
	event.removeByPotion(null, null, 'unusualend:advanced_haste');
	event.removeByPotion(null, null, 'miners_delight:haste');
	event.removeByPotion(null, null, 'miners_delight:long_haste');
	event.removeByPotion(null, null, 'miners_delight:strong_haste');
	event.removeByPotion(null, null, 'additionaladditions:haste_potion');
	event.removeByPotion(null, null, 'additionaladditions:long_haste_potion');
	event.removeByPotion(null, null, 'additionaladditions:strong_haste_potion');

	event.addPotionBrewing("miners_delight:copper_carrot", "swiftness", "alexscaves:haste");

	// Recipes for uncraftables that are too cool to skip
	event.addPotionBrewing("bone", "swiftness", "unusualend:swift_strikes_potion");

	// Endurance
	event.addPotionBrewing("iron_ingot", "awkward", "kubejs:endurance");
	event.addPotionBrewing("redstone", "kubejs:endurance", "kubejs:long_endurance");
	event.addPotionBrewing("glowstone_dust", "kubejs:endurance", "kubejs:strong_endurance");

	// Decay
	event.addPotionBrewing("netherexp:fossil_fuel", "poison", "kubejs:decay");
	event.addPotionBrewing("redstone", "kubejs:decay", "kubejs:long_decay");
	event.addPotionBrewing("glowstone_dust", "kubejs:decay", "kubejs:strong_decay");
	event.addPotionBrewing("netherexp:fossil_fuel", "long_poison", "kubejs:long_decay");
	event.addPotionBrewing("netherexp:fossil_fuel", "strong_poison", "kubejs:strong_decay");

	event.addPotionBrewing("witherstormmod:withered_spider_eye", "poison", "kubejs:decay");
	event.addPotionBrewing("witherstormmod:withered_spider_eye", "long_poison", "kubejs:long_decay");
	event.addPotionBrewing("witherstormmod:withered_spider_eye", "strong_poison", "kubejs:strong_decay");
})

const potionOverrides = {
	"minecraft:healing": {
		drinkingTime: 8,
		cooldown: 60
	},
	"minecraft:strong_healing": {
		drinkingTime: 8,
		cooldown: 60
	},
	"minecraft:harming": {
		cooldown: 10
	},
	"minecraft:strong_harming": {
		cooldown: 15
	},
}

StartupEvents.init(event => {
	for (const [potion, override] of Object.entries(potionOverrides)) {
		let json = {
			potion: potion
		};
		if (override.cooldown) {
			json["cooldown"] = override.cooldown * 20
		}
		if (override.drinkingTime) {
			json["drinking_time"] = override.drinkingTime
		}
		JsonIO.write(`kubejs/data/sortilege/potions/${potion.split(':')[1]}.json`, json)
	}
})
