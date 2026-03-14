StartupEvents.postInit(event => {

	// We only update the list on client to have access to dynamic colors
	// At the time I am writing this I don't know if they will even work,
	// but oh well <3
	if (!Platform.isClientEnvironment()) return;

	const $NativeImage = Java.loadClass('com.mojang.blaze3d.platform.NativeImage');

	global.mobs.forEach(/** @param {Internal.EntityType_<Internal.LivingEntity_>} entityType */ entityType => {
		if (entityType.getCategory().toString() === 'MONSTER') {

			// This thing gets the mean color of the mob texture
			// Or at least I hope it does
			const renderer = Client.getEntityRenderDispatcher().renderers.get(entityType);
			if (!renderer) return;

			const texLoc = renderer.getTextureLocation();

			let color;
			try {
				const image = $NativeImage.read(Client.getResourceManager().getResourceOrThrow(texLoc).open());

				let totalRed = 0;
				let totalGreen = 0;
				let totalBlue = 0;
				let pixelCount = 0;

				for (let i = 0; i < image.getWidth(); i++) {
					for (let j = 0; j < image.getHeight(); j++) {
						let rgba = image.getRgba(i, j);
						let a = (rgba >> 24) & 0xFF;
						if (a < 128) continue;

						totalRed += (rgba >> 0) & 0xFF;
						totalGreen += (rgba >> 8) & 0xFF;
						totalBlue += (rgba >> 16) & 0xFF;
						pixelCount++;
					}
				}
				image.close();

				color = ((totalRed / pixelCount) << 16) | ((totalGreen / pixelCount) << 8) | ((totalBlue / pixelCount));

			}
			catch {
				console.error('Weird shit happened with reading textures, idk');
				color = 0xFFFFFF;
			}

			const hexColor = '#' + color.toString(16).padStart(6, '0');
			const descId = entityType.getDescriptionId();
			const id = descId.replace('entity.', '').replace('.', ':');

			const sizeOverrides = {
				'minecraft:ender_dragon': 0.15
			};

			const json = {
				colors: {
					accent: hexColor,
					base: '#606060'
				},
				display: {
					scale: (sizeOverrides[id]) ? sizeOverrides[id] : 0.25
				},
				effects: {},
				entity: {
					id: id
				},
				name: {
					translate: 'trophy.trofers.composed',
					with: [
						{
							translate: entityType.getDescriptionId(),
							color: hexColor
						}
					]
				}
			};

			JsonIO.write(`kubejs/data/adj/trofers/${id.replace(':', '_')}.json`, json);
		}
	})
})
