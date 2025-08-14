const $Block = Java.loadClass('net.minecraft.world.level.block.Block');
const $Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks');
const $Properties = Java.loadClass('net.minecraft.world.level.block.state.BlockBehaviour$Properties')
const $MythicBlocks = Java.loadClass('nourl.mythicmetals.blocks.MythicBlocks')
const $ForgeDefinition = Java.loadClass('wraith.alloyforgery.forges.ForgeDefinition')
const $ForgeControllerBlock = Java.loadClass('wraith.alloyforgery.block.ForgeControllerBlock')
const $ImmutableList = Java.loadClass('com.google.common.collect.ImmutableList')

let adamantiteForgeCasing,
	adamantiteForge,
	stoneBrickForge,
	enderForge,
	enderForgeCasing,
	deepslateBrickForge,
	hellforge

const BASE_MAX_SMELT_TIME = $ForgeDefinition.BASE_MAX_SMELT_TIME;

StartupEvents.registry('block', event => {
	adamantiteForgeCasing = event.createCustom('adamantite_forge_casing', () => new $Block($Properties.copy($MythicBlocks.ADAMANTITE.getStorageBlock())))
		.displayName('Adamantite Forge Casing')
		.tag('mineable/pickaxe')
		.tag('needs_diamond_tool');

	enderForgeCasing = event.createCustom('ender_forge_casing', () => new $Block($Properties.copy($Blocks.PURPUR_BLOCK)))
		.displayName('Ender Forge Casing')
		.tag('mineable/pickaxe')
		//.tag('forge:needs_netherite_tool')
		.tag('needs_diamond_tool');;

	function additionalMaterials(blocks) {
		let additionalMaterials = [];
		if (blocks) blocks.forEach(block => {
			additionalMaterials.push(Block.getBlock(block))
		})
		return $ImmutableList.copyOf(additionalMaterials)
	}

	adamantiteForge = event.createCustom('adamantite_forge', () => new $ForgeControllerBlock(new $ForgeDefinition(2, 1.5, 96000, BASE_MAX_SMELT_TIME, adamantiteForgeCasing.get(), new $ImmutableList.of())))
		.displayName('Adamantite Forge')
		.tag('mineable/pickaxe')
		.tag('needs_diamond_tool');

	hellforge = event.createCustom('hellforge', () => new $ForgeControllerBlock(new $ForgeDefinition(1, 1.75, 64000, BASE_MAX_SMELT_TIME, $Blocks.NETHER_BRICKS, additionalMaterials(['minecraft:chiseled_nether_bricks', 'minecraft:red_nether_bricks']))))
		.displayName('Hellforge')
		.tag('mineable/pickaxe');

	stoneBrickForge = event.createCustom('stone_brick_forge', () => new $ForgeControllerBlock(new $ForgeDefinition(1, 1.0, 32000, BASE_MAX_SMELT_TIME, Block.getBlock('minecraft:stone_bricks'), additionalMaterials(['minecraft:chiseled_stone_bricks', 'minecraft:cracked_stone_bricks']))))
		.displayName('Stone Brick Forge')
		.tag('mineable/pickaxe');

	deepslateBrickForge = event.createCustom('deepslate_brick_forge', () => new $ForgeControllerBlock(new $ForgeDefinition(1, 1.25, 48000, BASE_MAX_SMELT_TIME, $Blocks.DEEPSLATE_BRICKS, additionalMaterials(['minecraft:chiseled_deepslate_bricks']))))
		.displayName('Deepslate Brick Forge')
		.tag('needs_iron_tool')
		.tag('mineable/pickaxe');

	enderForge = event.createCustom('ender_forge', () => new $ForgeControllerBlock(new $ForgeDefinition(3, 2.5, 128000, BASE_MAX_SMELT_TIME, enderForgeCasing.get(), additionalMaterials())))
		.displayName('Ender Forge')
		.tag('mineable/pickaxe')
		//.tag('forge:needs_netherite_tool')
		.tag('needs_diamond_tool');
})

const $BlockItem = Java.loadClass('net.minecraft.world.item.BlockItem')
const $ForgeControllerItem = Java.loadClass('wraith.alloyforgery.ForgeControllerItem')
const $IProperties = Java.loadClass('net.minecraft.world.item.Item$Properties')

StartupEvents.registry('item', event => {
	event.createCustom('adamantite_forge_casing', () => new $BlockItem(adamantiteForgeCasing.get(), new $IProperties()))
	event.createCustom('ender_forge_casing', () => new $BlockItem(enderForgeCasing.get(), new $IProperties()))

	event.createCustom('adamantite_forge', () => new $ForgeControllerItem(adamantiteForge.get(), new $IProperties()))
	event.createCustom('ender_forge', () => new $ForgeControllerItem(enderForge.get(), new $IProperties()))
	event.createCustom('stone_brick_forge', () => new $ForgeControllerItem(stoneBrickForge.get(), new $IProperties()))
	event.createCustom('deepslate_brick_forge', () => new $ForgeControllerItem(deepslateBrickForge.get(), new $IProperties()))
	event.createCustom('hellforge', () => new $ForgeControllerItem(hellforge.get(), new $IProperties()))
})
