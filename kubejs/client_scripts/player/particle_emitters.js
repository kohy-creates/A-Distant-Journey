NetworkEvents.dataReceived('add_particle_emitter', event => {
	const data = event.getData();
	const entity = Client.level.getEntity(data.entityId);
	Client.particleEngine.createTrackingEmitter(entity, data.particle);
});
