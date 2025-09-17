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

	function toolset(type) {
		let tools = [
			type + '_hoe',
			type + '_axe',
			type + '_shovel',
			type + '_sword',
			type + '_pickaxe',
		]

		let armors = armorset(type);
		armors.forEach(item => {
			if (Item.exists(item)) tools.push(item);
		})

		// This is for mods that add those by themselves
		// For Aether adding gloves for vanilla materials and such there are
		// extra lines below
		let extra = [
			'_shield',
			'_gloves',
			'_shears',
			'_fishing_rod',
			'_pick',
			'_lance'
		]
		extra.forEach(extraType => {
			let testItem = type + extraType;
			if (Item.exists(testItem)) tools.push(testItem);
		})

		// Searching for the Knives cause they come from different mods
		let knifeNamespaces = [ // Yes I am just bruteforcing my way through every mod that adds any
			'farmersdelight',
			'delightful',
			'aetherdelight'
		]
		for (let i = 0; i < knifeNamespaces.length; i++) {
			let knifeNamespace = knifeNamespaces[i];
			let knifeType = knifeNamespace + ':' + type.split(':')[1] + '_knife';
			if (Item.exists(knifeType)) {
				tools.push(knifeType);
				break;
			}
		}

		// Do the same for Gloves...
		let gloveNamespaces = [
			'aether',
			'lost_aether_content'
		]
		for (let i = 0; i < gloveNamespaces.length; i++) {
			let gloveNamespace = gloveNamespaces[i];
			let gloveType = gloveNamespace + ':' + type.split(':')[1] + '_gloves';
			if (Item.exists(gloveType)) {
				tools.push(gloveType);
				break;
			}
		}

		// ...Fishing Rods...
		let fishingRodNamespaces = [
			'tide'
		]
		for (let i = 0; i < fishingRodNamespaces.length; i++) {
			let fishingRodNamespace = fishingRodNamespaces[i];
			let fishingRodType = fishingRodNamespace + ':' + type.split(':')[1] + '_fishing_rod';
			if (Item.exists(fishingRodType)) {
				tools.push(fishingRodType);
				break;
			}
		}

		// ...and Shields
		let shieldNamespaces = [
			'shieldexp'
		]
		for (let i = 0; i < shieldNamespaces.length; i++) {
			let shieldNamespace = shieldNamespaces[i];
			let shieldType = shieldNamespace + ':' + type.split(':')[1] + '_shield';
			if (Item.exists(shieldType)) {
				tools.push(shieldType);
				break;
			}
		}

		return tools;
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


	maxDurability([
		toolset('minecraft:golden'),
		armorset('botania:manaweave')
	], 140)

	maxDurability([
		armorset('create:cardboard')
	], 70)

	maxDurability([
		toolset('minecraft:wooden'),
		toolset('aether:skyroot'),
		armorset('minecraft:leather'),
		armorset('mcdw:glaive_cackling_broom'),
		'mcdw:staff_battlestaff'
	], 100)

	maxDurability([
		'bow',
		'crossbow',
		'additionaladditions:crossbow_with_spyglass',
	], 250)

	maxDurability([
		toolset('mythicmetals:copper'),
		toolset('aether:holystone'),
	], 300)

	maxDurability([
		'mcdw:bow_weeping_vine_bow',
		'mcdw:bow_twisting_vine_bow'
	], 400)

	maxDurability([
		toolset('minecraft:iron'),
		toolset('botania:manasteel'),
		toolset('aether:zanite'),
		'mcdw:sickle_sickle',
		'mcdw:crossbow_butterfly_crossbow',
		'mcdw:crossbow_exploding_crossbow'
	], 700)

	maxDurability([
		toolset('mythicmetals:steel'),
		'mcdw:bow_power_bow',
		'mcdw:bow_phantom_bow'
	], 950)

	maxDurability([
		toolset('additionaladditions:rose_gold'),
		toolset('aether_redux:veridium'),
		toolset('aether_redux:infused_veridium'),
		armorset('ars_nouveau:arcanist'),
		armorset('born_in_chaos_v1:nigthmare_mantleofthe_night'),
		'mcdw:crossbow_pride_of_the_piglins',
		'mcdw:soul_dagger_soul_knife'
	], 1300)

	maxDurability([
		toolset('minecraft:diamond'),
		toolset('botania:terrasteel'),
		toolset('aether:gravitite'),
		toolset('aether:valkyrie'),
		toolset('lost_aether_content:phoenix'),
		armorset('aether:phoenix'),
		'mcdw:crossbow_azure_seeker',
		'mcdw:crossbow_firebolt_thrower'
	], 2000)

	maxDurability([
		toolset('minecraft:netherite'),
		'aether:obsidian_gloves',
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
		'mcdw:crossbow_slayer_crossbow'
	], 8000)

	maxDurability([
		toolset('mythicmetals:mythril'),
		toolset('mythicmetals:orichalcum'),
	], 2500)

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