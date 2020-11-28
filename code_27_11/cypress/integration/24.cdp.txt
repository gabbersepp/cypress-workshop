const fs = require("fs");
const CDP = require('chrome-remote-interface');

function ensureRdpPort(args) {
    const existing = args.find(arg => arg.slice(0, 23) === '--remote-debugging-port')
  
    if (existing) {
      return Number(existing.split('=')[1])
    }
  
    port = 40000 + Math.round(Math.random() * 25000)
    args.push(`--remote-debugging-port=${port}`)
    return port
  }

let port, client = null;
module.exports = (on, config) => {
    on('before:browser:launch', (browser, args) => {
        port = ensureRdpPort(args.args);
      })

    on("task", {
        doesFileExist({ path }) {
            return fs.existsSync(path);
         },
         activatePrintMediaQuery: async () => {
            client = client || await CDP({ port });
            return client.send('Emulation.setEmulatedMedia', { media: "print" })
        },
        resetCRI: async () => {
            if (client) {
                await client.close();
            }

            return Promise.resolve(true);
        }
    })
}
