global.grapplingHooks = {};

const defaultPullSpeed = 9.5;

/**
 * 
 * @param {String} type 
 * @param {String} name 
 * @param {String} color
 * @param {integer} count 
 * @param {double} range 
 * @param {double} speed 
 * @param {double} pullSpeed 
 * @param {Boolean} isCreative 
 */
function createGrapplingHook(type, name, color, count, range, speed, pullSpeed, isCreative, chain) {
	global.grapplingHooks[`${type}_hook`] = {
		name: name,
		count: count,
		range: range,
		speed: speed,
		color: color,
		pullSpeed: pullSpeed,
		isCreative: isCreative,
		chain: !!chain
	};
}

// Chapter 0
createGrapplingHook('silk', 'Silk Hook', '#FFFFFF', 8, 10, 9, null, false, true);
createGrapplingHook('grappling', 'Grappling Hook', '#969696', 1, 13, 12);
createGrapplingHook('amethyst', 'Amethyst Hook', '#cf7dff', 1, 11.5, 10);
createGrapplingHook('ivy', 'Ivy Whip', '#3c993c', 3, 16, 13, null, false, true);
createGrapplingHook('slime', 'Slime Hook', '#00ff15', 3, 13, 13, null, false, true);
createGrapplingHook('candy_cane', 'Candy Cane Hook', '#ff3333', 1, 18, 18, null, false, true);

// Chapter 1
createGrapplingHook('steeleaf', 'Steeleaf Hook', '#158000', 3, 20, 17);
createGrapplingHook('orichalcum', 'Orichalcum Hook', '#18f55a', 2, 17, 14, defaultPullSpeed * 1.3, null, true);
createGrapplingHook('pixie', 'Pixie Hook', '#ff92c5', 3, 10, 11.5, null, true);
createGrapplingHook('tendon', 'Tendon Hook', '#8d2038', 2, 17, 14, null, false, true);

// Chapter 2
createGrapplingHook('swet', 'Swet Hook', '#37c6ff', 4, 15, 13.5, null, false, true);
createGrapplingHook('valkyrum', 'Valkyrum Hook', '#ffe79a', 1, 27, 9);
createGrapplingHook('gravitite', 'Gravitite Hook', '#ff5cff', 4, 14, 13.5, null, true);

// Chapter 3
createGrapplingHook('adamantite', 'Adamantite Hook', '#f0211a', 2, 18.5, 15);

// Chapter 4
createGrapplingHook('dissonance', 'Hook of Dissonance', '#a200ff', 1, 21, 14, 300, false, true);

// Chapter 5
createGrapplingHook('tainted', 'Tainted Hook', '#3d004d', 4, 23, 18, defaultPullSpeed * 1.6, false, true);

StartupEvents.registry('item', registry => {
	/** @type {Internal.HookRegistry_} */
	const $HookRegistry = Java.loadClass('com.oe.rehooked.data.HookRegistry');
	/** @type {Internal.HookData_} */
	const $HookData = Java.loadClass('com.oe.rehooked.data.HookData');
	/** @type {Internal.HookItem_} */
	const $HookItem = Java.loadClass('com.oe.rehooked.item.hook.HookItem');

	const DEFAULT_PARTICLE_DATA = {
		supplier: () => null,
		min: 0,
		max: 0,
		radius: 0.0,
		ticks: 0
	};

	Object.entries(global.grapplingHooks).forEach(([id, data]) => {
		const type = id.replace('_hook', '');
		registry.createCustom(id, () => {
			return new $HookItem(type);
		})
			.tag('curios:hook')
			.displayName(data.name);

		$HookRegistry.registerHook(type,
			new $HookData(
				type,
				data.count | 0,
				data.range * 1.0,
				data.speed * 1.0,
				((!data.pullSpeed) ? defaultPullSpeed : data.pullSpeed) * 1.0,
				!!data.isCreative,
				new $ResourceLocation('kubejs', 'textures/entity/hook/' + type + '.png'),
				DEFAULT_PARTICLE_DATA.supplier,
				DEFAULT_PARTICLE_DATA.min,
				DEFAULT_PARTICLE_DATA.max,
				DEFAULT_PARTICLE_DATA.radius,
				DEFAULT_PARTICLE_DATA.ticks
			)
		);
	});
});

StartupEvents.registry('block', registry => {
	/** @type {any} */
	const $ChainBlock = Java.loadClass('net.minecraft.world.level.block.ChainBlock');
	/** @type {any} */
	const $BlockProperties = Java.loadClass('net.minecraft.world.level.block.state.BlockBehaviour$Properties');

	const chainProperties = $BlockProperties.of()
		.forceSolidOn()
		.requiresCorrectToolForDrops()
		.strength(5.0, 6.0)
		.noOcclusion();

	Object.entries(global.grapplingHooks).forEach(([id, data]) => {
		if (!data.chain) return;

		registry.createCustom(`${id}_chain`, () => new $ChainBlock(chainProperties));
	});
});

StartupEvents.postInit(() => {
	/**
	 * @type {Internal.ChainRegistry_}
	 */
	const $ChainRegistry = Java.loadClass('com.oe.rehooked.data.ChainRegistry');
	const $BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');

	const MODEL_ROOT = 'kubejs/assets/kubejs/models';
	const BLOCKSTATE_ROOT = 'kubejs/assets/kubejs/blockstates';

	function writeIfMissing(path, data) {
		if (JsonIO.read(path) != null) return;
		JsonIO.write(path, data);
	}

	writeIfMissing(`${MODEL_ROOT}/item/grappling_hook_placeholder.json`, {
		parent: 'minecraft:item/generated',
		textures: {
			layer0: 'kubejs:item/grappling_hook_placeholder'
		}
	});

	Object.entries(global.grapplingHooks).forEach(([id, data]) => {
		if (data.chain) {
			$ChainRegistry.registerChain(
				id.replace('_hook', ''),
				() => $BuiltInRegistries.BLOCK.get(
					new $ResourceLocation(
						'kubejs',
						`${id}_chain`
					)
				)
			);
		}

		writeIfMissing(`${MODEL_ROOT}/item/${id}.json`, {
			parent: 'kubejs:item/grappling_hook_placeholder'
		});

		if (!data.chain) return;

		const chainId = `${id}_chain`;

		writeIfMissing(`${MODEL_ROOT}/block/${chainId}.json`, {
			parent: 'minecraft:block/chain',
			textures: {
				all: 'kubejs:block/hook_chain_placeholder'
			}
		});

		writeIfMissing(`${MODEL_ROOT}/item/${chainId}.json`, {
			parent: `kubejs:block/${chainId}`
		});

		writeIfMissing(
			`${BLOCKSTATE_ROOT}/${chainId}.json`, {
			variants: {
				'axis=y': { model: `kubejs:block/${chainId}` },
				'axis=x': {
					model: `kubejs:block/${chainId}`,
					x: 90,
					y: 90
				},
				'axis=z': {
					model: `kubejs:block/${chainId}`,
					x: 90
				}
			}
		});
	});
});