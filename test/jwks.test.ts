import anyTest, { type TestFn } from 'ava'
import setup, { issuer, endpoint, type Context, teardown, getResponse } from './_setup.js'
import * as lib from '../src/index.js'

const test = anyTest as TestFn<Context>

test.before(setup)
test.after(teardown)

test('jwksRequest()', async (t) => {
  const data = { keys: [] }
  t.context
    .intercept({
      path: '/jwks',
      method: 'GET',
      headers: {
        accept: 'application/json, application/jwk-set+json',
      },
    })
    .reply(200, data)

  const response = await lib.jwksRequest({ ...issuer, jwks_uri: endpoint('jwks') })
  t.true(response instanceof Response)
})

test('jwksRequest() w/ Custom Headers', async (t) => {
  const data = { keys: [] }
  t.context
    .intercept({
      path: '/jwks-headers',
      method: 'GET',
      headers: {
        accept: 'application/json, application/jwk-set+json',
        'user-agent': 'foo',
        foo: 'bar',
      },
    })
    .reply(200, data)

  const response = await lib.jwksRequest(
    { ...issuer, jwks_uri: endpoint('jwks-headers') },
    {
      headers: new Headers([
        ['accept', 'will be overwritten'],
        ['user-agent', 'foo'],
        ['foo', 'bar'],
      ]),
    },
  )
  t.true(response instanceof Response)
})

test('jwksRequest() requires jwks_uri', async (t) => {
  await t.throwsAsync(lib.jwksRequest({ ...issuer, jwks_uri: undefined }), {
    name: 'TypeError',
    message: '"as.jwks_uri" must be a string',
  })
})

test('processJwksResponse()', async (t) => {
  await t.throwsAsync(lib.processJwksResponse(<any>null), {
    message: '"response" must be an instance of Response',
  })
  await t.throwsAsync(lib.processJwksResponse(getResponse('{"')), {
    message: 'failed to parse "response" body as JSON',
  })
  await t.throwsAsync(
    lib.processJwksResponse(getResponse(JSON.stringify({ keys: [] }), { status: 404 })),
    {
      message: '"response" is not a conform JSON Web Key Set response',
    },
  )
  await t.throwsAsync(lib.processJwksResponse(getResponse(JSON.stringify([]))), {
    message: '"response" body must be a top level object',
  })
  await t.throwsAsync(lib.processJwksResponse(getResponse(JSON.stringify({ keys: {} }))), {
    message: '"response" body "keys" property must be an array',
  })
  await t.throwsAsync(lib.processJwksResponse(getResponse(JSON.stringify({ keys: [null] }))), {
    message: '"response" body "keys" property members must be JWK formatted objects',
  })
  await t.notThrowsAsync(async () => {
    const response = getResponse(JSON.stringify({ keys: [] }))
    await lib.processJwksResponse(response)
    t.false(response.bodyUsed)
  })
})
