require('assert');
var Filter = require('../lib/changewords.js'),
  filter = new Filter(),
  assert = require('better-assert');

describe('filter', function(){
  describe('addWords',function(){
    it('1.Should append words to the change list.', function(){
      filter.addWords( {chg: "municipio" , fnd: "municpio"});
      assert(filter.clean('do contrato do municpio') === 'do contrato do municipio');
    });

    it('2.Should allow a list to be passed to the constructor', function() {

      var filter = new Filter({
        list : [ {chg: "municipio" , fnd: "municpio"}]
      });

      assert(filter.clean('do contrato do municpio') === 'do contrato do municipio');
    });
  });
});