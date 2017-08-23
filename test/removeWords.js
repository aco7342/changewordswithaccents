require('assert');
var Filter = require('../lib/changewords.js'),
  filter = new Filter(),
  assert = require('better-assert');

describe('filter', function(){
  describe('removeWords',function(){
    it("Should allow you to remove words from the filter no longer filter them",function(){
      filter.removeWords('locao');
      assert(filter.clean('do contrato de locao') === 'do contrato de locao');
      filter.addWords( {chg: "locacao" , fnd: "locao"});
      assert(filter.clean('do contrato de locacao') === 'do contrato de locacao');
    });
  });
});