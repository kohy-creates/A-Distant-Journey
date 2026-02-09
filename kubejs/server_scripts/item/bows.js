const $AbstractArrow = Java.loadClass('net.minecraft.world.entity.projectile.AbstractArrow');
const $ALObjects = Java.loadClass('dev.shadowsoffire.attributeslib.api.ALObjects');
const $Player = Java.loadClass('net.minecraft.world.entity.player.Player');

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

			let arrowDamage = global.arrowDamage[arrowEntity.type] || 4, bowDamage = 0;

			const item = getMainRangedWeapon(shooter);
			if (item) {
				const power = item.getEnchantments()['minecraft:power'] || 0;
				let data = global.bowDamage[item.getId()];
				let damage = data;
				if (Array.isArray(data)) damage = data[0];
				bowDamage = ((damage * shooter.getAttributeValue($ALObjects.Attributes.ARROW_DAMAGE.get())) * (1 + power * 0.1)) || 0;

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
		const pierce = global.arrowPierce[arrowEntity.type];
		if (pierce) {
			const nbt = arrowEntity.getNbt();
			nbt.putByte('PierceLevel', nbt.PierceLevel + pierce);
			arrowEntity.setNbt(nbt)
		}
	}
})

// DAMAGE LOGIC IS HANDLED VIA A STARTUP SCRIPT CAUSE KUBEJS
// DOESN'T ALLOW FOR MODIFYING DAMAGE AMOUNT FOR SOME REASON
