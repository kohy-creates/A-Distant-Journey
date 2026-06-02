//priority: 500
/**
 * Constants for classes I know are going to be (or might be at some point) shared between files
 * It's easier to keep track of them while they are in one place
 */
const $ItemAttributeModifierEvent = Java.loadClass('net.minecraftforge.event.ItemAttributeModifierEvent');
const $ItemTooltipEvent = Java.loadClass('net.minecraftforge.event.entity.player.ItemTooltipEvent');
const $BlockItem = Java.loadClass('net.minecraft.world.item.BlockItem');
const $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');
const $LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity');
const $Equipable = Java.loadClass('net.minecraft.world.item.Equipable');
