ItemEvents.modification(event => {

	//////////////////////////////////////////////////////

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
			type + '_pickaxe'
		]

		// This is for mods that add those by themselves
		// For Aether adding gloves for vanilla materials and such there are
		// extra lines below
		let extra = [
			'_shield',
			'_gloves',
			'_shears',
			'_fishing_rod',
			'_pick' // Fuck you Botania
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

	maxDurability([
		toolset('minecraft:golden'),
	], 160)

	maxDurability([
		toolset('minecraft:wooden'),
		toolset('aether:skyroot'),
	], 100)

	maxDurability([
		toolset('mythicmetals:copper'),
		toolset('aether:holystone'),
	], 300)

	maxDurability([
		toolset('minecraft:iron'),
		toolset('botania:manasteel'),
		toolset('aether:zanite'),
	], 700)

	maxDurability([
		toolset('additionaladditions:rose_gold'),
		toolset('aether_redux:veridium'),
		toolset('aether_redux:infused_veridium'),
	], 1200)

	maxDurability([
		toolset('minecraft:diamond'),
		toolset('botania:terrasteel'),
		toolset('aether:gravitite'),
		toolset('aether:valkyrie'),
		toolset('lost_aether_content:phoenix')
	], 2000)

	maxDurability([
		toolset('minecraft:netherite'),
		'aether:obsidian_gloves'
	], 3000)

	maxDurability([
		toolset('majruszsdifficulty:enderium'),
	], 7000)

	maxDurability([
		toolset('experienceobelisk:cognitive'),
		'experienceobelisk:cognitive_bow',
		'experienceobelisk:flint_and_cognitive_alloy'
	], 1100)

	maxDurability('trident', 700)
	maxDurability([
		'bow',
		'crossbow',
		'aether:phoenix_bow',
		'additionaladditions:crossbow_with_spyglass'
	], 500)

	maxDurability([
		toolset('mythicmetals:adamantite'),
	], 3000)

	maxDurability([
		toolset('mythicmetals:banglum'),
	], 400)

	maxDurability([
		toolset('mythicmetals:bronze'),
	], 650)

	maxDurability([
		toolset('mythicmetals:carmot'),
	], 1500)

	maxDurability([
		toolset('mythicmetals:celestium'),
	], 7000)

	maxDurability([
		toolset('mythicmetals:durasteel'),
	], 1000)

	maxDurability([
		toolset('mythicmetals:hallowed'),
	], 4000)

	maxDurability([
		toolset('mythicmetals:kyber'),
	], 900)

	maxDurability([
		toolset('mythicmetals:metallurgium'),
	], 6000)

	maxDurability([
		toolset('mythicmetals:mythril'),
	], 2500)

	maxDurability([
		toolset('mythicmetals:orichalcum'),
	], 2000)

	maxDurability([
		toolset('mythicmetals:osmium'),
	], 550)

	maxDurability([
		toolset('mythicmetals:palladium'),
	], 2000)

	maxDurability([
		toolset('mythicmetals:prometheum'),
	], 1500)

	maxDurability([
		toolset('mythicmetals:quadrillum'),
	], 500)


	maxDurability([
		toolset('mythicmetals:runite'),
	], 1500)

	maxDurability([
		toolset('mythicmetals:star_platinum'),
	], 6000)

	maxDurability([
		toolset('mythicmetals:stormyx'),
	], 2000)

	maxDurability([
		toolset('mythicmetals:tidesinger'),
	], 1800)

	maxDurability([
		toolset('mythicmetals:star_platinum'),
	], 6000)

	maxDurability([
		toolset('phantasm:crystalline'),
	], 700)

	maxDurability([
		toolset('unusualend:pearlescent'),
	], 5000)

	maxDurability([
		toolset('unusualend:pearlescent'),
	], 5000)

	//////////////////////////////////////////////////////

	const amounts = [13, 16, 15, 11]
	const item_ids = ['_helmet', '_chestplate', '_leggings', '_boots']
	function maxDurabilityArmor(prefix, mul, customAmounts) {
		if (!customAmounts) customAmounts = amounts;
		for (let i = 0; i < item_ids.length; i++) {
			let target = prefix + item_ids[i]
			event.modify(target, item => {
				item.maxDamage = Math.round((mul * customAmounts[i]) / 5) * 5;
			})
		};
	}

	//////////////////////////////////////////////////////

	maxDurabilityArmor('minecraft:golden', 18);
	maxDurabilityArmor('minecraft:leather', 10);
	maxDurabilityArmor('galosphere:sterling', 25);
	maxDurabilityArmor('minecraft:chainmail', 28);
	maxDurabilityArmor('minecraft:iron', 40);
	maxDurabilityArmor('botania:manasteel', 40);
	maxDurabilityArmor('rediscovered:studded', 35);
	maxDurabilityArmor('additionaladditions:rose_gold', 50);
	maxDurabilityArmor('minecraft:diamond', 65);
	maxDurabilityArmor('botania:terrasteel', 65);
	maxDurabilityArmor('minecraft:netherite', 75);
	maxDurabilityArmor('majruszsdifficulty:enderium', 90);

})