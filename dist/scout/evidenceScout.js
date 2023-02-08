var evidenceScout = document.getElementById("evidenceScout");
var loaderContainer = document.getElementById("loaderContainer");
var resultsShower = document.getElementById("resultsShower");

async function scoutEvidence() {

    loaderContainer.style.display = "flex";
    evidenceScout.style.display = "none";
    resultsShower.style.display = "none";

    var essayTitleInput = document.getElementById("essayTitleInput").value;
    essayTitleInput = essayTitleInput.replace(/(\r\n|\n|\r)/gm, "");

    var fullPrompt = `List 5 real evidence supporting this essay question, ${essayTitleInput}, with a quote, its source, and explanation, each labelled:`;
      
    console.log(fullPrompt);

    var url = "https://api.openai.com/v1/completions";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer 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`);
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          loadingPercentage.innerHTML = "100%";
          console.log(xhr.status);
          if (xhr.status === 503) {
            alert("Error: Server overloaded. Please try again later.");
          }
          console.log(xhr.responseText);
          var responseText = JSON.parse(xhr.responseText);
          const text = responseText.choices[0].text;
          console.log(text.slice(2));   
          var enhancedEssay = document.getElementById("enhancedEssay");
          var newtext = text.slice(2);
          var listedEssay = newtext.split("\n");
          listedEssay = listedEssay.filter(elm => elm);
          console.log(listedEssay);

          var resultsContainer = document.getElementById("resultsContainer");

          for (var x = 0; x < 5; x++) {
            //Create Big DIV
            var evContainer = document.createElement("div");
            evContainer.classList.add("evContainer");

            //
            var evTitle = document.createElement("h1");
            evTitle.classList.add("evTitle");
            evContainer.appendChild(evTitle);

            //
            var evQuote = document.createElement("p");
            evQuote.classList.add("evQuote");
            evQuote.innerText = `${listedEssay[x*3]}`;
            evContainer.appendChild(evQuote);

            //
            var evSource = document.createElement("p");
            evSource.classList.add("evSource");
            evSource.innerText = `${listedEssay[x*3+1]}`;
            evContainer.appendChild(evSource);

            //
            var evExplain = document.createElement("p");
            evExplain.classList.add("evExplain");
            evExplain.innerText = `${listedEssay[x*3+2]}`;
            evContainer.appendChild(evExplain);

            resultsContainer.appendChild(evContainer);

            var br = document.createElement("br");
            resultsContainer.appendChild(br);

        }


        loaderContainer.style.display = "none";
        evidenceScout.style.display = "block";
        resultsShower.style.display = "block";
        }};
    
    var data = `{
        "model": "text-davinci-003",
        "prompt": "${fullPrompt}",
        "temperature": 0.7,
        "max_tokens": 1000,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
      }`;      
    
    xhr.send(data);

}


function copyText() {
  var enhancedEssay = document.getElementById("enhancedEssay");
  var copyToClipboardText = document.getElementById("copyToClipboardText");
  var copyToClipboardImg = document.getElementById("copyToClipboardImg");

  navigator.clipboard.writeText(enhancedEssay.innerText);

  copyToClipboardText.innerText = "Copied";
  copyToClipboardImg.src = "Assets/tick.png";

  setTimeout(function(){
    copyToClipboardText.innerText = "Copy text";
    copyToClipboardImg.src = "Assets/copytoclipboard.png"  
}, 2000);

}
