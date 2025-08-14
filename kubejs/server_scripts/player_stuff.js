const MiningSpeedUUID = '923052c1-2354-48ba-b01a-51e31360e218'
const FlyingUUID = '923052c1-2354-48ba-b01a-51e31360e219'

const $AttributeModifer = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')
const $Operation = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier$Operation')

PlayerEvents.tick(event => {
	const player = event.player;

	// Base attributes
	const miningSpeedAttribute = player.getAttribute('attributeslib:mining_speed')
	const mining_speed = miningSpeedAttribute.getModifier(MiningSpeedUUID);
	if (!mining_speed) {
		miningSpeedAttribute.addPermanentModifier(new $AttributeModifer(MiningSpeedUUID, 'Mining speed bonus', 0.3, $Operation.ADDITION))
	}

	// const movementSpeedAttribute = player.getAttribute('generic.movement_speed')
	// const movementSpeed = movementSpeedAttribute.getModifier(SpeedUUID);
	// if (!movementSpeed) {
	// 	movementSpeedAttribute.addPermanentModifier(new $AttributeModifer(SpeedUUID, 'Speed bonus', 0.1, $Operation.MULTIPLY_BASE))
	// }

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
		creativeFlightAttribute.addPermanentModifier(new $AttributeModifer(FlyingUUID, 'Architect\'s Prism', 1, $Operation.ADDITION))
	}
	else if (flying && !hasPrism) {
		creativeFlightAttribute.removeModifier(FlyingUUID)
	}
})
