//priority: 1001
/**
 * Constants for classes I know are going to be (or might be at some point) shared between files
 * It's easier to keep track of them while they are in one place
 */
const $TagKey = Java.loadClass('net.minecraft.tags.TagKey')
const $LivingHealEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingHealEvent");
const $LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity');
const $LivingHurtEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingHurtEvent")
const $AbstractArrow = Java.loadClass('net.minecraft.world.entity.projectile.AbstractArrow');
const $Player = Java.loadClass('net.minecraft.world.entity.player.Player');
const $TieredItem = Java.loadClass('net.minecraft.world.item.TieredItem');
const $ArmorItem = Java.loadClass('net.minecraft.world.item.ArmorItem');
// const $SwordItem = Java.loadClass('net.minecraft.world.item.SwordItem')
const $AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier');
const $PlayerChangedDimensionEvent = Java.loadClass("net.minecraftforge.event.entity.player.PlayerEvent$PlayerChangedDimensionEvent")
// const $PlayerChangeGameModeEvent = Java.loadClass('net.minecraftforge.event.entity.player.PlayerEvent$PlayerChangeGameModeEvent');
const $EntityPickupItemEvent = Java.loadClass('net.minecraftforge.event.entity.player.EntityItemPickupEvent');
const $EntityInteractEvent = Java.loadClass('net.minecraftforge.event.entity.player.PlayerInteractEvent$EntityInteract');
const $AgeableMob = Java.loadClass('net.minecraft.world.entity.AgeableMob');

const $PotionBrewEvent$Post = Java.loadClass('net.minecraftforge.event.brewing.PotionBrewEvent$Post');

const $EffectType = Java.loadClass('vazkii.botania.network.EffectType');
const $XplatAbstractions = Java.loadClass('vazkii.botania.xplat.XplatAbstractions');
const $BotaniaEffectPacket = Java.loadClass('vazkii.botania.network.clientbound.BotaniaEffectPacket');

const $GameProfile = Java.loadClass('com.mojang.authlib.GameProfile');
const $FakePlayer = Java.loadClass('net.minecraftforge.common.util.FakePlayer');

const $SeaStaffItem = Java.loadClass('com.github.alexmodguy.alexscaves.server.item.SeaStaffItem');
const $ProjectileImpactEvent = Java.loadClass('net.minecraftforge.event.entity.ProjectileImpactEvent');
