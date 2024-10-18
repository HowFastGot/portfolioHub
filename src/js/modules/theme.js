import {findDOM_node} from './findDOM_node.js';

function getDefaultTheme() {
	const isThemeDarkCondition =
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches;
	const sessionStorageThemeData = sessionStorage.getItem('theme');

	if (sessionStorageThemeData) {
		return sessionStorageThemeData;
	} else if (isThemeDarkCondition) {
		return 'dark';
	} else {
		return 'light';
	}
}
function closeSettingsPopup(e) {
	e.target.parentElement.style.display = 'none';

	const idTime = setTimeout(() => {
		e.target.parentElement.style.display = '';

		clearTimeout(idTime);
	}, 200);
}
function setThemeToSessionStorage(theme = 'dark') {
	theme && sessionStorage.setItem('theme', theme.toLowerCase());
}

const setDefaultThemeTriggerIcon = (mainBlockTrigger) => {
	const changeThemeIconTrigger = mainBlockTrigger.children[0];
	const defaultTheme = getDefaultTheme();

	if (!changeThemeIconTrigger) return;

	if (defaultTheme === 'dark') {
		changeThemeIconTrigger.classList.add('settings-popup__theme_sun');
	} else if (defaultTheme === 'light') {
		changeThemeIconTrigger.classList.add('settings-popup__theme_moon');
	} else {
		throw new Error(
			"Didn't get the default theme! Apparently, you should check line 13, file theme.js"
		);
	}
};
const changeThemeTriggerIcon = (themeIconTarget) => {
	const iconsClassesArray = [
		'settings-popup__theme_moon',
		'settings-popup__theme_sun',
	];

	iconsClassesArray.forEach((classItem) => {
		themeIconTarget.classList.toggle(classItem);
	});
};

const setUpDefaultTheme = (bodyELem) => {
	const defaultTheme = getDefaultTheme();
	bodyELem.classList.add(defaultTheme);
};
const changeDefaultTheme = (e, themeIconTrigger, body) => {
	e.preventDefault();

	if (themeIconTrigger.classList.contains('settings-popup__theme_sun')) {
		setThemeToSessionStorage('light');
		body.classList.remove('dark');
		body.classList.add('light');
	} else {
		setThemeToSessionStorage('dark');
		body.classList.remove('light');
		body.classList.add('dark');
	}
};

const comprehensiveWrapperFunction = (e, body) => {
	const target = e.target;

	if (target.classList.contains('settings-popup__theme')) {
		changeDefaultTheme(e, target, body);
		changeThemeTriggerIcon(target);
		closeSettingsPopup(e);
	} else if (target.tagName.toLowerCase() === 'button') {
		closeSettingsPopup(e);
	}
};

export function changePageTheme(changeButtonSelector) {
	const mainBlockTrigger = findDOM_node(changeButtonSelector);
	const body = findDOM_node('body');

	if (!mainBlockTrigger || !body) return;

	setUpDefaultTheme(body);
	setDefaultThemeTriggerIcon(mainBlockTrigger);

	mainBlockTrigger.addEventListener('click', (e) => {
		comprehensiveWrapperFunction(e, body);
	});
}
