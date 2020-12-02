const dgram = require('chrome-dgram');
const EventEmitter = require('events');
const { AmongUs } = require('../constants');

function getString(buffer, start, separator = 0x7e) {
  let str = '';
  for (let i = start; buffer[i] !== separator; i++) {
    str += String.fromCharCode(buffer[i]);
  }

  return str;
}

function parseMessage(buffer) {
  if (buffer[0] !== 0x04 || buffer[1] !== 0x02) return;

  const name = getString(buffer, 2);
  const open = getString(buffer, 2 + name.length + 1);
  const players = getString(buffer, 2 + name.length + 1 + open.length + 1);

  return {
    name,
    open,
    players,
  };
}

class Discovery extends EventEmitter {
  listen() {
    const socket = dgram.createSocket('udp4');
    console.log("Discovery.js 0", AmongUs.broadcastPort)

    this.socket = new Promise(rs => {
      console.log("Discovery.js 1", AmongUs.broadcastPort)

      socket.bind(AmongUs.broadcastPort, () => {
        socket.on('message', (msg, rinfo) => {
          a = parseMessage(msg)
          a.ip = rinfo.address
          console.log("Discovery.js", a)
          this.emit('message', a);
          // this.emit('message', { ...parseMessage(msg), ip: rinfo.address }); // FIX
        });

        rs(socket);
      });
    });
  }

  async close() {
    const socket = await this.socket;
    return new Promise((rs, rj) => {
      socket.close(err => {
        if (err) rj(err);
        else rs();
      });
    });
  }
}

module.exports = Discovery;
