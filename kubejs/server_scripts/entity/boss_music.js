EntityEvents.spawned(event => {
	const entity = event.getEntity();
	const type = entity.type;

	if (global.bossMobs.includes(type)) {
		entity.addTag('phase_1');
	};
});

EntityEvents.hurt('witherstormmod:command_block', event => {
	event.getEntity().addTag('phase_2');
});
