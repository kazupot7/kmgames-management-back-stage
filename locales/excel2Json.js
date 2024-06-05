const xlsx = require( 'node-xlsx' );
const fs = require( 'fs' );
const path = require( 'path' );

const sourcePath = './';
const savePath = './json';
const excelName = 'i18n.xlsx';

class Translate {
  constructor() {
    this.contents = {};
    this.languages = [];
    this.sheets = undefined;
  }
  parseExcel ( sourcePath, excelName ) {
    this.sheets = xlsx.parse( fs.readFileSync( path.join( __dirname, sourcePath, excelName ) ) );
    this.sheets.forEach( this.parseSheet.bind( this ) );
    return this;
  }
  parseSheet ( sheet ) {
    let { data, name } = sheet;
    console.log( name )
    data.forEach( ( row, rowIndex ) => {
      let key;
      row.forEach( ( col, colIndex ) => {
        if ( rowIndex === 0 && colIndex !== 0 ) {
          if ( !( col in this.contents ) ) {
            this.contents[col] = {};
            this.languages.push( col );
          }
        }

        if ( rowIndex >= 1 ) {
          if ( colIndex === 0 ) {
            key = col;
          } else {
            const lang = this.languages[colIndex - 1];
            this.contents[lang][key] = col;
          }
        }
      } )
    } );

    return this;
  }
  generatorJson ( savePath ) {
    Object.keys( this.contents ).forEach( key => {
      const targetPath = path.resolve( __dirname, savePath, `${key}.json` );
      fs.writeFile( targetPath, JSON.stringify( this.contents[key], null, 2 ), res => {
        console.log( `translate ${key} success` );
      } )
    } )
  }
}

new Translate().parseExcel( sourcePath, excelName ).generatorJson( savePath );
