LootJS.modifiers((event) => {
	event.removeGlobalModifier("@confluence");
});

const tags = [
	"curios:aether_ring",
	"curios:aether_cape",
	"curios:charm",
	"curios:aether_pendant",
	"curios:necklace",
	"curios:bundle",
	"curios:back",
	"curios:head",
	"curios:ring",
	"curios:an_focus",
	"curios:feet",
	"curios:curio",
	"curios:aether_shield",
	"curios:aether_accessory",
	"curios:belt",
	"curios:aether_gloves",
	"curios:bracelet",
	"curios:body",
	//"curios:accessory",
	"curios:quiver",
	"curios:hands"
]

ServerEvents.tags('item', event => {

	// Every curio goes into the accessory slot
	tags.forEach(tagId => {
		let tag = event.get(tagId);
		tag.getObjectIds().forEach(entry => {
			if (entry.namespace != "backpacked") { // Except for backpacks
				event.add('curios:accessory', entry);
			}
		});
		tag.removeAll();
	});
	// Readd this one thingy to the back tag
	event.add('curios:back', 'backpacked:backpack')

	// Exclusions
	event.add('adjtweaks:curio_exclusions/spell_focus', [
		/ars_elemental:.*_focus/,
		/ars_nouveau:.*_focus/,
	])

	event.add('adjtweaks:curio_exclusions/gloves', [
		/aether:.*_gloves/,
		'lost_aether_content:power_gloves',
	])

	event.add('adjtweaks:curio_exclusions/quivers', [
		/quiver/
	])
});

ServerEvents.recipes(event => {
	event.remove({ id: 'confluence:obsidian_skull' })

	event.shaped(
		'confluence:band_of_regeneration',
		[
			' L ',
			'I I',
			' I '
		],
		{
			I: 'iron_ingot',
			L: 'heart_crystals:heart_crystal'
		}
	)

	event.shaped(
		'confluence:obsidian_skull',
		[
			'OOO',
			'OSO',
			'OOO'
		],
		{
			O: 'obsidian',
			S: 'skeleton_skull'
		}
	)

	event.shaped(
		'confluence:magma_stone',
		[
			'MMM',
			'MPM',
			'MMM'
		],
		{
			M: 'magma_block',
			P: 'mythicmetals:palladium_ingot'
		}
	)

	event.shaped(
		'confluence:shark_tooth_necklace',
		[
			' S ',
			'T T',
			'TTT'
		],
		{
			T: 'alexsmobs:shark_tooth',
			S: 'string'
		}
	)

	event.shaped(
		'confluence:shark_tooth_necklace',
		[
			' S ',
			'T T',
			'TTT'
		],
		{
			T: 'alexsmobs:shark_tooth',
			S: 'string'
		}
	)

	event.recipes.ars_nouveau.enchanting_apparatus(
		[
			'obsidian',
			'obsidian',
			'obsidian'
		],
		'rediscovered:rose',
		'confluence:obsidian_rose',
		200
	)

})

LootJS.modifiers(event => {
	event.addLootTableModifier('artifacts:chests/campsite_chest')
		.pool((pool) => {
			pool.rolls(1)
				.randomChance(1 /* If I ever want to change that */)
			pool.addWeightedLoot([
				LootEntry.of('confluence:band_of_regeneration'),
				LootEntry.of('confluence:cloud_in_a_bottle'),
				LootEntry.of('confluence:climbing_claws'),
				LootEntry.of('confluence:ancient_chisel'),
				LootEntry.of('confluence:hermes_boots'),
			])
		})

	event.addLootTableModifier('alexscaves:chests/underground_cabin')
		.pool((pool) => {
			pool.randomChance(0.6666);
			pool.addWeightedLoot([
				LootEntry.of('confluence:ancient_chisel'),
				LootEntry.of('confluence:climbing_claws'),
				LootEntry.of('confluence:cloud_in_a_bottle'),
				LootEntry.of('confluence:cobalt_shield'),
			])
		});

	event.addLootTableModifier('artifacts:entities/mimic')
		.pool((pool) => {
			pool.randomChance(1);
			pool.addWeightedLoot([
				LootEntry.of('confluence:cross_necklace'),
				LootEntry.of('confluence:putrid_scent'),
				LootEntry.of('confluence:panic_necklace'),
				LootEntry.of('confluence:star_cloak'),
				LootEntry.of('confluence:titan_glove')
			])
		});

	event.addLootTableModifier('minecraft:chests/nether_bridge')
		.pool((pool) => {
			pool.randomChance(0.33333);
			pool.addWeightedLoot([
				LootEntry.of('confluence:magma_stone'),
				LootEntry.of('confluence:lava_charm'),
				LootEntry.of('confluence:obsidian_rose'),
			])
		});

	event.addLootTableModifier('minecraft:chests/ruined_portal')
		.pool((pool) => {
			pool.addWeightedLoot([
				LootEntry.of('confluence:obsidian_skull')
			])
		});

	event.addLootTableModifier(/the_bumblezone\:structures\/.*/)
		.pool((pool) => {
			pool.randomChance(0.05)
			pool.addLoot(LootEntry.of('confluence:honey_comb'))
		})
})