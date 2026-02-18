const $AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')
const $Operation = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier$Operation')
const $Integer = Java.loadClass('java.lang.Integer');

PlayerEvents.tick(event => {
	const player = event.player;

	const MiningSpeedUUID = '923052c1-2354-48ba-b01a-51e31360e218';
	const FlyingUUID = '923052c1-2354-48ba-b01a-51e31360e219';
	const SpellBookManaUUID = 'b790c0a0-0934-41e2-a2f4-d59b6671db5b';
	const ExtraFortuneUUID = '766a19b7-a084-4797-af71-409699208487';
	const WillOfDharockUUID = 'c17e38c0-78aa-422d-8e41-4243bc5a153f';

	// Bits of code that depend on players having something in their inventories
	const inventory = player.getInventory().getAllItems();
	let hasPrism = false;
	let spellBookTier = 0;
	inventory.forEach(item => {
		switch (item.id) {
			case 'structure_gel:building_tool': {
				hasPrism = true;
				break;
			}

			case 'ars_nouveau:novice_spell_book': {
				if (spellBookTier < 1) spellBookTier = 1;
				break;
			}
			case 'ars_nouveau:apprentice_spell_book': {
				if (spellBookTier < 2) spellBookTier = 2;
				break;
			}
			case 'ars_nouveau:archmage_spell_book': {
				if (spellBookTier < 3) spellBookTier = 3;
				break;
			}
			case 'ars_nouveau:creative_spell_book': {
				if (spellBookTier < 3) spellBookTier = 3;
				break;
			}
		}
	})

	if (player.getMainHandItem().getId() === 'zenith:zenith') {
		let nbt = player.getMainHandItem().nbt

		if (nbt && !nbt.zenith_parts) {
			let parts = []

			global.zenithSwords.forEach(part => {
				if (!Item.exists(part.item)) return;
				parts.push({
					item: part.item,
					color: $Integer(part.color.toString().replace('.0', '')),
					rotation_center_height: part.rotation_center_height,
					rotation: part.rotation,
					scale: part.scale,
					trail_width: part.trail_width
				})
			})

			nbt.zenith_parts = parts
		}
	}

	// Base attributes
	const miningSpeedAttribute = player.getAttribute('attributeslib:mining_speed')
	const mining_speed = miningSpeedAttribute.getModifier(MiningSpeedUUID);
	if (!mining_speed) {
		miningSpeedAttribute.addPermanentModifier(new $AttributeModifier(MiningSpeedUUID, 'Mining speed bonus', 0.25, $Operation.ADDITION))
	}

	player.getAttribute('attributeslib:crit_chance').setBaseValue(0.0);
	player.getAttribute('generic.attack_speed').setBaseValue(2.0);

	// Architect Prism grants creative flight when in inventory
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

	const helmet = player.getHeadArmorItem();
	const critDamageAttr = player.getAttribute('attributeslib:crit_damage');
	let willOfDharockAmount = 0;
	if (helmet.id === 'botania:terrasteel_helmet') {
		let nbt = helmet.nbt;
		if (nbt.AncientWill_dharok) {
			let hp = 1 - player.getHealth() / player.getMaxHealth();
			willOfDharockAmount = Math.max(Math.pow(hp - 0.2, 3), 0);
		}
	}
	critDamageAttr.removeModifier(WillOfDharockUUID)
	critDamageAttr.addTransientModifier(new $AttributeModifier(WillOfDharockUUID, 'Will of Dharock', willOfDharockAmount, $Operation.ADDITION))

	// const persistentData = player.getPersistentData();

	// if (player.getServer().isHardcore() && !persistentData.gaveRing) {
	// 	persistentData.putBoolean('gaveRing', true)
	// 	player.give('enigmaticlegacy:cursed_ring')
	// }

})

ADJServerEvents.adjHurt(event => {
	if (event.isCritical()) {
		/** @type {Internal.LivingEntity} */
		let victim = event.getVictim()
		let level = victim.getLevel();
		if (!level.isClientSide()) {
			level.playSound(null, new Vec3d(victim.x, victim.y + victim.eyeHeight, victim.z), 'adj:generic.critical_hit', 'players');
		}

		let player = event.getAttacker();
		if (player instanceof $Player) {
			let item = player.getMainHandItem();
			let id = item.getId();

			if (id.includes('spear')) {
				victim.addEffect(new $MobEffectInstance('kubejs:pierced', 7 * 20, 0, true, false, true))
			}

			let helmet = player.getHeadArmorItem();
			switch (helmet.id) {
				case 'botania:terrasteel_helmet': {
					let nbt = helmet.nbt;
					if (nbt.AncientWill_ahrim) {
						victim.addEffect(new $MobEffectInstance('minecraft:weakness', 8 * 20, 1, true, false, true))
					}
					if (nbt.AncientWill_guthan) {
						player.heal(Math.ceil(event.getDamage() * 0.1))
					}
					if (nbt.AncientWill_torag) {
						victim.addEffect(new $MobEffectInstance('minecraft:slowness', 8 * 20, 1, true, false, true))
					}
					if (nbt.AncientWill_verac) {
						global.getEntitiesInRadius(level, victim.x, victim.y, victim.z, 1.5).forEach(/** @param {Internal.Entity_} entity */ entity => {
							entity.attack(global.getDamageSource(level, 'minecraft:player_attack', null, player), Math.ceil(event.getDamage() * 0.33))
						})
					}
					if (nbt.AncientWill_karil) {
						victim.addEffect(new $MobEffectInstance('minecraft:wither', 8 * 20, 2, true, false, true))
					}
				}
			}
		}
	}
})

// A huge block that only triggers when a player is hurt by something, or if something hurts a player
const $MobType = Java.loadClass("net.minecraft.world.entity.MobType")
NativeEvents.onEvent('highest', false, $LivingHurtEvent, event => {
	const attacker = event.getSource().getActual();
	const victim = event.getEntity();

	// console.log(event.getSource(), event.getSource().getImmediate(), event.getSource().getType())
	if (attacker && attacker instanceof $Player && event.getSource().getImmediate() instanceof $Player) {
		let item = attacker.getMainHandItem();
		let id = item.getId();

		let level = victim.getLevel();
		let data = victim.getPersistentData();

		// Stuff that depends on weapon groups
		if (id.includes('katana')) {
			let pdata = attacker.persistentData;
			if (!pdata.katanaCombo) {
				pdata.katanaCombo = 0;
			}
			pdata.katanaCombo++;
			if (pdata.katanaCombo >= 3) {
				pdata.katanaCombo = 0;
				attacker.addEffect(new $MobEffectInstance('speed', 5 * 20, 0));
				attacker.playNotifySound('simplyswords:magic_sword_attack_02', 'players', 1.5, 1.2 + Math.random() * 0.2)
			}
		}
		if (id.includes('stormyx')) {
			victim.addEffect(new $MobEffectInstance('cofh_core:shocked', 8 * 20, 0))
		}
		if (id.includes('mcdw:soul_dagger')) {
			attacker.addEffect(new $MobEffectInstance('ars_nouveau:mana_regen', 2 * 20, (id === 'mcdw:soul_dagger_eternal_knife') ? 1 : 0));
		}
		if (id.includes('star_platinum')) {
			let fallingStar = level.createEntity('botania:falling_star');
			fallingStar.setPos(new Vec3d(victim.x, victim.y + 16, victim.z));
			fallingStar.setMotionY(-1)
			fallingStar.setOwner(attacker);
			fallingStar.spawn();
		}

		// Stuff that depends on item ID
		switch (id) {
			case 'mcdw:dagger_resolute_tempest_knife': {
				victim.addEffect(new $MobEffectInstance('slowness', 10 * 20, 1)) // -30%
				attacker.addEffect(new $MobEffectInstance('speed', 10 * 20, 2)) // +30%
				break;
			}
			case 'mcdw:glaive_grave_bane': {
				if (victim.mobType === $MobType.UNDEAD) {
					victim.addEffect(new $MobEffectInstance('ars_nouveau:hex', 10 * 20, 0, false, true, true))
				}
				break;
			}
			case 'mcdw:glaive_venom_glaive': {
				victim.addEffect(new $MobEffectInstance('minecraft:poison', 7 * 20, 0, false, true, true))
				break;
			}
			case 'mcdw:sword_heartstealer': {
				attacker.heal(event.getAmount() * 0.045);
				break;
			}
			case 'mcdw:scythe_frost_scythe':
			case 'mcdw:dagger_fangs_of_frost': {
				victim.setTicksFrozen(victim.getTicksFrozen() + 30)
				break;
			}
		}

		// Stuff that depends on persistent data
		if (data.voidStrike) {
			event.setAmount(event.getAmount() * (data.voidStrike.mul + 100) / 100)
			level.playSound(null, new Vec3d(victim.x, victim.y + victim.getEyeHeight(), victim.z), 'adj:enchantment.void_strike.deactivate', 'neutral');
			data.remove('voidStrike');
		}

		// Enchantment behavior
		let enchantments = item.getEnchantments();
		for (const enchId of Object.keys(enchantments)) {
			let enchLevel = enchantments.get(enchId);
			switch (enchId) {
				case 'kubejs:void_shot':
				case 'kubejs:void_strike': {
					data.voidStrike = {
						ticks: 0,
						maxMul: null,
						mul: 0,
					}
					victim.addEffect(new $MobEffectInstance((enchId === 'kubejs:void_strike') ? 'kubejs:void_strike' : 'kubejs:void_shot', 161, enchLevel - 1, false, false, true));
					break;
				}
				case 'kubejs:committed': {
					const mul = (1 - (victim.health / victim.maxHealth)) * (enchLevel * 0.2)
					event.setAmount(event.getAmount() + event.getAmount() * mul)
					break;
				}
				case 'kubejs:echo': {
					if (attacker.hasEffect('kubejs:echo_cooldown')) break;

					let damage = event.getAmount() * 1.5;
					attacker.addEffect(new $MobEffectInstance('kubejs:echo_cooldown', (9 - enchLevel) * 20, 0, false, false, true))
					victim.getServer().scheduleInTicks(6, () => {
						victim.attack(global.getDamageSource(victim.level, 'minecraft:player_attack', null, attacker), damage);
						victim.level.playSound(null, victim.x, victim.y, victim.z, 'simplyswords:magic_sword_attack_02', 'players', 0.75, 1 + Math.random() * 0.5)
					})
					break;
				}
				case 'kubejs:radiance': {
					if (Math.random() <= 0.2) {
						global.getEntitiesInRadius(level, victim.x, victim.y, victim.z, 4.5).forEach(/** @param {Internal.Entity} entity */ entity => {
							if (entity instanceof $Player) {
								entity.heal(4 + enchLevel * 4)
							}
						});
						attacker.getServer().runCommandSilent(`execute as ${victim.uuid.toString()} at @s run function adj:radiance_circle`);
					}
					break;
				}
				case 'kubejs:polarity_curse': {
					if (Math.random() < 0.5) {
						event.setAmount(event.getAmount() * 1.5);
					}
					else {
						event.setAmount(0);
					}
				}
			}
		}
	}

	// Players getting hurt
	// Note to self: no need to check if not null cause there is always a damage target
	if (victim instanceof $Player && attacker instanceof $LivingEntity) {
		/** @type {$Map<string, integer>[]} */
		let enchantments = [
			victim.getHeadArmorItem().getEnchantments(),
			victim.getChestArmorItem().getEnchantments(),
			victim.getLegsArmorItem().getEnchantments(),
			victim.getFeetArmorItem().getEnchantments()
		];
		for (let map of enchantments) {
			for (const enchId of Object.keys(map)) {
				let enchLevel = map[enchId];
				switch (enchId) {
					case 'kubejs:curse_of_anti_entropy': {
						if (Math.random() <= 1 / 8) {
							victim.setSecondsOnFire(7);
							attacker.setTicksFrozen(7 * 20)
						}
						break;
					}
				}
			}
		}
	}
})

EntityEvents.death(event => {
	const player = event.getSource().getActual();
	if (player instanceof $Player) {
		let item = player.getMainHandItem();
		let id = item.getId();

		let victim = event.getEntity();
		let level = victim.getLevel();

		let enchantments = item.getEnchantments();
		for (const enchId of Object.keys(enchantments)) {
			let enchLevel = enchantments.get(enchId);
			switch (enchId) {
				case 'kubejs:prospector': {
					if (Math.random() <= 0.05) {
						const amount = global.getRandomInt(1, 1 + enchLevel);
						const entity = level.createEntity('minecraft:item');
						entity.setPos(new Vec3d(victim.x, victim.y, victim.z));
						entity.setItem(Item.of('minecraft:emerald', amount));
						entity.setPickUpDelay(15);
						entity.setMotionX((Math.random() - 0.5) * 0.3);
						entity.setMotionY(Math.random() * 0. + 0.1);
						entity.setMotionZ((Math.random() - 0.5) * 0.3);
						entity.spawn();
						level.playSound(null, victim.x, victim.y, victim.z, 'adj:item.last_laugh.drop_loot', 'neutral', 0.75, 1.0);
						level.spawnParticles('happy_villager', false, victim.x, victim.y, victim.z, 0.33, 0.33, 0.33, Math.ceil(amount * 2.5), 0)
					}
					break;
				}
				case 'kubejs:leeching': {
					const percent = 0.04 + 0.02 * enchLevel;
					player.heal(victim.getMaxHealth() * percent);
					break;
				}
				case 'kubejs:rampaging': {
					let amplifier;
					const effect = player.getEffect('kubejs:rampaging');
					if (effect) {
						amplifier = effect.getAmplifier();
						if (amplifier < enchLevel - 1) {
							amplifier++;
						}
					}
					else {
						amplifier = 0;
					}
					player.addEffect(new $MobEffectInstance('kubejs:rampaging', 140 + (enchLevel - 1) * 30, amplifier, false, false, true))
					player.playNotifySound('block.anvil.place', 'players', 0.5, 0.6 + (amplifier) * 0.15)
					break;
				}
			}
		}
	}
})

// BetterCombat stuff
// Terra Blade slashes, Zenith sounds
const $TerraSlashEntity = Java.loadClass('xyz.kohara.adjcore.registry.entities.TerraSlashEntity');
const $ADJEntities = Java.loadClass('xyz.kohara.adjcore.registry.ADJEntities');
NetworkEvents.dataReceived('player_attack_start', event => {
	let server = event.getServer();
	let player = event.getPlayer();
	let level = player.getLevel();
	let data = event.getData();

	switch (data.weapon) {
		case 'botania:terra_sword': {
			server.scheduleInTicks(4, () => {
				const slash = new $TerraSlashEntity($ADJEntities.TERRA_SLASH.get(), level);
				slash.setPos(new Vec3d(player.x, player.y + player.getEyeHeight() - 0.35, player.z));
				slash.setDisplayAngles(player.xRot, player.yRot);
				slash.setDeltaMovement(player.getLookAngle().scale(3));
				slash.setOwner(player);

				level.addFreshEntity(slash);
			})
			break;
		}
		case 'zenith:zenith': {
			level.playSound(null, player.x, player.y + player.getEyeHeight(), player.z, 'adj:item.zenith.swing', 'players', 1.0, 1);
			break;
		}
	}
});
