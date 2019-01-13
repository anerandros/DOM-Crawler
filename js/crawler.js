class Crawler {
	constructor(selector) {
		this.clearBowl();
		this.selector = selector;

		this.setType('input');
		this.setRevealAttr('autocapture');
		this.setExtraData('extra');
		this.setValidateAttr('validate');

		this.setInvalidElementCallback(null);
		return this;
	}

	setSelector(selector) {
		if (selector) this.selector = selector;
		if (!this.selector) throw new Error("[Crawler] No selector setted");
		return this;
	}

	setType(type) {
		if (type) this.inputType = type;
		if (!this.inputType) throw new Error("[Crawler] No type setted");
		return this;
	}

	setRevealAttr(attr) {
		if (attr) this.inputAttr = attr;
		if (!this.inputAttr) throw new Error("[Crawler] No dataset attribute setted");
		return this;
	}

	setExtraData(extra) {
		if (extra) this.extra = extra;
		if (!this.extra) throw new Error("[Crawler] No dataset for extra data setted");
		return this;
	}

	setValidateAttr(validate) {
		if (validate) this.validate = validate;
		if (!this.validate) throw new Error("[Crawler] No dataset for validation setted");
		return this;
	}

	getData(selector) {
		this.setSelector(selector);
		this.crawlData();
		return this.releaseData();
	}

	releaseData() {
		return this.dataBowl;
	}

	getBowl() {
		return this.dataBowl;	
	}

	clearBowl() {
		this.dataBowl = [];
		return this;
	}

	crawlData() {
		let _this = this;

		this.clearBowl();

		let ctx = document.querySelector(_this.selector);
		ctx.querySelectorAll(_this.inputType).forEach(function(el) {
			el.dataset[_this.inputAttr] && _this.analyzeElement(el);
		});

		return this;
	}

	analyzeElement(el) {
		let skipInvalid = true;

		if (this.isValid(el)) {
			this.addElement(el);
		} else {
			!skipInvalid && console.error("[Error] Crawler detected an invalid element! Stopped working");
		}

		return this;
	}

	addElement(el) {
		let _this = this;

		this.getBowl().push({
			name: el.name,
			type: el.type,
			value:  el.value,
			extra: el.dataset[_this.extra],
			isValid: el.dataset[_this.validate]
		});
	}

	isValid(el) {
		let _this = this;
		let isInvalid = false;
		let hasValidation = el.dataset[this.validate] ? el.dataset[this.validate].split(";") : undefined;

		if (hasValidation) {
			// Meglio farla con un'interfaccia
			let validateFn = {
				isNumber: (d) => {return !isNaN(d)},
				isInterval: (a, b) => {console.log("IsInterval fn()")},
				notEmpty: (d) => {return d != ""}
			}

			hasValidation.forEach(function(f, i) {
				try {
					// Se ho una variabile valida (ricorda che splitto), esiste nell'oggetto validateFn, mi restituisce un valore valido
					if (!(f && validateFn[f] && validateFn[f](el.value))) {
						_this.handleInvalidElement(el, f);
						isInvalid = true;
					}
				} catch (e) {
					throw new Error("[Error] Crawler's validation process failed: ", e);
				}
			});
		}
		return isInvalid ? false : true;
	}

	handleInvalidElement(el, errorType) {
		console.warn("Invalid element:", errorType, el);
		if (this.invalidElementCallback) this.invalidElementCallback(el, errorType);
		return false;
	}

	setInvalidElementCallback(fn) {
		try {
			if (typeof fn === 'function') this.invalidElementCallback = fn;
		} catch(e) {
			throw new Error("[Error] Crawler's callback function on invalid element is NOT A FUNCTION", e)
		}
		return this;
	}
}