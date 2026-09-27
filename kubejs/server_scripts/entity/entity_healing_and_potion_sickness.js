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

	switch (entity.getType()) {
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
