const { test } = require('tap')
const server = require('../server')

test('server is ready', async (t) => {
  const app = await server()

  t.type(app, 'object')
})
