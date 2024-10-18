export function findDOM_node(
	selector,
	multiElems = null,
	parentElement = null
) {
	if (typeof selector !== 'string') return;

	if (parentElement) {
		return parentElement.querySelector(selector);
	}

	const foundedNode = multiElems
		? document.querySelectorAll(selector)
		: document.querySelector(selector);

	return foundedNode;
}
