class Crawler {
	constructor(selector) {
		this.dataBowl = [];
		this.selector = selector;

		this.inputType = 'input';
		this.inputAttr = 'autocapture';
	}

	setSelector(selector) {
		if (selector) this.selector = selector;
		if (!this.selector) throw new Error("[Crawler] No selector setted")
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
					extra: el.dataset.extra
				});
			}
		});

	}
}