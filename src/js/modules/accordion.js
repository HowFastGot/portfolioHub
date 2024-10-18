import {smoothScroll} from './smoothScroll.js';

function isAcordionTitleElement(element) {
	return element.classList.contains('education-text__tech-title');
}

function addItemTitleActiveClass(titleElement) {
	titleElement.classList.add('activeTrigger');
}

function removeItemTitleClasse() {
	const activeTitle = document.querySelector('.activeTrigger');

	activeTitle && activeTitle.classList.remove('activeTrigger');
}

function openAcordionItem(item) {
	item &&
		item.classList.add('open-item', 'animate__animated', 'animate__slideInUp');
}

function closeOpenedAccorionItems() {
	const openedItems = document.querySelectorAll('.open-item');

	openedItems &&
		openedItems.forEach((item) => {
			item.classList.remove('open-item');
		});
}

function findAcordionElement(titleElement) {
	const accordionItemElement = titleElement.nextElementSibling;

	if (accordionItemElement.tagName.toLowerCase() !== 'ul') {
		console.error(
			new Error(
				"The acordion item wasn't found! Check the function - `FindAcordionElement`"
			)
		);
	} else {
		return accordionItemElement;
	}
}

function handleClickOnAccordionELement(e) {
	const target = e.target;

	if (!isAcordionTitleElement(target)) return;

	const acordionElement = findAcordionElement(target);

	closeOpenedAccorionItems();

	if (target.classList.contains('activeTrigger')) {
		removeItemTitleClasse();
		return;
	}

	removeItemTitleClasse();

	addItemTitleActiveClass(target);

	openAcordionItem(acordionElement);

	smoothScroll(null, acordionElement);
}

export function accordion(parentElementSelector) {
	const accordionParentElement = document.querySelector(parentElementSelector);

	if (!accordionParentElement) return;

	accordionParentElement.addEventListener(
		'click',
		handleClickOnAccordionELement
	);
}
