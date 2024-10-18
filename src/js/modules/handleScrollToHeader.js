function handleScrollPositionDefenision(buttonElement) {
	window.addEventListener('scroll', (e) => {
		e.preventDefault();

		const scrolledHeight = scrollY;

		if (scrolledHeight < 487) {
			buttonElement.style.cssText = `
      opacity: 0;
      pointer-events: none;
      `;
		} else {
			buttonElement.style.cssText = `
      opacity: 1;
      pointer-events: all;
      `;
		}
	});
}

export function handleScrollToHeader(buttonSelector) {
	const header = document.querySelector('header');
	const scrollButton = document.getElementById(buttonSelector);

	handleScrollPositionDefenision(scrollButton);

	scrollButton.addEventListener('click', (e) => {
		e.preventDefault();

		header.scrollIntoView({
			behavior: 'smooth',
		});
	});
}
