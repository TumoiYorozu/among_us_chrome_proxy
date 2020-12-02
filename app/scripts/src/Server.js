const dgram = require('chrome-dgram');
const EventEmitter = require('events');
const { AmongUs } = require('./constants');
const { stringToHex } = require('./utils');

class Server extends EventEmitter {
  constructor(name = 'Proxy', ip = '127.0.0.1', usersInGame = 1) {
    super();
    this.name = name;
    this.ip = ip;
    this.usersInGame = usersInGame;

    const socket = dgram.createSocket('udp4');

    this.socket = new Promise(rs => {
      socket.bind(AmongUs.serverPort, () => {
        let first = true;
        socket.on('message', (msg, rinfo) => {
          this.rinfo = rinfo;
          if (first) {
            first = false;
            rs(socket);
          }

          this.emit('message', msg, rinfo);
        });
      });
    });
  }

  sendDiscovery(bc) {
    if(bc.length == 0){
      console.log("bc is empty!", bc);
      return;
    }
    const discovery = (this.discovery = dgram.createSocket('udp4'));
    const message = Buffer.from(
      `0402${stringToHex(this.name)}7e4f70656e7e${stringToHex(
        `${this.usersInGame}`
      )}7e`,
      'hex'
    );
    let i = 0;
    discovery.bind(0, () => { // FIX
      // dicovery.setMulticastTTL(4);
      this.discoveryInterval = setInterval(() => {
        // console.log("broadcast send", this.ip);
        discovery.setBroadcast(true);
        discovery.send(message, AmongUs.broadcastPort, bc[i]);
        // discovery.send(message, AmongUs.broadcastPort, this.ip);
        i = (i + 1) % bc.length;
      }, 1000 / bc.length);
    });
  }

  async send(msg) {
    const socket = await this.socket;
    return new Promise((rs, rj) => {
      socket.send(msg, this.rinfo.port, this.rinfo.address, err => {
        if (err) rj(err);
        else rs();
      });
    });
  }

  async close() {
    clearInterval(this.discoveryInterval);
    this.discovery.close();

    const socket = await this.socket;
    return new Promise((rs, rj) => {
      socket.close(err => {
        if (err) rj(err);
        else rs();
      });
    });
  }
}

module.exports = Server;
