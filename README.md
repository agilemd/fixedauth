DEPRECATED: fixedauth
=====================

**DEPRECATED as of November 9, 2015. Will be removed from npm on November 1, 2016**

peer service authentication with a fixed, shared key

## usage

client:
```js
var fixedauth = require('fixedauth')

var headers = {
  authorization: fixedauth.sign('secret key!')
}

// an http request with the above headers object

```

server:
```js
var fixedauth = require('fixedauth')

// string resulting from fixedauth.sign, however you choose to transmit it
var signature

var isAuthorized = fixedauth.verify('secret key', signature)

```

Also available as connect-style middleware:
```js
var fixedauth = require('fixedauth')

app.use(fixedauth('secret key!'))
```

## about

Authenticate requests between a client and a server using a shared secret key
and a sha256 HMAC. This scheme uses a timestamp to prevent against replay attacks.
The client and server timestamp are required to be +/- 60 seconds of each other.

Based somewhat on [hawk](https://npm.im/hawk)


## installation

    $ npm install fixedauth


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>
- kurttheviking <kurttheviking@outlook.com>


## license

MIT. (c) MMXIII AgileMD http://agilemd.com
