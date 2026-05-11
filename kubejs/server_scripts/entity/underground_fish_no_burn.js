// Tide underground fish and Glow Squids no longer just die in underground lakes
EntityEvents.hurt(event => {
	const entityType = event.getEntity().type;
	const source = event.getSource().getType();
	if (source === 'hotFloor'
		&& (entityType.includes('tide') || entityType === 'minecraft:glow_squid' || entityType === 'minecraft:axolotl')
	) {
		event.cancel();
	}
});
