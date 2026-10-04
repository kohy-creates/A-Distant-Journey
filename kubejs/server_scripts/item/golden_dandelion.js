NativeEvents.onEvent('normal', false, $EntityInteractEvent, event => {
	const entity = event.getTarget();
	const item = event.getItemStack();
	if (item.id === 'kubejs:golden_dandelion' && entity instanceof $AgeableMob && entity.isBaby()) {
		const data = entity.persistentData;
		if (!data.AgeLocked) {
			data.AgeLocked = true;
			data.AgeBeforeLocked = entity.age;
			entity.setAge(-2147483648);
			entity.setPersistenceRequired();
			entity.playSound('adj:item.golden_dandelion.use');
		}
		else {
			data.AgeLocked = false;
			entity.setAge(data.AgeBeforeLocked);
			entity.playSound('adj:item.golden_dandelion.unuse');
		}
		entity.level.spawnParticles(
			'happy_villager', false,
			entity.pos.x,
			entity.pos.y + entity.getBoundingBox().getYsize() / 2,
			entity.pos.z,
			entity.getBoundingBox().xsize / 2,
			entity.getBoundingBox().ysize / 2,
			entity.getBoundingBox().zsize / 2,
			15,
			0.01
		);
		event.getEntity().swing(event.getHand(), true);
		item.shrink(1);
	}
});
