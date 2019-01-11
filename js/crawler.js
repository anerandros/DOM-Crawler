class Crawler {
	constructor(selector) {
		this.clearBowl();
		this.selector = selector;

		this.setType('input');
		this.setRevealAttr('autocapture');
		this.setExtraData('extra');
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
			if (el.dataset[_this.inputAttr] == "") {
				_this.dataBowl.push({
					name: el.name,
					type: el.type,
					value:  el.value,
					extra: el.dataset[_this.extra]
				});
			}
		});

		return this;
	}
}