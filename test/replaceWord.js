require('assert');
var Filter = require('../lib/changewords.js'),
  filter = new Filter(),
  assert = require('better-assert');

describe('filter', function(){
	describe('replaceWord',function(){
		it("Should replace a accent word with other without accents",function(){
			assert(filter.replaceWord("locao") == 'locacao');
		});
	});
});