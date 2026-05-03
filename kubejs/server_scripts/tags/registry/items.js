ServerEvents.tags('item', tags => {

	// global.blacklistedItemsArray.forEach(i => {
	// 	tags.removeAllTagsFrom(i);
	// });

	tags.add('adj:vanity', [
		/etcetera:.*_hat/,
		/etcetera:.*_sweater/,
		/etcetera:trader_.*/,
		/botania:cosmetic_.*/,
		'supplementaries:enderman_head',
		'minecraft:creeper_head',
		'minecraft:player_head',
		'minecraft:zombie_head',
		'minecraft:skeleton_skull',
		'minecraft:dragon_head',
		'minecraft:piglin_head',
		'minecraft:wither_skeleton_skull',
		'cataclysm:amptrgangr_head',
		'cataclysm:draugr_head',
		/_fossil_head/,
		'cataclysm:koboldediator_skull',
		'accents:'

	]);

	tags.add('adj:blahaj/recolorable', [
		'just_blahaj:white_blahaj',
		'just_blahaj:orange_blahaj',
		'just_blahaj:magenta_blahaj',
		'just_blahaj:light_blue_blahaj',
		'just_blahaj:yellow_blahaj',
		'just_blahaj:lime_blahaj',
		'just_blahaj:pink_blahaj',
		'just_blahaj:gray_blahaj',
		'just_blahaj:light_gray_blahaj',
		'just_blahaj:cyan_blahaj',
		'just_blahaj:purple_blahaj',
		'just_blahaj:blue_blahaj',
		'just_blahaj:brown_blahaj',
		'just_blahaj:green_blahaj',
		'just_blahaj:red_blahaj',
		'just_blahaj:black_blahaj',
		'just_blahaj:blahaj',
	]);

	tags.add('adj:blahaj/colored', [
		'just_blahaj:white_blahaj',
		'just_blahaj:orange_blahaj',
		'just_blahaj:magenta_blahaj',
		'just_blahaj:light_blue_blahaj',
		'just_blahaj:yellow_blahaj',
		'just_blahaj:lime_blahaj',
		'just_blahaj:pink_blahaj',
		'just_blahaj:gray_blahaj',
		'just_blahaj:light_gray_blahaj',
		'just_blahaj:cyan_blahaj',
		'just_blahaj:purple_blahaj',
		'just_blahaj:blue_blahaj',
		'just_blahaj:brown_blahaj',
		'just_blahaj:green_blahaj',
		'just_blahaj:red_blahaj',
		'just_blahaj:black_blahaj',
	]);


	tags.add('adj:blahaj/expressive', [
		'just_blahaj:creeperhaj',
		'just_blahaj:palestine_blahaj',
		'just_blahaj:trans_blahaj',
		'just_blahaj:pride_blahaj',
		'just_blahaj:intersex_blahaj',
		'just_blahaj:bi_blahaj',
		'just_blahaj:panhaj',
		'just_blahaj:lesbian_blahaj',
		'just_blahaj:gay_blahaj',
		'just_blahaj:enby_blahaj',
		'just_blahaj:gender_fluid_blahaj',
		'just_blahaj:ace_blahaj',
		'just_blahaj:aromantic_blahaj',
		'just_blahaj:aroace_blahaj',
	]);

	tags.add('adj:basic_furnaces', [
		'furnace',
		/quark\:.*_furnace/
	]);

	tags.add('adj:petal_apothecary', [
		/botania\:apothecary.*/
	]);

	tags.add('adj:horse_armor', [
		/.*horse_armor/
	]);

	tags.add('adj:clock', [
		'minecraft:clock',
		'mythicmetals:platinum_watch'
	]);

	tags.remove('forge:glass_panes/colorless', [
		'aether:quicksoil_glass_pane'
	]);

	const silverTags = [
		'c:silver_ores',
		'c:silver_ingots',
		'c:silver_nuggets',
		'c:silver_blocks',
		'c:raw_silver_ores',
		'c:raw_silver_blocks',
	];
	silverTags.forEach(tag => {
		tags.remove(tag, [/mythicmetals/])
	});

	// Reforges cause nothing is unified (ofc)
	// EDIT: Reforges are gone but tags like those are nice, so I'll keep them
	// Armor
	const types = [
		'helmet',
		'chestplate',
		'leggings',
		'boots'
	];
	types.forEach(type => {
		let str = type;
		if (!type.endsWith('s')) str = str + 's';
		tags.add('adj:equipment/' + str, [
			new RegExp(type)
		]);
		tags.add('adj:reforges/armor', [
			'#adj:equipment/' + str
		]);
	});
	// Bows
	tags.add('adj:reforges/bows', [
		'bow',
		'crossbow',
		'additionaladditions:crossbow_with_spyglass',
		/botania\:.*_bow/,
		'aether:phoenix_bow',
		'aether_redux:subzero_crossbow',
		'cataclysm:cursed_bow',
		'alexscaves:dreadbow',
	]);
	// Melee
	tags.add('adj:reforges/melee', [
		/sword/,
		/knife/,
		/axe/,
		'trident'
	]);
	// Shields
	tags.add('adj:reforges/shields', [
		/shield/
	]);

	tags.removeAllTagsFrom(/mythicmetals:silver/);
	tags.removeAllTagsFrom(/mythicmetals:raw_silver/);
	tags.removeAllTagsFrom('farmersdelight:wheat_dough');
	tags.removeAll('supplementaries:ropes');
	tags.add('supplementaries:ropes', [
		'supplementaries:rope'
	]);

	tags.add('adj:any_map', [
		'map',
		'filled_map',
		'supplementaries:slice_map',
		'alexscaves:cave_map'
	]);

	tags.add('adj:alloy_forge', [
		'alloy_forgery:adamantite_forge_casing_forge_controller',
		'alloy_forgery:cracked_deepslate_bricks_forge_controller',
		'alloy_forgery:cracked_stone_bricks_forge_controller',
		'alloy_forgery:ender_forge_casing_forge_controller',
		'alloy_forgery:nether_bricks_forge_controller',
	]);

	tags.add('adj:alloy_forge_casing', [
		/adj\:.*casing/
	]);

	tags.add('adj:music_disc', [
		/.*\:music_disc_/,
		'etched:etched_music_disc',
		'supplementaries:pancake',
		/botania\:record_/,
		'born_in_chaos_v1:anluka_doors',
		'born_in_chaos_v1:serpumpkinhead_m',
		'aether_redux:ancient_sentrite_music_disc'
	]);

	tags.removeAllTagsFrom('create:copper_nugget');

	tags.add('adj:attuned_pearls', [
		/cataclysm:.*eye.*/,
		'rediscovered:ruby_eye'
	]);

	tags.add('adj:ars/glyphs', [
		/.*\:glyph_.*/
	]);

	tags.add('adj:ars/rituals', [
		/.*\:ritual_.*/
	]);
	tags.remove('adj:ars/rituals', [
		'ars_nouveau:ritual_brazier'
	]);

	tags.add('adj:ars/lesser_spell_focus', [
		/ars_elemental:lesser_*/
	]);

	tags.add('adj:ars/spell_focus', [
		/ars_elemental:.*_focus/
	]);
	tags.remove('adj:ars/spell_focus', [
		/ars_elemental:lesser_*/
	]);

	tags.add('adj:ars/sourcelinks', [
		/ars_nouveau:.*_sourcelink/
	]);

	tags.add('adj:ars/relay', [
		/ars_nouveau:relay.*/
	]);

	tags.add('adj:ars/essence', [
		/ars_nouveau:.*_essence/
	]);

	tags.add('adj:ars/bangle', [
		/ars_elemental:.*_bangle/
	]);

	tags.add('adj:canvas', [
		/xercapaint:.*canvas.*/
	]);

	tags.add('adj:tidesinger_upgrade_coral', [
		/^(?!.*dead).*:.*_coral_block$/
	]);

	tags.add('adj:treasure_bag', [
		/treasure_bag/
	]);

	tags.add('adj:archwood_leaves', [
		/_archwood_leaves/
	]);

	tags.add('adjcore:curios_dropped_on_death', [
		'backpacked:backpack'
	]);

	tags.add('forge:buckets/entity_water', [
		/tide:.*_bucket/,
		/alexscaves:.*_bucket/
	]);

	tags.remove('botania:floating_flowers', [
		'#botania:special_floating_flowers'
	]);

	tags.remove('twilightforest:portal/activator');
	tags.add('twilightforest:portal/activator', [
		'botania:dragonstone'
	]);

	tags.add('witherstormmod:cure_base', [
		'#c:slime_balls'
	]);

	tags.add('forge:salts', [
		'galosphere:pink_salt_shard'
	]);

	tags.add('mythicmetals:osmium_equipment', [
		'mythicmetals:osmium_chainmail_helmet',
		'mythicmetals:osmium_chainmail_chestplate',
		'mythicmetals:osmium_chainmail_leggings',
		'mythicmetals:osmium_chainmail_boots'
	]);

	tags.add('forge:rums', [
		/.*delight.*:.*_rum/
	]);

	tags.add('forge:wines', [
		'vinery:red_wine'
	]);

	tags.add('twilightforest:dark_logs', [
		'#twilightforest:darkwood_logs'
	]);

	tags.add('twilightforest:time_logs', [
		'#twilightforest:timewood_logs'
	]);

	tags.add('twilightforest:transformation_logs', [
		'#twilightforest:transwood_logs'
	]);

	tags.add('adj:salt', [
		'galosphere:pink_salt',
		'galosphere:rose_pink_salt',
		'galosphere:pastel_pink_salt',
	]);

	tags.remove('c:chests', [
		'evilcraft:blood_chest'
	]);

	tags.add('adj:boss_trophy', [
		/twilightforest:.*trophy/,
		/umbral_skies:.*trophy/,
	]);

	tags.add('botania:mana_diamond_gems', [
		'ars_nouveau:source_gem'
	]);

	tags.add('adj:construction_wands', [
		/constructionwand:.*wand/
	]);

	tags.remove('forge:ender_pearls', [
		'unusualend:wandering_pearl'
	]);

	tags.add('adj:spawn_eggs', [
		/spawn_egg/,
		/ars_nouveau:.*_se$/
	]);

	tags.add('architects_palette:withered_bones', [
		'netherexp:fossil_fuel'
	]);

	tags.add('forge:wool', [
		'#c:wool'
	]);

	tags.add('forge:rums', [
		/brewinandchewin:.*_rum/
	]);

	tags.remove('forge:rods/wooden', [
		'aether:skyroot_stick'
	]);

	tags.add('create_ultimate_factory:dead_corals', [
		/upgrade_aquatic:dead_.*_coral.*/,
		/upgrade_aquatic:elder_prismarine_coral/,
		/upgrade_aquatic:dead_coralstone/
	]);

	tags.add('adj:compostable', [
		'#adj:small_coral',
		'#small_flowers',
		'#leaves',
		'bamboo',
		'grass',
		'fern'
	]);

	tags.add('adj:small_coral', [
		'minecraft:tube_coral',
		'minecraft:brain_coral',
		'minecraft:bubble_coral',
		'minecraft:fire_coral',
		'minecraft:horn_coral',
		'upgrade_aquatic:acan_coral',
		'upgrade_aquatic:finger_coral',
		'upgrade_aquatic:star_coral',
		'upgrade_aquatic:moss_coral',
		'upgrade_aquatic:petal_coral',
		'upgrade_aquatic:branch_coral',
		'upgrade_aquatic:rock_coral',
		'upgrade_aquatic:pillow_coral',
		'upgrade_aquatic:chrome_coral',
		'upgrade_aquatic:silk_coral',
		'minecraft:tube_coral_fan',
		'minecraft:brain_coral_fan',
		'minecraft:bubble_coral_fan',
		'minecraft:fire_coral_fan',
		'minecraft:horn_coral_fan',
		'upgrade_aquatic:acan_coral_fan',
		'upgrade_aquatic:finger_coral_fan',
		'upgrade_aquatic:star_coral_fan',
		'upgrade_aquatic:moss_coral_fan',
		'upgrade_aquatic:petal_coral_fan',
		'upgrade_aquatic:branch_coral_fan',
		'upgrade_aquatic:rock_coral_fan',
		'upgrade_aquatic:pillow_coral_fan',
		'upgrade_aquatic:chrome_coral_fan',
		'upgrade_aquatic:silk_coral_fan',
	]);

	tags.add('alexsmobs:frostalker_breedables', [
		'farmersdelight:ham',
		'farmersdelight:smoked_ham'
	]);

	tags.add('alexsmobs:tusklin_breedables', [
		'farmersdelight:red_mushroom_colony'
	]);

	tags.add('alexsmobs:tusklin_foodstuffs', [
		'farmersdelight:brown_mushroom_colony'
	]);

	tags.add('quark:seed_pouch_holdable', [
		'galosphere:bowl_lichen'
	])

	tags.remove('forge:obsidian', [
		'rubinated_nether:bleeding_obsidian'
	])

	tags.add('adj:scorched_logs', [
		/born_in_chaos_v1:.*scorched_log/,
		/born_in_chaos_v1:.*scorched_wood.*/
	]);

	tags.removeAllTagsFrom('rubinated_nether:ruby');

	tags.removeAllTagsFrom(/twilight,*:.*venison.*/);
	tags.add('twilightdelight:vension_raw', [
		'naturalist:venison'
	]);
	tags.add('twilightdelight:vension_cooked', [
		'naturalist:cooked_venison'
	]);

	tags.remove('twilightforest:fiery_vial', [
		'twilightforest:fiery_tears'
	]);

	const palladiumTags = [
		'c:palladium_ingots',
		'c:palladium_ores',
		'c:raw_palladium_blocks',
		'c:raw_palladium_ores',
		'c:palladium_nuggets',
		'c:palladium_blocks',
		'forge:ores/palladium',
		'forge:raw_materials/palladium',
		'forge:ingots/palladium',
		'forge:nuggets/palladium',
		'forge:storage_blocks/raw_palladium',
	];
	palladiumTags.forEach(tag => tags.remove(tag, ['@galosphere']));

	tags.add('adj:silver_ores', [
		'galosphere:palladium_ore',
		'galosphere:deepslate_palladium_ore',
	]);

	tags.add('c:raw_gravitite_ores', ['aether_redux:raw_gravitite', 'kubejs:gravitite_dust']);
	tags.add('c:raw_valkyrum_ores', ['aether_redux:raw_valkyrum', 'kubejs:valkyrum_dust']);
	tags.add('c:raw_veridium_ores', ['aether_redux:raw_veridium', 'kubejs:veridium_dust']);
	tags.add('c:raw_azure_neodymium_ores', ['alexscaves:raw_azure_neodymium', 'kubejs:azure_neodymium_dust']);
	tags.add('c:raw_scarlet_neodymium_ores', ['alexscaves:raw_scarlet_neodymium', 'kubejs:scarlet_neodymium_dust']);
	tags.add('c:raw_zinc_ores', ['create:raw_zinc', 'kubejs:zinc_dust']);
	tags.add('c:raw_bismuth_ores', ['etcetera:raw_bismuth', 'kubejs:bismuth_dust']);
	tags.add('c:raw_silver_ores', ['galosphere:raw_palladium', 'kubejs:silver_dust']);
	tags.add('c:raw_copper_ores', ['raw_copper', 'kubejs:copper_dust']);
	tags.add('c:raw_gold_ores', ['raw_gold', 'kubejs:gold_dust']);
	tags.add('c:raw_iron_ores', ['raw_iron', 'kubejs:iron_dust']);
	tags.add('c:raw_adamantite_ores', ['mythicmetals:raw_adamantite', 'kubejs:adamantite_dust']);
	tags.add('c:raw_aquarium_ores', ['mythicmetals:raw_aquarium', 'kubejs:aquarium_dust']);
	tags.add('c:raw_kyber_ores', ['mythicmetals:raw_kyber', 'kubejs:kyber_dust']);
	tags.add('c:raw_midas_gold_ores', ['mythicmetals:raw_midas_gold', 'kubejs:midas_gold_dust']);
	tags.add('c:raw_mythril_ores', ['mythicmetals:raw_mythril', 'kubejs:mythril_dust']);
	tags.add('c:raw_orichalcum_ores', ['mythicmetals:raw_orichalcum', 'kubejs:orichalcum_dust']);
	tags.add('c:raw_osmium_ores', ['mythicmetals:raw_osmium', 'kubejs:osmium_dust']);
	tags.add('c:raw_palladium_ores', ['mythicmetals:raw_palladium', 'kubejs:palladium_dust']);
	tags.add('c:raw_platinum_ores', ['mythicmetals:raw_platinum', 'kubejs:platinum_dust']);
	tags.add('c:raw_prometheum_ores', ['mythicmetals:raw_prometheum', 'kubejs:prometheum_dust']);
	tags.add('c:raw_runite_ores', ['mythicmetals:raw_runite', 'kubejs:runite_dust']);
	tags.add('c:raw_stormyx_ores', ['mythicmetals:raw_stormyx', 'kubejs:stormyx_dust']);
	tags.add('c:raw_tin_ores', ['mythicmetals:raw_tin', 'kubejs:tin_dust']);

	tags.remove('c:crops/cactus', ['cactus']);
	
	tags.add('adj:pressure_plates', [/pressure_plate$/]);

	tags.add('witherstormmod:command_block_tools', 'zenith:zenith');
});
