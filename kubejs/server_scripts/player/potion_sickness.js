const $MobEffectEventApplicable = Java.loadClass('net.minecraftforge.event.entity.living.MobEffectEvent$Applicable');
const $LivingHealEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingHealEvent");

NativeEvents.onEvent('highest', false, $LivingHealEvent, /** @param {Internal.LivingHealEvent_} event */ event => {
	/** @type {Internal.Player_} */
	const entity = event.getEntity();
	if (entity instanceof $Player) {
		let healReceivedAttr = entity.getAttributeValue($ALObjects.Attributes.HEALING_RECEIVED.get());
		let baseHealPotAmount = (50.0) * healReceivedAttr;
		if (event.getAmount() % baseHealPotAmount == 0) {
			if (entity.hasEffect('kubejs:potion_sickness')) {
				event.setCanceled(true);
				return;
			}
			entity.addEffect(new $MobEffectInstance('kubejs:potion_sickness', 60 * 20, 0, false, false, true));
		}
	}
});

// Some extra compatibility perhaps
NativeEvents.onEvent('normal', false, $MobEffectEventApplicable, /** @param {Internal.MobEffectEvent$Applicable_} event*/ event => {
	/** @type {Internal.Player_} */
	const entity = event.getEntity();
	const effectId = event.getEffectInstance().getEffect().getDescriptionId()
		.replace('effect.', '')
		.replace('.', ':');
	if (effectId == 'minecraft:instant_health'
		&& entity instanceof $Player
		&& entity.hasEffect('kubejs:potion_sickness')) {
		event.setResult('deny');
	}
});
