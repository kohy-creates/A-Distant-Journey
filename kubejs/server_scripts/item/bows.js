const Bows = {
	/** 
	 * @param {Internal.LivingEntity_} shooter 
	 * @returns {Internal.ItemStack_}
	 */
	getMainRangedWeapon: function (shooter) {
		return [shooter.mainHandItem, shooter.offhandItem].find(item => item && (Object.keys(global.bowDamage).includes(item.id)));
	},
	/**
	 * @param {Internal.Player_} player
	 * @param {string} type
	 * @param {number} count
	 * @param {number} spreadAngle
	 * @param {number} vel
	 * @param {number} damage
	 * @param {boolean} [noGravity]
	 * @param {boolean} [isRandom]
	 */
	shootProjectileCone: function (player, type, count, spreadAngle, vel, damage, noGravity, isRandom) {
		if (count < 0) return;
		let lookAngle = player.getLookAngle();
		let randomMode = global.getOrDefault(isRandom, false);
		for (let i = 0; i < count; i++) {
			let currentAngleH = 0;
			let currentAngleV = 0;
			if (randomMode) {
				currentAngleH = (Math.random() - 0.5) * spreadAngle;
				currentAngleV = (Math.random() - 0.5) * spreadAngle;
			} else {
				let startAngle = 0;
				let angleStep = 0;
				if (count > 1) {
					startAngle = -(spreadAngle / 2);
					angleStep = spreadAngle / (count - 1);
				}
				currentAngleH = startAngle + (i * angleStep);
			}
			let radH = currentAngleH * (3.141592653 / 180);
			let cosH = Math.cos(radH);
			let sinH = Math.sin(radH);
			let motionX = lookAngle.x() * cosH - lookAngle.z() * sinH;
			let motionZ = lookAngle.x() * sinH + lookAngle.z() * cosH;
			let motionY = lookAngle.y();
			if (randomMode && currentAngleV !== 0) {
				let radV = currentAngleV * (3.141592653 / 180);
				motionY += Math.sin(radV);
			}
			let projectile = player.level.createEntity(type);
			projectile.setPosition(player.x, player.eyeY - 0.15, player.z);
			let velocity = global.getOrDefault(vel, 3);
			projectile.setMotion(motionX * velocity, motionY * velocity, motionZ * velocity);
			projectile.setOwner(player);
			projectile.setNoGravity(global.getOrDefault(noGravity, false));
			projectile.persistentData.damage = damage;
			projectile.persistentData.ignore = true;
			player.level.addFreshEntity(projectile);
		}
	},
	/**
	 * @param {Internal.Player_} player
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @param {string} type
	 * @param {Internal.Level_} level
	 * @param {number} count
	 * @param {number} spreadAngle
	 * @param {number} vel
	 * @param {number} velVariation
	 * @param {number} damage
	 * @param {boolean} [isRandom]
	 * @param {string} [weapon]
	 */
	shootProjectileFountain: function (player, x, y, z, type, count, spreadAngle, vel, velVariation, damage, isRandom, weapon) {
		if (count < 0) return;
		let randomMode = global.getOrDefault(isRandom, true);

		for (let i = 0; i < count; i++) {
			let angleTheta = 0;
			let anglePhi = 0;

			if (randomMode) {
				angleTheta = Math.random() * spreadAngle;
				anglePhi = Math.random() * 360;
			} else {
				angleTheta = spreadAngle * (i / (count > 1 ? count - 1 : 1));
				anglePhi = (i / count) * 360;
			}

			let radTheta = angleTheta * (3.141592653 / 180);
			let radPhi = anglePhi * (3.141592653 / 180);

			let motionY = Math.cos(radTheta);
			let horizontalLen = Math.sin(radTheta);
			let motionX = horizontalLen * Math.cos(radPhi);
			let motionZ = horizontalLen * Math.sin(radPhi);

			let projectile = player.level.createEntity(type);
			projectile.setPosition(x, y, z);

			let velocity = global.getOrDefault(vel, 1.0);
			if (velVariation > 0) {
				velocity += (Math.random() * 2 - 1) * velVariation;
			}

			projectile.setMotion(motionX * velocity, motionY * velocity, motionZ * velocity);

			projectile.setOwner(player);
			projectile.setNoGravity(false);

			projectile.persistentData.damage = damage;
			projectile.persistentData.ignore = true;
			if (weapon) projectile.persistentData.weapon = weapon;

			projectile.addTag('adj.ignore_velocity');

			player.level.addFreshEntity(projectile);
		}
	},
	arrowDamageAttr: global.getRegistryObject('ATTRIBUTES', 'attributeslib:arrow_damage'),
	/**
	 * Creates an 'explosion' at the specified location.
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} z 
	 * @param {number} radius
	 * @param {number} damage
	 * @param {Internal.AbstractArrow_} arrow
	 * @param {boolean} shouldRemove 
	 */
	explosion: function (x, y, z, radius, damage, arrow, shouldRemove, particle) {
		let level = arrow.getLevel();
		level.spawnParticles(
			global.getOrDefault(particle, 'amendments:fireball_explosion'),
			true,
			x, y, z,
			0, 0, 0,
			1, 0
		);
		level.playSound(null, x, y, z, 'entity.generic.explode', 'players', 0.6, global.getRandomNumber(1, 1.2));
		global.getEntitiesInRadius(level, x, y, z, radius).forEach(e => {
			if (e == arrow.getOwner()) return;
			global.hurt(arrow.getOwner(), e, 'player_explosion', damage);
		});
		if (shouldRemove) {
			arrow.kill();
		}
	},

	/**
	 * Handles shared cross-bow hit logic when hitting an entity or block position.
	 * @param {string} weaponId
	 * @param {Internal.AbstractArrow_} arrow
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @param {number} baseDamage
	 * @param {Internal.LivingEntity_} [entity]
	 */
	handleHitEffect: function (weaponId, arrow, x, y, z, baseDamage, entity) {
		switch (weaponId) {
			case 'mcdw:crossbow_exploding_crossbow': {
				Bows.explosion(x, y, z, 3, baseDamage * 0.5, arrow, true, 'explosiveenhancement:fireball 1');
				break;
			}
			case 'mcdw:crossbow_firebolt_thrower': {
				if (arrow.persistentData.ignore) {
					Bows.explosion(x, y, z, 2, baseDamage * 0.5, arrow, true, 'explosiveenhancement:fireball 0.6667');
					return;
				}
				Bows.explosion(x, y, z, 3, baseDamage * 0.5, arrow, true, 'explosiveenhancement:fireball 1');
				Bows.shootProjectileFountain(
					arrow.getOwner(),
					x, y, z,
					arrow.type,
					global.getRandomInt(3, 4), 45.0,
					0.5, 0.12, baseDamage * 0.5,
					true, 'mcdw:crossbow_firebolt_thrower'
				);
				break;
			}
			case 'mcdw:crossbow_corrupted_crossbow': {
				if (global.ifRandomChance(25)) {
					Bows.shootProjectileFountain(
						arrow.getOwner(),
						x, y, z,
						arrow.type,
						global.getRandomInt(3, 4), 45.0,
						0.5, 0.12, baseDamage * 0.5,
						true
					);
				}
				break;
			}
			case 'mcdw:crossbow_imploding_crossbow': {
				arrow.server.scheduleInTicks(11, () => {
					Bows.explosion(x, y, z, 7, baseDamage, arrow, true, 'explosiveenhancement:sparks 4');
					arrow.level.spawnParticles(
						'explosiveenhancement:underwaterblastwave 4',
						true,
						x, y, z,
						0, 0, 0,
						1, 0
					);
					arrow.level.playSound(null, x, y, z, 'adj:generic.critical_hit', 'players', 1.5, global.getRandomNumber(1.1, 1.15));
					arrow.level.playSound(null, x, y, z, 'minecraft:block.beacon.power_select', 'players', 1.5, global.getRandomNumber(1.1, 1.15));
					for (let i = 0; i < 5; i++) {
						arrow.server.scheduleInTicks(i * 2, () => {
							arrow.level.spawnParticles(
								'flash',
								true,
								x, y, z,
								1.8, 1.8, 1.8,
								2, 0
							);
						});
					}
				});
				arrow.level.playSound(null, x, y, z, 'minecraft:entity.allay.item_given', 'players', 1.5, global.getRandomNumber(0.9, 1.05));
				arrow.level.spawnParticles(
					'sonic_boom',
					true,
					x, y, z,
					0, 0, 0,
					1, 0
				);
				arrow.kill();
				break;
			}
		}
	}
};

EntityEvents.spawned(event => {
	const arrowEntity = event.getEntity();
	if (arrowEntity instanceof $AbstractArrow) {

		let pickup = arrowEntity.pickup.toString();
		if (pickup === 'DISALLOWED' || pickup === 'CREATIVE_ONLY') arrowEntity.life = 900;
		if (arrowEntity.persistentData.ignore || global.hasTag(arrowEntity, 'adj.arrow')) return;

		arrowEntity.addTag('adj.arrow');
		let shooter = arrowEntity.getOwner()

		if (shooter instanceof $Player) {
			let damage = global.getOrDefault(global.arrowDamage[arrowEntity.getType()], 4);

			let item = Bows.getMainRangedWeapon(shooter);
			if (item) {
				let power = global.getOrDefault(item.getEnchantments()['minecraft:power'], 0);
				let data = global.bowDamage[item.getId()];
				let dmg = data;
				if (Array.isArray(data)) dmg = data[0];
				damage += global.getOrDefault((dmg * shooter.getAttributeValue(Bows.arrowDamageAttr) * (1 + (power * 0.08))), 0);

				let cooldown = global.getOrDefault(global.bowCooldowns[item.getId()], 0);
				if (cooldown > 0) {
					shooter.cooldowns.addCooldown(item.getItem(), cooldown);
				}

				switch (item.getId()) {
					case 'mcdw:crossbow_butterfly_crossbow': {
						arrowEntity.setNoGravity(true);
						arrowEntity.life = 1000;
						break;
					}
					case 'mcdw:crossbow_burst_crossbow': {
						let shoot = () => {
							Bows.shootProjectileCone(shooter, arrowEntity.getType(), 1, 1, 3, damage, false, true);
							shooter.level.playSound(
								null,
								shooter.x, shooter.y + shooter.eyeHeight * 0.9, shooter.z,
								'minecraft:item.crossbow.shoot', 'players',
								1, 1
							);
						};
						shooter.server.scheduleInTicks(3, shoot);
						shooter.server.scheduleInTicks(6, shoot);
						break;
					}
					case 'mcdw:crossbow_soul_hunter_crossbow': {
						let isSpectral = arrowEntity.getType() == 'minecraft:spectral_arrow';
						shooter.cooldowns.addCooldown(item.getItem(), isSpectral ? 7 : 11);
						let shoot = () => {
							Bows.shootProjectileCone(shooter, arrowEntity.getType(), 1, 1, 3, damage, false, true);
							shooter.level.playSound(
								null,
								shooter.x, shooter.y + shooter.eyeHeight * 0.9, shooter.z,
								'minecraft:item.crossbow.shoot', 'players',
								1, 1
							);
						};
						if (isSpectral) {
							shooter.server.scheduleInTicks(2, shoot);
							shooter.server.scheduleInTicks(4, shoot);
							shooter.server.scheduleInTicks(6, shoot);
							shooter.server.scheduleInTicks(8, shoot);
						}
						else {
							shooter.server.scheduleInTicks(3, shoot);
							shooter.server.scheduleInTicks(6, shoot);
						}
						break;
					}
					case 'mcdw:crossbow_harp_crossbow': {
						Bows.shootProjectileCone(shooter, arrowEntity.getType(), 4, 20, 3, damage, false, true);
						break;
					}
					case 'mcdw:crossbow_lightning_harp_crossbow': {
						Bows.shootProjectileCone(shooter, arrowEntity.getType(), global.getRandomInt(2, 3), 20, 3, damage, false, true);
						break;
					}
					case 'mcdw:crossbow_corrupted_crossbow': {
						shooter.cooldowns.addCooldown(item.getItem(), global.getRandomInt(15, 32));
						let shoot = () => {
							Bows.shootProjectileCone(
								shooter,
								arrowEntity.getType(),
								global.getRandomInt(1, 4),
								global.getRandomInt(12, 30),
								3 + global.getRandomNumber(-1, 2),
								damage * (global.ifRandomChance(25) ? global.getRandomNumber(0.75, 1.25) : 1.0),
								global.ifRandomChance(25) ? true : false,
								true
							);
							shooter.level.playSound(
								null,
								shooter.x, shooter.y + shooter.eyeHeight * 0.9, shooter.z,
								'minecraft:item.crossbow.shoot', 'players',
								1, 1
							);
						};
						let times = global.getRandomInt(1, 3);
						if (times > 0) {
							for (let i = 0; i < times; i++) {
								shooter.server.scheduleInTicks(3 * (i + 1), shoot);
							}
						}
						break;
					}
					case 'mcdw:crossbow_feral_soul_crossbow':
					case 'mcdw:crossbow_soul_crossbow': {
						if (shooter.adjcore$tryCastSpell(Math.ceil(global.getMaxMana(shooter) * 0.2))) {
							damage *= 1.25;
							shooter.level.playSound(
								null,
								shooter.x, shooter.y + shooter.eyeHeight * 0.9, shooter.z,
								'netherexp:block.suspicious_soul_sand.break', 'players',
								1, 0.9
							);
							shooter.level.playSound(
								null,
								shooter.x, shooter.y + shooter.eyeHeight * 0.9, shooter.z,
								'adj:enchantment.void_strike.activate', 'players',
								0.5, 1.34
							);
						}
						break;
					}
					case 'mcdw:crossbow_voidcaller_crossbow': {
						if (shooter.adjcore$tryCastSpell(Math.ceil(global.getMaxMana(shooter) * 0.2))) {
							arrowEntity.addTag('adj.voidcaller_arrow');
							shooter.level.playSound(
								null,
								shooter.x, shooter.y + shooter.eyeHeight * 0.9, shooter.z,
								'netherexp:block.suspicious_soul_sand.break', 'players',
								1, 0.9
							);
							shooter.level.playSound(
								null,
								shooter.x, shooter.y + shooter.eyeHeight * 0.9, shooter.z,
								'adj:enchantment.void_strike.activate', 'players',
								0.5, 1.34
							);
						}
					}
				}
			}
			// Save damage value into persistent data
			arrowEntity.persistentData.damage = damage;
			arrowEntity.persistentData.weapon = item ? item.getId() : null;

			arrowEntity.setBaseDamage(0);
		}
		// Disable crit arrows cause the particles are ugly
		// I handle crits through AttributesLib anyway
		arrowEntity.setCritArrow(false);
		// Add pierce to certain arrow types
		let pierce = global.arrowPierce[arrowEntity.getType()];
		if (pierce) {
			let nbt = arrowEntity.getNbt();
			nbt.putByte('PierceLevel', nbt.PierceLevel + pierce);
			arrowEntity.setNbt(nbt)
		}
	}
});

ADJServerEvents.adjArrowHurt(event => {
	const shooter = event.getShooter();
	const arrow = event.getArrow();
	let damage = arrow.persistentData.damage;
	let velocity = (arrow.getType() === 'alexscaves:seeking_arrow' || arrow.getType() === 'tide:star_arrow' || global.hasTag(arrow, 'adj.ignore_velocity'))
		? 1 : (Math.min(arrow.getDeltaMovement().length(), 4) / 3);

	velocity = Math.min(velocity, 1.0); // Cap velocity multiplier at 1.0

	if (shooter && !(shooter instanceof $Player)) {
		damage = (global.getOrDefault(global.monsterRangedDamageBase[shooter.getType()], 15)) * (velocity);
		if (shooter.getServer())
			damage *= global.monsterRangedDamageMul[global.getCurrentChapter(shooter.getServer())];
	}

	damage = Math.ceil(damage * velocity);

	const entity = event.getVictim();
	if (entity instanceof $LivingEntity && shooter instanceof $Player) {

		let isHeadshot = (() => {
			let hitY = arrow.getEyeY();
			let eyeY = entity.getEyeY();
			return hitY >= eyeY;
		})();

		let weaponId = arrow.persistentData.weapon;
		if (weaponId) {
			switch (weaponId) {
				case 'mcdw:crossbow_lightning_harp_crossbow': {
					global.chainLightning(shooter, entity, (e) => {
						if (e == entity) return;
						global.hurt(e, shooter, 18, 'ars_elemental:spark');
					}, 4, 10);
					break;
				}
				case 'mcdw:crossbow_veiled_crossbow':
				case 'mcdw:crossbow_shadow_crossbow': {
					if (damage >= entity.getHealth()) {
						shooter.addEffect(global.newMobEffectInstance('adjcore:shadowmelted', '0:14', 0, false, false, true));
					}
					if (weaponId === 'mcdw:crossbow_veiled_crossbow' && isHeadshot) {
						damage *= 1.2;
						shooter.playNotifySound(
							'block.anvil.place',
							'players',
							0.8, 0.6
						);
					}
					break;
				}
				case 'mcdw:crossbow_auto_crossbow': {
					if (isHeadshot) {
						damage *= 1.2;
						shooter.playNotifySound(
							'block.anvil.place',
							'players',
							0.8, 0.6
						);
					}
					break;
				}
				case 'mcdw:crossbow_feral_soul_crossbow': {
					if (isHeadshot) {
						shooter.adjcore$restoreMana(damage * 0.5, true);
						shooter.playNotifySound(
							'adj:eye.collect',
							'players',
							0.5, 1.2
						)
					}
					break;
				}
				case 'mcdw:crossbow_voidcaller_crossbow': {
					if (!global.hasTag(arrow, 'adj.voidcaller_arrow')) return;
					let phoenixLoop = (e, dmg, loopCount, maxLoops) => {
						if (loopCount > maxLoops) return;
						if (e.hasEffect('kubejs:voidcaller_mark')) {
							let x = e.x;
							let y = e.y + e.bbHeight / 2;
							let z = e.z;
							e.removeEffect('kubejs:voidcaller_mark');
							shooter.level.spawnParticles(
								'sonic_boom',
								true,
								x, y, z,
								0, 0, 0,
								1, 0
							);
							shooter.server.scheduleInTicks(11, () => {
								shooter.level.playSound(null, entity.x, entity.y + entity.bbHeight / 2, entity.z, 'minecraft:block.respawn_anchor.deplete', 'players', 1, global.getRandomNumber(1.3, 1.4));
								global.getEntitiesInRadius(shooter.level, x, y, z, 4).forEach(e2 => {
									if (e2 != shooter && e2 instanceof $LivingEntity) {
										global.hurt(shooter, e2, 'magic', dmg);
										if (e2 != e) phoenixLoop(e2, dmg * 0.95, loopCount + 1, maxLoops)
									}
								});
								shooter.level.spawnParticles(
									'explosiveenhancement:sparks 0.5',
									true,
									x, y, z,
									0, 0, 0,
									2, 0
								);
							});
						}
						else {
							e.addEffect(global.newMobEffectInstance('kubejs:voidcaller_mark', '0:10', 0, false, true, false));
						}
					};
					phoenixLoop(entity, damage * 0.95, 1, 3);
					break;
				}
				default: {
					Bows.handleHitEffect(weaponId, arrow, entity.x, entity.y + entity.bbHeight / 2, entity.z, damage, entity);
					break;
				}
			}
		}
	}

	event.setAmount(damage);
});

// Things that happen on a block hit
const $ProjectileImpactEvent = Java.loadClass('net.minecraftforge.event.entity.ProjectileImpactEvent');
NativeEvents.onEvent('normal', false, $ProjectileImpactEvent, event => {
	let arrow = event.getProjectile();
	if (arrow instanceof $AbstractArrow && event.getRayTraceResult().getType().toString() === 'BLOCK') {
		let weaponId = arrow.persistentData.weapon;
		if (weaponId) {
			Bows.handleHitEffect(weaponId, arrow, arrow.x, arrow.y, arrow.z, arrow.persistentData.damage, null);
		}
	}
});