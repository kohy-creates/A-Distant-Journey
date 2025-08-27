const $AbstractArrow = Java.loadClass('net.minecraft.world.entity.projectile.AbstractArrow');
const $ALObjects = Java.loadClass('dev.shadowsoffire.attributeslib.api.ALObjects');
const $Player = Java.loadClass('net.minecraft.world.entity.player.Player');

/** 
 * @param {Internal.LivingEntity_} shooter 
 * @returns {Internal.ItemStack_}
 */
function getMainRangedWeapon(shooter) {
	return [shooter.mainHandItem, shooter.offhandItem]
		.find(item =>
			item && (item.hasTag("adj:reforges/bows"))
		);
}


EntityEvents.spawned(event => {
	const arrowEntity = event.getEntity();

	if (arrowEntity instanceof $AbstractArrow) {
		const shooter = arrowEntity.getOwner()
		if (shooter instanceof $Player) {

			let arrowDamage = global.arrowDamage[arrowEntity.type] || 4, bowDamage = 0;
			const item = getMainRangedWeapon(shooter);
			if (item) bowDamage = (global.bowDamage[item.getId()] * shooter.getAttributeValue($ALObjects.Attributes.ARROW_DAMAGE.get())) || 0;

			// Save damage value into persistent data
			arrowEntity.persistentData.arrowDamage = arrowDamage;
			arrowEntity.persistentData.bowDamage = bowDamage;

			arrowEntity.setBaseDamage(global.arrowInternalDamageOverride[arrowEntity.type] || 0);
		}
		// Disable crit arrows cause the particles are ugly
		// I handle crits through AttributesLib anyway
		arrowEntity.setCritArrow(false);
		const pierce = global.arrowPierce[arrowEntity.type];
		if (pierce) {
			const nbt = arrowEntity.getNbt();
			nbt.putByte('PierceLevel', nbt.PierceLevel + pierce);
			arrowEntity.setNbt(nbt)
		}
	}
})

// THIS LOGIC IS HANDLED BY A STARTUP SCRIPT CAUSE KUBEJS
// DOESN'T ALLOW FOR MODIFYING DAMAGE AMOUNT FOR SOME REASON
// EntityEvents.hurt(event => {

// })

ServerEvents.recipes(event => {

	/**
	 * @type {InputItem_}
	 */
	const bowsToRemoveRecipes = [
		// 'too_many_bows:ancient_sage_bow'
	]

	bowsToRemoveRecipes.forEach(bow => {
		event.remove({ output: bow })
	})
})