import { isMultiElements } from './isMultiElements.js';

function showError(error) {
	console.error("Animated element wasn't found! Check handleElementAnimation function!", error.message);
}

function nextAnimationHandler(parentAnimatedElement, nextAnimatedElementSelector, animation) {
	parentAnimatedElement.addEventListener('animationend', () => {
		handleElementAnimation(nextAnimatedElementSelector, animation);
	});
}

function handleElementAnimation(selector, animation, isChainAnimations = false) {
	const animatedCollection = document.querySelectorAll(selector);
	try {
		let animatedElement = null;

		if (isMultiElements(animatedCollection)) {
			animatedElement = animatedCollection;

			animatedElement.forEach((elem, index) => {
				if (index % 2 !== 0) {
					elem.classList.add('animate__animated', 'animate__fadeInDown');
				} else {
					elem.classList.add('animate__animated', animation);
				}
			});
		} else {
			animatedElement = animatedCollection[0];

			animatedElement.classList.add('animate__animated', animation);
		}

		if (!isChainAnimations) return;

		switch (selector) {
			case '.header__intro-cart':
				nextAnimationHandler(animatedElement, '.intro-cart__socials-network', 'animate__slideInDown');
				nextAnimationHandler(animatedElement, '.header__settings-icon', 'animate__rotateIn');

				break;
			case '.menu-header__list':
				nextAnimationHandler(animatedElement, '.menu-header__logo', 'animate__bounceIn');
				break;
			default:
				break;
		}
	} catch (error) {
		showError(error);
	}
}

export function animatePageElements() {
	document.body.classList.remove('_lock');
	const preloaderBlock = document.querySelector('#preloader');
	if (preloaderBlock) preloaderBlock.style.display = 'none';

	handleElementAnimation('.header__intro-cart', 'animate__backInUp', true);
	handleElementAnimation('.menu-header__list', 'animate__backInLeft', true);
	handleElementAnimation('.header__settings-wrapper', 'animate__backInRight');
	handleElementAnimation('.rewards__item', 'animate__fadeInUp');
}
