const $AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier');
const $Integer = Java.loadClass('java.lang.Integer');
const $Mob = Java.loadClass('net.minecraft.world.entity.Mob');

PlayerEvents.tick(event => {
	const player = event.player;

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
			case 'ars_nouveau:creative_spell_book':
			case 'ars_nouveau:archmage_spell_book': {
				if (spellBookTier < 3) spellBookTier = 3;
				break;
			}
		}
	});

	if (player.getMainHandItem().getId() === 'zenith:zenith') {
		let nbt = player.getMainHandItem().nbt;

		if (nbt && !nbt.zenith_parts) {
			let parts = [];

			global.zenithSwords.forEach(part => {
				if (!Item.exists(part.item)) return;
				parts.push({
					item: part.item,
					color: $Integer(part.color.toString().replace('.0', '')),
					rotation_center_height: part.rotation_center_height,
					rotation: part.rotation,
					scale: part.scale,
					trail_width: part.trail_width
				});
			});

			nbt.zenith_parts = parts;
		}
	}

	// Base attributes
	// I hope this works. If not, then I roll back
	/**
	 * @param {Internal.Attribute_} attribute 
	 * @param {string} modifierUUID 
	 * @param {string} name
	 * @param {number} baseValue
	 * @param {Internal.AttributeModifier$Operation_} operation 
	 */
	function addBaseAttribtue(attribute, modifierUUID, name, baseValue, operation) {
		let att = player.getAttribute(attribute);
		let attModifier = att.getModifier(modifierUUID);
		if (!attModifier) {
			att.addPermanentModifier(new $AttributeModifier(modifierUUID, name, baseValue, operation));
		}
	}

	addBaseAttribtue('attributeslib:mining_speed', '923052c1-2354-48ba-b01a-51e31360e218', 'Base mining speed bonus', 0.15, 'addition');
	addBaseAttribtue('adjcore:player.extra_fortune_level', '766a19b7-a084-4797-af71-409699208487', 'More ore drops by default', 1, 'addition');

	const FlyingUUID = '923052c1-2354-48ba-b01a-51e31360e219';
	const SpellBookManaUUID = 'b790c0a0-0934-41e2-a2f4-d59b6671db5b';
	const WillOfDharockUUID = 'c17e38c0-78aa-422d-8e41-4243bc5a153f';
	const WitherStormUUID = 'c17e38c0-78aa-422d-8e41-4243bc5a153f';

	player.getAttribute('attributeslib:crit_chance').setBaseValue(0.0);
	player.getAttribute('generic.attack_speed').setBaseValue(2.0);

	// Architect Prism grants creative flight when in inventory
	const creativeFlightAttribute = player.getAttribute('attributeslib:creative_flight');
	const flying = creativeFlightAttribute.getModifier(FlyingUUID)
	if (!flying && hasPrism) {
		creativeFlightAttribute.addPermanentModifier(new $AttributeModifier(FlyingUUID, 'Architect\'s Prism', 1, 'addition'))
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
				amount = 20;
				break;
			case 3:
				amount = 40;
				break;
		}
		maxManaAttribute.addPermanentModifier(new $AttributeModifier(SpellBookManaUUID, 'Spell Book Max Mana', amount, 'addition'))
	}
	else if (spellBookMana && spellBookTier == 0) {
		maxManaAttribute.removeModifier(SpellBookManaUUID);
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
	critDamageAttr.addTransientModifier(new $AttributeModifier(WillOfDharockUUID, 'Will of Dharock', willOfDharockAmount, 'addition'));

	// Global damage attribute
	// Here read: something that increases all damage dealt
	const damageDealtAttr = player.getAttribute('kubejs:damage_dealt');
	const d = damageDealtAttr.getValue();

	/**
	 * @param {Internal.Attribute_} attribute 
	 * @param {boolean} convertFromDecimal 
	 * @param {Internal.AttributeModifier$Operation_} operation 
	 */
	function applyBonusToAttribute(attribute, convertFromDecimal, operation) {
		let uuid = 'd8e20186-7fec-4c85-b538-ff8ccde850d4';
		let damageAttr = player.getAttribute(attribute);
		damageAttr.removeModifier(uuid);
		let am = (convertFromDecimal) ? (d * 100) - 100 : d - 1.0;
		damageAttr.addTransientModifier(new $AttributeModifier(uuid, 'Damage Dealt Attribute', am, operation));
	}

	applyBonusToAttribute('generic.attack_damage', false, 'multiply_base');
	applyBonusToAttribute('attributeslib:arrow_damage', false, 'addition');
	applyBonusToAttribute('ars_nouveau:ars_nouveau.perk.spell_damage', true, 'addition');

	// Stuff reliant on persistent data
	const pData = player.getPersistentData();

	if (pData.elsa_crossbow_tickdown && pData.elsa_crossbow_tickdown > 0) {
		pData.elsa_crossbow_tickdown--;
		player.sendData('elsa_crossbow_draw', {
			amount: pData.elsa_crossbow_tickdown
		});
	}
	else {
		if (player.mainHandItem.getId() === 'kubejs:elsa_crossbow' && player.mainHandItem.nbt.Charged) {
			let nbt = player.mainHandItem.nbt;
			nbt.remove('Charged');
			nbt.remove('ChargedProjectiles');
			player.mainHandItem.setNbt(nbt);
		}
		if (player.offhandItem.getId() === 'kubejs:elsa_crossbow' && player.offhandItem.nbt.Charged) {
			let nbt = player.offhandItem.nbt;
			nbt.remove('Charged');
			nbt.remove('ChargedProjectiles');
			player.offhandItem.setNbt(nbt);
		}
	}

	// Overfed effect
	if (player.getSaturation() > 20) {
		player.addEffect(new $MobEffectInstance('kubejs:overfed', 3, 0, true, false, true));
	}

	if (player.isAlive()) {
		if (player.isCuriosEquipped('kubejs:pocketful_of_sunshine')) {
			if (!pData.pocketfulOfSunshineTimer && pData.pocketfulOfSunshineTimer != 0) {
				pData.pocketfulOfSunshineTimer = -1;
			}
			pData.pocketfulOfSunshineTimer++;
			if (pData.pocketfulOfSunshineTimer >= 100) {
				pData.pocketfulOfSunshineTimer = -1
				if (player.getAbsorptionAmount() < 50) {
					player.setAbsorptionAmount(player.getAbsorptionAmount() + 1);
				}
			}
		}

		// Neptune Shell and Moon Charm
		let isMerfolkActive = false;
		if ((
			player.isCuriosEquipped('kubejs:neptunes_shell')
			|| player.isCuriosEquipped('kubejs:moon_shell')
			|| player.isCuriosEquipped('kubejs:celestial_shell')
		) && player.isInWaterOrBubble()) {
			isMerfolkActive = true;
			player.addEffect(new $MobEffectInstance('kubejs:merfolk_form', 3, 0, true, false, true));

		}

		if ((
			player.isCuriosEquipped('kubejs:moon_charm')
			|| player.isCuriosEquipped('kubejs:moon_shell')
			|| player.isCuriosEquipped('kubejs:celestial_shell')
		) && player.getLevel().isNight() && !isMerfolkActive) {
			player.addEffect(new $MobEffectInstance('kubejs:werewolf_form', 3, 0, true, false, true));
		}
	}

	// Wither Storm stuff
	const musicPitch = player.getAttribute('adjcore:client.music_pitch');
	musicPitch.removeModifier(WitherStormUUID);
	const server = event.getServer();
	if (server.persistentData.witherStormActive) {
		let phase = server.persistentData.witherStormPhase;
		musicPitch.addTransientModifier(new $AttributeModifier(WitherStormUUID, 'Consequences of Your Own Actions', Math.min(phase * -0.07), 'multiply_base'));
	}
});

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

			if (id.endsWith('_spear')) {
				victim.addEffect(new $MobEffectInstance('kubejs:pierced', 7 * 20, 0, true, false, true));
			}

			let helmet = player.getHeadArmorItem();
			switch (helmet.id) {
				case 'botania:terrasteel_helmet': {
					let nbt = helmet.nbt;
					if (nbt.AncientWill_ahrim) {
						victim.addEffect(new $MobEffectInstance('minecraft:weakness', 8 * 20, 1, true, false, true));
					}
					if (nbt.AncientWill_guthan) {
						player.heal(Math.ceil(event.getDamage() * 0.1))
					}
					if (nbt.AncientWill_torag) {
						victim.addEffect(new $MobEffectInstance('minecraft:slowness', 8 * 20, 1, true, false, true));
					}
					if (nbt.AncientWill_verac) {
						global.getEntitiesInRadius(level, victim.x, victim.y, victim.z, 1.5).forEach(/** @param {Internal.Entity_} entity */ entity => {
							entity.attack(global.getDamageSource(level, 'minecraft:player_attack', null, player), Math.ceil(event.getDamage() * 0.33));
						});
					}
					if (nbt.AncientWill_karil) {
						victim.addEffect(new $MobEffectInstance('minecraft:wither', 8 * 20, 2, true, false, true));
					}
				}
			}
		}
	}
})

// A huge block that only triggers when a player is hurt by something, or if something hurts a player
const $MobType = Java.loadClass("net.minecraft.world.entity.MobType")
NativeEvents.onEvent('highest', false, $LivingHurtEvent, /** @param {Internal.LivingHurtEvent_} event */ event => {
	const attacker = event.getSource().getActual();
	/** @type {Internal.LivingEntity_} */
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
				attacker.playNotifySound('simplyswords:magic_sword_attack_02', 'players', 1.5, 1.2 + Math.random() * 0.2);
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
				victim.addEffect(new $MobEffectInstance('slowness', 10 * 20, 1)); // -30%
				attacker.addEffect(new $MobEffectInstance('speed', 10 * 20, 2)); // +30%
				break;
			}
			case 'mcdw:glaive_grave_bane': {
				if (victim.mobType === $MobType.UNDEAD) {
					victim.addEffect(new $MobEffectInstance('ars_nouveau:hex', 10 * 20, 1, false, true, true)); // Vulnerability Hex II = 30% increased damage
				}
				break;
			}
			case 'mcdw:glaive_venom_glaive': {
				victim.addEffect(new $MobEffectInstance('minecraft:poison', 7 * 20, 0, false, true, true));
				break;
			}
			case 'mcdw:sword_heartstealer': {
				attacker.heal(event.getAmount() * 0.06);
				break;
			}
			case 'mcdw:scythe_frost_scythe':
			case 'mcdw:dagger_fangs_of_frost': {
				victim.setTicksFrozen(victim.getTicksFrozen() + 30);
				break;
			}
			case 'mcdw:dagger_backstabber':
			case 'mcdw:dagger_swift_striker': {
				if (victim instanceof $Mob && victim.getTarget() != attacker) {
					event.setAmount(event.getAmount() * 1.5);
					level.playSound(null, victim.x, victim.y + victim.getEyeHeight(), victim.z, 'block.anvil.place', 'neutral', 1, Math.random() * 0.25 + 0.9);
				}
				break;
			}
			case 'twilightdelight:teardrop_sword':
			case 'twilightforest:fiery_sword': {
				if (attacker.persistentData.fierySwordCanExplode) {
					level.spawnParticles(
						'amendments:fireball_explosion',
						true,
						victim.x, victim.y + victim.getEyeHeight(), victim.z,
						0, 0, 0,
						1, 0
					);
					level.playSound(null, victim.x, victim.y + victim.getEyeHeight(), victim.z, 'entity.generic.explode', 'neutral', 1, Math.random() * 0.2 + 0.9);
					global.getEntitiesInRadius(level, victim.x, victim.y, victim.z, 1.75).forEach(/** @param {Internal.Entity_} e*/ e => {
						e.attack(global.getDamageSource(level, 'minecraft:player_explosion', null, attacker), event.getAmount() * 0.6);
						e.setSecondsOnFire(4);
					});
					attacker.persistentData.fierySwordCanExplode = false;
				}
				break;
			}
		}

		// Stuff that depends on persistent data
		if (data.voidStrike) {
			event.setAmount(event.getAmount() * (data.voidStrike.mul + 100) / 100);
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
	// Separate section to check for non-player-immediate damage
	if (attacker && attacker instanceof $Player) {
		// Accessories
		let type = event.getSource().getType();
		if (attacker.isCuriosEquipped('kubejs:withering_necklace') && type !== 'minecraft.wither') {
			victim.addEffect(new $MobEffectInstance('wither', 10 * 20, 1));
		}
		if (attacker.isCuriosEquipped('kubejs:ring_of_fire') && victim.isOnFire()) {
			event.setAmount(event.getAmount() + 5);
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

		// Accessories
		if (victim.isCuriosEquipped('kubejs:wither_rose_ring')) {
			attacker.attack(global.getDamageSource(player.getLevel(), 'thorns', null, player), event.getAmount() * 0.6);
			attacker.addEffect(new $MobEffectInstance('wither', 4 * 20, 1));
		}
		else if (victim.isCuriosEquipped('kubejs:rose_ring')) {
			attacker.attack(global.getDamageSource(player.getLevel(), 'thorns', null, player), event.getAmount() * 0.35);
		}

		if (victim.isCuriosEquipped('kubejs:mana_cuffs')) {
			victim.adjcore$restoreMana(event.getAmount());
		}
	}

	if (event.getSource().getType() === 'wither') {
		global.getEntitiesInRadius(victim.level, victim.x, victim.y, victim.z, 32).forEach(entity => {
			if (entity instanceof $Player && entity.isCuriosEquipped('kubejs:withering_necklace')) {
				entity.heal(Math.ceil(event.getAmount() * 0.33));
			}
		})
	}
});

EntityEvents.death(event => {
	const player = event.getSource().getActual();
	if (player instanceof $Player) {
		let item = player.getMainHandItem();
		let id = item.getId();

		let victim = event.getEntity();
		let level = victim.getLevel();

		function dropItem(item, min, max, atEntity, sound, volume, pitch, particle, delta) {
			if (Math.random() <= 0.05) {
				const amount = global.getRandomInt(min, max);
				const entity = level.createEntity('minecraft:item');
				entity.setPos(new Vec3d(atEntity.x, atEntity.y, atEntity.z));
				entity.setItem(Item.of(item, amount));
				entity.setPickUpDelay(15);
				entity.setMotionX((Math.random() - 0.5) * 0.3);
				entity.setMotionY(Math.random() * 0. + 0.1);
				entity.setMotionZ((Math.random() - 0.5) * 0.3);
				entity.spawn();
				if (sound) {
					let v = (volume) ? volume : 0.75;
					let p = (pitch) ? pitch : 1.0;
					level.playSound(null, atEntity.x, atEntity.y, atEntity.z, sound, 'neutral', v, p);
				}
				if (particle) {
					let d = (delta) ? delta : 0.33;
					level.spawnParticles(particle, false, victim.x, victim.y, victim.z, d, d, d, Math.ceil(amount * 2.5), 0)
				}
			}
		}

		switch (id) {
			case 'mcdw:sickle_last_laught_silver':
			case 'mcdw:sickle_last_laught_gold': {
				if (Math.random() <= 0.2) {
					dropItem('emerald', 1, 3, victim, 'adj:item.last_laugh.drop_loot', 'neutral', 0.75, 1.0, 'happy_villager');
				}
				break;
			}
		}

		let enchantments = item.getEnchantments();
		for (const enchId of Object.keys(enchantments)) {
			let enchLevel = enchantments.get(enchId);
			switch (enchId) {
				case 'kubejs:prospector': {
					if (Math.random() <= 0.05) {
						dropItem('emerald', 1, 1 + level, victim, 'adj:item.last_laugh.drop_loot', 'neutral', 0.75, 1.0, 'happy_villager');
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

		// Accessories
		if (player.isCuriosEquipped('kubejs:kiketsu_card')) {
			if (Math.random() <= 0.12) {
				dropItem(weightedRandom({
					'gold_nugget': 100,
					'iron_nugget': 170,
					'mythicmetals:copper_nugget': 300,
					'mythicmetals:tin_nugget': 125,
				}), 1, 2, victim, 'adj:item.last_laugh.drop_loot', 'neutral', 0.75, 1.0, 'happy_villager');
			}
		}
	}
});

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
		case 'twilightforest:fiery_sword': {
			if (!player.persistentData.fierySwordCanExplode) {
				player.persistentData.fierySwordCanExplode = true;
			}
		}
	}
});

// NetworkEvents.dataReceived('player_attack_hit', event => {
// 	let server = event.getServer();
// 	let player = event.getPlayer();
// 	let level = player.getLevel();
// 	let data = event.getData();

// 	switch (data.weapon) {
		
// 	}
// });
