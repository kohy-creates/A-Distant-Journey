ServerEvents.tags('banner_pattern', tags => {

	// Modern MC parity
	tags.remove('minecraft:no_pattern_item', ['curly_border', 'bricks']);
	tags.add('adj:pattern_item/field_masoned', ['bricks']);
	tags.add('adj:pattern_item/bordure_indented', ['curly_border']);
});
