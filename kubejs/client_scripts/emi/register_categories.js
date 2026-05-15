const $Entity = Java.loadClass('net.minecraft.world.entity.Entity');
const $Level = Java.loadClass('net.minecraft.world.level.Level');
const $setLevelMethod = $Entity.__javaObject__.getDeclaredMethod('m_284535_', $Level);
$setLevelMethod.setAccessible(true);

JEIAddedEvents.registerCategories(event => {
	const guiHelper = event.JEI_HELPERS.guiHelper;
	// Register a new CustomCategory with the id 'kubejsadditions:ender_radiator'.
	event.custom('kubejsadditions:professions', (category) => {
		console.log('Registering category kubejsadditions:professions...')
		category.width = 130;
		category.height = 90;

		global.villagerProfessionType = category.title('Villager Professions')
			// Set the background of the category to a blank 100x50 drawable canvas.
			.background(guiHelper.createBlankDrawable(150, 100))
			// Set the icon of the category to a cactus item.
			.icon(guiHelper.createDrawableItemStack(Item.of('minecraft:villager_spawn_egg')))
			// Set the callback function that will verify if a recipe is a valid recipe for this category.
			.isRecipeHandled((recipe) => {
				return global.EMITabs.professions.verifyRecipe(category.jeiHelpers, recipe)
			})
			// Set the callback function that will allow JEI to index this recipe and determine
			// what the inputs and outputs of each recipe are.
			.handleLookup((builder, recipe, focuses) => {
				global.EMITabs.professions.handleLookup(category.jeiHelpers, builder, recipe, focuses)
			})
			// Set the callback function for renderering additional detials to the screen.
			.setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
				global.EMITabs.professions.renderer(category.jeiHelpers, recipe, recipeSlotsView, guiGraphics, mouseX, mouseY)
			})
			.recipeType;
	});
});

JEIAddedEvents.registerRecipeCatalysts(event => {
	event.data['addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])']('minecraft:villager_spawn_egg', global.villagerProfessionType);
});

global.EMITabs = {
	professions: {
		verifyRecipe: (jeiHelpers, recipe) => {
			return recipe.data != undefined
				&& recipe.data.input != undefined
				&& recipe.data.entity != undefined
				&& recipe.data.description != undefined
		},
		/**
		 * 
		 * @param {Internal.IJeiHelpers_} jeiHelpers 
		 * @param {Internal.IRecipeLayoutBuilder_} builder 
		 * @param {Internal.CustomJSRecipe_} recipe 
		 * @param {Internal.IFocusGroup_} focuses 
		 */
		handleLookup: (jeiHelpers, builder, recipe, focuses) => {
			builder.addSlot('INPUT', 80, 40)
				.addItemStack(Item.of(recipe.data.input))
				.setSlotName('input');
		},
		/**
		 * 
		 * @param {Internal.IJeiHelpers_} jeiHelpers 
		 * @param {Internal.CustomJSRecipe_} recipe 
		 * @param {Internal.IRecipeSlotsView_} recipeSlotsView 
		 * @param {Internal.GuiGraphics_} guiGraphics 
		 * @param {double} mouseX 
		 * @param {double} mouseY 
		 */
		renderer: (jeiHelpers, recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
			let text = Text.translatable(recipe.data.description);
			guiGraphics.drawWordWrap(Client.font, text, (130 - getFont().width(text.getString())) / 2, 5, 150, 0);

			let poseStack = guiGraphics.pose();
			poseStack.pushPose();
			let entity = recipe.data.entity(Client.level);

			poseStack.translate(20, 85, 150);
			let scale = 35;
			poseStack.scale(scale, scale, scale)
			poseStack.mulPose(new Quaternionf().rotationZ(KMath.PI));
			poseStack.mulPose(new Quaternionf().rotationY(KMath.PI / -6)); // Experiment with these values, find a value you like

			let entityRenderDispatcher = Client.entityRenderDispatcher;
			entityRenderDispatcher.setRenderShadow(false);
			entityRenderDispatcher.render(entity, 0, 0, 0, 0, 1, poseStack, guiGraphics.bufferSource(), 0xF000F0);
			entityRenderDispatcher.setRenderShadow(true);

			guiGraphics.bufferSource().endBatch();
			poseStack.popPose();
		},

	}
}

const $BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');

JEIAddedEvents.registerRecipes((event) => {
	VillagerUtils.getProfessions().forEach(profession => {
		let descriptionID = profession.name();
		if (descriptionID === 'nitwit') return;
		else if (descriptionID.includes(':')) {
			descriptionID = descriptionID.split(':')[1];
		}

		/** @type {Internal.Registry_<Internal.PoiType_>} */
		let poiRegistry = $BuiltInRegistries.POINT_OF_INTEREST_TYPE;
		let itemId = 'minecraft:dirt';
		poiRegistry.forEach( /** @param {Internal.PoiType_} poiType */ poiType => {
			/** @type {Internal.Holder_<Internal.PoiType_>} */
			const holder = poiRegistry.wrapAsHolder(poiType);

			if (profession.heldJobSite().test(holder)) {
				/** @type {Set<Internal.BlockState_>} */
				let set = poiType.matchingStates();
				let i = 0;
				set.forEach(blockState => {
					if (i > 0) return;
					itemId = blockState.getBlock().asItem().getId();
					i++;
				});
			}
		});
		if (global.isItemDisabled(itemId)) return;

		/** @type {Internal.Villager_} */
		let entity = Client.level.createEntity('minecraft:villager');
		entity.noCulling = true;
		entity.setVillagerData(entity.getVillagerData().setProfession(profession));

		event.custom('kubejsadditions:professions')
			.add({
				entity: (level) => {
					if (entity.level != level) {
						$setLevelMethod.invoke(entity, level);
					}
					return entity;
				},
				input: itemId,
				description: `entity.minecraft.villager.${descriptionID}`,
			});
	});

});
