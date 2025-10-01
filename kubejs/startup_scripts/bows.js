const $Player = Java.loadClass('net.minecraft.world.entity.player.Player');
const $AbstractArrow = Java.loadClass('net.minecraft.world.entity.projectile.AbstractArrow');

const $EventPriority = Java.loadClass('net.minecraftforge.eventbus.api.EventPriority');
const $MinecraftForge = Java.loadClass("net.minecraftforge.common.MinecraftForge");
const $LivingHurtEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingHurtEvent")

// From https://discord.com/channels/303440391124942858/1155238168732368926/1155238168732368926

StartupEvents.init(event => {

	const rangedDamageSources = [
		'DamageSource (arrow)',
		'DamageSource (cataclysm.maledictio_sagitta)',
		'DamageSource (trident)',
		'DamageSource (cataclysm.storm_bringer)'
	]

	$MinecraftForge.EVENT_BUS['addListener(net.minecraftforge.eventbus.api.EventPriority,boolean,java.lang.Class,java.util.function.Consumer)'](
		$EventPriority.HIGHEST,
		false,
		$LivingHurtEvent,
		/**
		 * @param {Internal.LivingHurtEvent_} event
		 */
		event => {
			const source = event.getSource()
			if (rangedDamageSources.includes(source.toString())) {
				const shooter = source.getActual();
				if (!shooter) return;
				let damage;
				const arrowEntity = event.source.getImmediate();
				if (shooter instanceof $Player && arrowEntity instanceof $AbstractArrow) {

					// Certain arrows ignore velocity multiplier
					const velocity = (arrowEntity.type == 'alexscaves:seeking_arrow' || arrowEntity.type == 'tide:deep_aqua_arrow') ? 1 : (Math.min(arrowEntity.getDeltaMovement().length(), 3) / 3);

					const pData = arrowEntity.persistentData;
					damage = (pData.arrowDamage + pData.bowDamage) * velocity;

				}
				else {
					const velocity = Math.min(arrowEntity.getDeltaMovement().length(), 0.4) / 0.4;

					damage = (global.monsterRangedDamageBase[shooter.type] || 15) * (velocity);
					const chapter = (shooter.getServer().persistentData.chapters.current_stage).toString().replace('chapter_', '')
					damage *= global.monsterRangedDamageMul[chapter];
				}
				damage = Math.ceil(damage)
				event.setAmount(damage);
			}
		}
	);
})
