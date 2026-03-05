const $QuestObjectAccessor = Java.loadClass('xyz.kohara.adjcore.mixins.compat.FTBQuestObjectAccessor');

FTBQuestsEvents.completed(event => {
	const object = event.getObject();
	if (object.getObjectType().toString() === 'QUEST') {
		if (object instanceof $QuestObjectAccessor) {
			if (object.adj$isToastDisabled()) return;
			const player = event.getPlayer();
			const server = event.getServer();

			const title = object.getRawTitle();
			// /** @type {Internal.Item_} */
			// const icon = object.getIcon().getIngredient().getItem().getId();

			player.playNotifySound('terra_curio:achievements', 'players', 0.9, 1.0);
			server.runCommandSilent(
				`tellraw @a ["",{"selector":"${player.getUuid()}"},{"text":" has made the achievement "},{"text":"[${title}]","color":"green","hoverEvent":{"action":"show_text","contents":"${object.getRawSubtitle()}"}}]`
			);

			// const base = '<fade in=10 out=40><anchor value=TOP_CENTER><align value=CENTER>'
			// let offsetY = 70;
			// // <offset x=0 y=70>
			// const achievementComplete = [
			// 	'<b><grad from=F5C827 to=FFE27A hue=true f=0.5 sp=15><scale value=1.33><u> Achievement Complete! </scale>',
			// 	`<scale value=1.5><item id=${icon} x=4/>`,
			// 	`${title}`
			// ];
			// for (let line of achievementComplete) {
			// 	server.runCommandSilent(
			// 		`/eta queue ${player.getUuid().toString()} achievement "${base}<offset x=0 y=${offsetY}>${line}"`
			// 	);
			// 	offsetY += 20;
			// }
		}
	}
})

/// Custom tasks
// Max out health with Life Crystals
FTBQuestsEvents.customTask('48F026344B65629F', (quest) => {
	quest.setMaxProgress(400);
	quest.setCheckTimer(3);
	quest.setCheck((task, player) => {
		const maxHealth = player.getAttributeBaseValue($Attributes.MAX_HEALTH);
		task.progress = maxHealth;
	})
})

// Max out health using Life Shards (Aether)
FTBQuestsEvents.customTask('6A97FDE16BB0CD83', (quest) => {
	quest.setMaxProgress(10);
	quest.setCheckTimer(3);
	quest.setCheck((task, player) => {
		const lifeShardsTotal = player.getNbt().getCompound('ForgeCaps').getCompound('aether:aether_player').getInt('LifeShardCount')
		task.progress = lifeShardsTotal;
	})
})
