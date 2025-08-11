const $BoneMealableBlock = Java.loadClass("net.minecraft.world.level.block.BonemealableBlock")
const $BlockPos = Java.loadClass("net.minecraft.core.BlockPos")
const $BurnerBlazeBlock = Java.loadClass("com.simibubi.create.content.processing.burner.BlazeBurnerBlock")

const superBoneMealItems = [
	'structure_gel:building_tool',
	'kubejs:eye_of_verdant_bloom'
]

const prismDisallowedBuildModesForBoneMeal = [
	'structure_gel:fill',
	'structure_gel:line',
	'structure_gel:clone',
	'structure_gel:move',
]

BlockEvents.rightClicked(event => {
	const item = event.getItem();
	const block = event.getBlock().getBlockState().getBlock();
	const world = event.getLevel();
	const player = event.getPlayer();
	if (superBoneMealItems.includes(item.id.toString())) {

		if (item.id == 'structure_gel:building_tool') {
			const mode = item.nbt.get('tool_mode').toString().replace("\"", "")
			if (prismDisallowedBuildModesForBoneMeal.includes(mode)) return;
		}
		if (!(block instanceof $BoneMealableBlock)) return;

		const blockPos = event.getBlock().pos;


		if (!player.isCrouching()) {
			// Loop over a 7x7x1 area centered on clicked block
			for (let dx = -3; dx <= 3; dx++) {
				for (let dz = -3; dz <= 3; dz++) {
					// 30% chance per block
					if (!(Math.random() <= 0.3)) continue;

					let targetPos0 = blockPos.offset(dx, 0, dz);
					let state0 = world.getBlockState(targetPos0);
					let block0 = state0.getBlock();

					if (block0 instanceof $BoneMealableBlock) {
						block0.performBonemeal(world, world.getRandom(), targetPos0, state0);
					}
				}
			}
			player.addItemCooldown(item.id, 30);
			player.level.spawnParticles("happy_villager", false, blockPos.x + 0.5, blockPos.y + 1.5, blockPos.z + 0.5, 3, 0.25, 3, 70, 0.01);
		}
		else {
			block.performBonemeal(world, world.getRandom(), blockPos, event.getBlock().getBlockState())
			player.addItemCooldown(item.id, 8);
			player.level.spawnParticles("happy_villager", false, blockPos.x + 0.5, blockPos.y + 1.5, blockPos.z + 0.5, 1, 0.25, 1, 15, 0.01);
		}
		player.swing('main_hand')
		player.level.playSound(null, blockPos, 'item.bone_meal.use', 'neutral');
	}

	if (item.id == 'kubejs:eye_of_ethercraft' && block.id == 'create:blaze_burner') {
		const pos = event.getBlock().pos;
		//const blockEntity = world.getBlockEntity(pos);

		event.getServer().runCommand(
			'/execute in ' + event.getLevel().getDimension() + ' positioned ' + pos.x + ' ' + pos.y + ' ' + pos.z + ' run setblock ~ ~ ~ create:blaze_burner[blaze=seething,facing=north]'
		)
		event.getServer().runCommand(
			'/execute in ' + event.getLevel().getDimension() + ' positioned ' + pos.x + ' ' + pos.y + ' ' + pos.z + ' run data merge block ~ ~ ~ {burnTimeRemaining:6400,fuelLevel:2}'
		)
		player.addItemCooldown(item.id, 200)
		player.swing('main_hand')
	}
})
