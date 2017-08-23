require('assert');
var Filter = require('../lib/changewords.js'),
	filter = new Filter(),
	assert = require('better-assert');

describe('filter', function(){
	describe('clean',function(){
		it('Should replace a accent word without accent word',function(){
			assert(filter.clean('do contrato de locao') === 'do contrato de locacao');
		});

		it('Should replace multiple instances of any accent words without accents words',function(){
			assert(filter.clean('imvel constitudo locao xxx') === 'imovel constituido locacao xxx');
		});

		it('Should not replace anything within a sentence if there are no accent words',function(){
			assert(filter.clean('The cat ran fast') === 'the cat ran fast');
		});

		it('Should allow an instance of filter with an empty changeList', function() {
			var customFilter = new Filter({
				emptyList: true
			});
			assert(customFilter.clean('do contrato de locao') === 'do contrato de locao');
		});

		it('Should tokenize words according to regex word boundaries',function(){
			filter.addWords( {chg: "municipio" , fnd: "municpio"});
			assert(filter.clean('do contrato do...municpio') === 'do contrato do...municipio');
			assert(filter.clean('<p>do contrato do...municpio</p>') === '<p>do contrato do...municipio</p>');
		});
		
	});
});