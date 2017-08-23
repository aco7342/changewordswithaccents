function isArray(obj){
    return !!obj && obj.constructor === Array;
}

var Filter = (function() {
  function Filter(options) {
    options = options || {};
    
    this.list = options.emptyList && [] || Array.prototype.concat.apply(require('./lang.json').words, [options.list || []]);        
       
    this.placeHolder = options.placeHolder || '*';
    this.regex = options.regex || /[^a-zA-z0-9|\$|\@]|\^/g;
    this.replaceRegex = options.replaceRegex || /\w/g;
  }

  Filter.prototype.isFind = function isFind(string) {
    var words = string.split(' ');
    for (var j = 0; j < words.length; j++) {
      var word = words[j].toLowerCase().replace(this.regex, '');
      if (word.length > 2) {
        //console.log( "this.list:" , this.list )  ;
        for (x = 0; x < this.list.length; x++ ) {
            //console.log('word',word,' : ',~this.list[x]['fnd'].indexOf(word));
            if (~this.list[x]['fnd'].indexOf(word))
                return true;
        }
      }
    }
    return false;
  };

  Filter.prototype.replaceWord = function replaceWord(string) {
    //return string.replace(this.regex, '').replace(this.replaceRegex, this.placeHolder);
    var words = string.split(' ');
    for (var j = 0; j < words.length; j++) {
      var word = words[j].toLowerCase().replace(this.regex, '');
      if (word.length > 2) {
        for (x = 0; x < this.list.length; x++ ) {
            if (~this.list[x]['fnd'].indexOf(word)){
                //console.log('word',words[j],' <- ',this.list[x]['chg']);
                words[j] = this.list[x]['chg'];
            }
        }
      }
    }
    var ret = words.join(' ');    
    return ret;
  };

  Filter.prototype.clean = function clean(string) {
    string = string.replace(/\u001a/g,'');
    string = string.toLowerCase();
    return string.split(/\b/).map(function(word) {
      return this.isFind(word) ? this.replaceWord(word) : word;
    }.bind(this)).join('');
  };

  Filter.prototype.addWords = function addWords(words) {  
    var tmp1 = words.fnd;
    var tmp2 = words.chg;
    
    tmp1 = tmp1.replace(/\u001a/g,'');
    tmp1 = tmp1.toLowerCase();
  
    tmp2 = tmp2.replace(/\u001a/g,'');
    tmp2 = tmp2.toLowerCase();
    var _words = { fnd : tmp1 , chg : tmp2 };

   this.list = this.list.concat( _words);
  };

  Filter.prototype.getWords = function getWords() {  
   //console.log( this.list );
   return this.list;
  };

  Filter.prototype.removeWords = function removeWords() {
    var words = Array.prototype.slice.call(arguments);
    //var words = arguments.split(" ");
    var word = words[0].split(" ");
    //console.log( "words:" , word , ' tam:' , word.length );    
    
    //console.log('this.list:')
    //console.log( this.list );

    for( k = 0 ; k < word.length; k++) {
        var y = this.list.length;
        for (x = 0, saida = false ; (!saida) && (x < y) ; x++){
            //console.log('key:', word[k], 'k:' , k);
            if (this.list[x].fnd == word[k])
                saida = true;
        }
        if (saida) {
            --x;
            this.list.splice(x, 1);
        }
    }
    //console.log('Result :this.list:')
    //console.log( this.list );
  };
  
  Filter.prototype.removeAllWords = function removeAllWords() {
    //console.log( this.list );
    for (var x = this.list.length; x > -1 ; x--){
        this.list.splice(x, 1);
    }
    //console.log( this.list );
  };

  return Filter;
})();

module.exports = Filter;

//f = new Filter();

//console.log( f.getWords() ) ;
