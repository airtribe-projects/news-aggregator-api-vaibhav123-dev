const express = require("express");
const userRoutes = require("./routes/user.routes");
const newsRoutes = require("./routes/news.routes");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/news", newsRoutes);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
