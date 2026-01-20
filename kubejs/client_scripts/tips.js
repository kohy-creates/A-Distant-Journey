/**
 * @type {$Minecraft_}
 */
const $Minecraft = Java.loadClass('net.minecraft.client.Minecraft')

/**
 * 
 * @returns {$Font_}
 */
function getFont() {
	return $Minecraft.getInstance().font
}

const SEGMENT_WIDTH = 50;
const TEX_SIZE = 3;
const SIZE = TEX_SIZE * 1.5;
const PADDING = 7;
const PADDING_SCREEN = 2;
const LINE_WIDTH = (SEGMENT_WIDTH - 2) * SIZE - PADDING * 2;

/**
 * 
 * @param {$ItemStack_} item 
 * @param {$Component_} title 
 * @param {$Component_} description 
 */
function drawTip(item, title, description) {

	function tex(pos) {
		return `adj:textures/gui/tip/${pos}.png`
	}

	/**
	 * @param {string} text
	 * @param {number} maxWidth
	 * @returns {string[]}
	 */
	function wrapText(textToWrap) {
		const font = getFont()
		let words = textToWrap.split(' ')
		let lines = []

		let current = ''

		for (let word of words) {
			let test = current.length === 0 ? word : current + ' ' + word

			if (font.width(test) <= LINE_WIDTH) {
				current = test
			} else {
				if (current.length > 0) lines.push(current)
				current = word
			}
		}

		if (current.length > 0) lines.push(current)
		return lines
	}

	let map = {};

	// Remap cause I like it better that way
	let x0 = `($screenW / 2) - ${SEGMENT_WIDTH * SIZE} - ${PADDING_SCREEN}`,
		y0 = `0 + ${PADDING_SCREEN}`;

	if (description == undefined) return;
	let text = wrapText(description, LINE_WIDTH)

	const lineHeight = 9;
	const titleHeight = 10; // font height + spacing
	const textHeightPx = text.length * lineHeight;
	const itemHeightPx = item ? 20 + PADDING : 0;
	const totalHeightPx = titleHeight + textHeightPx + itemHeightPx + PADDING;
	const height = Math.ceil(totalHeightPx / SIZE);

	// Box
	map['top_left_corner'] = {
		type: 'rectangle',
		x: `(${x0})`,
		y: `(${y0})`,
		w: SIZE,
		h: SIZE,
		alignX: 'center',
		texture: tex(1),
		draw: 'always'
	}

	for (let i = 0; i < SEGMENT_WIDTH - 2; i++) {
		map[`upper_${i + 1}`] = {
			type: 'rectangle',
			x: `(${x0} + ${(i + 1) * SIZE})`,
			y: `(${y0})`,
			w: SIZE,
			h: SIZE,
			alignX: 'center',
			texture: tex(2),
			draw: 'always'
		}
	}

	map['top_right_corner'] = {
		type: 'rectangle',
		x: `(${x0} + ${(SEGMENT_WIDTH - 2) * SIZE} + ${SIZE})`,
		y: `(${y0})`,
		w: SIZE,
		h: SIZE,
		alignX: 'center',
		texture: tex(3),
		draw: 'always'
	}

	for (let i = 1; i < height + 1; i++) {
		map[`row_${i}_left`] = {
			type: 'rectangle',
			x: `(${x0})`,
			y: `(${y0} + ${i * SIZE})`,
			w: SIZE,
			h: SIZE,
			alignX: 'center',
			texture: tex(4),
			draw: 'always'
		}

		for (let j = 0; j < SEGMENT_WIDTH - 2; j++) {
			map[`row_${i}_center_${j + 1}`] = {
				type: 'rectangle',
				x: `(${x0} + ${(j + 1) * SIZE})`,
				y: `(${y0} + ${i * SIZE})`,
				w: SIZE,
				h: SIZE,
				alignX: 'center',
				texture: tex(5),
				draw: 'always'
			}
		}

		map[`row_${i}_right`] = {
			type: 'rectangle',
			x: `(${x0} + ${(SEGMENT_WIDTH - 2) * SIZE} + ${SIZE})`,
			y: `(${y0} + ${i * SIZE})`,
			w: SIZE,
			h: SIZE,
			alignX: 'center',
			texture: tex(6),
			draw: 'always'
		}

	}

	map['bottom_left_corner'] = {
		type: 'rectangle',
		x: `(${x0})`,
		y: `(${y0} + ${(height + 1) * SIZE})`,
		w: SIZE,
		h: SIZE,
		alignX: 'center',
		texture: tex(7),
		draw: 'always'
	}

	for (let i = 0; i < SEGMENT_WIDTH - 2; i++) {
		map[`bottom_${i + 1}`] = {
			type: 'rectangle',
			x: `(${x0} + ${(i + 1) * SIZE})`,
			y: `(${y0} + ${(height + 1) * SIZE})`,
			w: SIZE,
			h: SIZE,
			alignX: 'center',
			texture: tex(8),
			draw: 'always'
		}
	}

	map['bottom_right_corner'] = {
		type: 'rectangle',
		x: `(${x0} + ${(SEGMENT_WIDTH - 2) * SIZE} + ${SIZE})`,
		y: `(${y0} + ${(height + 1) * SIZE})`,
		w: SIZE,
		h: SIZE,
		alignX: 'center',
		texture: tex(9),
		draw: 'always'
	}

	// Icon and text



	map['title'] = {
		type: 'text',
		x: `(${x0} + 3 + ${getFont().width(title) / 2} + ${PADDING})`,
		y: `(${y0} + 4 + ${PADDING})`,
		text: title,
		centered: false,
		shadow: true,
		color: '#778BFC',
		alignX: 'center',
		scale: 1,
		draw: 'always'
	}

	text.forEach((line, i) => {
		map[`description_${i}`] = {
			type: 'text',
			x: `(${x0} + 3 + ${getFont().width(line) / 2} + ${PADDING})`,
			y: `(${y0} + 6 + ${lineHeight} + ${PADDING} + ${i * lineHeight})`,
			text: line,
			centered: false,
			shadow: true,
			color: '#FFFFFF',
			alignX: 'center',
			scale: 1,
			draw: 'always'
		}
	})

	if (item) {
		map['slot'] = {
			type: 'rectangle',
			x: `(${x0} + ${SEGMENT_WIDTH * SIZE / 2} - 9)`,
			y: `(${y0} + ${text.length * lineHeight} + 27)`,
			w: 18,
			h: 18,
			alignX: 'center',
			texture: 'adj:textures/gui/tip/slot.png',
			draw: 'always'
		}

		map['item'] = {
			type: 'item',
			x: `(${x0} + ${SEGMENT_WIDTH * SIZE / 2} - 1)`,
			y: `(${y0} + ${text.length * lineHeight} + 36)`,
			w: 16,
			h: 16,
			alignX: 'center',
			draw: 'always',
			item: item,
			overlay: false
		}
	}

	return map

}


let showTimer = 0;

PlayerEvents.tick(event => {

	const player = event.getPlayer();
	const data = player.persistentData;

	if (!data.tip) {
		data.tip = {};
	}

	// const currentInventory = player.menu();
	// console.log(currentInventory);

	const currentTip = data.tip.active

	if (currentTip) {
		if (showTimer == 0) {
			player.playNotifySound('minecraft:ui.toast.in', 'master', 1.5, 1);
			player.paint(drawTip(
				currentTip.item,
				currentTip.title,
				currentTip.description
			));
		}
		else if (showTimer >= currentTip.duration) {
			player.paint({ '*': { remove: true } });
			player.playNotifySound('minecraft:ui.toast.out', 'master', 1.5, 1);
			data.tip.remove('active');
			showTimer = 0;
		}
		showTimer++;
	}
})

function showPlayerTip(player, item, title, description, duration) {
	const pData = player.persistentData;

	if (pData.tip.active) {
		player.playNotifySound('minecraft:ui.toast.in', 'master', 1.5, 1);
		player.paint({ '*': { remove: true } });
	}

	showTimer = 0;
	pData.tip.active = {
		item: item,
		title: title,
		description: description,
		duration: (duration) ? duration : 200
	}
}

NetworkEvents.dataReceived('lce_tip', event => {
	const data = event.getData();
	showPlayerTip(
		event.getPlayer(), 
		data.item, 
		data.title, 
		data.description, 
		data.duration
	)
});

KeyBindEvents.keyRelease('adjcore.what_is_this', event => {

	const player = event.getPlayer();
	const handItem = player.getMainHandItem();
	if (handItem) {
		const id = handItem.getItem().getId();
		const tip = global.LCETips[id];
		if (!tip) return;

		showPlayerTip(
			event.getPlayer(),
			id,
			tip[0],
			(!tip[1].endsWith('.')) ? tip[1] + '.' : tip[1], // cause I often forget
			tip[2] ?? 200
		)
	}
})