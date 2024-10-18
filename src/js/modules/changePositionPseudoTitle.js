export function changePositionPseudoWorkTitle(lang) {
	const workTitle = document.querySelector('.works__title');

	if (lang !== 'en') {
		workTitle.classList.add('slavic-language');
	} else {
		workTitle.classList.remove('slavic-language');
	}
}
