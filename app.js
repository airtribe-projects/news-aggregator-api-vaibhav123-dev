const express = require("express");
const userRoutes = require("./routes/user.routes");
const newsRoutes = require("./routes/news.routes");
const { logger } = require("./utils/logger.js");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/news", newsRoutes);

app.listen(port, (err) => {
  if (err) {
    logger.error("Something bad happened", err);
  }
  logger.info(`🚀 Server is listening on http://localhost:${port}`);
});

module.exports = app;

