// /** @param {Internal.ProjectileHitBlockEventJS} event */
// global.explodingBowBlockHit = function (event) {
// 	const arrow = event.getArrow();
// 	let explosion = event.getLevel().createExplosion(arrow.x, arrow.y, arrow.z);
// 	explosion.exploder(arrow.getOwner());
// 	explosion.strength(1.5)
// 	explosion.causesFire(false);
// 	explosion.explosionMode('none')
// 	explosion.explode();
// 	arrow.kill();
// }
/** @param {Internal.ProjectileHitEntityEventJS} event */
global.explodingBowEntityHit = function (event) {
	const entity = event.getEntity();
	const arrow = event.getArrow();
	let explosion = event.getLevel().createExplosion(entity.x, entity.y, entity.z);
	explosion.exploder(arrow.getOwner());
	explosion.strength(3)
	explosion.causesFire(false);
	explosion.explosionMode('none')
	explosion.explode();
	arrow.kill()
}

ItemEvents.modification(event => {
	const $CrossbowItem = Java.loadClass("net.minecraft.world.item.CrossbowItem")

	event.modify('mcdw:crossbow_exploding_crossbow', item => {
		if (item instanceof $CrossbowItem) {
			item.crossbow(crossbow => {
				crossbow.onArrowHit(a => {
					// a.hitBlock(global.explodingBowBlockHit);
					a.hitEntity(global.explodingBowEntityHit);
				})
			})
		}
	})
})
