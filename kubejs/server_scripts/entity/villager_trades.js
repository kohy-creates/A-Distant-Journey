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
			VillagerUtils.createSimpleTrade(['minecraft:book', '8x minecraft:emerald'], 'kubejs:enchanters_guide').maxUses(1),
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

		if (replacementsList.includes(firstInput.getId())) {
			offer.setFirstInput(Item.of(replacementsList[firstInput.getId()]))
		}
		if (replacementsList.includes(secondInput.getId())) {
			offer.setFirstInput(Item.of(replacementsList[secondInput.getId()]))
		}
		if (replacementsList.includes(output.getId())) {
			offer.setFirstInput(Item.of(replacementsList[output.getId()]))
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
			if (output.getId().includes('stone') || output.getId().includes('copper')) {
				offer.setOutput(`mythicmetals:copper_${id.replace('minecraft:stone_', '').replace('mythicmetals:copper_', '')}`)
				offer.setFirstInput(Item.of(firstInput, 4))
			}
			if (output.getId().includes('diamond')) {
				offer.setSecondInput('kubejs:diamond_upgrade')
			}
		}


	})
})
