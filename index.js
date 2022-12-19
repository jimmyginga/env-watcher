const fs = require("fs");
const { exec } = require("child_process");

export function watch(keyFromPackageJson) {
  console.log("watching .env file changes...");
  fs.watchFile(".env", (event, fileName) => {
    console.log(".env file changed...");
    console.log("Restarting server...");
    exec("kill -INT 888", (err, stdout) => {
      if (err) console.log(`Error. Can not stop the server. Details: ${err}`);
    });
    console.log("Server stopped");
    exec(`${keyFromPackageJson.commandToRun}`, (err, stdout) => {
      if (err) return console.log(`Error ${err}`);
      console.log(`output => ${stdout}`);
    });
    console.log("Server started");
  });
}
