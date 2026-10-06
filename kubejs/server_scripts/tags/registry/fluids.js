ServerEvents.tags('fluid', tags => {
	tags.add('create:bottomless/allow', [
		'netherexp:ectoplasm',
		'kubejs:legacy/water',
		'kubejs:nullium',
	]);

	tags.add('create:fan_processing_catalysts/splashing', [
		'kubejs:legacy/water',
		'kubejs:legacy/flowing_water',
	]);
});
