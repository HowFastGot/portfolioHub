import {findDOM_node} from './findDOM_node.js';

export function focusFormInput() {
	const firstFormInput = findDOM_node(`#sendmessage input`);
	firstFormInput.focus();
}

export function handleFocusForm() {
	const tooltip = document.querySelector('[data-tooltip="SendMessage"] a');

	tooltip.addEventListener('click', (e) => {
		e.preventDefault();

		focusFormInput();
	});
}
