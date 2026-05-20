const $LivingHealEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingHealEvent");
const $MobEffectEventApplicable = Java.loadClass('net.minecraftforge.event.entity.living.MobEffectEvent$Applicable');

// Everything healing related
NativeEvents.onEvent($LivingHealEvent, /** @param {Internal.LivingHealEvent_} event */ event => {
	const entity = event.getEntity();

	// Some mod increases healing amounts by 50% for seemingly no reason.
	// I couldn't be bothered to fix this so I'll just simply reduce them by brute force.
	// It will probably turn out to be my own mod at some point lmao.
	// Strangely enough in this script, getAmount() returns the correct amount that isn't boosted.
	const amount = event.getAmount()
	event.setAmount(amount * 0.667);
	// Note to self: NEVER ROUND THIS VALUE or the health regen attribute gets fucked up

	switch (entity.type) {
		// Handle potion sickness for players
		case 'minecraft:player': {
			let healReceivedAttr = entity.getAttributeValue($ALObjects.Attributes.HEALING_RECEIVED.get());
			let baseHealPotAmount = (50.0) * healReceivedAttr;
			if (amount % baseHealPotAmount == 0) {
				if (entity.hasEffect('kubejs:potion_sickness')) {
					event.setCanceled(true);
					return;
				}
				entity.addEffect(new $MobEffectInstance('kubejs:potion_sickness', 60 * 20, 0, false, false, true));
			}
			break;
		}
		// Prevent Prowlers from healing because it's actually so damn annoying
		case 'cataclysm:the_prowler': {
			event.setCanceled(true);
			break;
		}
		default: {
			// Cancel out some natural regen for mobs
			// This affects e.g. most mutant monsters, Alex's Mobs Whales, some Cataclysm bosses, etc.
			if (amount == 2) {
				event.setCanceled(true);
			}
			break;
		}
	}
});

// Potion Sickness for players
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
