import app from "./app.js";
import ConnectDb from "./config/connection.js";

const PORT = process.env.PORT || 8081;
const HOST = '0.0.0.0';

ConnectDb().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
  });
});
