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
        for (x = 0; x < this.list.length; x++ ) {
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
            if (~this.list[x]['fnd'].indexOf(word))
                words[j] = this.list[x]['chg'];
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

  Filter.prototype.removeWords = function removeWords() {
    var words = Array.prototype.slice.call(arguments);
   
    var y = this.list.length;
    for (x = 0, saida = false ; (!saida) && (x < y) ; x++){
       if (this.list[x].fnd == words)
           saida = true;
    }
    if (saida) {
        --x;
        this.list.splice(x, 1);
    }
  };

  return Filter;
})();

module.exports = Filter;


/*
console.log( "teste" );
var f = new Filter();

f.addWords( {chg: "nr" , fnd: "n"} );
f.addWords( {chg: "imovel" , fnd: "imvel"} );
f.addWords( {chg: "contratacao" , fnd: "contratao"} );
f.addWords( {chg: "imoveis" , fnd: "imveis"} );
f.addWords( {chg: "agencia" , fnd: "agncia"} );
f.addWords( {chg: "municipio" , fnd: "municpio"} );
f.addWords( {chg: "InstaLacao" , fnd: "inStAla\u001a\u001ao"} );
f.addWords( {chg: "conceicao" , fnd: "Concei\u001a\u001ao"} );


//f.removeWords( "n" );

//console.log( '84."objeto a locao"' , f.isFind( "objeto a locao" ) );
//console.log( '85."do imvel"' , f.isFind( "do imvel" ) );
//console.log( '86."objeto a locao do imvel"' , f.isFind( "objeto a locao do imvel" ) );
//console.log( '87."objeto a contrato do estacionamento"' , f.isFind( "objeto a contrato do estacionamento" ) );
//console.log( '88."do contrato do im\u001avel"' , f.isFind( "do contrato do im\u001avel" ) );

console.log( '96."do contrato do im\u001avel"', f.replaceWord("do contrato do im\u001avel"));
console.log( '97."objeto a locao"', f.replaceWord("objeto a locao"));
//console.log( '85.' , f.isFind( "objeto a loca\u001a\u001ao do im\u001avel" ) );

//console.log(filter.clean("Don't be an ash0le")); //Don't be an ******
var texto = "Contrata\u001a\u001ao de im\u001aveis para instala\u001a\u001ao da Ag\u001ancia do  IBGE   no munic\u001apio de Concei\u001a\u001ao do Araguaia/PA.";

texto = texto.replace(/\u001a/g,'');

console.log('99.', texto,'\n',f.clean(texto));

*/