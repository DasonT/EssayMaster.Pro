var includeEvCheckbox = document.getElementById("includeEvCheckbox");
var evidenceSrcContainer = document.getElementById("evidenceSrcContainer");
var resultsShower = document.getElementById("resultsShower");

var essayWriter = document.getElementById("essayWriter");
var loaderContainer = document.getElementById("loaderContainer");

function evCheckboxSelection() {
    if (includeEvCheckbox.checked == true){
        evidenceSrcContainer.style.display = "block";
    } else {
        evidenceSrcContainer.style.display = "none";
    }
  }

  
  

async function sendPrompt() {
    
  var essayTitle = document.getElementById("essayTitleInput").value;
  var essayType = document.getElementById("essayTypeSelection").value;
  var mainPointsCount = document.getElementById("mainPointCountSelection").value;
  var toggle = document.getElementById("toggle1");

    if (toggle.checked) {
        
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
      var webResultsPrompt = "Web Search Results: ";
      for (let i = 0; i < rawWebResults.searchResults.length ; i++) {
        webResultsPrompt = `${webResultsPrompt} [${i+1}]  ${JSON.stringify(rawWebResults.searchResults[i].title.replace(/["']/g, "").replace("...",""))}: ${JSON.stringify(rawWebResults.searchResults[i].snippet.replace(/["']/g, "").replace("...",""))}.`;
        //URL: ${JSON.stringify(rawWebResults.searchResults[i].links)}
      }
      console.log(webResultsPrompt);
      var fullPrompt = `${webResultsPrompt}.\n\nInstructions: Using the provided web search results, write a short but precise essay outline for "${essayTitle}" , including exactly and only ${mainPointsCount}, each with a point, evidence, and explanation. Format it as a array with ${mainPointsCount} JSON object(s) without naming, where each object represents one point. In each JSON object, it should include a point, labelled "point" in quotes, an evidence supporting the point, labelled "evidence" in quotes, with a short explanation, labelled "explanation" in quotes.`;
    
    } else {
      var fullPrompt = `Write a short but precise essay outline for "${essayTitle}" , including exactly and only ${mainPointsCount}, each with a point, evidence, and explanation. Format it as a array with ${mainPointsCount} JSON object(s) without naming, where each object represents one point. In each JSON object, it should include a point, labelled "point" in quotes, an evidence supporting the point, labelled "evidence" in quotes, with a short explanation, labelled "explanation" in quotes.`;
    }
    console.log(fullPrompt);

    const response = await fetch("/.netlify/functions/send-prompt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: fullPrompt,
      tokenlimit: 700
    })}
    ).then(response => response.json());  
 

  const data = response.results;
  console.log(data);
  console.log(data.choices[0].text);
  var array = JSON.parse(data.choices[0].text);
  console.log(array[1]);

  var resultsTable = document.getElementById("resultsTable");

  resultsTable.innerHTML = `                <tr>
  <th>#</th>
  <th>Point</th>
  <th>Evidence</th>
  <th>Explanation</th>
</tr>`;
  
  for (let i = 0; i < array.length; i++) {
    var tr = document.createElement("tr");
    var numtd = document.createElement("td");
    var pointtd = document.createElement("td");
    var evtd = document.createElement("td");
    var extd = document.createElement("td");
    numtd.textContent = i+1;
    pointtd.textContent = array[i].point;
    evtd.textContent = array[i].evidence;
    extd.textContent = array[i].explanation;
    tr.appendChild(numtd);
    tr.appendChild(pointtd);
    tr.appendChild(evtd);
    tr.appendChild(extd);
    resultsTable.appendChild(tr);
  }

  loaderContainer.style.display = "none";
  resultsShower.style.display = "block";
  essayWriter.style.display = "block";
}

function generateEssay() {
    //Show loader
    essayWriter.style.display = "none";
    loaderContainer.style.display = "flex";
    resultsShower.style.display = "none";
    sendPrompt();
}

function copyText() {
  var generatedEssay = document.getElementById("generatedEssay");
  var copyToClipboardText = document.getElementById("copyToClipboardText");

  navigator.clipboard.writeText(generatedEssay.innerText);

  copyToClipboardText.innerHTML = `<i class="fa-solid fa-check"></i>&ensp;&ensp;Copied`;

  setTimeout(function(){
    copyToClipboardText.innerHTML = `<i class="fa-solid fa-copy"></i>&ensp;&ensp;Copy text`;
  }, 2000);


}

function wordCountValue() {
  var wordCountValue = document.getElementById("wordCountValue");
  var wordCountRange = document.getElementById("wordCountRange").value;

  wordCountValue.innerText = wordCountRange*8;
}