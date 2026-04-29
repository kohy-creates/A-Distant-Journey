// const $MobEffectEventApplicable = Java.loadClass('net.minecraftforge.event.entity.living.MobEffectEvent$Applicable');

// NativeEvents.onEvent('normal', false, $MobEffectEventApplicable, /** @param {Internal.MobEffectEvent$Applicable_} event*/ event => {
// 	/** @type {Internal.Player_} */
// 	const entity = event.getEntity();
// 	if (entity instanceof $Player) {
// 		if (!entity.hasEffect('kubejs:potion_sickness')) {
// 			event.setResult('default');
// 			entity.addEffect(new $MobEffectInstance('kubejs:potion_sickness'));
// 		}
// 		else {
// 			event.setResult('deny');
// 		}
// 	}
// });

// ItemEvents.rightClicked(event => {
// 	const item = event.getItem();
// 	const food = item.getFoodProperties();
// 	if (food != null) {
// 		for (let entry of food.getEffects()) {
// 			let effectId = entry.getFirst().getEffect().getDescriptionId();
// 			if (effectId === 'effect.minecraft.instant_health') {
// 				if (event.getPlayer().hasEffect('kubejs:potion_sickness')) {
// 					event.cancel();
// 					break;
// 				}
// 			}
// 		}
// 	}
// 	item.potion
// });

/**
[21:58:41] [Server thread/ERROR]:Error in 'PlayerEvents.tick': loader constraint violation: loader 'MC-BOOTSTRAP' @30b7c004 wants to load interface org.apache.logging.log4j.util.MessageSupplier. (org.apache.logging.log4j.util.MessageSupplier is in module org.apache.logging.log4j@2.19.0 of loader 'MC-BOOTSTRAP' @30b7c004, parent loader 'bootstrap')
[21:58:41] [Server thread/ERROR]:java.lang.LinkageError: loader constraint violation: loader 'MC-BOOTSTRAP' @30b7c004 wants to load interface org.apache.logging.log4j.util.MessageSupplier. (org.apache.logging.log4j.util.MessageSupplier is in module org.apache.logging.log4j@2.19.0 of loader 'MC-BOOTSTRAP' @30b7c004, parent loader 'bootstrap')
[21:58:41] [Server thread/ERROR]:at MC-BOOTSTRAP/net.minecraftforge.eventbus/net.minecraftforge.eventbus.EventBus.handleException(EventBus.java:323)
[21:58:41] [Server thread/ERROR]:at MC-BOOTSTRAP/net.minecraftforge.eventbus/net.minecraftforge.eventbus.EventBus.post(EventBus.java:315)
[21:58:41] [Server thread/ERROR]:at MC-BOOTSTRAP/net.minecraftforge.eventbus/net.minecraftforge.eventbus.EventBus.post(EventBus.java:298)
[21:58:41] [Server thread/ERROR]:at net.minecraft.world.entity.LivingEntity.m_7301_$mixinextras$wrapped$826(LivingEntity.java:945)
[21:58:41] [Server thread/ERROR]:at net.minecraft.world.entity.LivingEntity.mixinextras$bridge$m_7301_$mixinextras$wrapped$826$827(LivingEntity.java)
[21:58:41] [Server thread/ERROR]:at net.minecraft.world.entity.LivingEntity.wrapMethod$lfn000$sortilege$applyEffectImmunity(LivingEntity.java:38901)
[21:58:41] [Server thread/ERROR]:at net.minecraft.world.entity.LivingEntity.m_7301_(LivingEntity.java)
[21:58:41] [Server thread/ERROR]:at net.minecraft.world.entity.LivingEntity.m_147207_(LivingEntity.java:925)
[21:58:41] [Server thread/ERROR]:at net.minecraft.world.entity.LivingEntity.m_7292_(LivingEntity.java:921)
 */