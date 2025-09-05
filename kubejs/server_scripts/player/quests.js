FTBQuestsEvents.customTask('48F026344B65629F', (quest) => {
	quest.setMaxProgress(400);

	quest.setCheckTimer(3);

	quest.setCheck((task, player) => {
		const maxHealth = player.getAttributeBaseValue($Attributes.MAX_HEALTH);
		task.progress = maxHealth;
	})
})

FTBQuestsEvents.customTask('6A97FDE16BB0CD83', (quest) => {
	quest.setMaxProgress(10);

	quest.setCheckTimer(3);

	quest.setCheck((task, player) => {
		const lifeShardsTotal = player.getNbt().getCompound('ForgeCaps').getCompound('aether:aether_player').getInt('LifeShardCount')
		task.progress = lifeShardsTotal;
	})
})