const TheCommunityData = {
	bossesKilled: 0,
}

ItemEvents.tooltip(event => {
	event.addAdvanced('kubejs:the_community', (item, advanced, text) => {
		Client.player.sendData('the_community_info', {});

		const progress = TheCommunityData.bossesKilled / global.bossMobs.length;

		const lines = [
			Text.gray('The heart of (most of) the ').append(Text.gray('Terraria').strikethrough()).append(Text.gray(' ADJ community')),
			Text.gray('Thanks to all of my supporters who helped me turn this modpack into reality!'),
			Text.gray('For the item itself, it grants an improvement to all stats'),
			Text.gray('that gets stronger by defeating more bosses'),
			Text.lightPurple('Current power: ').append(Text.yellow(`${((progress * 100).toFixed(2)).toString()}%`))
		];

		Object.keys(global.itemEffects.theCommunity.buffs).forEach(attrKey => {
			const val = global.itemEffects.theCommunity.buffs[attrKey];
			const amount = (val[1] + (val[2] - val[1]) * progress);
			let name;
			switch (attrKey) {
				case 'generic.attack_damage': { name = 'Melee Damage'; break; }
				case 'generic.armor': { name = 'Defense'; break; }
				case 'generic.attack_speed': { name = 'Attack Speed'; break; }
				case 'generic.movement_speed': { name = 'Movement Speed'; break; }
				case 'adjcore:generic.health_regeneration': { name = 'Health Per Second'; break; }
				case 'adjcore:generic.damage_reduction': { name = 'Damage Reduction'; break; }
				case 'attributeslib:arrow_damage': { name = 'Arrow Damage'; break; }
				case 'ars_nouveau:ars_nouveau.perk.spell_damage': { name = 'Spell Power'; break; }
			}
			let action = `+${amount.toFixed(1)}`;
			switch (val[0]) {
				case 'multiply_base':
				case 'multiply_total': {
					action = `+${(amount * 100).toFixed(1)}%`;
					break;
				}
				case 'addition': {
					switch (attrKey) {
						case 'adjcore:generic.damage_reduction':
						case 'attributeslib:arrow_damage': {
							action = `+${(amount * 100).toFixed(1)}%`;
							break;
						}
					}
				}
			}
			lines.push(Text.white(`  ${action} `).append(Text.blue(name)));

		});

		text.addAll(1, lines)
	})
});

NetworkEvents.dataReceived('the_community_info', event => {
	TheCommunityData.bossesKilled = event.getData().killed;
});
