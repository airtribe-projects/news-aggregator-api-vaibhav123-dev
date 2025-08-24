const express = require("express");
const { getNews } = require("../controllers/news.controller");
const verifyJWT = require("../middlewares/verifyJWT.middleware");
const router = express.Router();

router.route("/").get(verifyJWT, getNews);

module.exports = router;


