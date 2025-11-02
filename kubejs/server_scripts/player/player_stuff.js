const MiningSpeedUUID = '923052c1-2354-48ba-b01a-51e31360e218'
const FlyingUUID = '923052c1-2354-48ba-b01a-51e31360e219'
const FishingUUID = 'b790c0a0-0934-41e2-a2f4-d59b6671db5b'

const $AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')
const $Operation = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier$Operation')

PlayerEvents.tick(event => {
	const player = event.player;

	// Base attributes
	const miningSpeedAttribute = player.getAttribute('attributeslib:mining_speed')
	const mining_speed = miningSpeedAttribute.getModifier(MiningSpeedUUID);
	if (!mining_speed) {
		miningSpeedAttribute.addPermanentModifier(new $AttributeModifier(MiningSpeedUUID, 'Mining speed bonus', 0.25, $Operation.ADDITION))
	}

	const barSizeAttribute = player.getAttribute('stardew_fishing:bar_size')
	const barSize = barSizeAttribute.getModifier(FishingUUID);
	if (!barSize) {
		barSizeAttribute.addPermanentModifier(new $AttributeModifier(FishingUUID, 'Stardew Fishing Bar Size', 10, $Operation.ADDITION))
	}

	// Architect Prism grants creative flight when in inventory
	const inventory = player.getInventory().getAllItems();
	let hasPrism = false;
	inventory.forEach(item => {
		if (item.id == 'structure_gel:building_tool')
			hasPrism = true;
	})
	const creativeFlightAttribute = player.getAttribute('attributeslib:creative_flight');
	const flying = creativeFlightAttribute.getModifier(FlyingUUID)
	if (!flying && hasPrism) {
		creativeFlightAttribute.addPermanentModifier(new $AttributeModifier(FlyingUUID, 'Architect\'s Prism', 1, $Operation.ADDITION))
	}
	else if (flying && !hasPrism) {
		creativeFlightAttribute.removeModifier(FlyingUUID)
	}

	// const persistentData = player.getPersistentData();

	// if (player.getServer().isHardcore() && !persistentData.gaveRing) {
	// 	persistentData.putBoolean('gaveRing', true)
	// 	player.give('enigmaticlegacy:cursed_ring')
	// }
})

// Queen's Desire
FTBQuestsEvents.completed('16BAA229C57F181A', event => {
	event.getNotifiedPlayers().forEach(player => {
		player.addTag('adj.qd_can_reset')
		console.log(`Queens Desire completed by ${player.username}!`)
	})
})

EntityEvents.hurt(event => {
	const player = event.getSource().getPlayer();
	if (player) {
		const item = player.getMainHandItem();
		if (item.getId().includes('katana')) {
			const pdata = player.persistentData;
			if (!pdata.katanaCombo) {
				pdata.katanaCombo = 0;
			}
			pdata.katanaCombo++;

			if (pdata.katanaCombo >= 3) {
				pdata.katanaCombo = 0;

				player.addEffect(new $MobEffectInstance('speed', 4 * 20, 0));
			}
		}
	}
})
