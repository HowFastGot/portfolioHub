const checkTextIputs = (selector) => {
	let inputs = document.querySelectorAll(selector);

	inputs.forEach(item => {
		item.addEventListener("keypress", function(e) {
			if (e.key.match(/[^а-яё 0-9]/gi)) {
				e.preventDefault();
			}
		});

		item.addEventListener("change", function(e) {
			if (this.value.match(/[^а-яё 0-9]/gi)) {
				this.value = "";
				
			}
		});
	});

};

export default checkTextIputs;