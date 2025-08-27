let hardcore;
ServerEvents.loaded(event => {
	hardcore = event.getServer().isHardcore()
	event.getServer().gameRules.set('naturalRegeneration', false);
});

const maxFireTicks = 300;

EntityEvents.hurt(event => {
	const entity = event.getEntity();
	entity.health = Math.ceil(entity.health);
	if (entity.remainingFireTicks > maxFireTicks) entity.remainingFireTicks = maxFireTicks;
	if (entity.isPlayer()) {
		entity.persistentData.putLong('timeSinceLastHurt', 0);
		entity.persistentData.putShort('regenerationTimer', 0);
	}
})

PlayerEvents.tick(event => {
	const player = event.player;

	const persistentData = player.persistentData;

	// No idea if health can even be negative in this game
	if (player.health == player.maxHealth || player.health <= 0) {
		persistentData.putShort('regenerationTimer', 0)
		return
	};

	let RT = persistentData.timeSinceLastHurt
	if (RT != null && RT < 1200) {
		// console.log('increasing RT')
		persistentData.putLong('timeSinceLastHurt', RT + 1);
	}

	// Yes I took them straight from Terraria, stop judging
	// Their regeneration system is PERFECT
	let R, RC, eRT;

	eRT = (Math.min(RT, 600) / 100) + (Math.max(RT - 600, 0) / 200);
	R = (player.getMaxHealth() / 400 * 0.85 + 0.15) * eRT;
	if (player.isMoving()) R *= 0.5;
	else R *= 1.25
		;
	if (player.foodLevel < 16) R *= 0.8;
	else if (player.foodLevel < 10) R *= 0.5;
	else if (player.foodLevel < 6) R *= 0.2;
	else if (player.foodLevel == 0) R *= 0;

	if (hardcore && player.saturation == 0 && player.foodLevel < 20) R *= 0.75;

	RC = persistentData.regenerationTimer

	// console.log(`R: ${R} | RT: ${RT} | eRT: ${eRT} | RC: ${RC}`)

	persistentData.putShort('regenerationTimer', RC + R);
	if (persistentData.regenerationTimer >= 40) {
		player.heal(1)
		persistentData.putShort('regenerationTimer', 0)
	}
})
