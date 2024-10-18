import {getResource} from "../services/requests.js";

const showMoreStyles = (triggerSelector, wrapperSelector) => {
	let btn = document.querySelector(triggerSelector);

	// cards.forEach(card => {
	// 	card.classList.add("animated", "fadeInUp");
	// });

	// btn.addEventListener("click", function(e) {
	// 	cards.forEach(card => {
	// 		card.classList.remove("hidden-lg", "hidden-md", "hidden-sm", "hidden-xs");
	// 		card.classList.add("col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");
	// 	});
	// 	this.remove();
	// });

	btn.addEventListener("click", function(e) {
		getResource("http://localhost:3000/styles")
			.then(res => createCards(res))
			.catch(err => console.log("Ошибка получения данных" + err.message));

			this.remove();
	});

	function createCards(response) {
		response.forEach(({src, title, link}) => {
			let div = document.createElement("div");
			div.classList.add("animated", "fadeInUp", "col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");

			div.innerHTML = `
				<div class="styles-block">
					<img src=${src} alt="style">
					<h4>${title}</h4>
					<a href="${link}">Подробнее</a>
				</div>
			`;
			document.querySelector(wrapperSelector).append(div);
		});
	}
};

export default showMoreStyles;