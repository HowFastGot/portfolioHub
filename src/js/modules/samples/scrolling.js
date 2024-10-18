const scrolling = (hashSelector) => {
	const upElem = document.querySelector(hashSelector);

	window.addEventListener("scroll", function(e) {
		if (document.documentElement.scrollTop > 1500) {
			upElem.classList.add("animated", "fadeIn");
			upElem.classList.remove("fadeOut");
		} else {
			upElem.classList.add("fadeOut");
			upElem.classList.remove("fadeIn"); 
		}
	});

let links = document.querySelectorAll("[href^='#']"),
	 speed = 0.3;

	links.forEach(link => {
		link.addEventListener("click", function(e) {
			let widthTop = document.documentElement.scrollTop,
				 hash = this.hash,
				 toBlock = document.querySelector(hash).getBoundingClientRect().top,
				 start = null;

			requestAnimationFrame(step);

			function step(time) {
				if (start === null) {
					start = time;
				}

				let progress = time - start,
					 r = (toBlock < 0) ? Math.max(widthTop - progress/speed, widthTop + toBlock)
						: Math.min(widthTop + progress/speed, widthTop + toBlock);

				document.documentElement.scrollTo(0, r);

				if (r !== toBlock + widthTop) {
					requestAnimationFrame(step);
				} else {
					location.hash = hash;
				}
			}

		});
	});


	// const element = document.documentElement,
	// 		body = document.body;
	// const calcScroll = () => {
	// 	upElem.addEventListener("click", function(e) {
	// 		let scrollTop = Math.round(element.scrollTop || body.scrollTop);

	// 		if (this.hash !== "") {
	// 			e.preventDefault();
	// 			let hashElement = document.querySelector(this.hash),
	// 				 hashElementTop = 0;

	// 			while(hashElement.offsetParent) {
	// 				hashElementTop += hashElement.offsetTop;
	// 				hashElement = hashElement.offsetParent;
	// 			}

	// 			hashElementTop = Math.round(hashElementTop);
	// 			smoothScroll(scrollTop, hashElementTop, this.hash)
	// 		}
	// 	});
	// };

	// const smoothScroll = (from, to, hash) => {
	// 	let timeInterval = 1,
	// 		 prevScrollTop,
	// 		 speed;

	// 	if (from < to) {
	// 		speed = 30;
	// 	} else {
	// 		speed = -30;
	// 	}

	// 	let move = setInterval(function() {
	// 		let scrollTop = Math.round(element.scrollTop || body.scrollTop);

	// 		if (
	// 			prevScrollTop === scrollTop ||
	// 			(to > from && scrollTop >= to) ||
	// 			(to < from && scrollTop <= to)
	// 		) {
	// 			clearInterval(move);
	// 			history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, "") + hash);
	// 		} else {
	// 			 body.scrollTop += speed;
	// 			 element.scrollTop += speed;
	// 			 prevScrollTop = scrollTop;
	// 		}
	// 	}, timeInterval);
	// };

	// calcScroll();
};

export default scrolling;
