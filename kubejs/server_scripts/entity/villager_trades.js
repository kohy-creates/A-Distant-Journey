const wanderingTraderTrades = [
	[
		VillagerUtils.createSimpleTrade('6x minecraft:apple', 'minecraft:emerald').maxUses(4),
		VillagerUtils.createSimpleTrade(Item.of('minecraft:potion', '{Potion:"minecraft:water"}'), 'minecraft:emerald').maxUses(2),
		VillagerUtils.createSimpleTrade('10x minecraft:paper', 'minecraft:emerald').maxUses(6),
		VillagerUtils.createSimpleTrade('4x minecraft:bread', 'minecraft:emerald').maxUses(4),
		VillagerUtils.createSimpleTrade('20x minecraft:stick', 'minecraft:emerald').maxUses(2),
		VillagerUtils.createSimpleTrade('6x minecraft:sweet_berries', 'minecraft:emerald').maxUses(4),
		VillagerUtils.createSimpleTrade('1x minecraft:golden_apple', '10x minecraft:emerald').maxUses(2),
		VillagerUtils.createSimpleTrade('15x minecraft:emerald', 'confluence:extendo_grip').maxUses(2),
		VillagerUtils.createSimpleTrade('15x minecraft:emerald', 'confluence:extendo_grip').maxUses(2),
		VillagerUtils.createSimpleTrade('15x minecraft:emerald', 'confluence:portable_cement_mixer').maxUses(2),
		VillagerUtils.createSimpleTrade('15x minecraft:emerald', 'confluence:brick_layer').maxUses(2),
	],
	[
		VillagerUtils.createSimpleTrade(['minecraft:book', '8x minecraft:emerald'], 'kubejs:enchanters_guide').maxUses(1),
		VillagerUtils.createSimpleTrade('12x minecraft:emerald', 'quark:diamond_heart').maxUses(1),
		VillagerUtils.createSimpleTrade('20x minecraft:emerald', 'artifacts:crystal_heart').maxUses(1),
	]
]
MoreJSEvents.wandererTrades(event => {

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
