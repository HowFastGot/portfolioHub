const masks = (selector) => {

	function setCursorPosition(pos, elem) {
		if (elem.setSelectionRange) {
			elem.setSelectionRange(pos, pos);
			elem.focus();
		} else if (elem.createTextRange) {
			let range = new Range();

			range.collapse(true);
			range.setStart(pos);
			range.setEnd(pos);
			range.select();
		}
	}

	function createMask(event) {
		let matrix = '+380 (__) ___ __ __',
			 i = 0,
			 def = matrix.replace(/\D/g, ""),
			 val = this.value.replace(/\D/g, "");

		if (def.length >= val.length) {
			val = def;
		}

		this.value = matrix.replace(/./g, function(a) {

			if (/[_\d]/g.test(a) && i < val.length) {
				return val.charAt(i++);
			} else if (i >= val.length) {
				return "";
			} else {
				return a;
			}

		});

		if (event.type === "blur") {
			if (this.value.length <= 3) {
				this.value = "";
			}
		} else {
			setCursorPosition(this.value.length, this);
		}
	}

	let inputs = document.querySelectorAll("[name='phone']");

	inputs.forEach(item => {
		item.addEventListener("input", createMask);
		item.addEventListener("focus", createMask);
		item.addEventListener("blur", createMask);
	});
};

export default masks;