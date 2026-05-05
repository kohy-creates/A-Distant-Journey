JEIAddedEvents.registerRecipeCatalysts(event => {

	// event.data.jeiHelpers.getAllRecipeTypes().forEach(type => console.log(type.getUid()));

	/**
	 * @param {Internal.RecipeType_} recipeType 
	 * @param {Internal.Item_[]} items 
	 */
	function addRecipeCatalyst(recipeType, items) {
		let type = event.data.jeiHelpers.getRecipeType(recipeType);
		if (type.isPresent()) {
			type = type.get();
			items.forEach(item => {
				if (Item.exists(item)) {
					event.data['addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])'](item, type);
				}
				else {
					console.log(`Unknown item: ${item}`);
				}
			});
		}
		else {
			console.log(`Unknown recipe type: ${recipeType}`);
		}
	}

	addRecipeCatalyst('minecraft:campfire', [
		'ancient_aether:ambrosium_campfire',
		'netherexp:ancient_campfire',
		'witherstor_delight:wither_stove'
	]);

	addRecipeCatalyst('botania:mana_infusion', [
		'botania:pool_minecart',
		'botanicadds:dreaming_pool'
	]);

	addRecipeCatalyst('botania:terrestrial_agglomeration', [
		'botanicadds:gaia_plate',
	]);

	addRecipeCatalyst('botania:elven_trade', [
		'windowbox:alfthorne_sapling',
	]);

	addRecipeCatalyst('sortilege:cauldron_brewing', [
		'campfire',
		'soul_campfire',
		'ancient_aether:ambrosium_campfire',
		'netherexp:ancient_campfire',
	]);

	addRecipeCatalyst('ali:fishing_loot', [
		'tide:stone_fishing_rod',
		'tide:iron_fishing_rod',
		'tide:golden_fishing_rod',
		'tide:crystal_fishing_rod',
		'tide:diamond_fishing_rod',
		'tide:netherite_fishing_rod',
		'tide:midas_fishing_rod'
	]);

	addRecipeCatalyst('ali:archaeology_loot', [
		'betterarchaeology:iron_brush',
		'betterarchaeology:diamond_brush',
		'betterarchaeology:netherite_brush',
	]);

	addRecipeCatalyst('betterarcheology:identifying', [
		'brush',
		'betterarchaeology:iron_brush',
		'betterarchaeology:diamond_brush',
		'betterarchaeology:netherite_brush',
	]);

	addRecipeCatalyst('farmersdelight:cooking', [
		'witherstorm_delight:command_cooking_pot',
		'miners_delight:copper_pot'
	]);

	addRecipeCatalyst('create:fan_washing', [
		'create_connected:fan_splashing_catalyst'
	]);

	addRecipeCatalyst('create:fan_smoking', [
		'create_connected:fan_smoking_catalyst'
	]);

	addRecipeCatalyst('create:fan_blasting', [
		'create_connected:fan_blasting_catalyst'
	]);

	addRecipeCatalyst('create:fan_haunting', [
		'create_connected:fan_haunting_catalyst'
	]);

	addRecipeCatalyst('create:sandpaper_polishing', [
		'kubejs:soul_sand_paper',
		'kubejs:gravisand_paper',
		'kubejs:tainted_sand_paper'
	]);

	addRecipeCatalyst('minecraft:fuel', [
		'furnace',
		'smoker',
		'blast_furnace'
	]);
});
