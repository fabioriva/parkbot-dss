const EventEmitter = require('events')
const logger = require('pino')()
const snap7 = require('node-snap7')
const comm = require('./comm')
const { updateMonitors } = require('./Monitor')

class PLC extends EventEmitter {
  constructor(plc) {
    super()
    this.client = new snap7.S7Client()
    this.online = false
    this.plc = plc
  }

  error(error) {
    logger.error('[error] %s', error)
  }

  errorS7(error) {
    this.online = !this.client.Disconnect()
    logger.error('[error S7] %s', this.client.ErrorText(error))
  }

  async connect() {
    this.online = await comm.connectTo(this.client, this.plc)
    logger.info('PLC %s is online', this.plc.ip)
  }

  async data(def, obj) {
    try {
      const buffer = await this.read(def)
      await updateMonitors(0, buffer, 10, obj.monitors)
      this.publish('dss', obj)
    } catch (error) {
      this.error(error)
    }
  }

  async main(def, obj) {
    try {
      await this.connect()
      this.forever(def, obj)
    } catch (err) {
      this.error(err)
    }
  }

  forever(def, obj) {
    setTimeout(async () => {
      if (this.online) {
        await this.data(def, obj)
      } else {
        this.online = this.client.Connect()
        logger.info('re-connecting... %s', this.online)
      }
      obj.online = this.online
      this.forever(def, obj)
    }, this.plc.polling_time)
  }

  publish(channel, data) {
    this.emit('pub', { channel, data: JSON.stringify(data) })
  }

  async read(conn) {
    try {
      const buffer = await comm.readArea(
        this.client,
        conn.area,
        conn.dbNumber,
        conn.start,
        conn.amount,
        conn.wordLen
      )
      return buffer
    } catch (error) {
      this.errorS7(error)
    }
  }

  async write(conn, buffer) {
    try {
      const response = await comm.writeArea(
        this.client,
        conn.area,
        conn.dbNumber,
        conn.start,
        conn.amount,
        conn.wordLen,
        buffer
      )
      return response // return true on success
    } catch (error) {
      this.errorS7(error)
    }
  }
}

module.exports = PLC