const $RenderNameTagEvent = Java.loadClass('net.minecraftforge.client.event.RenderNameTagEvent');

let hoveredEntity = null;

ClientEvents.tick(event => {
	const ray = event.getPlayer().rayTrace(6);
	if (ray && ray.entity) {
		hoveredEntity = ray.entity;
	} else {
		hoveredEntity = null;
	}
});

NativeEvents.onEvent('normal', false, $RenderNameTagEvent, (event) => {
	/** @type {Internal.LivingEntity_} */
	const entity = event.getEntity();
	if (entity.isLiving()) {
		event.setResult('deny');
		const poseStack = event.getPoseStack();
		const font = event.getEntityRenderer().getFont();
		const hp = entity.getHealth();
		const maxHp = entity.getMaxHealth();

		const isDamaged = hp != maxHp;

		if (isDamaged || hoveredEntity == entity) {
			
		}
	}
});
