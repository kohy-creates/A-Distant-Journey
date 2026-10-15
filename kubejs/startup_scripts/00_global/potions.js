//priority: 200
global.potionRecipes = {
	'minecraft:night_vision': ['kubejs:moonglow', 'glowstone_dust', 'kubejs:blinkroot'],
	'minecraft:invisibility': ['kubejs:moonglow', 'nether_wart', 'kubejs:fireblossom'],
	'minecraft:leaping': ['kubejs:daybloom', 'rabbit_foot', 'cactus'],
	'minecraft:fire_resistance': ['kubejs:fireblossom', 'magma_cream', 'nether_wart', 'obsidian'],
	'minecraft:swiftness': ['kubejs:daybloom', 'sugar', 'cactus'],
	'minecraft:slowness': ['kubejs:daybloom', 'fermented_spider_eye', 'cactus'],
	'minecraft:turtle_master': ['kubejs:blinkroot', 'kubejs:waterleaf', 'turtle_shell', 'nautilus_shell'],
	'minecraft:water_breathing': ['kubejs:waterleaf', 'pufferfish', 'kelp', 'kelp'],
	'minecraft:healing': ['kubejs:daybloom', 'wheat_seeds', 'brown_mushroom'],
	'minecraft:harming': ['kubejs:deathweed', 'wheat_seeds', 'red_mushroom'],
	'minecraft:poison': ['kubejs:deathweed', 'spider_eye', 'evilcraft:poison_sac'],
	'minecraft:regeneration': ['kubejs:daybloom', 'kubejs:daybloom', 'gold_nugget'],
	'minecraft:strength': ['kubejs:deathweed', 'blaze_powder', 'tide:ember_koi'],
	'minecraft:weakness': ['kubejs:deathweed', 'fermented_spider_eye', 'tide:ember_koi'],
	'minecraft:luck': ['kubejs:waterleaf', 'kubejs:daybloom', 'buzzier_bees:four_leaf_clover'],
	'minecraft:slow_falling': ['kubejs:blinkroot', 'phantom_membrane', 'feather', 'feather'],
	'spelunker:spelunker': ['kubejs:blinkroot', 'kubejs:moonglow', 'raw_gold'],
	'mutantmonsters:chemical_x': ['kubejs:deathweed', 'kubejs:blinkroot', 'kubejs:shiverthorn', 'born_in_chaos_v1:phantom_powder', 'mythicmetals:raw_adamantite', 'mythicmetals:raw_adamantite'],
	'galosphere:haste': ['kubejs:blinkroot', 'sugar', 'raw_iron'],
	'unusualend:end_infection': ['kubejs:deathweed', 'kubejs:shiverthorn', 'unusualend:end_blob', 'chorus_fruit'],
	'unusualend:heaviness_potion': ['kubejs:moonglow', 'unusualend:bolok_scale', 'ender_pearl', 'raw_iron'],
	'unusualend:swift_strikes_potion': ['kubejs:moonglow', 'kubejs:shiverthorn', 'tide:shadow_snapper'],
	'ars_nouveau:mana_regen_potion': ['kubejs:daybloom', 'ars_nouveau:sourceberry_bush', 'ars_nouveau:sourceberry_bush', 'sugar'],
	'alexsmobs:bug_pheromones': ['kubejs:moonglow', 'kubejs:waterleaf', 'alexsmobs:cockroach_wing'],
	'alexsmobs:clinging': ['kubejs:waterleaf', 'tide:slimy_salmon', 'alexsmobs:dropbear_claw'],
	'adjcore:lesser_mana': ['kubejs:daybloom', 'ars_nouveau:sourceberry_bush', 'brown_mushroom'],
	'adjcore:mana': 'KEEP',
	'adjcore:greater_mana': 'KEEP',
	'adjcore:endurance': ['tide:iron_tetra', 'kubejs:blinkroot', 'nether_wart'],
	'adjcore:decay': ['kubejs:deathweed', 'netherexp:fossil_fuel', 'netherexp:fossil_fuel'],
	'adjcore:iron_skin': ['kubejs:daybloom', 'raw_iron', 'brown_mushroom'],
	'adjcore:archery': ['kubejs:daybloom', 'arrow', 'feather'],
	'adjcore:magic_power': ['kubejs:moonglow', 'ars_nouveau:sourceberry_bush', 'sugar'],
	'adjcore:builder': ['kubejs:blinrkroot', 'kubejs:shiverthorn', 'kubejs:moonglow'],
	'adjcore:thorns': ['cactus', 'cactus', 'kubejs:waterleaf'],
	'netherdepthsupgrade:lava_vision': ['kubejs:fireblossom', 'kubejs:blinkroot', 'netherdepthsupgrade:eyeball_fish'],
	'alexscaves:deepsight': ['kubejs:waterleaf', 'alexscaves:lanternfish'],
	'quark:resilience': ['kubejs:blinkroot', 'kubejs:shiverthorn', 'tide:iron_tetra'],
	'window_box:levitation': ['kubejs:waterleaf', 'unusualend:lurker_sludge', 'phantom_membrane'],
};

for (let [potion, ingredients] of Object.entries(global.potionRecipes)) {
	for (let a = 0; a < ingredients.length; a++) {
		let ingr = ingredients[a];
		if (ingr === 'KEEP') continue;
		global.potionRecipes[potion][a] = global.normalizeResourceLocation(ingr);
	}
};

global.disabledPotions = [];

global.getAllRegistryObjects('POTIONS').forEach(potion => {
	let id = global.getRegistryId('POTIONS', potion);
	if (!Object.keys(global.potionRecipes).includes(id) && !id.startsWith('item:')) {
		global.disabledPotions.push(id);
	}
});
