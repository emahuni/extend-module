const _ = require('lodash');
const console = require('contrace')();
const util = require('util');

module.exports = function extendModule(modulesNames, extObj, ...extraExtObjs) {
  // make sure that modulesNames is an array
  if(_.isString(modulesNames)) {
    modulesNames = [modulesNames];
  } else if (!_.isArray(modulesNames)) {
    throw new Error(`Not a module name nor an array of them!` + util.inspect(modulesNames));
  }

  let extent = {};

  // use each module name to require a unique copy of the module and then merge it into the extent obj
  for(let modNam of modulesNames) {
    if (!_.isString(modNam)) {
      throw new Error(`not a string` + util.inspect(modNam));
    }

    // console.debug('modNam: ', modNam);
    // get and merge the modules into extent
    _.merge(extent, _.cloneDeep(require(modNam)));
    // _.merge(extent, require(modNam));
  }

  // do final merge with the extending objects
  _.merge(extent, extObj, ...extraExtObjs);


  return extent;
};
