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
	 * @param {Internal.Level_} level
	 * @param {number} count
	 * @param {number} spreadAngle
	 * @param {number} vel
	 * @param {number} damage
	 */
	shootProjectileCone: function (player, type, level, count, spreadAngle, vel, damage) {
		let lookAngle = player.getLookAngle();
		let startAngle = 0;
		let angleStep = 0;
		if (count > 1) {
			startAngle = -(spreadAngle / 2);
			angleStep = spreadAngle / (count - 1);
		}
		for (let i = 0; i < count; i++) {
			let currentAngle = startAngle + (i * angleStep);
			let rad = currentAngle * (3.141592653 / 180)
			let cos = Math.cos(rad);
			let sin = Math.sin(rad);
			let motionX = lookAngle.x() * cos - lookAngle.z() * sin;
			let motionZ = lookAngle.x() * sin + lookAngle.z() * cos;
			let motionY = lookAngle.y();
			let projectile = level.createEntity(type)
			projectile.setPosition(player.x, player.y + player.eyeHeight * 0.85, player.z)
			projectile.setMotion(motionX * vel, motionY * vel, motionZ * vel)
			projectile.setOwner(player);
			projectile.setNoGravity(false);
			level.addFreshEntity(projectile);
		}
	}

}
const arrowDamageAttr = global.getRegistryObject('ATTRIBUTES', 'attributeslib:arrow_damage');

EntityEvents.spawned(event => {
	const arrowEntity = event.getEntity();

	if (arrowEntity instanceof $AbstractArrow) {
		const shooter = arrowEntity.getOwner()
		const item = Bows.getMainRangedWeapon(shooter);
		if (shooter instanceof $Player) {

			let arrowDamage = global.getOrDefault(global.arrowDamage[arrowEntity.getType()], 4), bowDamage = 0;


			if (item) {
				const power = global.getOrDefault(item.getEnchantments()['minecraft:power'], 0);
				let data = global.bowDamage[item.getId()];
				let damage = data;
				if (Array.isArray(data)) damage = data[0];
				bowDamage = global.getOrDefault((damage * shooter.getAttributeValue(arrowDamageAttr) * (1 + (power * 0.08))), 0);

				switch (item.getId()) {
					case 'mcdw:crossbow_butterfly_crossbow': {
						arrowEntity.setNoGravity(true);
						arrowEntity.life = 1000;
						break;
					}
				}
			}
			// Save damage value into persistent data
			arrowEntity.persistentData.arrowDamage = arrowDamage;
			arrowEntity.persistentData.bowDamage = bowDamage;

			arrowEntity.setBaseDamage(0);
		}
		// Disable crit arrows cause the particles are ugly
		// I handle crits through AttributesLib anyway
		arrowEntity.setCritArrow(false);
		// Add pierce to certain arrow types
		const pierce = global.arrowPierce[arrowEntity.getType()];
		if (pierce) {
			const nbt = arrowEntity.getNbt();
			nbt.putByte('PierceLevel', nbt.PierceLevel + pierce);
			arrowEntity.setNbt(nbt)
		}

		switch (item.id) {
			case 'mcdw:crossbow_burst_crossbow': {
				let tag = {};
				if (arrowEntity.save(tag)) {
					tag.remove('UUID');

				}
			}
		}
	}
});

ADJServerEvents.adjArrowHurt(event => {
	const shooter = event.getShooter();
	let damage;
	const arrowEntity = event.getArrow();
	if (shooter instanceof $Player) {

		// Certain arrows ignore velocity multiplier
		const velocity = (arrowEntity.getType() === 'alexscaves:seeking_arrow' || arrowEntity.getType() === 'tide:deep_aqua_arrow' || arrowEntity.getType() === 'tide:star_arrow') ? 1 : (Math.min(arrowEntity.getDeltaMovement().length(), 3) / 3);

		const pData = arrowEntity.persistentData;
		damage = (pData.arrowDamage + pData.bowDamage) * velocity;

	}
	else {
		const velocity = Math.min(arrowEntity.getDeltaMovement().length(), 0.4) / 0.4;

		if (shooter) {
			damage = (global.getOrDefault(global.monsterRangedDamageBase[shooter.getType()], 15)) * (velocity);
			if (shooter.getServer())
				damage *= global.monsterRangedDamageMul[global.getCurrentChapter(shooter.getServer())];
		}

		damage *= velocity;
	}
	damage = Math.ceil(damage)
	event.setAmount(damage);
});
