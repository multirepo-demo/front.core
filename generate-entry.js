const glob = require('glob')
const fs = require('fs')

module.exports = function(deps, path, exclude) {
  if (exclude) deps = deps.filter(dep => !exclude.includes(dep))
  deps = deps.reduce((tmp, dep) => {
    const depPath = './node_modules/' + dep
    const main = require(depPath + '/package.json').main;
    if(!main) {
      const mods = glob.sync(depPath + '/**/*.js')
      mods.forEach((modPath) => {
        let endTrimIndex = modPath.indexOf('/index.js')
        endTrimIndex = endTrimIndex < 0 ? modPath.indexOf('.js') : undefined
        modPath = modPath.substring(modPath.indexOf(dep), endTrimIndex)
        tmp[modPath] = `require('${modPath}')`
      });
    } else {
      tmp[dep] = `require('${dep}')`
    }
    return tmp
  }, {})
  deps = " // FILE AUTOMATICALY GENERATED BY 'generateEntry' \n module.exports = " + JSON.stringify(deps, null, 2).replace(/(\")(require\(.+\))(\")/gm, '$2')
  fs.writeFileSync(path, deps)

  return deps;
}