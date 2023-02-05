'use strict'

const Fastify = require('fastify')
const AutoLoad = require('@fastify/autoload')
const Cors = require('@fastify/cors')
const Env = require('@fastify/env')
const Sensible = require('@fastify/sensible')
const path = require('path')
const env = process.env

module.exports = async () => {
  const configSchema = {
    type: 'object',
    required: ['COOKIE_SECRET'],
    properties: {
      NODE_ENV: {
        type: 'string',
        // development, test, production
        default: 'development'
      },
  
      COOKIE_SECRET: {
        type: 'string'
      },
  
      LOG_LEVEL: {
        type: 'string',
        // fatal, error, warn, info, debug, trace, silent
        default: 'debug'
      },
  
      API_HOST: {
        type: 'string',
        default: 'localhost'
      },
  
      API_PORT: {
        type: 'string',
        default: '3000'
      }
    }
  }
  
  const configOptions = {
    confKey: 'config',
    schema: configSchema,
    data: env
  }

  try {
    const server = Fastify({
      ajv: {
        customOptions: {
          removeAdditional: 'all',
          coerceTypes: true,
          useDefaults: true
        }
      },
      logger: true
    })

    // register config
    await server.register(Env, configOptions)

    // small utilities
    await server.register(Sensible)

    // Enables the use of CORS
    await server.register(Cors, {
      origin: false
    })

    // register plugins
    await server.register(AutoLoad, {
      dir: path.join(__dirname, 'plugins')
    })

    // register routes
    await server.register(AutoLoad, {
      dir: path.join(__dirname, 'routes'),
      dirNameRoutePrefix: false
    })

    await server.ready()

    if (server.config.NODE_ENV === 'development') {
      console.log('server\'s configurations...')
      console.log(server.config)
    }

    return server
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
