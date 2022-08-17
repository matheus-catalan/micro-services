'use strict'

const amqp = require('amqplib')

class Rabbitmq {
  constructor(Config) {
    this.Config = Config
    this._rabbitmq = null
  }

  async get() {
    if (this._rabbitmq) {
      return this._rabbitmq
    }

    try {
      const open = await amqp.connect('amqp://localhost:5672')
      this._rabbitmq = open
    } catch (error) {
      this._rabbitmq = null
    }
    return this._rabbitmq
  }
}

module.exports = Rabbitmq
