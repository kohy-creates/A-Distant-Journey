
const PlayerAttackSpeedFix = {
	MIN_ATTACK_GAUGE: 0.844,
	shouldCancel: function (player) {
		return player.isPlayer() && player.getAttackStrengthScale(0) < this.MIN_ATTACK_GAUGE;
	},
	events: [
		$AttackEntityEvent,
		// $LivingHurtEvent, 
		// $LivingKnockbackEvent
	],
	/**
	 * @param {Internal.AttackEntityEvent_|Internal.LivingHurtEvent_|Internal.LivingKnockBackEvent_} event 
	 * @returns {Internal.LivingEntity_|null}
	 */
	getPlayer: function (event) {
		if (event instanceof $AttackEntityEvent) {
			return event.getEntity();
		}
		if (event instanceof $LivingHurtEvent) {
			return event.getSource().getActual();
		}
		if (event instanceof $LivingKnockbackEvent) {
			return event.getSource().getActual();
		}
		return null;
	},
	actions: [
		/**
		 * @param {Internal.AttackEntityEvent_} event 
		 * @param {Internal.LivingEntity_} player 
		 */
		(event, player) => {
			global.playSound(
				player.level,
				player.x, player.y, player.z,
				'minecraft:entity.player.attack.nodamage', 'players', 0.7, [0.8, 1.2]
			);
		},
		/**
		 * @param {Internal.LivingHurtEvent_} event 
		 * @param {Internal.LivingEntity_} player 
		 */
		(event, player) => {
			event.setAmount(0);
		},
		/**
		 * @param {Internal.LivingKnockbackEvent_} event 
		 * @param {Internal.LivingEntity_} player 
		 */
		(event, player) => {
			event.setAmount(0);
		}
	]
};

PlayerAttackSpeedFix.events.forEach((eventClass, i) => {
	NativeEvents.onEvent('highest', false, eventClass, event => {
		const player = PlayerAttackSpeedFix.getPlayer(event);
		if (player && player.isPlayer() && PlayerAttackSpeedFix.shouldCancel(player)) {
			PlayerAttackSpeedFix.actions[i](event, player);
			event.setCanceled(true);
		}
	});
});
