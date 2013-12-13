var crypto = require('crypto')

// (String, Number) => String
function sign(sharedKey, offset) {
  offset = offset || 0
  var now = String(Date.now() + offset)
  var shasum = crypto.createHmac('sha256', sharedKey)
  shasum.update(String(now))
  var digest = shasum.digest('hex')
  return new Buffer(now + ':' + digest).toString('base64')
}

// (String, String) => Boolean
function verify(sharedKey, signature) {

  var authStr = new Buffer(signature, 'base64').toString()
  var auth = authStr.split(':')
  var clientNow = parseInt(auth[0])
  var clientHmac = auth[1]

  // check to make sure now matches sorta with server time
  // (+/- 60 seconds)
  var now = Date.now()
  if (Math.abs(now - clientNow) > 60000) {
    throw new Error('clocks not in sync')
  }

  // verify hmac
  var shasum = crypto.createHmac('sha256', sharedKey)
  shasum.update(String(clientNow))
  var hmac = shasum.digest('hex')


  return hmac === clientHmac

}

module.exports = function middleware(sharedKey) {
  return function (req, res, next) {
    try {
      var requestAuthorized = verify(sharedKey, req.headers.authorization)
      if (requestAuthorized) {
        next()
      }
    } catch (e) {
      next(e)
    }
    // request not authorized
    res.statusCode = 403
    res.write(String(Date.now()))
    res.end()
  }
}

module.exports.sign = sign
module.exports.verify = verify