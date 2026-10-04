// /**
//  * Creates a new villager menu for the given entity and player.
//  * @param {Internal.Villager_} entity 
//  * @param {Internal.Player_} player 
//  */
// function newVillagerMenu(entity, player) {
// 	let villagerMenu = new MenuType(entity.getDisplayName().getString());
// 	villagerMenu.addSlot({
// 		page: 0, x: 4, y: 1, label: 'Trade', item: 'minecraft:emerald',
// 		onLeftClicked: /** @param {Internal.Player_} player */ (player) => player.sendData('open_villager_menu', {}),
// 	});
// 	return villagerMenu;
// }

// NativeEvents.onEvent('normal', false, $EntityInteractEvent, event => {
// 	const entity = event.getTarget();
// 	const player = event.getEntity();
// 	if (!entity.level.isClientSide() && entity instanceof $Villager) {
// 		newVillagerMenu(entity, player, 3).show(player);
// 		player.persistentData.currentVillager = entity.id;
// 		console.log(entity.id)
// 		event.setCanceled(true);
// 	}
// });

// NetworkEvents.dataReceived('open_villager_menu', event => {
// 	const player = event.getPlayer();
// 	const id = player.persistentData.currentVillager;

// 	console.log(`player: ${player.getName().getString()}`);
// 	console.log(`villager id: ${id}`);

// 	const entity = player.getLevel().getEntity(id);

// 	if (entity == null) {
// 		console.log(`No entity found for id ${id}`);
// 		return;
// 	}

// 	console.log(`entity id: ${entity.getId()}`);
// 	console.log(`entity type: ${entity.getType()}`);

// 	if (entity instanceof $Villager) {
// 		console.log('Found villager');

// 		entity.openTradingScreen(
// 			player,
// 			entity.getDisplayName(),
// 			entity.getVillagerData().getLevel()
// 		);
// 	}
// });