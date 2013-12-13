var chai = require('chai')
chai.should()

describe('fixedauth', function () {
  var fixedauth = require('../')

  describe('sign', function () {
    it('makes a signature with a shared key', function () {

      var key = 'foo'
      var signature = fixedauth.sign(key)

      signature.should.be.a.string
    })
  })

  it('can verify its own signatures', function () {
    fixedauth.verify('foo', fixedauth.sign('foo'))
      .should.equal(true)
  })

})