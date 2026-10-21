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
	 * @param {Internal.Level_} level
	 * @param {number} count
	 * @param {number} spreadAngle
	 * @param {number} vel
	 * @param {number} damage
	 * @param {boolean} [noGravity]
	 * @param {boolean} [isRandom] - If true, spreads projectiles randomly in a 3D cone instead of a linear fan.
	 */
	shootProjectileCone: function (player, type, level, count, spreadAngle, vel, damage, noGravity, isRandom) {
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
			let projectile = level.createEntity(type);
			projectile.setPosition(player.x, player.eyeY - 0.15, player.z);
			let velocity = global.getOrDefault(vel, 3);
			projectile.setMotion(motionX * velocity, motionY * velocity, motionZ * velocity);
			projectile.setOwner(player);
			projectile.setNoGravity(global.getOrDefault(noGravity, false));
			projectile.persistentData.arrowDamage = damage[0];
			projectile.persistentData.bowDamage = damage[1];
			projectile.persistentData.ignore = true;
			level.addFreshEntity(projectile);
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
	explosion: function (x, y, z, radius, damage, arrow, shouldRemove) {
		let level = arrow.getLevel();
		level.spawnParticles(
			'amendments:fireball_explosion',
			true,
			x, y, z,
			0, 0, 0,
			1, 0
		)
		level.playSound(null, new Vec3d(x, y, z), 'entity.generic.explode', 'players');
		global.getEntitiesInRadius(level, x, y, z, radius).forEach(e => {
			global.attack(arrow.getOwner(), e, 'player_explosion', damage);
		});
		if (shouldRemove) {
			arrow.kill();
		}
	},
};

EntityEvents.spawned(event => {
	const arrowEntity = event.getEntity();
	if (arrowEntity instanceof $AbstractArrow) {

		let pickup = arrowEntity.pickup.toString();
		if (pickup === 'DISALLOWED' || pickup === 'CREATIVE_ONLY') arrowEntity.life = 900;
		if (arrowEntity.persistentData.ignore || arrowEntity.getTags().toArray().includes('adj.arrow')) return;

		arrowEntity.addTag('adj.arrow');
		let shooter = arrowEntity.getOwner()

		if (shooter instanceof $Player) {
			let arrowDamage = global.getOrDefault(global.arrowDamage[arrowEntity.getType()], 4), bowDamage = 0;
			let item = Bows.getMainRangedWeapon(shooter);
			if (item) {
				let power = global.getOrDefault(item.getEnchantments()['minecraft:power'], 0);
				let data = global.bowDamage[item.getId()];
				let damage = data;
				if (Array.isArray(data)) damage = data[0];
				bowDamage = global.getOrDefault((damage * shooter.getAttributeValue(Bows.arrowDamageAttr) * (1 + (power * 0.08))), 0);

				switch (item.getId()) {
					case 'mcdw:crossbow_butterfly_crossbow': {
						arrowEntity.setNoGravity(true);
						arrowEntity.life = 1000;
						break;
					}
					case 'mcdw:crossbow_burst_crossbow': {
						shooter.cooldowns.addCooldown(item.getItem(), 7);
						let shoot = () => {
							Bows.shootProjectileCone(shooter, arrowEntity.getType(), shooter.getLevel(), 1, 1, 3, [arrowDamage, bowDamage]);
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
							Bows.shootProjectileCone(shooter, arrowEntity.getType(), shooter.getLevel(), 1, 1, 3, [arrowDamage, bowDamage]);
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
						Bows.shootProjectileCone(shooter, arrowEntity.getType(), shooter.getLevel(), 4, 20, 3, [arrowDamage, bowDamage], false, true);
						break;
					}
					case 'mcdw:crossbow_lightning_harp_crossbow': {
						Bows.shootProjectileCone(shooter, arrowEntity.getType(), shooter.getLevel(), global.getRandomInt(0, 3), 20, 3, [arrowDamage, bowDamage], false, true);
						break;
					}
					case 'mcdw:crossbow_veiled_crossbow':
					case 'mcdw:crossbow_auto_crossbow': {
						shooter.cooldowns.addCooldown(item.getItem(), 20);
						break;
					}
					case 'mcdw:crossbow_corrupted_crossbow': {
						shooter.cooldowns.addCooldown(item.getItem(), global.getRandomInt(15, 32));
						let shoot = () => {
							Bows.shootProjectileCone(shooter, arrowEntity.getType(), shooter.getLevel(), global.getRandomInt(1, 4), global.getRandomInt(12, 30), 3 + global.getRandomNumber(-1, 2), [arrowDamage, bowDamage * (global.ifRandomChance(25) ? global.getRandomNumber(0.75, 1.25) : 1.0)], global.ifRandomChance(25) ? true : false, true);
							shooter.level.playSound(
								null,
								shooter.x, shooter.y + shooter.eyeHeight * 0.9, shooter.z,
								'minecraft:item.crossbow.shoot', 'players',
								1, 1
							);
						};
						let times = global.getRandomInt(0, 4);
						if (times > 0) {
							for (let i = 0; i < times; i++) {
								shooter.server.scheduleInTicks(3 * (i + 1), shoot);
							}

						}
						break;
					}
				}
			}
			// Save damage value into persistent data
			arrowEntity.persistentData.arrowDamage = arrowDamage;
			arrowEntity.persistentData.bowDamage = bowDamage;
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
	let damage;
	const arrowEntity = event.getArrow();
	if (shooter instanceof $Player) {

		// Certain arrows ignore velocity multiplier
		let velocity =
			(
				arrowEntity.getType() === 'alexscaves:seeking_arrow'
				|| arrowEntity.getType() === 'tide:star_arrow'
			)
				? 1
				: (Math.min(arrowEntity.getDeltaMovement().length(), 3) / 3);

		let pData = arrowEntity.persistentData;
		damage = global.getArrowDamage(arrowEntity) * velocity;

	}
	else {
		let velocity = Math.min(arrowEntity.getDeltaMovement().length(), 0.4) / 0.4;

		if (shooter) {
			damage = (global.getOrDefault(global.monsterRangedDamageBase[shooter.getType()], 15)) * (velocity);
			if (shooter.getServer())
				damage *= global.monsterRangedDamageMul[global.getCurrentChapter(shooter.getServer())];
		}

		damage *= velocity;
	}
	damage = Math.ceil(damage)
	event.setAmount(damage);

	const entity = event.getVictim();
	if (entity instanceof $LivingEntity && shooter instanceof $Player) {

		let isHeadshot = (() => {
			let hitY = arrowEntity.y;
			let eyeY = entity.getEyeY();
			return hitY >= eyeY;
		})();

		switch (arrowEntity.persistentData.weapon) {
			case 'mcdw:crossbow_lightning_harp_crossbow': {
				global.chainLightning(shooter, entity, (e) => {
					if (e == entity) return;
					global.hurt(e, shooter, 18, 'ars_elemental:spark');
				}, 4, 10);
				break;
			}
			case 'mcdw:crossbow_auto_crossbow':
			case 'mcdw:crossbow_veiled_crossbow': {
				if (isHeadshot) {
					event.setAmount(damage * 1.2);
					shooter.playNotifySound(
						'block.anvil.place',
						'players',
						0.8, 0.6
					);
				}
				break;
			}
			case 'mcdw:crossbow_exploding_crossbow': {
				Bows.explosion(entity.x, entity.y + entity.bbHeight / 2, entity.z, 3, damage * 0.5, arrowEntity, true);
				break;
			}
		}
	}
});

// Things that happen on a block hit
const $ProjectileImpactEvent = Java.loadClass('net.minecraftforge.event.entity.ProjectileImpactEvent');
NativeEvents.onEvent('normal', false, $ProjectileImpactEvent, event => {
	let entity = event.getProjectile();
	if (entity instanceof $AbstractArrow && event.getRayTraceResult().getType().toString() === 'BLOCK') {
		switch (entity.persistentData.weapon) {
			case 'mcdw:crossbow_exploding_crossbow': {
				Bows.explosion(entity.x, entity.y, entity.z, 3, global.getArrowDamage(entity) * 0.5, entity, true);
				break;
			}
		}
	}
});
