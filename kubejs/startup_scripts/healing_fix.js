// Some mod increases healing amounts by 50% for seemingly no reason.
// I couldn't be bothered to fix this so I'll just simply reduce them by brute force.
// It will probably turn out to be my own mod at some point lmao.
const $LivingHealEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingHealEvent")

NativeEvents.onEvent('highest', false, $LivingHealEvent, event => {
	event.setAmount(event.getAmount() * 0.667);
})
