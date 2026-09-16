/** 
 * @param {Internal.LivingEntity_} shooter 
 * @returns {Internal.ItemStack_}
 */
function getMainRangedWeapon(shooter) {
	return [shooter.mainHandItem, shooter.offhandItem].find(item => item && (Object.keys(global.bowDamage).includes(item.id)));
}

EntityEvents.spawned(event => {
	const arrowEntity = event.getEntity();

	if (arrowEntity instanceof $AbstractArrow) {
		const shooter = arrowEntity.getOwner()
		if (shooter instanceof $Player) {

			let arrowDamage = global.getOrDefault(global.arrowDamage[arrowEntity.getType()], 4), bowDamage = 0;

			const item = getMainRangedWeapon(shooter);
			if (item) {
				const power = global.getOrDefault(item.getEnchantments()['minecraft:power'], 0);
				let data = global.bowDamage[item.getId()];
				let damage = data;
				if (Array.isArray(data)) damage = data[0];
				bowDamage = global.getOrDefault(((damage * shooter.getAttributeValue($ALObjects.Attributes.ARROW_DAMAGE.get())) * (1 + power * 0.1)), 0);

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
			damage *= global.monsterRangedDamageMul[global.getCurrentChapter(shooter.getServer())];
		}

		damage *= velocity;
	}
	damage = Math.ceil(damage)
	event.setAmount(damage);
});
