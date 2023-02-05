'use strict'

const createServer = require('./server')

const start = async () => {
  const server = await createServer()

  const host = server.config.API_HOST
  const port = +server.config.API_PORT

  try {
    await server.listen({ host, port })

    if (server.config.NODE_ENV === 'test') {
      server.log.level = 'silent'
    } else {
      server.log.level = server.config.LOG_LEVEL
    }
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
