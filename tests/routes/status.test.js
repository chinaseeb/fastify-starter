const { test } = require('tap')
const server = require('../../server')
const { version } = require('../../package.json')

test('GET /status should return status ok', async (t) => {
  const app = await server()
  app.log.level = 'silent'

  const response = await app.inject({
    method: 'GET',
    url: '/status'
  })

  t.equal(response.statusCode, 200)
  // t.equal(response.body, `{"status":"ok","version":"${version}"}`)
  t.same(response.json(), { 'status': 'ok', 'version': version })
})

test('GET /* should return 404 not found', async (t) => {
  const app = await server()
  app.log.level = 'silent'

  const response = await app.inject({
    method: 'GET',
    url: '/'
  })

  t.equal(response.statusCode, 404, 'Failure Response')
})
