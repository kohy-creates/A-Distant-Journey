const $RenderNameTagEvent = Java.loadClass('net.minecraftforge.client.event.RenderNameTagEvent');
const $RenderSystem = Java.loadClass('com.mojang.blaze3d.systems.RenderSystem');
const $BufferUploader = Java.loadClass('com.mojang.blaze3d.vertex.BufferUploader');
const $DefaultVertexFormat = Java.loadClass('com.mojang.blaze3d.vertex.DefaultVertexFormat');
const $Tesselator = Java.loadClass('com.mojang.blaze3d.vertex.Tesselator');
const $VertexMode = Java.loadClass('com.mojang.blaze3d.vertex.VertexFormat$Mode');
const $DisplayMode = Java.loadClass('net.minecraft.client.gui.Font$DisplayMode');
const $GameRenderer = Java.loadClass('net.minecraft.client.renderer.GameRenderer');
const $MultiBufferSource = Java.loadClass('net.minecraft.client.renderer.MultiBufferSource');

const MobHealthBars = {
	HP_BAR_RES: global.resourceLocation('adj:textures/gui/hp_bar.png'),
	blit: function (pose, texture, x, y, uOffset, vOffset, width, height, texWidth, texHeight) {
		let rl = (global.isString(texture)) ? global.resourceLocation(texture) : texture;
		let u0 = uOffset / global.getOrDefault(texWidth, 128.0);
		let u1 = (uOffset + width) / global.getOrDefault(texWidth, 128.0);
		let v0 = vOffset / global.getOrDefault(texHeight, 64.0);
		let v1 = (vOffset + height) / global.getOrDefault(texHeight, 64.0);

		$RenderSystem.setShaderTexture(0, rl);
		$RenderSystem.setShader(() => $GameRenderer.getPositionTexShader());

		let matrix4f = pose.last().pose();
		let bufferBuilder = $Tesselator.getInstance().getBuilder();

		bufferBuilder.begin($VertexMode.QUADS, $DefaultVertexFormat.POSITION_TEX);
		bufferBuilder.vertex(matrix4f, x, y, 0).uv(u0, v0).endVertex();
		bufferBuilder.vertex(matrix4f, x, y + height, 0).uv(u0, v1).endVertex();
		bufferBuilder.vertex(matrix4f, x + width, y + height, 0).uv(u1, v1).endVertex();
		bufferBuilder.vertex(matrix4f, x + width, y, 0).uv(u1, v0).endVertex();

		$BufferUploader.drawWithShader(bufferBuilder.end());
	},
	drawString: function (stack, font, text, x, y, color, shadow) {
		if (text == null) return 0;

		let bufferSource = $MultiBufferSource.immediate($Tesselator.getInstance().getBuilder());
		let width = font.drawInBatch(
			text,
			x,
			y,
			color,
			shadow,
			stack.last().pose(),
			bufferSource,
			$DisplayMode.NORMAL,
			0,
			15728880,
			false
		);
		bufferSource.endBatch();
		return width;
	},
	drawOutlinedString: function (stack, font, text, x, y, color, outlineColor) {
		if (text == null) return 0;
		stack.translate(0, 0, 0.01);
		this.drawString(stack, font, text, x - 1, y, outlineColor, false);
		this.drawString(stack, font, text, x + 1, y, outlineColor, false);
		this.drawString(stack, font, text, x, y - 1, outlineColor, false);
		this.drawString(stack, font, text, x, y + 1, outlineColor, false);
		stack.translate(0, 0, -0.01);
		return this.drawString(stack, font, text, x, y, color, false);
	},
	fillRect: function (pose, x, y, width, height, r, g, b, a) {
		if (width <= 0 || height <= 0) return;

		$RenderSystem.setShader(() => $GameRenderer.getPositionColorShader());
		let matrix4f = pose.last().pose();
		let bufferBuilder = $Tesselator.getInstance().getBuilder();

		bufferBuilder.begin($VertexMode.QUADS, $DefaultVertexFormat.POSITION_COLOR);
		bufferBuilder.vertex(matrix4f, x, y, 0).color(r, g, b, a).endVertex();
		bufferBuilder.vertex(matrix4f, x, y + height, 0).color(r, g, b, a).endVertex();
		bufferBuilder.vertex(matrix4f, x + width, y + height, 0).color(r, g, b, a).endVertex();
		bufferBuilder.vertex(matrix4f, x + width, y, 0).color(r, g, b, a).endVertex();

		$BufferUploader.drawWithShader(bufferBuilder.end());
	},
	hoveredEntity: null,

	// After a good few hours of attempts of trying to write this part
	// all by myself, I eventually gave up on trying and just resorted to claude
	// Please don't hit me for doing that... It really was hopeless
	// I swear this modpack isn't vibecoded pile of slop
	TRAIL_DELAY_MS: 500,
	TRAIL_SPEED: 6.0,
	TRAIL_STALE_MS: 3000,

	trailStates: {},
	lastPurge: 0,

	purgeStaleTrails(now) {
		if (now - this.lastPurge <= this.PURGE_INTERVAL_MS) return;
		this.lastPurge = now;

		for (let key in this.trailStates) {
			if (now - this.trailStates[key].lastSeen > this.PURGE_INTERVAL_MS) {
				delete this.trailStates[key];
			}
		}
	},

	updateTrail(entity, hp, now) {
		const key = String(entity.getStringUuid());
		let st = this.trailStates[key];
		if (!st || now - st.lastSeen > this.TRAIL_STALE_MS) {
			st = this.trailStates[key] = {
				lastHp: hp,
				whiteHp: hp,
				delayUntil: 0,
				lastSeen: now,
			};
			this.purgeStaleTrails(now);
			return st.whiteHp;
		}
		const dt = Math.min((now - st.lastSeen) / 1000, 0.1);
		st.lastSeen = now;

		if (hp < st.lastHp - 0.001) {
			st.delayUntil = now + this.TRAIL_DELAY_MS;
		}
		st.lastHp = hp;

		if (hp >= st.whiteHp) {
			st.whiteHp = hp;
		} else if (now >= st.delayUntil) {
			st.whiteHp = hp + (st.whiteHp - hp) * Math.exp(-this.TRAIL_SPEED * dt);
			if (st.whiteHp - hp < 0.05) st.whiteHp = hp;
		}

		this.purgeStaleTrails(now);
		return st.whiteHp;
	},

	EFFECT_REQUEST_INTERVAL_MS: 500,
	EFFECT_CACHE_TTL_MS: 10000,

	effectCache: {},
	lastEffectPurge: 0,

	getEntityEffectIcons: function (entity, now) {
		let entry = this.effectCache[entity.getId()];
		if (!entry) entry = this.effectCache[entity.getId()] = { icons: [], lastRequest: 0, lastSeen: now };
		entry.lastSeen = now;

		if (now - entry.lastRequest > this.EFFECT_REQUEST_INTERVAL_MS) {
			entry.lastRequest = now;
			Client.player.sendData('sync_effects_client', { entityUuid: entity.getStringUuid() });
		}

		if (now - this.lastEffectPurge > this.EFFECT_CACHE_TTL_MS) {
			this.lastEffectPurge = now;
			for (let k in this.effectCache) {
				if (now - this.effectCache[k].lastSeen > this.EFFECT_CACHE_TTL_MS) delete this.effectCache[k];
			}
		}
		return entry.icons;
	}
};

ClientEvents.tick(event => {
	const ray = event.getPlayer().rayTrace(6);
	if (ray && ray.entity) {
		MobHealthBars.hoveredEntity = ray.entity;
	} else {
		MobHealthBars.hoveredEntity = null;
	}
});

NetworkEvents.dataReceived('sync_effects_client', event => {
	const data = event.getData();
	const list = data.effects;
	const icons = [];
	for (let i = 0; i < list.size(); i++) {
		let id = global.textReplaceAll(String(list.get(i)), '"', '');
		icons.push(global.resourceLocation(id.replace(':', ':textures/mob_effect/') + '.png'));
	}
	let entry = MobHealthBars.effectCache[data.entityId];
	if (!entry) entry = MobHealthBars.effectCache[data.entityId] = { icons: [], lastRequest: 0, lastSeen: 0 };
	entry.icons = icons;
});

NativeEvents.onEvent('normal', false, $RenderNameTagEvent, (event) => {
	/** @type {Internal.LivingEntity_} */
	const entity = event.getEntity();
	if (entity == Client.player) {
		event.setResult('deny');
	}
	else if(entity.isLiving()) {
		event.setResult('deny');
		let poseStack = event.getPoseStack();
		let font = event.getEntityRenderer().getFont();
		let hp = Math.ceil(entity.getHealth());
		let maxHp = entity.getMaxHealth();

		let whiteHp = MobHealthBars.updateTrail(entity, hp, Date.now());

		let isDamaged = hp != maxHp;

		if (isDamaged || MobHealthBars.hoveredEntity == entity) {
			poseStack.pushPose();
			poseStack.translate(0, entity.getBbHeight() + 1.15, 0);
			poseStack.mulPose(Client.getEntityRenderDispatcher().cameraOrientation());
			poseStack.scale(-0.025, -0.025, 0.025);

			let entityDisplayName = entity.getDisplayName().getString();

			let f2 = -font.width(entityDisplayName) / 2;
			let hpWidth = -font.width(`${hp}/${maxHp}`) / 2;

			$RenderSystem.setShaderTexture(0, MobHealthBars.HP_BAR_RES);
			$RenderSystem.setShaderColor(1, 1, 1, 1);
			$RenderSystem.enableDepthTest();

			let widthMultiplier = 121 / maxHp;
			let currentWidth = Math.floor(hp * widthMultiplier);
			let whiteWidth = Math.min(118, Math.floor(whiteHp * widthMultiplier));
			let scaleText = 0.7;
			let translateText = 11.0;

			MobHealthBars.blit(poseStack, MobHealthBars.HP_BAR_RES, -65, 20, 0, 0, 126, 11);
			$RenderSystem.disableBlend();
			poseStack.translate(0, 0, -0.01);

			if (whiteWidth > currentWidth) {
				MobHealthBars.fillRect(poseStack, -62 + currentWidth, 23, whiteWidth - currentWidth, 5, 1, 0.75, 0.75, 1);
			}

			MobHealthBars.blit(poseStack, MobHealthBars.HP_BAR_RES, -62, 22, 3, 13, currentWidth, 7);

			poseStack.translate(0, 0, -0.01);

			// Text
			MobHealthBars.drawOutlinedString(poseStack, font, entityDisplayName, f2 - 2, 10, 0xffffff, 0x000000);
			poseStack.translate(0.0, (11.5 * scaleText), 0.0);

			poseStack.scale(scaleText, scaleText, scaleText);
			MobHealthBars.drawOutlinedString(poseStack, font, `${hp}/${maxHp}`, hpWidth, 21, 0xffffff, 0x000000);

			// Icons
			let iconOffset = -90;
			let armor = entity.getArmorValue();
			if (armor > 0) {
				$RenderSystem.enableDepthTest();
				MobHealthBars.blit(poseStack, MobHealthBars.HP_BAR_RES, iconOffset, 35, 11, 33, 11, 11);
				let str = `${armor}`;
				let w = font.width(str);
				MobHealthBars.drawOutlinedString(poseStack, font, str, iconOffset + 13, 36, 0xffffff, 0x000000);
				iconOffset += (15 + w);
			}
			let damageReduction = entity.getAttributeValue(global.attribute('damage_reduction'));
			if (damageReduction != 0) {
				$RenderSystem.enableDepthTest();
				MobHealthBars.blit(poseStack, MobHealthBars.HP_BAR_RES, iconOffset, 35, 0, 33, 11, 11);
				let str = `${Math.floor(damageReduction * 100)}%`;
				let w = font.width(str);
				MobHealthBars.drawOutlinedString(poseStack, font, str, iconOffset + 13, 36, 0xffffff, 0x000000);
				iconOffset += (15 + w);
			}

			let icons = MobHealthBars.getEntityEffectIcons(entity, Date.now());
			if (icons.length > 0) {
				let count = icons.length;
				let step = 22;
				let iconWidth = 18;
				let effectOffset = -((count - 1) * step + iconWidth) / 2;

				poseStack.translate(0, -12, 0);
				poseStack.scale(0.667, 0.667, 0.667);

				for (let icon of icons) {
					MobHealthBars.blit(poseStack, icon, effectOffset, 0, 0, 0, iconWidth, iconWidth, 18, 18);
					effectOffset += step;
				}
			}

			poseStack.popPose();
			$RenderSystem.disableDepthTest();
		}
	}
});
