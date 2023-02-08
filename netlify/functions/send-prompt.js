import fetch from "node-fetch";
const API_KEY =  process.env.apikey;

exports.handler = async function (event, context) {
  const eventBody = JSON.parse(event.body);

  const response = await fetch("https://api.openai.com/v1/completions",
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `${eventBody.prompt}:`,
        //prompt: `Write me a short happy birthday message:`,
        temperature: 0.7,
        max_tokens: eventBody.tokenlimit,  
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
        })
    })
        console.log(response.status);
    
    const data = await response.json()

    console.log(data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        results: data
      })
    }
  }
/*
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});*/




