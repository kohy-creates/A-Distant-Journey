ItemEvents.modification(event => {

	//////////////////////////////////////////////////////

	/**
	 * @param {InputItem_|InputItem_[]} target 
	 * @param {number} amount 
	 */
	function maxDurability(target, amount) {
		event.modify(target, item => {
			item.maxDamage = amount
		})
	}

	//////////////////////////////////////////////////////

	const item_ids = Object.values(global.armorSuffixes)
		.reduce((all, arr) => all.concat(arr), []);

	function armorset(type) {
		let list = [];
		item_ids.forEach(item => {
			const i = type + item;
			if (Item.exists(i)) list.push(i);
		})
		return list;
	}

	//////////////////////////////////////////////////////

	function toolset(type) {
		let tools = [
			type + '_hoe',
			type + '_axe',
			type + '_shovel',
			type + '_sword',
			type + '_pickaxe',
		];

		let armors = armorset(type);
		armors.forEach(item => {
			if (Item.exists(item)) tools.push(item);
		});

		let extra = [
			'_shield',
			'_shears',
			'_fishing_rod',
			'_pick',
			'_lance'
		];
		extra.forEach(extraType => {
			let testItem = type + extraType;
			if (Item.exists(testItem)) tools.push(testItem);
		});

		// Searching for the Knives cause they come from different mods
		let knifeNamespaces = [
			'farmersdelight',
			'delightful',
			'aetherdelight'
		];
		for (let knifeNamespace of knifeNamespaces) {
			let knifeType = `${knifeNamespace}:${type.split(':')[1]}_knife`;
			if (Item.exists(knifeType)) {
				tools.push(knifeType);
				break;
			}
		}
		// ...Fishing Rods...
		let fishingRodNamespaces = [
			'tide'
		];
		for (let fishingRodNamespace of fishingRodNamespaces) {
			let fishingRodType = `${fishingRodNamespace}:${type.split(':')[1]}_fishing_rod`;
			if (Item.exists(fishingRodType)) {
				tools.push(fishingRodType);
				break;
			}
		}

		// ...and Shields
		let shieldNamespaces = [
			'shieldexp'
		];
		for (let shieldNamespace of shieldNamespaces) {
			let shieldType = `${shieldNamespace}:${type.split(':')[1]}_shield`;
			if (Item.exists(shieldType)) {
				tools.push(shieldType);
				break;
			}
		}

		// Simply Swords suppot
		const simplySwordsSuffixes = [
			'_katana',
			'_spear',
			'_glaive',
			'_warglaive',
			'_chakram',
			'_scythe'
		];

		const baseMaterial = type.split(':')[1];
		const compatPath = `simplyswords:mythicmetals_compat/${baseMaterial}/${baseMaterial}_`;

		simplySwordsSuffixes.forEach(suffix => {
			const simpleId = `simplyswords:${baseMaterial}${suffix}`;
			const compatId = `${compatPath}${suffix.replace(/^_/, '')}`;

			if (Item.exists(simpleId)) tools.push(simpleId);
			if (Item.exists(compatId)) tools.push(compatId);
		});
		return tools;
	}

	//////////////////////////////////////////////////////

	const noDurability = [
		/stardew_fishing\:.*bobber/,
		/.*aether.*\:.*glove/,
		/umbral_skies\:.*gloves/,
		'the_bumblezone:flower_headwear'
	]
	event.modify(noDurability, item => {
		item.setMaxDamage(0);
	})

	//////////////////////////////////////////////////////

	maxDurability([
		toolset('minecraft:golden'),
		armorset('botania:manaweave')
	], 150)

	maxDurability([
		armorset('create:cardboard')
	], 70)

	maxDurability([
		'turtle_helmet',
		'etcetera:tidal_helmet'
	], 600)

	maxDurability([
		toolset('minecraft:wooden'),
		toolset('aether:skyroot'),
		armorset('minecraft:leather'),
		armorset('mcdw:glaive_cackling_broom'),
		'mcdw:staff_battlestaff'
	], 110)

	maxDurability([
		'bow',
	], 250)

	maxDurability([
		toolset('mythicmetals:copper'),
		toolset('aether:holystone'),
		'crossbow',
		'additionaladditions:crossbow_with_spyglass',
	], 300)

	maxDurability([
		'mcdw:bow_weeping_vine_bow',
		'mcdw:bow_twisting_vine_bow'
	], 430)

	maxDurability([
		toolset('minecraft:iron'),
		toolset('botania:manasteel'),
		toolset('aether:zanite'),
		'mcdw:sickle_sickle',
		'mcdw:crossbow_butterfly_crossbow',
		'mcdw:crossbow_exploding_crossbow',
		'farmersdelight:skillet'
	], 700)

	maxDurability([
		'mcdw:bow_power_bow',
		'mcdw:bow_phantom_bow'
	], 950)

	maxDurability([
		armorset('ars_nouveau:arcanist'),
	], 2200)

	maxDurability([
		toolset('additionaladditions:rose_gold'),
		toolset('aether_redux:veridium'),
		toolset('aether_redux:infused_veridium'),
		'mcdw:crossbow_pride_of_the_piglins',
		'mcdw:soul_dagger_soul_knife',
		toolset('mythicmetals:steel'),
	], 1300)

	maxDurability([
		toolset('minecraft:diamond'),
		toolset('botania:terrasteel'),
		toolset('aether:gravitite'),
		toolset('aether:valkyrie'),
		toolset('lost_aether_content:phoenix'),
		armorset('aether:phoenix'),
		armorset('aether:obsidian'),
		'mcdw:crossbow_azure_seeker',
		'mcdw:crossbow_firebolt_thrower',
		armorset('born_in_chaos_v1:nightmare_mantleofthe_night'),
	], 2000)

	maxDurability([
		toolset('minecraft:netherite'),
		armorset('born_in_chaos_v1:dark_metal_armor'),
		armorset('cataclysm:cursium'),
		armorset('cataclysm:ignitium'),
		toolset('mythicmetals:adamantite'),
		'mcdw:crossbow_heavy_crossbow',
		'mcdw:bow_winters_touch',
		'mcdw:soul_dagger_truthseeker',
		'mcdw:scythe_skull_scythe',
		'mcdw:sword_heartstealer'
	], 3000)

	maxDurability([
		'mcdw:dagger_resolute_tempest_knife'
	], 3700)

	maxDurability([
		toolset('majruszsdifficulty:enderium'),
		'mcdw:sword_sinister',
		'mcdw:sword_obsidian_claymore',
		'mcdw:soul_dagger_eternal_knife'
	], 6000)

	maxDurability([
		toolset('experienceobelisk:cognitive'),
		'experienceobelisk:cognitive_bow',
		'experienceobelisk:flint_and_cognitive_alloy',
		armorset('alexscaves:primordial'),
		'mcdw:scythe_jailors_scythe',
		'mcdw:scythe_soul_scythe',
		'mcdw:bow_bonebow'
	], 1100)

	maxDurability('trident', 700)
	maxDurability('mutantmonsters:hulk_hammer', 1500)
	maxDurability([
		'aether:phoenix_bow',
		armorset('mythicmetals:midas_gold'),
		'mcdw:bow_elite_power_bow',
		'mcdw:glaive_grave_bane',
		'mcdw:hammer_boneclub',
		'mcdw:hammer_bone_cudgel',
		'mcdw:hammer_great_hammer',
		/mcdw:sickle_the_last_laugh_.*/
	], 1200)

	maxDurability([
		toolset('mythicmetals:bronze'),
		toolset('mythicmetals:kyber'),
		toolset('galosphere:sterling'),
	], 500)

	maxDurability([
		toolset('mythicmetals:celestium'),
		toolset('mythicmetals:metallurgium'),
		armorset('ars_elemental:air'),
		armorset('ars_elemental:water'),
		armorset('ars_elemental:fire'),
		armorset('ars_elemental:earth'),
		'mcdw:crossbow_slayer_crossbow'
	], 8000)

	maxDurability([
		toolset('mythicmetals:mythril'),
		toolset('mythicmetals:orichalcum'),
	], 2000)

	maxDurability([
		armorset('minecraft:chainmail'),
		armorset('rediscovered:plate'),
	], 500)

	maxDurability([
		toolset('mythicmetals:osmium_chainmail'),
		toolset('rediscovered:studded'),
	], 900)

	maxDurability([
		toolset('mythicmetals:palladium'),
	], 2000)

	maxDurability([
		toolset('mythicmetals:prometheum'),
		armorset('aether:neptune'),
		'mcdw:glaive_venom_glaive'
	], 1700)

	maxDurability([
		toolset('mythicmetals:runite'),
	], 950)

	maxDurability([
		toolset('mythicmetals:star_platinum'),
	], 6000)

	maxDurability([
		toolset('mythicmetals:stormyx'),
	], 2400)

	maxDurability([
		armorset('cataclysm:bone_reptile'),
		'mcdw:bow_sabrewing'
	], 1900)

	maxDurability([
		toolset('mythicmetals:tidesinger'),
	], 1200)

	maxDurability([
		toolset('phantasm:crystalline'),
		toolset('unusualend:pearlescent'),
		'mcdw:dagger_backstabber',
		'mcdw:dagger_void_touched_blade',
		'mcdw:bow_call_of_the_void'
	], 4000)
	maxDurability([
		'mcdw:dagger_swift_striker',
		'mcdw:hammer_gravity',
		'mcdw:crossbow_veiled_crossbow'
	], 4500)

})