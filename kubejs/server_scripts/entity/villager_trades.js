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

	offers.forEach(offer => {

		const output = offer.output;
		const id = output.getId();

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
			if (id.includes('stone')) {
				offer.setOutput(`mythicmetals:copper_${id.replace('minecraft:stone_', '')}`)
				offer.setFirstInput(Item.of(offer.getCostA(), 4))
			}
			if (id.includes('diamond')) {
				offer.setSecondInput('kubejs:diamond_upgrade')
			}
		}
		// else if (id.endsWith('_plush')) {
		// 	offer.setFirstInput(Item.of(offer.costA, offer.costA.count * 3))
		// 	offer.setSecondInput(Item.of(offer.costB, offer.costB.count + 3))
		// }
	})
})
