//priority: 1000
/**
 * Constants for classes I know are going to be (or might be at some point) shared between files
 * It's easier to keep track of them while they are in one place
 */
const $TagKey = Java.loadClass('net.minecraft.tags.TagKey')
const $Registries = Java.loadClass("net.minecraft.core.registries.Registries");
const $LivingHealEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingHealEvent");
const $MobEffectEventApplicable = Java.loadClass('net.minecraftforge.event.entity.living.MobEffectEvent$Applicable');
const $LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity')
const $Attributes = Java.loadClass("net.minecraft.world.entity.ai.attributes.Attributes")
const $LivingHurtEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingHurtEvent")
const $AbstractArrow = Java.loadClass('net.minecraft.world.entity.projectile.AbstractArrow');
const $ALObjects = Java.loadClass('dev.shadowsoffire.attributeslib.api.ALObjects');
const $Player = Java.loadClass('net.minecraft.world.entity.player.Player');
const $TieredItem = Java.loadClass('net.minecraft.world.item.TieredItem');
const $ArmorItem = Java.loadClass('net.minecraft.world.item.ArmorItem');
// const $SwordItem = Java.loadClass('net.minecraft.world.item.SwordItem')
const $AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier');
const $Integer = Java.loadClass('java.lang.Integer');
const $Mob = Java.loadClass('net.minecraft.world.entity.Mob');
const $MobType = Java.loadClass("net.minecraft.world.entity.MobType")
const $Registry = Java.loadClass("net.minecraft.core.Registry");
const $PlayerChangedDimensionEvent = Java.loadClass("net.minecraftforge.event.entity.player.PlayerEvent$PlayerChangedDimensionEvent")
// const $PlayerChangeGameModeEvent = Java.loadClass('net.minecraftforge.event.entity.player.PlayerEvent$PlayerChangeGameModeEvent');
const $EntityPickupItemEvent = Java.loadClass('net.minecraftforge.event.entity.player.EntityItemPickupEvent');
const $EntityInteractEvent = Java.loadClass('net.minecraftforge.event.entity.player.PlayerInteractEvent$EntityInteract');
const $Villager = Java.loadClass('net.minecraft.world.entity.npc.Villager');
const $AgeableMob = Java.loadClass('net.minecraft.world.entity.AgeableMob');

const $PotionBrewEvent$Pre = Java.loadClass('net.minecraftforge.event.brewing.PotionBrewEvent$Pre');
const $PotionBrewEvent$Post= Java.loadClass('net.minecraftforge.event.brewing.PotionBrewEvent$Post');
