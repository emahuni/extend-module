const chai = require('chai');
const expect = chai.expect;
const console = require('contrace')();

const extend = require('../');
let mod, modNam = `${__dirname}/fixtures/sample`,
    modNam2 = `${__dirname}/fixtures/sample2`;

context ('# extend :: ', async function (){
  it('can extend sample module via string', async function (){
    let sample = extend(modNam, {bar: 'bro', zim: 'ekakakaka'} );

    expect(sample).to.be.an('object').that.include.keys([ 'foo', 'bar', 'zep', 'zim', ]);
  });

  it ('can extend sample modules via array', async function (){
    let sample = extend([modNam, modNam2], {br: 'bro', zom: 'ekakakaka'} );

    expect(sample).to.be.an('object').that.include.keys([ 'foo', 'br', 'zep', 'zom', 'zap', 'gumba', ]);
  });

  it ('can extend sample modules using multiple extending objects', async function (){
    let sample = extend([modNam, modNam2], {br: 'bro', zom: 'ekakakaka'}, { hokoyo: 'mpfanha' }, { oh: 'yes' }, );

    expect(sample).to.be.an('object').that.include.keys([ 'foo', 'br', 'zep', 'zom', 'zap', 'gumba', 'hokoyo', 'oh', ]);
  });

  it ('can extend sample modules without any extending objects', async function (){
    let sample = extend([modNam, modNam2],);

    expect(sample).to.be.an('object').that.include.keys([ 'foo', 'zep', 'zap', 'gumba', ]);
  });


  it ('can extend sample module without mutating require cache', async function () {

    // if it is mutating the require cache then keys will not just be the following
    expect(mod = require(modNam)).to.have.all.keys(['foo', 'zep']);

    // console.debug('modNam: ', modNam);
    // console.debug('mod: ', mod);
  });
});
