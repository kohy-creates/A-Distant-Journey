const tags = [
	"curios:aether_ring",
	"curios:aether_cape",
	"curios:charm",
	"curios:aether_pendant",
	"curios:necklace",
	"curios:bundle",
	// "curios:back",
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
	"curios:hands",
	"curios:trinkets",
]

ServerEvents.tags('item', event => {

	// Every curio goes into the accessory slot
	tags.forEach(tagId => {
		let tag = event.get(tagId);
		tag.getObjectIds().forEach(entry => event.add('curios:accessory', entry));
		tag.removeAll();
	});

	event.remove('curios:back', [
		'#elytraslot:elytra',
		'#aether:accessories_capes',
		'accents:wings',
		'accents:bandolier',
		'accents:sheathed_katana',
		'accents:item_satchel',
	]);

	event.removeAll('accents:trinkets/back');
	event.removeAll('aether:accessories_capes');

	event.remove('curios:ring', [
		'botanicadds:aura_ring_gaia',
		'botanicadds:mana_ring_gaia'
	]);

	event.add('curios:accessory', [
		'botanicadds:aura_ring_gaia',
		'botanicadds:mana_ring_gaia',
		'#elytraslot:elytra',
		'accents:wings',
		'accents:bandolier',
		'accents:sheathed_katana',
		'accents:item_satchel',
		/.*aether.*:.*_cape$/,
		/.*aether.*:.*_cloak$/
	]);


	event.add('curios:atlas', [
		'kubejs:map_atlas'
	]);

	// Readd this one thingy to the back tag
	event.add('curios:back', 'backpacked:backpack')

	// Exclusions
	event.add('adjtweaks:curio_exclusions/spell_focus', [
		/ars_elemental:.*_focus/,
		/ars_nouveau:.*_focus/,
	])

});

ItemEvents.rightClicked('terra_curio:demon_heart', event => {
	const player = event.getPlayer();
	if (!player.persistentData.usedDemonHeart) {
		player.persistentData.usedDemonHeart = true;
		event.getLevel().playSound(player, player.blockPosition, 'heart_crystals:block.heart_crystal.use', 'players', 1, 1);
		player.swing("main_hand", true);
		event.getItem().shrink(1);
		player.server.runCommandSilent(`/curios add accessory ${player.username} 1`)
	}
	event.cancel()
})

PlayerEvents.loggedIn(event => {
	const server = event.getServer();
	const player = event.getPlayer();
	if (server.hardcore && !player.persistentData.hardcoreInitialized) {
		player.persistentData.hardcoreInitialized = true;
		server.runCommandSilent(`/curios add accessory ${player.username} 1`)
	}
})
