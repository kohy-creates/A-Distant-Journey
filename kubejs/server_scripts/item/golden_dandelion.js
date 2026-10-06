NativeEvents.onEvent('normal', false, $EntityInteractEvent, event => {
	if (event.getSide().isClient()) return;
	const entity = event.getTarget();
	const item = event.getItemStack();
	if (item.id === 'kubejs:golden_dandelion' && entity instanceof $AgeableMob && entity.isBaby()) {
		const data = entity.getPersistentData();
		if (!data.AgeLocked) {
			data.putBoolean('AgeLocked', true);
			data.putInt('AgeBeforeLocked', entity.age);
			entity.setAge(-2147483648);
			entity.setPersistenceRequired();
			entity.playSound('adj:item.golden_dandelion.use');
		}
		else {
			data.putBoolean('AgeLocked', false);
			entity.setAge(data.AgeBeforeLocked);
			entity.playSound('adj:item.golden_dandelion.unuse');
		}
		const h = entity.getBbHeight();
		const w = entity.getBbWidth();
		event.getLevel().spawnParticles(
			'happy_villager', false,
			entity.x, entity.y + h / 2, entity.z,
			0.2 + w / 2, 0.2 + h / 2, 0.2 + w / 2,
			15, 0.01
		);
		event.getEntity().swing(event.getHand(), true);
		item.shrink(1);
	}
});
