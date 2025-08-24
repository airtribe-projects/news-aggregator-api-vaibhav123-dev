const axios = require("axios");
require("dotenv").config();

const getNews = async (req, res) => {
  const preferences = req.user.preferences;
  const apiKey = process.env.API_KEY;
  const query = preferences.join(" OR ");
  const endpoint = `https://gnews.io/api/v4/search?q=${query}&apikey=${apiKey}`;
  try {
    const response = await axios.get(endpoint);
    const articles = response.data.articles;

    if (!articles || articles.length === 0) {
      return res
        .status(404)
        .json({ message: "No news found for the given preferences" });
    }

    return res
      .status(200)
      .json({ message: "News fetch successfully", news: articles });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching news", error: error.message });
  }
};

module.exports = {
  getNews,
};

