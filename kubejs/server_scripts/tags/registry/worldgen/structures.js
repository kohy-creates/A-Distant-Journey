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

	tags.add('adj:archeology/fossil_jungle', [
		'betterarcheology:fossil_jungle_0',
		'betterarcheology:fossil_jungle_1'
	]);

	tags.add('adj:archeology/fossil_chicken', [
		'betterarcheology:fossil_chicken',
		'betterarcheology:fossil_chicken_birch'
	]);

	tags.add('adj:archeology/fossil_underwater', [
		'betterarcheology:underwater_0',
		'betterarcheology:underwater_1',
		'betterarcheology:underwater_2',
		'betterarcheology:underwater_3'
	]);
});
