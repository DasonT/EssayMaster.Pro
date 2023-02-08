var essayEnhancer = document.getElementById("essayEnhancer");
var loaderContainer = document.getElementById("loaderContainer");
var resultsShow = document.getElementById("resultsShow");

async function enhanceEssay() {

    loaderContainer.style.display = "flex";
    essayEnhancer.style.display = "none";

    var essayInput = document.getElementById("essayInput").value;
    essayInput = essayInput.replace(/(\r\n|\n|\r)/gm, "");

    var fullPrompt = `Enhance this essay: ${essayInput}, by adding some advanced words and idioms, but still keep most of the original meaning`;
      
    console.log(fullPrompt);

    
    const response = await fetch("/.netlify/functions/send-prompt", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: fullPrompt,
        tokenlimit: 700
      })}
    ).then(response => response.json());  

  console.log(response);
  const data = response.results;
  console.log(data);
  console.log(data.choices[0].text);


          console.log(text.slice(2));   
          var enhancedEssay = document.getElementById("enhancedEssay");
          var newtext = data.choices[0].text.slice(2);
          var listedEssay = newtext.split(/[,.]/);
          console.log(listedEssay);
          var arrayLength = listedEssay.length;
          for (var x = 0; x < arrayLength; x++) {
            console.log(listedEssay[x]);
            console.log(fullPrompt.includes(listedEssay[x]).toString());
            if (fullPrompt.includes(listedEssay[x]).toString() === "false") {
                console.log(fullPrompt.includes(listedEssay[x]).toString());
                newtext = newtext.replace(listedEssay[x].toString(),`<span class="highlighted">${listedEssay[x]}</span>`);
            }
        };
    
        enhancedEssay.innerHTML = newtext;
        console.log(newtext);

        
      loaderContainer.style.display = "none";
      resultsShow.style.display = "block";


            //Do something
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
