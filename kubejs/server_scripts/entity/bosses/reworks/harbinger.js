// Prevent Prowlers from healing because it's actually so damn annoying
const $LivingHealEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingHealEvent");
NativeEvents.onEvent($LivingHealEvent, /** @param {Internal.LivingHealEvent_} event */ event => {
	if (event.getEntity().type == 'cataclysm:the_prowler') event.setCanceled(true);
});
