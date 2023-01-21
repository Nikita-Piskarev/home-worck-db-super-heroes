const app = require("./app");

const server = require("http").createServer(app);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Start server, localhost PORT ${PORT}`);
});
