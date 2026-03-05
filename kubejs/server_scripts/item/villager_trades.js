MoreJSEvents.wandererTrades(event => {

	function emeraldTrade(item, count) {
		return VillagerUtils.createSimpleTrade(Item.of(item, count), 'emerald').maxUses(6);
	}

	let wanderingTraderTrades = [
		[
			emeraldTrade('minecraft:apple', 6),
			VillagerUtils.createSimpleTrade(Item.of('minecraft:potion', '{Potion:"minecraft:water"}'), 'emerald').maxUses(3),
			emeraldTrade('minecraft:paper', 14),
			emeraldTrade('minecraft:bread', 4),
			emeraldTrade('minecraft:stick', 24),
			emeraldTrade('minecraft:sweet_berries', 12),
			VillagerUtils.createSimpleTrade('1x minecraft:golden_apple', '10x minecraft:emerald').maxUses(2),
			VillagerUtils.createSimpleTrade('15x minecraft:emerald', 'terra_curio:extendo_grip').maxUses(2),
			emeraldTrade('minecraft:potato', 20),
			emeraldTrade('minecraft:iron_ingot', 5),
			emeraldTrade('minecraft:gold_ingot', 3),
			emeraldTrade('minecraft:carrot', 20),
			emeraldTrade('minecraft:beetroot_soup', 1),
			emeraldTrade('minecraft:rabbit_foot', 1),
			emeraldTrade('minecraft:rotten_flesh', 40),
			emeraldTrade('mythicmetals:tin_ingot', 4),
			emeraldTrade('amethyst_shard', 8),
			emeraldTrade('create:andesite_alloy', 8),
			emeraldTrade('coal', 12),
		],
		[
			VillagerUtils.createSimpleTrade(['minecraft:book', '6x minecraft:emerald'], 'kubejs:enchanters_guide').maxUses(1),
			VillagerUtils.createSimpleTrade('12x minecraft:emerald', 'quark:diamond_heart').maxUses(1),
			VillagerUtils.createSimpleTrade('20x minecraft:emerald', 'artifacts:crystal_heart').maxUses(1),
		]
	]

	event.removeVanillaTrades(1);
	event.removeModdedTrades(1);
	event.removeVanillaTrades(2);
	event.removeModdedTrades(2);

	wanderingTraderTrades[0].forEach(trade => {
		event.addTrade(1, trade);
	});
	wanderingTraderTrades[1].forEach(trade => {
		event.addTrade(2, trade);
	});
})

const $TieredItem = Java.loadClass('net.minecraft.world.item.TieredItem')
const $ArmorItem = Java.loadClass('net.minecraft.world.item.ArmorItem')
// const $SwordItem = Java.loadClass('net.minecraft.world.item.SwordItem')

MoreJSEvents.updateVillagerOffers(event => {
	const offers = event.getAddedOffers();
	const replacementsList = Object.keys(replaceItemsMap);
	offers.forEach(offer => {
		const output = offer.output;
		const firstInput = offer.firstInput;
		const secondInput = offer.secondInput;

		const exceptions = [
			'minecraft:diamond_helmet',
			'minecraft:diamond_chestplate',
			'minecraft:diamond_leggings',
			'minecraft:diamond_boots',
			'minecraft:diamond_sword',
			'minecraft:diamond_shovel',
			'minecraft:diamond_axe',
			'minecraft:diamond_hoe',
			'minecraft:diamond_pickaxe',
			'minecraft:iron_helmet',
			'minecraft:iron_chestplate',
			'minecraft:iron_leggings',
			'minecraft:iron_boots',
		];

		if (replacementsList.includes(firstInput.getId()) && !exceptions.includes(firstInput.getId())) {
			offer.setFirstInput(Item.of(replaceItemsMap[firstInput.getId()]))
		}
		if (replacementsList.includes(secondInput.getId()) && !exceptions.includes(secondInput.getId())) {
			offer.setSecondInput(Item.of(replaceItemsMap[secondInput.getId()]))
		}
		if (replacementsList.includes(output.getId()) && !exceptions.includes(output.getId())) {
			offer.setOutput(Item.of(replaceItemsMap[output.getId()]))
		}

		if (output.getItem() instanceof $ArmorItem) {
			let defense = 0;
			output.getAttributeModifiers(output.getItem().getEquipmentSlot()).get($Attributes.ARMOR).forEach(modifier => {
				defense += modifier.getAmount();
			})
			let durability = output.getItem().getMaxDamage();
			offer.setFirstInput(Item.of(offer.getCostA(), Math.round((10.5 + (defense * 1.3)) * Math.min(Math.max(durability / 600, 0.55), 1.75))));
			if (id.includes('diamond')) {
				offer.setSecondInput('kubejs:diamond_upgrade')
			}
		}
		else if (output.getItem() instanceof $TieredItem) {
			if (output.getId().includes('diamond')) {
				offer.setSecondInput('kubejs:diamond_upgrade')
			}
		}
	})
})

MoreJSEvents.villagerTrades(event => {

	const villagerXP = [
		2,
		6,
		13,
		15,
		30
	]

	function newBasicTrade(profession, level, inputs, output, maxUses, priceMul) {
		event.addCustomTrade(profession, level, (offer, entity, random) => {
			if (Array.isArray(inputs)) {
				offer.setFirstInput(inputs[0]);
				offer.setSecondInput(inputs[1]);
			}
			else {
				offer.setFirstInput(inputs);
			}
			offer.setOutput(output);
			offer.setMaxUses((maxUses) ? maxUses : 8);
			offer.setVillagerExperience(villagerXP[level - 1]);
			offer.setPriceMultiplier((priceMul) ? priceMul : 0.05);
		});
	}

	function newPremiumTrade(profession, level, inputs, output, maxUses) {
		newBasicTrade(profession, level, inputs, output, (maxUses) ? maxUses : 4, 0.2);
	}

	// Backpacks
	newPremiumTrade('librarian', 5, '42x emerald', 'travelersbackpack:bookshelf', 2);
	newPremiumTrade('morevillagers:miner', 4, '42x emerald', 'travelersbackpack:bat', 2);
	newPremiumTrade('morevillagers:hunter', 5, '42x emerald', 'travelersbackpack:spider', 2);
	newPremiumTrade('morevillagers:hunter', 4, '42x emerald', 'travelersbackpack:wolf', 2);
	newPremiumTrade('morevillagers:hunter', 4, '42x emerald', 'travelersbackpack:fox', 2);
	newPremiumTrade('morevillagers:hunter', 5, '42x emerald', 'travelersbackpack:ocelot', 2);
	newPremiumTrade('morevillagers:florist', 4, '42x emerald', 'travelersbackpack:bee', 2);
	newPremiumTrade('morevillagers:enderian', 3, '42x emerald', 'travelersbackpack:end', 2);
	newPremiumTrade('morevillagers:netherian', 5, '42x emerald', 'travelersbackpack:ghast', 2);
	newPremiumTrade('morevillagers:netherian', 5, '42x emerald', 'travelersbackpack:magma_cube', 2);
	newPremiumTrade('farmer', 5, '42x emerald', 'travelersbackpack:hay', 2);
	newPremiumTrade('leatherworker', 5, '42x emerald', 'travelersbackpack:horse', 2);
	newPremiumTrade('butcher', 5, '42x emerald', 'travelersbackpack:pig', 2);
	newPremiumTrade('shepherd', 4, '42x emerald', 'travelersbackpack:sheep', 2);
	newPremiumTrade('butcher', 4, '42x emerald', 'travelersbackpack:cow', 2);
	newPremiumTrade('butcher', 5, '42x emerald', 'travelersbackpack:chicken', 2);

	// Miner
	newBasicTrade('morevillagers:miner', 1, '1x emerald', '16x tuff');
	newBasicTrade('morevillagers:miner', 1, '40x cobblestone', 'emerald');
	newBasicTrade('morevillagers:miner', 3, '7x emerald', '1x alexsmobs:centipede_leg');
	newBasicTrade('morevillagers:miner', 5, '64x emerald', '1x quark:forgotten_hat');

	// Hunter
	newBasicTrade('morevillagers:hunter', 1, '11x gunpowder', 'emerald');
	newPremiumTrade('morevillagers:hunter', 1, '1x ender_pearl', 'emerald');
	newBasicTrade('morevillagers:hunter', 3, '17x emerald', '1x alexsmobs:froststalker_horn');
	newBasicTrade('morevillagers:hunter', 2, '8x emerald', '1x alexsmobs:bear_fur');
	newBasicTrade('morevillagers:hunter', 5, '3x emerald', '5x alexsmobs:crocodile_scute');
	newBasicTrade('butcher', 4, '14x emerald', '2x naturalist:antler');
	newBasicTrade('cartographer', 4, '48x emerald', '1x naturalist:teddy_bear');

	// Butcher
	newBasicTrade('butcher', 4, '2x emerald', '5x cooked_mutton', 16);
	newBasicTrade('butcher', 4, '2x emerald', '6x cooked_beef', 16);
	newBasicTrade('butcher', 1, '15x emerald', '1x alexsmobs:moose_ribs');
	newBasicTrade('butcher', 1, '12x emerald', '1x alexsmobs:kangaroo_meat');
	newBasicTrade('butcher', 1, '17x emerald', '1x alexsmobs:raw_catfish');
	newBasicTrade('butcher', 3, '1x emerald', '3x alexsmobs:cooked_moose_ribs');
	newBasicTrade('butcher', 3, '1x emerald', '2x alexsmobs:cooked_kangaroo_meat');
	newBasicTrade('butcher', 3, '1x emerald', '3x alexsmobs:cooked_catfish');
	newBasicTrade('butcher', 1, '11x naturalist:duck', '1x emerald');
	newBasicTrade('butcher', 1, '11x naturalist:venison', '1x emerald');
	newBasicTrade('butcher', 1, '8x naturalist:lizard_tail', '2x emerald');
	newBasicTrade('butcher', 3, '2x emerald', '5x naturalist:cooked_duck');
	newBasicTrade('butcher', 3, '2x emerald', '4x naturalist:cooked_venison');
	newBasicTrade('butcher', 3, '2x emerald', '5x naturalist:cooked_lizard_tail');

	// Cartographer
	newBasicTrade('cartographer', 5, '8x emerald', 'minecraft:creeper_banner_pattern', 12);
	newBasicTrade('cartographer', 5, '8x emerald', 'minecraft:mojang_banner_pattern', 12);
	newBasicTrade('cartographer', 5, '8x emerald', 'minecraft:skull_banner_pattern', 12);

	// Cleric
	newPremiumTrade('cleric', 3, '3x emerald', 'minecraft:rabbit_foot', 5);
	newBasicTrade('cleric', 1, '8x soul_sand', '1x emerald');
	newBasicTrade('cleric', 4, ['8x emerald', '1x apple'], 'minecraft:golden_apple');
	newBasicTrade('cleric', 5, '64x emerald', '1x alexsmobs:soul_heart');

	// Farmer
	newBasicTrade('farmer', 1, '1x emerald', '5x wheat', 16);
	newBasicTrade('farmer', 1, '1x emerald', '6x potato', 16);
	newBasicTrade('farmer', 1, '1x emerald', '5x carrot', 16);
	newBasicTrade('farmer', 1, '1x emerald', '6x sugar_cane', 16);
	newBasicTrade('farmer', 1, '28x sugar_cane', '1x emerald', 16);
	newBasicTrade('farmer', 2, '1x emerald', '4x egg', 16);
	newBasicTrade('farmer', 2, '16x egg', '1x emerald', 16);
	newBasicTrade('farmer', 1, '4x sugar', '1x emerald');
	newBasicTrade('farmer', 1, '1x emerald', 'minecraft:flower_pot');
	newBasicTrade('farmer', 1, ['1x emerald', '1x bucket'], 'minecraft:milk_bucket');
	newBasicTrade('farmer', 1, '12x egg', '3x emerald');
	newBasicTrade('farmer', 1, '2x emerald', '2x cactus');
	newBasicTrade('farmer', 3, '1x emerald', '3x bone_meal');
	newBasicTrade('farmer', 1, '3x emerald', '1x ars_nouveau:sourceberry_bush');
	newBasicTrade('farmer', 2, '3x emerald', '1x ars_nouveau:mendosteen_pod');
	newBasicTrade('farmer', 2, '3x emerald', '1x ars_nouveau:bastion_pod');
	newBasicTrade('farmer', 3, '3x emerald', '1x ars_nouveau:frostaya_pod');
	newBasicTrade('farmer', 3, '3x emerald', '1x ars_nouveau:bombegrante_pod');
	newBasicTrade('farmer', 4, '27x emerald', '1x ars_nouveau:source_berry_pie');
	newBasicTrade('farmer', 4, '15x emerald', '4x ars_nouveau:source_berry_roll');
	newBasicTrade('farmer', 5, '61x emerald', '1x ars_nouveau:magebloom_crop');
	newBasicTrade('farmer', 1, '16x emerald', '3x create:dough');
	newBasicTrade('farmer', 3, '4x emerald', '5x create:honeyed_apple');
	newBasicTrade('farmer', 3, '11x emerald', '1x create:builders_tea');
	newBasicTrade('farmer', 5, '10x emerald', '1x quark:ancient_fruit');

	// Florist
	newBasicTrade('morevillagers:florist', 3, '1x emerald', '4x podzol');
	newBasicTrade('morevillagers:florist', 4, '3x emerald', '2x mycelium');
	newBasicTrade('morevillagers:florist', 5, '5x emerald', '1x create:tree_fertilizer');
	newBasicTrade('morevillagers:florist', 4, '3x emerald', '1x quark:moss_paste');

	// Fisherman
	newBasicTrade('fisherman', 5, '4x emerald', 'minecraft:pufferfish', 5);
	newBasicTrade('fisherman', 1, '6x emerald', 'minecraft:cod_bucket');
	newBasicTrade('fisherman', 1, '7x emerald', 'minecraft:salmon_bucket');
	newBasicTrade('fisherman', 1, '4x ink_sac', '1x emerald');
	newBasicTrade('fisherman', 1, '4x lily_pad', '1x emerald');
	newBasicTrade('fisherman', 1, '4x kelp', '1x emerald');
	newBasicTrade('fisherman', 1, ['2x kelp', '1x emerald'], '4x dried_kelp');
	newBasicTrade('fisherman', 3, '6x emerald', 'minecraft:pufferfish_bucket');
	newBasicTrade('fisherman', 3, '6x emerald', 'minecraft:tropical_fish_bucket');
	newBasicTrade('fisherman', 4, '7x emerald', 'minecraft:tadpole_bucket');
	newBasicTrade('fisherman', 4, '2x glow_ink_sac', '1x emerald');
	newBasicTrade('fisherman', 5, '8x emerald', 'minecraft:axolotl_bucket');
	newBasicTrade('fisherman', 4, '7x emerald', '1x alexsmobs:blobfish');
	newBasicTrade('fisherman', 3, '1x emerald', '2x alexsmobs:cooked_lobster_tail');
	newBasicTrade('fisherman', 2, '3x emerald', '5x naturalist:cooked_catfish');
	newBasicTrade('fisherman', 2, '17x naturalist:catfish', '1x emerald');
	newBasicTrade('fisherman', 3, '5x emerald', '7x naturalist:cooked_bass');
	newBasicTrade('fisherman', 3, '11x naturalist:bass', '1x emerald');

	// Endologist
	newBasicTrade('morevillagers:enderian', 4, '5x emerald', '3x alexsmobs:cosmic_cod');

	// Leatherworker
	newBasicTrade('leatherworker', 3, '1x emerald', '3x leather', 16);

	// Mason
	newBasicTrade('mason', 3, '1x emerald', '8x cobblestone', 16);
	newBasicTrade('mason', 3, '32x cobblestone', '1x emerald', 16);
	newBasicTrade('mason', 1, '8x stone_bricks', '1x emerald');
	newBasicTrade('mason', 2, '6x nether_bricks', '1x emerald');
	newBasicTrade('mason', 4, ['2x stone_bricks', '3x emerald'], '2x infested_stone_bricks');
	newBasicTrade('mason', 5, ['2x stone', '4x emerald'], '2x infested_stone');
	newBasicTrade('mason', 2, '1x emerald', '8x quark:limestone');
	newBasicTrade('mason', 2, '1x emerald', '8x quark:jasper');
	newBasicTrade('mason', 2, '1x emerald', '8x quark:shale');

	// Shepherd
	newBasicTrade('shepherd', 1, '1x emerald', '3x string', 5);

	// Toolsmith
	newBasicTrade('toolsmith', 1, '3x emerald', 'minecraft:bucket');

	// Weaponsmith
	newBasicTrade('weaponsmith', 5, '63x emerald', '1x quark:diamond_heart');

	// Engineer
	newBasicTrade('morevillagers:engineer', 1, '9x emerald', '1x create:super_glue');
	newBasicTrade('morevillagers:engineer', 1, '1x emerald', '8x create:cogwheel');
	newBasicTrade('morevillagers:engineer', 2, '3x emerald', '8x create:large_cogwheel');
	newBasicTrade('morevillagers:engineer', 2, '1x emerald', '1x create:sand_paper');
	newBasicTrade('morevillagers:engineer', 3, '3x emerald', '12x create:shaft');
	newBasicTrade('morevillagers:engineer', 4, '1x emerald', '2x create:fluid_pipe');
	newBasicTrade('morevillagers:engineer', 5, '7x emerald', '10x create:track');

	// Fletcher
	newBasicTrade('fletcher', 3, '7x emerald', '14x alexsmobs:roadrunner_feather');
	newBasicTrade('fletcher', 3, '7x emerald', '24x quark:torch_arrow');

})
