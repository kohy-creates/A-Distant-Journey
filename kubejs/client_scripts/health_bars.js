// const $RenderNameTagEvent = Java.loadClass('net.minecraftforge.client.event.RenderNameTagEvent');
// const $RenderSystem = Java.loadClass('com.mojang.blaze3d.systems.RenderSystem');

// let hoveredEntity = null;

// ClientEvents.tick(event => {
// 	const ray = event.getPlayer().rayTrace(6);
// 	if (ray && ray.entity) {
// 		hoveredEntity = ray.entity;
// 	} else {
// 		hoveredEntity = null;
// 	}
// });

// const HP_BAR_RES = global.resourceLocation('kubejs:textures/gui/hp_bar.png');

// NativeEvents.onEvent('normal', false, $RenderNameTagEvent, (event) => {
// 	/** @type {Internal.LivingEntity_} */
// 	const entity = event.getEntity();
// 	if (entity.isLiving() && entity != Client.player) {
// 		event.setResult('deny');
// 		const poseStack = event.getPoseStack();
// 		const font = event.getEntityRenderer().getFont();
// 		const hp = entity.getHealth();
// 		const maxHp = entity.getMaxHealth();

// 		const isDamaged = hp != maxHp;

// 		if (isDamaged || hoveredEntity == entity) {
// 			poseStack.pushPose();
// 			poseStack.translate(0, entity.getBbHeight() + 0.5, 0);
// 			poseStack.mulPose(Client.getEntityRenderDispatcher().cameraOrientation());
// 			poseStack.scale(-0.025, -0.025, 0.025);
// 			let f2 = -font.width(entity.getDisplayName().getString()) / 2;
// 			let hpWidth = -font.width(`${hp}/${maxHp}`) / 2;

// 			$RenderSystem.setShaderTexture(0, HP_BAR_RES);
// 		}
// 	}
// });
