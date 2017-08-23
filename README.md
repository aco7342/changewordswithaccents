# change-words
A javascript change accents words for same without accents

## Installation
```
npm install changewordswithaccents
```

## Usage
```
var Filter = require('changewordswithaccents'),
 
var f = new Filter();

f.addWords( {chg: "nr" , fnd: "n"} );
f.addWords( {chg: "imovel" , fnd: "imvel"} );
f.addWords( {chg: "contratacao" , fnd: "contratao"} );
f.addWords( {chg: "imoveis" , fnd: "imveis"} );
f.addWords( {chg: "agencia" , fnd: "agncia"} );
f.addWords( {chg: "municipio" , fnd: "municpio"} );
f.addWords( {chg: "InstaLacao" , fnd: "inStAla\u001a\u001ao"} );
f.addWords( {chg: "conceicao" , fnd: "Concei\u001a\u001ao"} );


f.removeWords( "n" );

var texto = "Contrata\u001a\u001ao de im\u001aveis para instala\u001a\u001ao da Ag\u001ancia do IBGE no " +
            "munic\u001apio de Concei\u001a\u001ao do Araguaia/PA.";

console.log( f.clean(texto) ); ==>  contratacao de imoveis para instalacao da agencia do  ibge   no municipio de conceicao do araguaia/pa.



## Release Notes
- v0.0.1 / Aug 22 2017: Initial version
- v0.0.2 / Aug 22 2017: getWords() method


## License

The MIT License (MIT)

Copyright (c) 2013 Antonio Carlos Oliveira

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



