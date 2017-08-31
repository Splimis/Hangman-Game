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

  function setup() {
    availableLetters = "abcdefghijklmnopqrstuvwxyz";
      lives = 5;
      words = ["cat", "dog", "squid", "alligator"];
      messages = {
          win: "You win",
          lose: "Game over",
          guessed: "already guessed, please try again...",
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

     // Start game - should ideally check for existing functions attached to window.onload
    window.onload = setup();

    /* buttons */
    document.getElementById("restart").onclick = setup;


    /* reset letter to guess on click */
    guessInput.onclick = function () {
        this.value = '';
    };

    /* main guess function when user clicks #guess */
    document.getElementById('hangmanGuesses').onsubmit = function (event) {
        if (event.preventDefault) event.preventDefault();
        output.innerHTML = '';
        output.classList.remove('error', 'warning');
        guess = guessInput.value;

        /* does guess have a value? if yes continue, if no, error */
        if (guess) {
            /* is guess a valid letter? if so carry on, else error */
            if (availableLetters.indexOf(guess) > -1) {
                /* has it been guessed (missed or matched) already? if so, abandon & add notice */
                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                    output.classList.add("warning");

    
                }
                /* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                    /* check to see if letter appears multiple times */
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
                /* guess doesn't exist in current word and hasn't been guessed before, add to lettersGuessed, reduce lives & update user */
                else {
                    lettersGuessed += guess;
                    lives--;
                    man.innerHTML = 'You have ' + lives + ' lives remaining';
                    if (lives === 0) gameOver();
                }
            }
            /* not a valid letter, error */
            else {
                output.classList.add('error');
                output.innerHTML = messages.validLetter;
            }
        }
        /* no letter entered, error */
        else {
            output.classList.add('error');
            output.innerHTML = messages.validLetter;
        }
        return false;
    };
}());
