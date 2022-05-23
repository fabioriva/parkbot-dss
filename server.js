require('dotenv').config()
const logger = require('pino')()
const uWS = require('uWebSockets.js')
const { sendJson } = require('./lib/json')
const { Monitor } = require('./lib/Monitor')
const PLC = require('./lib/Plc')

function log(req) {
  logger.info({
    'user-agent': req.getHeader('user-agent'),
    method: req.getMethod(),
    url: req.getUrl()
  })
}

const screen1 = new Monitor(1, 'GARAGE 1')
const screen2 = new Monitor(2, 'GARAGE 2')
const screen3 = new Monitor(3, 'GARAGE 3')
const def = { area: 0x84, dbNumber: 540, start: 0, amount: 30, wordLen: 0x02 }
const obj = { online: false, monitors: [screen1, screen2, screen3] }

const start = async () => {
  try {
    const app = uWS.App().listen(parseInt(process.env.PORT), token => {
      if (token) {
        logger.info('Listening to port %s', process.env.PORT, token)
      } else {
        logger.info('Failed to listen to port %s', process.env.PORT)
      }
    })
    const plc = new PLC({
      ip: process.env.PLC_ADDR,
      rack: parseInt(process.env.PLC_RACK),
      slot: parseInt(process.env.PLC_SLOT),
      polling_time: parseInt(process.env.PLC_POLL)
    })
    plc.main(def, obj)
    plc.on('pub', ({ channel, data }) => logger.info(JSON.parse(data)))
    // routes
    app.get('/dss', (res, req) => {
      log(req)
      sendJson(res, obj)
    })
    app.get('/monitor/:id', (res, req) => {
      log(req)
      sendJson(res, obj.monitors[req.getParameter(0)])
    })
  } catch (err) {
    logger.error(err)
    logger.error(new Error(err))
    process.exit(1)
  }
}

start()