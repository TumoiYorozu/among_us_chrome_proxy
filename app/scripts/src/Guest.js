const EventEmitter = require('events');
// const WebSocketClient = require('websocket').w3cwebsocket;
// const WebSocket = require('ws');
const Server = require('./Server');
const { WsProtocol } = require('./constants');

function blobToArrayBuffer(blob, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', function(event) {
    const arrayBuffer = event.target.result;
    callback(arrayBuffer);
  });
  reader.readAsArrayBuffer(blob);
}

class Guest extends EventEmitter {
  constructor(host, bc) {
    super();
    this.host = host;
    this.server = null;

    //const client = (this.client = new WebSocketClient(host));
    try {
      this.client = new WebSocket(host);
    } catch (e){
      this.client = null;
      return;
    }
    const client = this.client;

    client.onerror = error => {
      this.emit('error', error);
    };

    client.onopen = conn => {
      this.emit('connect', { host, connection: conn });
      const server = (this.server = new Server());
      server.sendDiscovery(bc);
      server.on('message', msg => {
        // console.log("rcv message", msg);
        this.emit('message', { message: msg, origin: 'game' });
        client.send(msg);
      });
    }
    client.onmessage = msg => {
      // console.log("srv message", msg.data);
      this.emit('message', { message: msg, origin: 'socket' });
      // if (msg.type === 'binary') this.server.send(msg.binaryData);
      //this.server.send(msg.data);
      blobToArrayBuffer(msg.data, ab=>{
        this.server.send(Buffer.from(ab));
      })
    }

    client.onclose = () => {
      if(this.server) {
        this.server.close();
      }
      this.emit('error', new Error('Connection closed'));
    };
  }

  close() {
    if (this.server) this.server.close();
    this.client.abort();
  }
}

module.exports = Guest;
