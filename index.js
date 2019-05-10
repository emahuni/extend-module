const {isString, isArray, cloneDeep, merge} = require('lodash');
const util = require('util');
const path = require('path');

module.exports = function extendModule(modulesNames, ...extraExtObjs) {
  // make sure that modulesNames is an array
  if (isString(modulesNames)) {
    modulesNames = [modulesNames];
  } else if (!isArray(modulesNames)) {
    throw new Error(`Not a module name nor an array of them!` + util.inspect(modulesNames));
  }

  let extent;

  // use each module name to require the module and then merge it into the extent obj
  for (let modNam of modulesNames) {
    if (!isString(modNam)) {
      throw new Error(`not a string` + util.inspect(modNam));
    }

    // console.debug('modNam: ', modNam);
    // get and merge the modules into extent
    // merge(extent, cloneDeep(require(modNam)));
    // get the module or file beginning from where the extent was triggered
    let reqFile =  cloneDeep(require(require.resolve(modNam, { paths: [path.dirname(module.parent.filename)] })));
    // if we have something in extent then use that to begin merging
    if (extent) {
      merge(extent, reqFile);
    } else {
      //  make the reqFile the current extent
      extent = reqFile;
    }
  }

  // just make sure we have something that's not undefined if undefined
  // extObj = extObj || {};

  // do final merge with the extending objects
  merge(extent, ...extraExtObjs);


  return extent;
};
