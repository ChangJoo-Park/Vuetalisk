let debugLevel = 10 
let verboseLevel = 1

exports.ERROR = function (...args) {
  console.error(...args)
  process.exit(1)
}

exports.ERRMSG = function (...args) {
  return err => {
    console.error(...args)
    console.error(err)
    process.exit(1)
  }
}


exports.DEBUG = function (...args) {
  if (debugLevel < 1) {
    return false
  }
  if (typeof args[0] === 'number' && args.length > 1) {
    const level = args.shift()
    if (level <= debugLevel) {
      console.log('DEBUG ' + '-'.repeat(level), ...args)
    }
  } else {
    console.log('DEBUG', ...args)
  }
}


const warnlevel = process.env.WARNLEVEL || 10
exports.WARN = function (level, ...args) {
  if (level <= warnlevel) console.warn('WARN: ', ...args)
}


exports.VERBOSE = function (level, ...args) {
  if (level <= verboseLevel) console.log(...args)
}

const loglevel = process.env.LOGLEVEL || 10
exports.setLogLevel = level => { loglevel = level }
exports.LOG = function (level, ...args) {
  if (level <= loglevel) console.log('LOG: ', ...args)
}

exports.MyLog = function (name) {
  return (level, ...args) => {
    if (level <= loglevel) console.log(`LOG::${name}: `, ...args)
  }
}
