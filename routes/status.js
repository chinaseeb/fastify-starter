const { version } = require('../package.json')

module.exports = {
  path: '/status',
  method: 'GET',
  handler: async (request, reply) => {
    const status = 'ok'

    return { status, version }
  }
}
