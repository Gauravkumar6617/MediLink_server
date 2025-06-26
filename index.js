import app from "./app.js";
import connectDb from "./config/connection.js"; // Make sure your function is named connectDb

const PORT = process.env.PORT || 8081;
const HOST = '0.0.0.0';

connectDb().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
    console.log(`🛠️ Admin Panel: http://localhost:${PORT}/admin`);
  });
});
