(function(){
 
  //declare global variables
  let store = document.querySelector("#store");
  let clear = document.querySelector("#clear");
  let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

  //add eventlistener on store element
  store.addEventListener("click", () => {
    const question = document.querySelector("#question");
    const answer = document.querySelector("#answer");

    let flashcardInfo = {
      myQuestion : question.value,
      myAnswer  : answer.value
    }
  
    contentArray.push(flashcardInfo);
    localStorage.setItem('items', JSON.stringify(contentArray));

    fcMaker(contentArray[contentArray.length - 1], contentArray.length - 1);
    
    let textarea = document.querySelectorAll("textarea");
    textarea.forEach(texar => {
      texar.value = "";
    })

    window.location.reload();
  })

  //run fcmaker when page loads so any past work flashcard still shows
  contentArray.forEach(cont => {
    fcMaker(cont);
  })
    
  //flashcard maker function
function fcMaker(entry, entryIndex){
  const flashcard = document.createElement("div");
  const quest = document.createElement('h2');
  const ans = document.createElement('h2');
  const del = document.createElement('i');
  let display = document.querySelector("#display");

  flashcard.className = 'flashdeco';
  del.className = 'delete';

  quest.textContent = entry.myQuestion;
  ans.textContent = entry.myAnswer;
  del.textContent = ".";

  flashcard.appendChild(quest);
  flashcard.appendChild(ans);
  flashcard.appendChild(del);
  display.appendChild(flashcard);
};

//add event listener for clear button
clear.addEventListener("click", () => {
  localStorage.clear();
  display.innerHTML = '';
  contentArray = [];
})

//add event listener for delete buttons
let dels = document.querySelectorAll("i")
for (let i=0; i<dels.length; i++){
  dels[i].addEventListener("click", () => {
    contentArray.splice(i, 1);
    localStorage.setItem('items', JSON.stringify(contentArray));
    window.location.reload();
  })
}


})();