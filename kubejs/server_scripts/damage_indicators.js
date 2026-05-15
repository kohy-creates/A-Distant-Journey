const $TagKey = Java.loadClass('net.minecraft.tags.TagKey')
const $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");
const $Registries = Java.loadClass("net.minecraft.core.registries.Registries");

function createTagKey(loc) {
	return $TagKey.create($Registries.DAMAGE_TYPE, $ResourceLocation.parse(loc));
}

const DamageIndicatorTags = {
	IS_FIRE: createTagKey('is_fire'),
	IS_MAGIC: createTagKey('forge:is_magic'),
	IS_WITHER: createTagKey('dummmmmmy:is_wither'),
	IS_EXPLOSION: createTagKey('is_explosion'),
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
