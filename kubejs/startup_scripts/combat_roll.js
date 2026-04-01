StartupEvents.init(event => {
	let $ServerSideRollEvents = Java.loadClass('net.combatroll.api.event.ServerSideRollEvents');
	let $PlayerStartRolling = Java.loadClass('net.combatroll.api.event.ServerSideRollEvents$PlayerStartRolling');

	$ServerSideRollEvents.PLAYER_START_ROLLING.register(
		new JavaAdapter($PlayerStartRolling, {
			onPlayerStartedRolling: function (player, velocity) {
				global.onRoll(player, velocity);
			},
		}),
	);
});

/**
 * 
 * @param {Internal.Player_} player 
 * @param {Internal.Vec3d_} velocity 
 * @returns {void}
 */
global.onRoll = (player, velocity) => {
	if (!player) return;

	const mainHand = player.getMainHandItem();
	const offHand = player.getMainHandItem();

	if (mainHand.getId() === 'kubejs:elsa_crossbow' || offHand.getId() === 'kubejs:elsa_crossbow') {
		player.getPersistentData().elsa_crossbow_tickdown = 120;
		if (mainHand.getId() === 'kubejs:elsa_crossbow') {
			let nbt = mainHand.nbt;
			nbt.Charged = true;
			nbt.ChargedProjectiles = [{ id: 'minecraft:arrow', Count: 1 }];
			mainHand.setNbt(nbt);
		}
		else {
			let nbt = mainHand.nbt;
			nbt.Charged = true;
			nbt.ChargedProjectiles = [{ id: 'minecraft:arrow', Count: 1 }];
			mainHand.setNbt(nbt);
		}
	}
};
