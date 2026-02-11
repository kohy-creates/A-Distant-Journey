const $LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity');

function explosion(level, x, y, z, arrow, shouldRemove) {
	level.spawnParticles(
		'amendments:fireball_explosion',
		true,
		x, y, z,
		0, 0, 0,
		1, 0
	)
	level.playSound(null, new Vec3d(x, y, z), 'entity.generic.explode', 'players');
	global.getEntitiesInRadius(level, x, y, z, 1.75).forEach(e => {
		e.attack(global.getDamageSource(level, 'minecraft:player_explosion', null, arrow.getOwner()), 8)
	});
	if (shouldRemove) {
		arrow.kill();
	}
}

/** @param {Internal.ProjectileHitBlockEventJS} event */
global.explodingBowBlockHit = function (event) {
	const arrow = event.getArrow();
	const level = arrow.getLevel();
	if (!level.isClientSide()) {
		explosion(level, arrow.x, arrow.y, arrow.z, arrow, true)
	}
}

/** @param {Internal.ProjectileHitEntityEventJS} event */
global.explodingBowEntityHit = function (event) {
	const entity = event.getEntity();
	const level = entity.getLevel();
	if (!level.isClientSide()) {
		explosion(level, entity.x, entity.y + (entity.getBbHeight() / 2), entity.z, event.getArrow(), false)
	}
}

/** @param {Internal.ProjectileHitEntityEventJS} event */
global.callOfTheVoidEntityHit = function (event) {
	const entity = event.getEntity();
	if (entity instanceof $LivingEntity) {
		entity.addEffect(new $MobEffectInstance('kubejs:shadow_apparitions', 20 * 10, 0))
	}
}

ItemEvents.modification(event => {
	const $CrossbowItem = Java.loadClass("net.minecraft.world.item.CrossbowItem")
	const $BowItem = Java.loadClass("net.minecraft.world.item.BowItem")

	event.modify('mcdw:crossbow_exploding_crossbow', item => {
		if (item instanceof $CrossbowItem) {
			item.crossbow(crossbow => {
				crossbow.onArrowHit(a => {
					a.hitBlock(event => global.explodingBowBlockHit(event));
					a.hitEntity(event => global.explodingBowEntityHit(event));
				})
			})
		}
	})

	event.modify('mcdw:bow_call_of_the_void', item => {
		if (item instanceof $BowItem) {
			item.bow(bow => {
				bow.onArrowHit(a => {
					a.hitEntity(event => global.callOfTheVoidEntityHit(event));
				})
			})
		}
	})
})
