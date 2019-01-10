class Crawler {
	constructor(selector) {
		this.dataBowl = [];
		this.selector = selector;

		this.inputType = 'input';
		this.inputAttr = 'auto-capture';
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
		
		$(_this.selector)
			.find(_this.inputType)
			.filter(function(i, el) {return $(el).data(_this.inputAttr) == ""})
			.each(function(i, el) {
				_this.dataBowl.push({
					name: $(el).attr('name'),
					type: $(el).attr('type'),
					value:  $(el).val(),
					extra: $(el).data('extra')
				});
			});
	}
}