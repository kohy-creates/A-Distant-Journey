global.grapplingHooks = {}

StartupEvents.registry('item', registry => {
	/** @type {any} */
	const $HookRegistry = Java.loadClass('com.oe.rehooked.data.HookRegistry');
	/** @type {any} */
	const $HookData = Java.loadClass('com.oe.rehooked.data.HookData');
	/** @type {any} */
	const $HookItem = Java.loadClass('com.oe.rehooked.item.hook.HookItem');

	const DEFAULT_PARTICLE_DATA = {
		supplier: () => null,
		min: 0,
		max: 0,
		radius: 0.0,
		ticks: 0
	};

	const defaultPullSpeed = 9.5;

	/**
	 * 
	 * @param {String} type 
	 * @param {String} name 
	 * @param {integer} count 
	 * @param {double} range 
	 * @param {double} speed 
	 * @param {double} pullSpeed 
	 * @param {Boolean} isCreative 
	 */
	function createGrapplingHook(type, name, count, range, speed, pullSpeed, isCreative, chain) {
		registry.createCustom(`${type}_hook`, () => {
			return new $HookItem(type)
		})
			.tag('curios:hook')
			.displayName(name)
		$HookRegistry.registerHook(type,
			new $HookData(
				type,
				count | 0,
				range * 1.0,
				speed * 1.0,
				((!pullSpeed) ? defaultPullSpeed : pullSpeed) * 1.0,
				!!isCreative,
				new $ResourceLocation('kubejs', 'textures/entity/hook/' + type + '.png'),
				DEFAULT_PARTICLE_DATA.supplier,
				DEFAULT_PARTICLE_DATA.min,
				DEFAULT_PARTICLE_DATA.max,
				DEFAULT_PARTICLE_DATA.radius,
				DEFAULT_PARTICLE_DATA.ticks
			)
		);

		global.grapplingHooks[`${type}_hook`] = {
			count: count,
			range: range,
			speed: speed,
			pullSpeed: pullSpeed,
			isCreative: isCreative,
			chain: !!chain
		}
	}

	// Chapter 0
	createGrapplingHook('silk', 'Silk Hook', 8, 10, 9, null, false, true)
	createGrapplingHook('grappling', 'Grappling Hook', 1, 13, 12)
	createGrapplingHook('amethyst', 'Amethyst Hook', 1, 11.5, 10)
	createGrapplingHook('ivy', 'Ivy Whip', 3, 18, 13, null, false, true)
	createGrapplingHook('slime', 'Slime Hook', 3, 13, 13, null, false, true)
	// Chapter 1
	createGrapplingHook('steeleaf', 'Steeleaf Hook', 3, 20, 17)
	createGrapplingHook('orichalcum', 'Orichalcum Hook', 2, 17, 14, defaultPullSpeed * 1.3, null, false, true)
	createGrapplingHook('pixie', 'Pixie Hook', 3, 10, 11.5, null, true, null, false, true)
	createGrapplingHook('tendon', 'Tendon Hook', 2, 17, 14, null, false, true)
	// Chapter 2
	createGrapplingHook('swet', 'Swet Hook', 4, 15, 13.5, null, false, true)
	createGrapplingHook('valkyrum', 'Valkyrum Hook', 1, 27, 9)
	createGrapplingHook('gravitite', 'Gravitite Hook', 4, 14, 13.5, null, true, null, false, true)
	// Chapter 3
	createGrapplingHook('adamantite', 'Adamantite Hook', 2, 18.5, 15)
	// Chapter 4
	createGrapplingHook('dissonance', 'Hook of Dissonance', 1, 21, 14, 300, null, false, true)
	// Chapter 5
	createGrapplingHook('tainted', 'Tainted Hook', 4, 23, 18, defaultPullSpeed * 1.6, null, false, true)
})

StartupEvents.registry('block', registry => {
	/** @type {any} */
	const $ChainBlock = Java.loadClass('net.minecraft.world.level.block.ChainBlock')
	/** @type {any} */
	const $BlockProperties = Java.loadClass('net.minecraft.world.level.block.state.BlockBehaviour$Properties')

	const chainProperties = $BlockProperties.of()
		.forceSolidOn()
		.requiresCorrectToolForDrops()
		.strength(5.0, 6.0)
		.noOcclusion();

	Object.entries(global.grapplingHooks).forEach(([id, data]) => {

		if (!data.chain) return;

		registry.createCustom(`${id}_chain`, () => new $ChainBlock(chainProperties))
	})
})

StartupEvents.postInit(event => {
	/** @type {any} */
	const $ChainRegistry = Java.loadClass('com.oe.rehooked.data.ChainRegistry');

	Object.entries(global.grapplingHooks).forEach(([id, data]) => {

		if (!data.chain) return;

		$ChainRegistry.registerChain(id.replace('_hook', ''), () => Block.getBlock(`${id}_chain`))
	})
})