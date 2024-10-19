import { isMultiElements } from './isMultiElements.js';

function retrivePropsObjectNeeded(scrollEventObj) {
	const { isIntersecting, target: interSectionTargetElement } = scrollEventObj;

	return {
		isIntersecting,
		interSectionTargetElement,
	};
}

function getKindOfAnimation(targetElementType) {
	const targetTag = targetElementType.tagName.toLowerCase();

	switch (targetTag) {
		case 'h5':
			return 'animate__slideInRight';

		case 'div':
			return 'animate__slideInLeft';
		default:
			console.error('Check interSectionObserver file. No animations were applied!');
	}
}

function changeEducationImg(interSectionTargetElement) {
	interSectionTargetElement
		.closest('.education-block__row')
		.querySelector('source')
		.setAttribute('srcset', interSectionTargetElement.dataset.education_img_url);
}

function animateTargetElement(interSectionTargetElement) {
	interSectionTargetElement.classList.add('animate__animated', getKindOfAnimation(interSectionTargetElement));
}

function handleEducationItemsScroll(entries) {
	const { isIntersecting, interSectionTargetElement } = retrivePropsObjectNeeded(entries[0]);

	if (!isIntersecting) return;

	changeEducationImg(interSectionTargetElement);
}

function handleScrollIntersection(entries) {
	const { isIntersecting, interSectionTargetElement } = retrivePropsObjectNeeded(entries[0]);

	if (!isIntersecting) return;

	animateTargetElement(interSectionTargetElement);
}

function getCreatedIntersectionObserver(isMultiElemsObserve) {
	const confingInterviewSectionObject = {
		root: null,
		rootMargin: '-80px',
		threshold: 0,
	};
	const configEducationSectionObject = {
		root: null,
		rootMargin: '0px',
		threshold: 1,
	};

	const options = isMultiElemsObserve ? configEducationSectionObject : confingInterviewSectionObject;

	const intersectionHandler = isMultiElemsObserve ? handleEducationItemsScroll : handleScrollIntersection;

	const observer = new IntersectionObserver(intersectionHandler, options);

	return observer;
}

export function interSectionScrollHandler(targetElemSelector) {
	const interSectionTargetElements = document.querySelectorAll(targetElemSelector);

	if (isMultiElements(interSectionTargetElements)) {
		const observer = getCreatedIntersectionObserver(true);
		interSectionTargetElements.forEach((elem) => {
			observer.observe(elem);
		});
	} else {
		const observer = getCreatedIntersectionObserver(false);
		observer.observe(interSectionTargetElements[0]);
	}
}
