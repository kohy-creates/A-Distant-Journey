const DamageIndicatorTags = {
	IS_FIRE: global.createTagKey('DAMAGE_TYPE', 'minecraft:is_fire'),
	IS_MAGIC: global.createTagKey('DAMAGE_TYPE', 'forge:is_magic'),
	IS_WITHER: global.createTagKey('DAMAGE_TYPE', 'dummmmmmy:is_wither'),
	IS_EXPLOSION: global.createTagKey('DAMAGE_TYPE', 'minecraft:is_explosion'),
};

ADJServerEvents.adjHurt(event => {
	const source = event.getSource();
	/** @type {Internal.LivingEntity_} */
	const entity = event.getVictim();
	if (source.is(DamageIndicatorTags.IS_FIRE)) {
		event.setStyle(5);
	}
	else if (source.is(DamageIndicatorTags.IS_MAGIC) && entity.hasEffect('poison')) {
		event.setStyle(6);
	}
	else if (source.is(DamageIndicatorTags.IS_WITHER)) {
		event.setStyle(7);
	}
	else if (source.is(DamageIndicatorTags.IS_EXPLOSION)) {
		event.setStyle(8);
	}
});
