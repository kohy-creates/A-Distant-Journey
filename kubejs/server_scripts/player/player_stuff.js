const $AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')
const $Operation = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier$Operation')

PlayerEvents.tick(event => {
	const player = event.player;

	const MiningSpeedUUID = '923052c1-2354-48ba-b01a-51e31360e218'
	const FlyingUUID = '923052c1-2354-48ba-b01a-51e31360e219'
	const FishingUUID = 'b790c0a0-0934-41e2-a2f4-d59b6671db5b'
	const SpellBookManaUUID = 'b790c0a0-0934-41e2-a2f4-d59b6671db5b'
	const ExtraFortuneUUID = '766a19b7-a084-4797-af71-409699208487'

	// Base attributes
	const miningSpeedAttribute = player.getAttribute('attributeslib:mining_speed')
	const mining_speed = miningSpeedAttribute.getModifier(MiningSpeedUUID);
	if (!mining_speed) {
		miningSpeedAttribute.addPermanentModifier(new $AttributeModifier(MiningSpeedUUID, 'Mining speed bonus', 0.25, $Operation.ADDITION))
	}

	// const barSizeAttribute = player.getAttribute('stardew_fishing:bar_size')
	// const barSize = barSizeAttribute.getModifier(FishingUUID);
	// if (!barSize) {
	// 	barSizeAttribute.addPermanentModifier(new $AttributeModifier(FishingUUID, 'Stardew Fishing Bar Size', 10, $Operation.ADDITION))
	// }

	// Architect Prism grants creative flight when in inventory
	const inventory = player.getInventory().getAllItems();
	let hasPrism = false;
	let spellBookTier = 0;
	inventory.forEach(item => {
		switch (item.id) {
			case 'structure_gel:building_tool':
				hasPrism = true;
				break;

			case 'ars_nouveau:novice_spell_book':
				if (spellBookTier < 1) spellBookTier = 1;
				break;
			case 'ars_nouveau:apprentice_spell_book':
				if (spellBookTier < 2) spellBookTier = 2;
				break;
			case 'ars_nouveau:archmage_spell_book':
				if (spellBookTier < 3) spellBookTier = 3;
				break;
			case 'ars_nouveau:creative_spell_book':
				if (spellBookTier < 3) spellBookTier = 3;
				break;
		}
	})
	const creativeFlightAttribute = player.getAttribute('attributeslib:creative_flight');
	const flying = creativeFlightAttribute.getModifier(FlyingUUID)
	if (!flying && hasPrism) {
		creativeFlightAttribute.addPermanentModifier(new $AttributeModifier(FlyingUUID, 'Architect\'s Prism', 1, $Operation.ADDITION))
	}
	else if (flying && !hasPrism) {
		creativeFlightAttribute.removeModifier(FlyingUUID)
	}

	const maxManaAttribute = player.getAttribute('ars_nouveau:ars_nouveau.perk.max_mana');
	const spellBookMana = maxManaAttribute.getModifier(SpellBookManaUUID);
	if (!spellBookMana && spellBookTier > 0) {
		let amount = 0;
		switch (spellBookTier) {
			case 2:
				amount = 25;
				break;
			case 3:
				amount = 50;
				break;
		}
		maxManaAttribute.addPermanentModifier(new $AttributeModifier(SpellBookManaUUID, 'Spell Book Max Mana', amount, $Operation.ADDITION))
	}
	else if (spellBookMana && spellBookTier == 0) {
		maxManaAttribute.removeModifier(SpellBookManaUUID);
	}

	const extraFortuneAttribute = player.getAttribute('adjcore:player.extra_fortune_level');
	const extraFortune = extraFortuneAttribute.getModifier(ExtraFortuneUUID);
	if (!extraFortune) {
		extraFortuneAttribute.addPermanentModifier(new $AttributeModifier(ExtraFortuneUUID, 'More Ore drops by default', 1, $Operation.ADDITION))
	}


	// const persistentData = player.getPersistentData();

	// if (player.getServer().isHardcore() && !persistentData.gaveRing) {
	// 	persistentData.putBoolean('gaveRing', true)
	// 	player.give('enigmaticlegacy:cursed_ring')
	// }
	player.getAttribute('attributeslib:crit_chance').setBaseValue(0.0);
	player.getAttribute('generic.attack_speed').setBaseValue(2.0);


})

// Queen's Desire
FTBQuestsEvents.completed('16BAA229C57F181A', event => {
	event.getNotifiedPlayers().forEach(player => {
		player.addTag('adj.qd_can_reset')
		console.log(`Queens Desire completed by ${player.username}!`)
	})
})

ADJServerEvents.adjHurt(event => {
	const player = event.getAttacker();
	if (player && player instanceof $Player) {
		const item = player.getMainHandItem();
		const id = item.getId();
		const victim = event.getVictim();
		if (id.includes('katana')) {
			const pdata = player.persistentData;
			if (!pdata.katanaCombo) {
				pdata.katanaCombo = 0;
			}
			pdata.katanaCombo++;
			if (pdata.katanaCombo >= 3) {
				pdata.katanaCombo = 0;
				player.addEffect(new $MobEffectInstance('speed', 4 * 20, 0));
				// player.playNotifySound()
			}
		}
		if (id.includes('stormyx')) {
			victim.addEffect(new $MobEffectInstance('cofh_core:shocked', 8 * 20, 0))
		}
		if (id.includes('mcdw:soul_dagger')) {
			player.addEffect(new $MobEffectInstance('ars_nouveau:mana_regen', 2 * 20, (id === 'mcdw:soul_dagger_eternal_knife') ? 1 : 0));
		}
		if (id === 'mcdw:dagger_resolute_tempest_knife') {
			victim.addEffect(new $MobEffectInstance('slowness', 10 * 20, 1)) // -30%
			player.addEffect(new $MobEffectInstance('speed', 10 * 20, 2)) // +30%
		}
	}
})
