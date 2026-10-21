/** @param {Internal.ProjectileHitBlockEventJS} event */
global.explodingBowBlockHit = function (event) {
	// const arrow = event.getArrow();
	// const level = arrow.getLevel();
	// if (!level.isClientSide()) {
	// 	explosion(level, arrow.x, arrow.y, arrow.z, arrow, true)
	// }
}

/** @param {Internal.ProjectileHitEntityEventJS} event */
global.explodingBowEntityHit = function (event) {
	// const entity = event.getEntity();
	// const level = entity.getLevel();
	// if (!level.isClientSide()) {
	// 	explosion(level, entity.x, entity.y + (entity.getBbHeight() / 2), entity.z, event.getArrow(), false)
	// }
}

/** @param {Internal.ProjectileHitEntityEventJS} event */
global.callOfTheVoidEntityHit = function (event) {
	// const entity = event.getEntity();
	// if (entity instanceof $LivingEntity) {
	// 	entity.addEffect(global.newMobEffectInstance('kubejs:shadow_apparitions', global.duration('0:10'), 0))
	// }
}

ItemEvents.modification(event => {

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
