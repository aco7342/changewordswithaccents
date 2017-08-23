require('assert');
var Filter = require('../lib/changewords.js'),
	filter = new Filter(),
	assert = require('better-assert');

describe('filter', function(){
	describe('isProfane',function(){
		it("Should detect a accent word and return a boolean value",function(){
			assert(filter.isFind("locao"));
		});

		it("Should return false when no accent word is detected",function(){
			assert(filter.isFind("wife") === false);
		});

		it("Should be able to detect a accent word in a sentence",function(){
			assert(filter.isFind("do contrato de locao"));
		});

		it('Filters out special characters appropriately', function() {
			assert(filter.isFind("do contrato de locao^"));
		});

	});
});
