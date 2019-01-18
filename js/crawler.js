var CRAWLER_EVENTS = {
	INVALID_ELEMENT: 'invalidElement'
}

/****************************************************/
/**********	DA AGGIUNGERE ARGS AGLI EVENTI **********/
/****************************************************/

class EventHandler {
	constructor() {
		this.listener = {};
	}

	addEventListener(eventType, f) {
		if (!this.listener[eventType]) this.listener[eventType] = [];

		this.listener[eventType].push(f);
		return this;
	}

	dispatchEvent(eventType) {
		if (this.listener[eventType]) {
			this.listener[eventType].forEach(function(fn) {
				typeof fn === 'function' && fn();
			});
		}
	}

	removeEventListener(eventType) {
		this.listener[eventType] && delete this.listener[eventType];
	}
}

class Crawler {
	constructor(selector) {
		this.event = new EventHandler();
		this.clearBowl();

		if (selector) {
			this.context = selector;
		}

		this.find = 'input';
		this.reveal = 'autocapture';
		this.extraData = 'extra';
		this.validate = 'validate';

		this.setInvalidElementCallback = null;
		this.skipInvalid = true;
		return this;
	}

	// EVENT HANDLER
	on(eventType, f) {this.event.addEventListener(eventType, f); return this;}
	fire(eventType) {this.event.dispatchEvent(eventType); return this;}

	// Context; where to search elements
	get context() {return this.selector;}
	set context(selector) {
		if (selector) this.selector = selector;
		if (!this.selector) throw new Error("[Crawler] No selector setted");
		return this;
	}

	// In context find an element as inputs;
	get find() {return this.inputType;}
	set find(type) {
		if (type) this.inputType = type;
		if (!this.inputType) throw new Error("[Crawler] No type setted");
		return this;
	}

	// Reveal tag with data-autocapture;
	get reveal() {return this.inputAttr;}
	set reveal(attr) {
		if (attr) this.inputAttr = attr;
		if (!this.inputAttr) throw new Error("[Crawler] No dataset reveal attribute setted");
		return this;
	}

	// extraData
	get extraData() {return this.extra;}
	set extraData(extra) {
		if (extra) this.extra = extra;
		if (!this.extra) throw new Error("[Crawler] No dataset for extra data setted");
		return this;
	}

	get validate() {return this.validateAttr;}
	set validate(validate) {
		if (validate) this.validateAttr = validate;
		if (!this.validateAttr) throw new Error("[Crawler] No dataset for validation setted");
		return this;
	}

	get data() {return this.dataBowl;}
	set data(data) {
		this.dataBowl = data;
	}

	get skipInvalid() {return this.skipInvalidElement;}
	set skipInvalid(status) {
		this.skipInvalidElement = status;
		return this;
	}

	get(selector) {
		this.context = selector;
		this.crawlData();
		return this.data;
	}

	clearBowl() {
		this.data = [];
		return this;
	}

	crawlData() {
		let _this = this;

		this.clearBowl();

		let ctx = document.querySelector(_this.context);
		ctx.querySelectorAll(_this.find).forEach(function(el) {
			el.dataset[_this.reveal] && _this.analyzeElement(el);
		});

		return this;
	}

	analyzeElement(el) {
		if (this.isValid(el)) {
			this.addElement(el);
		} else {
			!this.skipInvalid && console.error("[Error] Crawler detected an invalid element! Stopped working");
		}

		return this;
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
					// Se NON ho una variabile valida (ricorda che splitto), esiste nell'oggetto validateFn, mi restituisce un valore valido, allora...
					if (!(f && validateFn[f] && validateFn[f](el.value))) {
						//_this.handleInvalidElement(el, f);
						_this.fire(CRAWLER_EVENTS.INVALID_ELEMENT, el, f);
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

		// Se ho un puntatore a funzione su cui fare fallback, lo chiamo
		if (this.invalidElementCallback)  {
			this.invalidElementCallback(el, errorType);
		}
		return false;
	}

	addElement(el) {
		let _this = this;

		this.data.push({
			name: el.name,
			type: el.type,
			value:  el.value,
			extra: el.dataset[_this.extra]/*,
			isValid: el.dataset[_this.validate]*/
		});
	}

	get invalidElementCallback() {return this.invalidElementCallbackFunction;}
	set invalidElementCallback(fn) {
		if (typeof fn === 'function') {
			this.invalidElementCallbackFunction = fn;
		} else {
			if (fn) throw new Error("[Error] Crawler's callback function on invalid element is NOT A FUNCTION", fn);
		}
	}
}