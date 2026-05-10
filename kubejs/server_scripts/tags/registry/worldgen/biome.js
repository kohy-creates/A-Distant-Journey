ServerEvents.tags('worldgen/biome', tags => {

	tags.add('beachparty:beach', [
		'#is_beach'
	]);

	tags.add('oceanicrealms:oceans', [
		'#is_ocean'
	]);

	tags.add('adj:moderate_and_tropical_oceans', [
		'ocean',
		'deep_ocean',
		'oceanicrealms:sandstone_ocean',
		'lukewarm_ocean',
		'deep_lukewarm_ocean',
		'warm_ocean'
	]);
	tags.add('adj:tropical_oceans', [
		'oceanicrealms:sandstone_ocean',
		'lukewarm_ocean',
		'deep_lukewarm_ocean',
		'warm_ocean',
	]);

	tags.add('adj:cold_oceans', [
		'clifftree:stone_ocean',
		'ocean',
		'deep_ocean',
		'cold_ocean',
		'deep_cold_ocean',
		'frozen_ocean',
		'deep_frozen_ocean'
	]);
});
