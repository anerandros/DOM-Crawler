class Crawler {
	constructor(selector) {
		this.clearBowl();
		this.selector = selector;

		this.setType('input');
		this.setRevealAttr('autocapture');
		this.setExtraData('extra');
		this.setValidateAttr('validate');
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

	clearBowl() {
		this.dataBowl = [];
		return this;
	}

	crawlData() {
		let _this = this;

		this.clearBowl();

		let ctx = document.querySelector(_this.selector);
		ctx.querySelectorAll(_this.inputType).forEach(function(el) {
			if (el.dataset[_this.inputAttr] == "" || el.dataset[_this.inputAttr]) {
				let operation = (el.dataset[_this.validate]) ? el.dataset[_this.validate].split(";") : [];

				_this.dataBowl.push({
					name: el.name,
					type: el.type,
					value:  el.value,
					extra: el.dataset[_this.extra],
					validate: operation
				});

				//el.dataset[_this.inputAttr] && this.analyzeElement();
			}
		});

		return this;
	}
/*
	analyzeElement(el) {
		let operation = (el.dataset[_this.validate]) ? el.dataset[_this.validate].split(";") : [];

		_this.dataBowl.push({
			name: el.name,
			type: el.type,
			value:  el.value,
			extra: el.dataset[_this.extra],
			validate: operation
		});

		return this;
	}
*/
	validate() {
		let toDrop = [];

		let validateFn = {
			number: (d) => {return !isNaN(d)},
			notEmpty: (d) => {return d != ""},
			isInterval: (a, b) => {console.log("IsInterval fn()")}
		}

		this.dataBowl.map(function(el, i) {
			this.validate.forEach(function(f, j) {
				if ( f && validateFn[f] ) toDrop.push(j);
			})
		});

		//this.filterData(toDrop);
		return this.releaseData();
	}
}