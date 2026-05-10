ServerEvents.tags('worldgen/structure', tags => {
	tags.removeAll('quark:soul_bead_target');
	// Idk which one actually works
	tags.remove('quark:soul_bead_target', [
		'minecraft:fortress',
		'betterfortresses:fortress'
	]);

	tags.add('cataclysm:berserker_spawn', [
		'betterfortresses:fortress'
	]);
});
