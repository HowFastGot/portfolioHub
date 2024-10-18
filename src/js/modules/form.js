import {findDOM_node} from './findDOM_node.js';

const changeLablePosition = (formElement) => {
	const allFormInputs = formElement.querySelectorAll('input');

	allFormInputs.forEach((input) => {
		input.addEventListener('focus', (e) => {
			const label = e.target.previousElementSibling;

			if (label.tagName.toLowerCase() !== 'label') return;
			label.style.top = '0';
		});

		input.addEventListener('blur', (e) => {
			const label = e.target.previousElementSibling;

			if (e.target.value.length > 0) return;

			label.style.top = '20px';
		});
	});
};

const showAlert = (target, result) => {
	const alert = document.createElement('span');
	alert.classList.add('form-notification');

	switch (result) {
		case true:
			alert.textContent = 'The form was successfully sent!';
			break;

		default:
			alert.textContent = 'Some error occurred!';
			alert.classList.add('form-notification');
			alert.classList.add('form-notification_err');
			break;
	}

	target.querySelector('textarea').insertAdjacentElement('afterend', alert);
};

const getUserMessage = (formElement) => {
	const formData = new FormData(formElement);

	return `Заявка с Вашего сайта\n
<b><i>Name:</i></b> <strong>${formData.get('name')}</strong>\n
<b><i>Link:</i></b> <a href="${formData.get('link')}">${formData.get(
		'link'
	)}</a>\n
<b><i>Email:</i></b> <strong>${formData.get('email')}</strong>\n
<b><i>Message:</i></b> <strong>${formData.get('message')}</strong>\n
     `;
};

const handleSubmitForm = (e) => {
	e.preventDefault();

	const formElement = e.target;
	const message = getUserMessage(formElement).trim();

	const TOKEN = '6239358724:AAHgdm9JjSf_WNEOOZM0qYDv9Y9s4tIHKCQ';
	const CHAT_ID = '-1001887328656';
	const FETCH_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

	const response = fetch(FETCH_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			chat_id: CHAT_ID,
			text: message,
			parse_mode: 'html',
		}),
	});

	response
		.then((resRow) => resRow.json())
		.then((response) => {
			if (!response.ok) throw new Error('Error telegram API requst!');

			formElement.reset();
			showAlert(formElement, true);
		})
		.catch((e) => {
			showAlert(formElement, e.ok);
		})
		.finally(() => {
			setTimeout(() => {
				findDOM_node('form .form-notification').remove();
			}, 3000);
		});
};

export function form(formSelector) {
	const form = findDOM_node(formSelector);

	form.addEventListener('submit', handleSubmitForm);

	changeLablePosition(form);
}
