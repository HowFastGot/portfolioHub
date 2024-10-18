export default function burgerMenu() {
	const burger = (burgerSelector, menuSelector) => {
		const burgerElem = document.querySelector(burgerSelector),
				menuElem = document.querySelector(menuSelector);
	
		menuElem.style.display = "none";
	
		burgerElem.addEventListener("click", function(e) {
			if (menuElem.style.display === "none" && window.screen.availWidth < 993) {
				menuElem.style.display = "block";
			} else {
				menuElem.style.display = "none";
			}
		});
	
		window.addEventListener("resize", function(e) {
			if (window.screen.availWidth > 992) {
				menuElem.style.display = "none";
			}
		});
	};

	// burger(burgerSelector, menuSelector) //вызываем фун-ю в модуле
}
