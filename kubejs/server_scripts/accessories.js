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
