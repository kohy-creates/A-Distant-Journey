const $LivingHurtEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingHurtEvent")
NativeEvents.onEvent("highest", false, $LivingHurtEvent, /** @param {Internal.LivingHurtEvent_} event */ event => {
	const source = event.getSource();
	const entity = source.getImmediate();
	if (!entity) return;
	switch (entity.type) {
		case 'rediscovered:thunder_cloud': {
			event.setAmount(180);
			break;
		}
		case 'rediscovered:pylon_burst': {
			event.setAmount(80);
			break;
		}
		case 'rediscovered:bolt_ball': {
			event.setAmount(300);
			break;
		}
	}
});
