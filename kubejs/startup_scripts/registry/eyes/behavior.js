global.eyeEffects = {}

global.eyeEffects.cindersTick = (slotContext, stack) => {
	slotContext.getWearer()
		.addEffect(new $MobEffectInstance("fire_resistance", 10, 0, true, false, false))
};

global.eyeEffects.angelsTick = (slotContext, stack) => {
	const wearer = slotContext.getWearer();
	if (wearer.isPlayer() && wearer.isCrouching())
		wearer.addEffect(new $MobEffectInstance('slow_falling', 10, 0, false, false, false))
}

global.eyeEffects.desolationTick = (slotContext, stack) => { }

global.eyeEffects.ethercraftTick = (slotContext, stack) => { }

global.eyeEffects.dreamsTick = (slotContext, stack) => { }

global.eyeEffects.arcanumTick = (slotContext, stack) => { }

//global.eyeEffects.verdantBloomTick = (slotContext, stack) => { }