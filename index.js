const axios = require("axios");
const fs = require("fs");

const getQuote = async () => {
  try {
    const { data } = await axios.get("https://quotes.rest/qod?language=en");
    return data.contents.quotes[0];
  } catch (err) {
    console.error(err.message);
    return {};
  }
};

(async () => {
  const { quote, author } = await getQuote();
  if (!quote) return;
  fs.appendFile("README.md", `_**${quote}**_\n\n${author}`);
})();
