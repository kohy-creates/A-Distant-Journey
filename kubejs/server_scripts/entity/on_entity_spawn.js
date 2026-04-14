const vengeanceSpiritBanned = [
	'evilcraft:vengeance_spirit',
	'evilcraft:controlled_zombie',
	'evilcraft:werewolf',
	'window_box:marker',
	'window_box:fake_player'
].concat(global.bossMobs)

EntityEvents.spawned(event => {
	const entity = event.getEntity();
	switch (entity.type) {
		case 'botania:mana_burst': {
			if (entity.nbt.lensStack.id === 'botania:terra_sword') {
				event.cancel()
			}
			break;
		}
		case 'evilcraft:vengeance_spirit': {
			if (vengeanceSpiritBanned.includes(entity.nbt.innerEntity)) {
				event.cancel()
			}
			break;
		}
		case 'adjcore:terra_slash': {
			entity.level.playSound(null, entity.x, entity.y, entity.z, 'adj:item.terra_blade.slash', 'players', 1, 1)
			break;
		}
		case 'botania:falling_star': {
			entity.level.playSound(null, entity.x, entity.y - 10, entity.z, 'adj:item.star_platinum.spawn_star', 'players', 1.5, 1)
			break;
		}
		case 'born_in_chaos_v1:nightmare_stalker': {
			if (entity.level.isDay()) {
				event.cancel();
			}
			else if (event.success) {
				const nightmareStalkerMsgs = [
					"Something is following you...",
					"You're not alone...  Stay alert...",
					"A distant roar can be heard...",
					"A nightmare has materialized nearby..."
				];

				const randomMsg = nightmareStalkerMsgs[Math.floor(Math.random() * nightmareStalkerMsgs.length)];
				event.getServer().runCommandSilent(
					commandAtEntity(entity, `/eta queue @a[distance=0..] status_messages "<dur:100><color col=c50000><shadow c=8C0000><fade in=10 out=10><typewriter speed=60><shake f=16 a=0.1><anchor value=BOTTOM_CENTER><align value=CENTER><offset x=0 y=-85>${randomMsg}"`)
				);
				event.getServer().runCommandSilent(
					commandAtEntity(entity, '/playsound born_in_chaos_v1:stalker_roar_distant hostile @p[] ~ ~ ~ 0 0.5 0.2')
				);
			}
			break;
		}
		case 'minecraft:item': {
			const itemID = entity.nbt.Item.id;
			console.log(itemID)
			switch (itemID) {
				case 'minecraft:nether_star':
				case 'witherstormmod:withered_nether_star': {
					entity.setGlowing(true);
					entity.setNoGravity(true);
					entity.setInvulnerable(true);
					entity.age = -32768;
					break;
				}
			}
		}
	}
});
