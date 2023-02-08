var includeEvCheckbox = document.getElementById("includeEvCheckbox");
var evidenceSrcContainer = document.getElementById("evidenceSrcContainer");
var resultsShower = document.getElementById("resultsShower");
var essayWriter = document.getElementById("essayWriter");
var loaderContainer = document.getElementById("loaderContainer");



/*-----
Evidence Selection
-----*/

function evCheckboxSelection() {
    if (includeEvCheckbox.checked == true){
        evidenceSrcContainer.style.display = "block";
    } else {
        evidenceSrcContainer.style.display = "none";
    }
  }

/*-----
API Fetching
-----*/

async function sendPrompt() {
    
  var essayTitle = document.getElementById("essayTitleInput").value;
  var essayType = document.getElementById("essayTypeSelection").value;
  var wordCountValue = document.getElementById("wordCountValue").innerText;
  var tokenlimit = (parseInt(wordCountValue)*1.5)+200;

  console.log(tokenlimit);

  const webResults = await fetch("/.netlify/functions/search-on-web", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: essayTitle
    })}
    ).then(response => response.json());  

    var rawWebResults = await webResults;

    var webResultsPrompt = "Web search results:   ";

    for (let i = 0; i < rawWebResults.searchResults.length ; i++) {
      webResultsPrompt = `${webResultsPrompt} [${i+1}] ${JSON.stringify(rawWebResults.searchResults[i].snippet)}, URL: ${JSON.stringify(rawWebResults.searchResults[i].links)}`;
    }

    console.log(webResultsPrompt);
  
  const response = await fetch("/.netlify/functions/send-prompt", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: `Write a minimum ${wordCountValue}-word ${essayType} essay on ${essayTitle}, including evidence.`,
      tokenlimit: tokenlimit
    })}
    ).then(response => response.json());  

  console.log(response);
  const data = response.results;
  console.log(data);
  console.log(data.choices[0].text);
  var generatedEssayTitle = document.getElementById("generatedEssayTitle");
  var generatedEssay = document.getElementById("generatedEssay");
  generatedEssayTitle.innerText = essayTitle;
  generatedEssay.innerHTML = (data.choices[0].text.slice(2)).replace(/\n\n/g, '<br><br>'); 
  loaderContainer.style.display = "none";
  essayWriter.style.display = "block";
  resultsShower.style.display = "block";
}




/*-----
Generate Essay
-----*/

function generateEssay() {
    //Show loader
    essayWriter.style.display = "none";
    loaderContainer.style.display = "flex";
    resultsShower.style.display = "none";
    sendPrompt();
}


/*-----
Copy Essay
-----*/

function copyText() {
  var generatedEssay = document.getElementById("generatedEssay");
  var copyToClipboardText = document.getElementById("copyToClipboardText");

  navigator.clipboard.writeText(generatedEssay.innerText);

  copyToClipboardText.innerHTML = `<i class="fa-solid fa-check"></i>&ensp;&ensp;Copied`;

  setTimeout(function(){
    copyToClipboardText.innerHTML = `<i class="fa-solid fa-copy"></i>&ensp;&ensp;Copy text`;
  }, 2000);

}


/*-----
Select Word Count
-----*/

function wordCountValue() {
  var wordCountValue = document.getElementById("wordCountValue");
  var wordCountRange = document.getElementById("wordCountRange").value;

  wordCountValue.innerText = wordCountRange*8;
}

