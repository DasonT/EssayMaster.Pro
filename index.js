const express = require('express');
const app = express();
require('dotenv').config()
app.use(express.json());
app.use(express.static("dist"));
const request = require("request");
const API_KEY =  process.env.apikey;
const unirest = require("unirest");
const cheerio = require("cheerio");

app.post("/.netlify/functions/send-prompt", (req, res) => {
  const prompt = req.body.prompt;
  const tokenlimit = req.body.tokenlimit;
  request.post(
    {
      url: "https://api.openai.com/v1/completions",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      json: {
        model: "text-davinci-003",
        prompt: `${prompt}:`,
        temperature: 0.7,
        max_tokens: tokenlimit,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }
    },
    (error, response, body) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(JSON.stringify({
        results: body
      }));
    }
  );
});


app.post("/.netlify/functions/search-on-web", (req, res) => {
    const eventBody = req.body;
    const essayTitle = eventBody.query;
    return unirest
    .get(`https://www.google.com/search?q=${essayTitle}&hl=en`)
    .headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    })
    .then((response) => {
      let $ = cheerio.load(response.body);

      let titles = [];
      let links = [];
      let snippets = [];
      let displayedLinks = [];

      $(".yuRUbf > a > h3").each((i, el) => {
        titles[i] = $(el).text();
      });
      $(".yuRUbf > a").each((i, el) => {
        links[i] = $(el).attr("href");
      });
      $(".g .VwiC3b ").each((i, el) => {
        snippets[i] = $(el).text();
      });
      $(".g .yuRUbf .NJjxre .tjvcx").each((i, el) => {
        displayedLinks[i] = $(el).text();
      });

      const organicResults = [];

      for (let i = 0; i < 3; i++) {
        organicResults[i] = {
          title: titles[i],
          links: links[i],
          snippet: snippets[i],
          displayedLink: displayedLinks[i],
        };
      }
      console.log(organicResults)

      res.send(JSON.stringify({
            searchResults: organicResults
          }));
        
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});