const sliders = (slides, dir, prev, next) => {
	let slideIndex = 1;
	const items = document.querySelectorAll(slides);
	let paused;

	function showSlides(n) {
		if (n > items.length) {
			slideIndex = 1;
		}

		if (n < 1) {
			slideIndex = items.length;
		}

		items.forEach(item => {
			item.classList.add("animated");
			item.style.display = "none";
		});

		items[slideIndex - 1].style.display = "block";
	}

	showSlides(slideIndex);

	function plusSlides(n) {
		showSlides(slideIndex += n);
	}

	try {
		const prevBtn = document.querySelector(prev),
				nextBtn = document.querySelector(next);

		prevBtn.addEventListener("click", function(e) {
			plusSlides(-1);
			items[slideIndex - 1].classList.remove("slideInLeft");
			items[slideIndex - 1].classList.add("slideInRight");
		});

		nextBtn.addEventListener("click", function(e) {
			plusSlides(1);
			items[slideIndex - 1].classList.remove("slideInRight");
			items[slideIndex - 1].classList.add("slideInLeft");
		});
	} catch(e) {
		console.log(`Не были найдены селекторы кнопок: ${e.message}!`)
	}

	function activeSlider() {
		if (dir === "vertical") {
		paused = setInterval(function() {
			plusSlides(1);
			items[slideIndex - 1].classList.add("slideInDown");
		}, 3000)
		
		} else {
			paused = setInterval(function() {
				plusSlides(1);
				items[slideIndex - 1].classList.remove("slideInRight");
				items[slideIndex - 1].classList.add("slideInLeft");
			}, 3000)
		}
	}

	activeSlider();

	items[0].parentElement.addEventListener("mouseenter", function() {
		clearInterval(paused);
	});

	items[0].parentElement.addEventListener("mouseleave", function() {
		activeSlider();
	});
};

export default sliders;