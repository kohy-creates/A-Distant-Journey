NetworkEvents.dataReceived('sync_effects_client', event => {
	const data = event.getData();
	const player = event.getPlayer();
	const level = player.getLevel();
	const entity = player.level.getEntity(UUID.fromString(data.entityUuid));
	if (!entity) { return; }
	const activeEffects = entity.getActiveEffects();
	const effects = [];
	for (let effectInstance of activeEffects) {
		let effect = effectInstance.getEffect();
		let resourceLocString = global.getRegistryId('MOB_EFFECTS', effect);
		effects.push(resourceLocString);
	}
	player.sendData('sync_effects_client', {
		entityId: entity.getId(),
		effects: effects
	});
});
