(function () {
  "use strict";
  var availableLetters; 
  var words;
  var guessInput; 
  var guess;
  var guessButton;  
  var lettersGuessed; 
  var lettersMatched; 
  var output; 
  var man;
  var letters; 
  var lives;
  var currentWord; 
  var numLettersMatched; 
  var messages;
  var wins = 0;
  var losses = 0;

  // this function contains all of the starting specifications for the game

  function setup() {
    availableLetters = "abcdefghijklmnopqrstuvwxyz";
      lives = 5;
      words = ["cat", "dog", "squid", "alligator"];
      messages = {
          win: "You win",
          lose: "Game over",
          guessed: "already guessed",
          validLetter: "Please enter a letter from A-Z"
      };
      lettersGuessed = lettersMatched = '';
      numLettersMatched = 0;

      currentWord = words
      [Math.floor(Math.random() * words.length)];

      output = document.getElementById("output");
      man = document.getElementById("man");
      guessInput = document.getElementById("letter");

      man.innerHTML = 'You have ' + lives + ' trys remaining';
      output.innerHTML = '';

      document.getElementById("letter").value = '';

      guessButton = document.getElementById("guess");
      guessInput.style.display = 'inline';
      guessButton.style.display = 'inline';


      letters = document.getElementById("letters");
      letters.innerHTML = '<li class="current-word">Animal in question:</li>';

      var letter, i;
        for (i = 0; i < currentWord.length; i++) {
          letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
          letters.insertAdjacentHTML('beforeend', letter);
        }
    //This function executes when the game ends either by guessing all the letters or life loss
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add('win');
            wins += 1;
            document.getElementById('wins').innerHTML = "wins" + wins;
        } 
        else {
            output.innerHTML = messages.lose;
            output.classList.add('error');
            losses += 1;
            document.getElementById('losses').innerHTML = "losses" + losses;
        }

        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
    }

    

     // Initializes the game when the browser window is finished loading
    window.onload = setup();

    //Just a restart button that recalls setup
    document.getElementById("restart").onclick = setup;


    //Input bar for placing guesses in
    guessInput.onclick = function () {
        this.value = '';
    };

    //Jungle of if/else statements that decides what to do with your guess
    document.getElementById('hangmanGuesses').onsubmit = function (event) {
        if (event.preventDefault) event.preventDefault();
        output.innerHTML = '';
        output.classList.remove('error', 'warning');
        guess = guessInput.value;

        // evauluates your guess
        if (guess) {
            // makes sure the index position of the guess isnt -1 
            if (availableLetters.indexOf(guess) > -1) {
                // displays a warning if a letter you've already guessed is repeated
                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                    output.classList.add("warning");

    
                }
                // if the letter guessed is in the word, add to lettersGuessed, and if final letter, call game over
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    if (numLettersMatched === currentWord.length) {
                        gameOver(true);
                    }
                }
                // if bad guess, subtract lives, warn output, or call Gameover
                else {
                    lettersGuessed += guess;
                    lives--;
                    man.innerHTML = 'You have ' + lives + ' lives remaining';
                    if (lives === 0) gameOver();
                }
            }   
            else {
                output.classList.add('error');
                output.innerHTML = messages.validLetter;
            }
        }
        else {
            output.classList.add('error');
            output.innerHTML = messages.validLetter;
        }
        //IF AN ERROR IS ENCOUNTERED DECOMMENT 'return false;'
        // return false;

    };

}());
