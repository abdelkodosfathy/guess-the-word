// let joinBtn = document.querySelector(".join");
// let wordContainer = document.querySelector(".word-container");
// let key = document.querySelectorAll(".keyboard.en .key");
// let wordInput = document.querySelector("#word");
// let done = document.querySelector(".done-btn");
// let lettersBlank;
// let keysArr = [];
// let word = "koko";
// let score = word.length;




// (function () {
//   setBlanks();
// })();


// window.addEventListener("click", (el) => {
//   let element = el.target;
//   if(element.classList.contains("key")){
//     if(checkLetter(element.innerText,word)){
//       checkLetter(element.innerText,word);
//     } else if (!checkLetter(element.innerText,word) && !element.classList.contains("key-used")){
//       score--;
//       document.querySelector(".score span").innerText = score;
//     }
//   }
//   if(score == 0){
//     //lose statement
//   }

  
//   // if(all of the letters have class full)
//   // win statement 
//   // stop click function

  
// });

// //check givin letter in the word
// function checkLetter(letter,word,key) {
//   //if the word don't contain the letter
//   if(!word.toLowerCase().includes(letter.toLowerCase())){
//     return false;
//   }
//   //if the word contain's the letter
//   for(let i = 0; i < word.length; i++){
//     if(letter.toLowerCase() == word[i].toLowerCase()){
//       lettersBlank[i].classList.remove("empty");
//       lettersBlank[i].classList.add("full");
//       lettersBlank[i].innerText = letter;
//       letterUsed(letter);
//     }
//   }
//   return true;
// }

// function letterUsed(letter) {
//   for(let i = 0; i < key.length; i++){
//     if(letter == key[i].innerText){
//       key[i].classList.add("key-used");
//     }
//   }
// }

// //set the number of letters blank
// function setBlanks(){
//   let blanks = document.createElement("div");
//   for(let i = 0; i < word.length; i++){
//     let letter = document.createElement("span");
//     letter.classList.add("empty");
//     blanks.appendChild(letter);
//   }
//   wordContainer.innerHTML = `${blanks.innerHTML}`;
//   setScore();
// }
// function setScore(){
//   score = word.length;
//   lettersBlank = wordContainer.querySelectorAll("span.empty");
//   document.querySelector(".score span").innerText = score;
//   wordContainer.style.width = `${(word.length)*30 + (word.length)*9}px`;

// }

// joinBtn.onclick = ()=> {
//   let name = document.querySelector("#name").value;
//   let room = document.querySelector("#room").value;
//   if(name && room){
//     document.querySelector(".form-container").classList.add("dis-none");
//     document.querySelector(".game-container").classList.remove("dis-none");
//   }
// }

// done.onclick = () => {
//   word = wordInput.value;
//   setBlanks();
// }


// this is the new code that you can edit

let joinBtn = document.querySelector(".join");
let wordContainer = document.querySelector(".word-container");
let key = document.querySelectorAll(".keyboard.en .key");
let wordInput = document.querySelector("#word");
let done = document.querySelector(".done-btn");
let lettersBlank;
let keysArr = [];
let word = "koko";
let score = word.length;




window.addEventListener("click", (el) => {
  let element = el.target;
  if(element.classList.contains("key")){
    if(checkLetter(element.innerText,word)){
      checkLetter(element.innerText,word);
    } else if (!checkLetter(element.innerText,word) && !element.classList.contains("key-used")){
      score--;
      document.querySelector(".score span").innerText = score;
    }
  }
  if(score == 0){
    //lose statement
  }

  
  // if(all of the letters have class full)
  // win statement 
  // stop click function

  
});

//check givin letter in the word
function checkLetter(letter,word,key) {
  //if the word don't contain the letter
  if(!word.toLowerCase().includes(letter.toLowerCase())){
    return false;
  }
  //if the word contain's the letter
  for(let i = 0; i < word.length; i++){
    if(letter.toLowerCase() == word[i].toLowerCase()){
      lettersBlank[i].classList.remove("empty");
      lettersBlank[i].classList.add("full");
      lettersBlank[i].innerText = letter;
      letterUsed(letter);
    }
  }
  return true;
}

function letterUsed(letter) {
  for(let i = 0; i < key.length; i++){
    if(letter == key[i].innerText){
      key[i].classList.add("key-used");
    }
  }
}

//set the number of letters blank
function setBlanks(){
  let blanks = document.createElement("div");
  for(let i = 0; i < word.length; i++){
    let letter = document.createElement("span");
    letter.classList.add("empty");
    blanks.appendChild(letter);
  }
  wordContainer.innerHTML = `${blanks.innerHTML}`;
  setScore();
}
function setScore(){
  score = word.length;
  lettersBlank = wordContainer.querySelectorAll("span.empty");
  document.querySelector(".score span").innerText = score;
  wordContainer.style.width = `${(word.length)*30 + (word.length)*9}px`;

}



// ======================= let me arive to the code faster =======================
// ===============================================================================
// ===============================================================================
// //online


let playerName,playerRoom;

document.getElementById('name').addEventListener('input', () =>{
  playerName = document.getElementById('name').value;
  // console.log(playerName);
});
document.getElementById('room').addEventListener('input', () =>{
  playerRoom = document.getElementById('room').value;
  // console.log(playerRoom);
});


(function () {
  
  let playerId;
  let playerRef;
  let players = {};
  let playersChanges = {};
  let playerElements = {};
// 
//   let wordChange = firebase.database().ref().child(`players/`);
//   wordChange.on("value", (snapshot) => {
//     const addedPlayer = snapshot.val();
//     let arr = Object.keys(addedPlayer);
//     for(let i = 0; i < arr.length; i++){
//       console.log(addedPlayer[arr[i]].word);

//       //to see other player
//       if(addedPlayer[arr[i]].name == playerName){
//         console.log(addedPlayer[arr[i]].word);
//       }
//     }
//   });




  firebase.auth().onAuthStateChanged((user) => {
    let writer = true, guesser = false;
    console.log("user : ",user);
    if(user){
      // you loged in 
      playerId = user.uid;
      playerRef = firebase.database().ref(`players/${playerId}`);
      
      wordRef = firebase.database().ref(`word`);
      wordRef.on("value", (snapshot) => {
        word = snapshot.val().wordT;
        console.log(snapshot.val());
        setBlanks();
      });

      
      //start of choosing who will write and who will guess the word

      let allplayersRef = firebase.database().ref(`players`);
      // that print the each elemnt's content
      allplayersRef.on("value", (snapshot) => {
        const change = snapshot.val();
        playersChanges = snapshot.val() || {};
        
        Object.keys(playersChanges).forEach((keyElement) => {
          console.log("value: ", playersChanges[keyElement]);
          if(playersChanges[keyElement].writer && playersChanges[keyElement].id == playerId){
            console.log("main id : ",playersChanges[keyElement].id);
            console.log("player id : ",playerId);
              for(let i = 0; i < key.length; i ++) {
              key[i].classList.add("not-useble");
      
              }
              console.log("write : ", writer);
              console.log("guess : ", guesser);
              
            }
            else if (playersChanges[keyElement].guesser && playersChanges[keyElement].id == playerId) {
              document.querySelector(".enter-word").classList.add("dis-none");
              console.log("write : ", writer);
              console.log("guess : ", guesser);
            }
            if(playersChanges[keyElement].writer){
              writer = false;
              guesser = true;
            }
            

        });
      });

      // that print the content of one elemnt
      // allplayersRef.on("child_added", (snapshot) => {
      //   const addedPlayer = snapshot.val();
      //   console.log("its childe add");
      //   players = snapshot.val() || {};
      //   Object.keys(players).forEach((key) => {
      //     console.log("player name : ", players[key]);
      //   });
      // });

      //end of choosing who will write and who will guess the word


      // starting the game 

      // ================       =========================
      // =============     ====   =======================
      // ===========    ========   ======================
      // ==========    ==================================
      // ==========    ==================================
      // ==========    ======      ======================
      // ==========    ==========   =====================
      // ===========    =========   =====================
      // =============    =====    ======================
      // ================         =======================
      // ================================================
      function initGame(){
        done.onclick = () => {
          word = wordInput.value;
          wordRef.set({
            wordT: word,
          })
          setBlanks();
        }
      }
        
      //end of iti game=================================================================
      // ===============================================================================

      
      document.addEventListener('click', (el) =>{
        if(el.target.classList.contains("join") && (playerName == null|| playerRoom == null)){
          window.alert("fill data");
        }
        else if( el.target.classList.contains("join") && (playerName && playerRoom)){
          playerRef.set({
            id: playerId,
            name: playerName,
            roomCode: playerRoom,
            letters: [],
            score: 0,
            writer: writer,
            guesser: guesser,
            word: word,
          });

          document.querySelector(".form-container").classList.add("dis-none");
          document.querySelector(".game-container").classList.remove("dis-none");
          //Begin the game now that we are signed in
          initGame();
        }

      });
      //remove me from firebase when i disconnect
      playerRef.onDisconnect().remove();
    } else {
      // you loged out 
    }

  })


// to print the errors..
  firebase.auth().signInAnonymously().catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode,errorMessage);
  });
})();