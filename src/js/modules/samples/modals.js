const modals = (state) => {
	let clickedBtn;

	function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			closeModal = document.querySelector(closeSelector),
			windows = document.querySelectorAll("[data-modals]");
			scroll = calcScroll();

		trigger.forEach(item => {
			item.addEventListener("click", function(e) {
				if (e.target) {
					e.preventDefault();
				}
				clickedBtn = true;

				windows.forEach(item => {
					item.style.display = "none";
				});

				if (destroy) {
					item.remove();
				}

				modal.style.display = "block";
				modal.classList.add("animated", "fadeIn");
				document.body.style.overflow = "hidden";
				document.body.style.marginRight = `${scroll}px`;
			});

			closeModal.addEventListener("click", function(e) {
				windows.forEach(item => {
					item.style.display = "none";
				});
				modal.style.display = "none";
				document.body.style.overflow = "";
				document.body.style.marginRight = `0px`;
			});
		});

		modal.addEventListener("click", function (e) {
			if (e.target === modal) {
				windows.forEach(item => {
					item.style.display = "none";
				});

				modal.style.display = "none";
				document.body.style.overflow = "";
				document.body.style.marginRight = `0px`;
			}
			
		})
	}

	function showModalByTime(selector, time) {
		setTimeout( function() {
			let display;
			document.querySelectorAll("[data-modal]").forEach(item => {
				if (window.getComputedStyle(item).display !== "none") {
					display = "block";
				}
			});

			if (!display) {
				document.querySelector(selector).style.display = "block";
				document.body.style.overflow = "hidden";

				if (document.querySelector(".fixed-gift")) {
					fixedMargin(document.querySelector(".fixed-gift"));
				}
				
				let scroll = calcScroll();
				document.body.style.marginRight = `${scroll}px`;
			}
		}, time );
	}

	function calcScroll() {
		return 17;
	};

	function showModalByScroll(selector) {
		let trigger = document.querySelector(selector);

		window.addEventListener("scroll", function(e) {
			if (!clickedBtn && (window.pageYOffset + document.documentElement.clientHeight 
				>= (Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - 10) )) {
				trigger.click()
			}
		});
		
	}

	bindModal(".button-design", ".popup-design", ".popup-design .popup-close");
	bindModal(".button-consultation", ".popup-consultation", ".popup-consultation .popup-close");
	bindModal(".fixed-gift", ".popup-gift", ".popup-gift .popup-close", true);
	/*showModalByTime(".popup-consultation", 3000);*/
	showModalByScroll(".fixed-gift");
}

export default modals;