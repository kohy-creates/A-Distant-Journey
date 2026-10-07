global.potionRecipes = {
	'minecraft:night_vision': ['kubejs:moonglow', 'glowstone_dust', 'kubejs:blinkroot'],
	'minecraft:invisibility': ['kubejs:moonglow', 'nether_wart', 'kubejs:fireblossom'],
	'minecraft:leaping': ['kubejs:daybloom', 'rabbit_foot', 'cactus'],
	'minecraft:fire_resistance': ['kubejs:fireblossom', 'magma_cream', 'nether_wart', 'blaze_powder'],
	'minecraft:swiftness': ['kubejs:daybloom', 'sugar', 'cactus'],
	'minecraft:slowness': ['kubejs:daybloom', 'fermented_spider_eye', 'cactus'],
	'minecraft:turtle_master': ['kubejs:blinkroot', 'kubejs:waterleaf', 'turtle_shell', 'nautilus_shell'],
	'minecraft:water_breathing': ['kubejs:waterleaf', 'pufferfish', 'sand'],
	'minecraft:healing': ['kubejs:daybloom', 'wheat_seeds', 'brown_mushroom'],
	'minecraft:harming': ['kubejs:deathweed', 'wheat_seeds', 'red_mushroom'],
	'minecraft:poison': ['kubejs:deathweed', 'spider_eye', 'evilcraft:poison_sac'],
	'minecraft:regeneration': ['kubejs:daybloom', 'kubejs:daybloom', 'gold_nugget'],
	'minecraft:strength': ['kubejs:deathweed', 'blaze_powder', 'nether_wart', 'iron_nugget'],
	'minecraft:weakness': ['kubejs:deathweed', 'fermented_spider_eye', 'iron_nugget'],
	'minecraft:luck': ['kubejs:waterleaf', 'rabbit_foot', 'kubejs:daybloom'],
	'minecraft:slow_falling': ['kubejs:blinkroot', 'phantom_membrane', 'feather'],
	'spelunker:spelunker': ['kubejs:blinkroot', 'kubejs:moonglow', 'raw_gold']
	// 'mutantmonsters:chemical_x'
	// 'phantasm:corrosion'
	// 'galosphere:astral'
	// 'galosphere:haste'
	// 'estrogen:estrogen_potion'
	// 'additionaladditions:haste_potion'
	// 'unusualend:end_infection'
	// 'unusualend:levitation'
	// 'unusualend:building_potion'
	// 'unusualend:heaviness_potion'
	// 'unusualend:serenity_potion'
	// 'unusualend:swift_strikes_potion'
	// 'unusualend:strength'
	// 'unusualend:haste'
	// 'unusualend:advanced_haste'
	// 'ars_nouveau:mana_regen_potion'
	// 'ars_nouveau:spell_damage_potion'
	// 'ars_nouveau:recovery_potion'
	// 'ars_nouveau:blasting_potion'
	// 'ars_nouveau:freezing_potion'
	// 'ars_nouveau:shielding_potion'
	// 'ars_elemental:enderference_potion'
	// 'ars_elemental:shock_potion'
	// 'aether_redux:intoxication'
	// 'naturalist:forest_dasher'
	// 'alexsmobs:knockback_resistance'
	// 'alexsmobs:lava_vision'
	// 'alexsmobs:speed_iii'
	// 'alexsmobs:poison_resistance'
	// 'alexsmobs:bug_pheromones'
	// 'alexsmobs:soulsteal'
	// 'alexsmobs:clinging'
	// 'adjcore:lesser_mana'
	// 'adjcore:mana'
	// 'adjcore:greater_mana'
	// 'composite_material:armor'
	// 'composite_material:corrosion'
	// 'composite_material:death'
	// 'composite_material:primitive'
	// 'composite_material:degeneration'
	// 'witherstormmod:wither'
	// 'crittersandcompanions:resistance'
	// 'kubejs:dissolved_daybloom'
	// 'crittersandcompanions:resistance'
	// 'kubejs:endurance'
	// 'kubejs:decay'
	// 'kubejs:levitation'
	// 'kubejs:iron_skin'
	// 'kubejs:archery'
	// 'kubejs:magic_power'
	// 'kubejs:builder'
	// 'kubejs:thorns'
	// 'netherdepthsupgrade:lava_vision'
	// 'netherdepthsupgrade:lava_puffer_wither'
	// 'netherdepthsupgrade:obsidianfish_resistance'
	// 'netherdepthsupgrade:glowdine_glowing'
	// 'upgrade_aquatic:insomnia'
	// 'upgrade_aquatic:restfulness'
	// 'upgrade_aquatic:repellence'
	// 'upgrade_aquatic:vibing'
	// 'alexscaves:magnetizing'
	// 'alexscaves:deepsight'
	// 'alexscaves:glowing'
	// 'alexscaves:haste'
	// 'alexscaves:sugar_rush'
	// 'born_in_chaos_v1:potion_of_magical_depletion'
	// 'born_in_chaos_v1:intoxication_potion'
	// 'born_in_chaos_v1:stimulating_potion'
	// 'born_in_chaos_v1:potion_of_living_cocoon'
	// 'quark:resilience'
	// 'rediscovered:golden_aura'
	// 'rediscovered:crimson_veil'
	// 'window_box:wither'
	// 'window_box:mining_fatigue'
	// 'window_box:levitation'
	// 'buzzier_bees:unluck'
};

for (let [potion, ingredients] of Object.entries(global.potionRecipes)) {
	for (let a = 0; a < ingredients.length; a++) {
		let ingr = ingredients[a];
		if (!ingr.includes(':')) {
			global.potionRecipes[potion][a] = 'minecraft:' + ingr;
		}
	}
};
