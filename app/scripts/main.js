require("babel-polyfill") 

// const Host  = require('./src/Host');
const Guest = require('./src/Guest');

function main(argv) {
  console.log("main!")

  switch (argv.cmd) {
    case 'guest': {
      const guest = new Guest(argv.host, argv.bc);
      
      console.log('Connecting to:', argv.host);
      if(guest.client == null) {
        document.getElementById('status').innerHTML = "invalid address format"
        return;
      }

      guest.on('connect', () => {
        console.log('connected');
        document.getElementById('status').innerHTML = "connected"
      });

      guest.on('error', error => {
        console.log("Error", error.toString());
        document.getElementById('status').innerHTML = "connection error"
        // process.exit(-1);
      });

      if (argv.debug) {
        guest.on('message', ({ origin, message: msg }) => {
          const parsed = parse(msg);
          if (parsed && parsed.type === 'ping') return;
          switch (origin) {
            case 'game':
              print('<-', msg);
              break;

            case 'socket':
              print('->', msg);
              break;
          }
          if (parsed)
            console.log(
              parsed instanceof Error
                ? parsed.toString()
                : JSON.stringify(parsed)
            );
        });
      }
      break;
    }
  }
}

function get_nic_broadcasts() {
  let res = [];
  chrome.system.network.getNetworkInterfaces(eths => eths.forEach(e => {
    if(e.prefixLength<=32){
      let x=e.address.split('.').reduce((a, v)=>a*256+parseInt(v),0);
      x=(x|(1<<32-e.prefixLength)-1)>>>0;
      let b=(x>>24&255)+'.'+(x>>16&255)+'.'+(x>>8&255)+'.'+(x&255);
      //console.log(e.address, e.prefixLength, b)
      res.push(b)
    }
  }))
  return res
}

function connect_as_guest(){
  var host = document.getElementById("host_address").value;
  var bc_local  = document.getElementById("bc_local").checked;
  const argv = {
    cmd   : 'guest',
    host  : host,
    bc    : bc_local ? ["127.0.0.1"] : get_nic_broadcasts(),
    debug : false
  }
  console.log(argv);
  document.getElementById('status').innerHTML = "connecting..."
  main(argv)
}

document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('guest_connect');
  link.addEventListener('click', function() {
    connect_as_guest()
  });
});
