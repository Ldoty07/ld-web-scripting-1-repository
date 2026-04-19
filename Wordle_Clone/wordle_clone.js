const game = {
    state: "playing",
    targetWord: "APPLE",
    currentRow: 0,
    currentCol: 0,
    guesses: ["", "", "", "", "", ""],
    feedback: [[], [], [], [], [], []]
};

function processInput(key) {
    if (game.state !== "playing") {
        return;
    }

    if (game.currentCol > 4 && key !== "ENTER" && key !== "BACKSPACE") {
        return;
    }

    if (key === "ENTER" && game.currentCol === 5) {
        for (let i = 0; i < 5; i++) {
          if (game.targetWord[i] === game.guesses[game.currentRow][i]) {
            game.feedback[game.currentRow].push("correct");
          } else if (game.targetWord.includes(game.guesses[game.currentRow][i])) {
            game.feedback[game.currentRow].push("present");
          } else {
            game.feedback[game.currentRow].push("absent");
          }
        };
        updateGame();
        renderGame();
        console.log(`Feedback: ${game.feedback}`)
    } else if (key === "BACKSPACE" && game.guesses[game.currentRow]) {
        game.guesses[game.currentRow] = game.guesses[game.currentRow].slice(0, game.currentCol - 1);
        game.currentCol --;
        console.log(`Guess: ${game.guesses[game.currentRow]}`);
        console.log(`Current Column: ${game.currentCol}`);
        console.log(`Current Row: ${game.currentRow}`);
    } else {
        if (key === "ENTER") {
            return;
        } else if (key === "BACKSPACE") {
            return;
        } else {
            game.guesses[game.currentRow] = game.guesses[game.currentRow] + key;
            game.currentCol ++;
            console.log(`Key: ${key}`);
            console.log(`Guess: ${game.guesses[game.currentRow]}`);
            console.log(`Current Column: ${game.currentCol}`);
            console.log(`Current Row: ${game.currentRow}`);
        }   
    }
}

function updateGame() {
    if (game.guesses[game.currentRow] === game.targetWord) {
        game.state = "win";
    } else if (game.currentRow === 5) {
        game.state = "lose";
    } else {
        game.currentRow ++;
        game.currentCol = 0;
    }
}

function renderGame() {
    const statusMsg = document.querySelector("#statusMsg");
    const row0 = document.querySelector("#row0");
    const row1 = document.querySelector("#row1");
    const row2 = document.querySelector("#row2");
    const row3 = document.querySelector("#row3");
    const row4 = document.querySelector("#row4");
    const row5 = document.querySelector("#row5");

    row0.innerHTML = "";
    row1.innerHTML = "";
    row2.innerHTML = "";
    row3.innerHTML = "";
    row4.innerHTML = "";
    row5.innerHTML = "";

    game.guesses.forEach((guess, guessIndex) => {
        
        if (guess) {
            for (let i = 0; i < guess.length; i++) {
                const letterDiv = document.createElement("div");
                letterDiv.classList.add("letterBox");
                letterDiv.textContent = guess[i];

                if (game.feedback[guessIndex][i] === "correct") {
                    letterDiv.classList.add("correct");
                } else if (game.feedback[guessIndex][i] === "present") {
                    letterDiv.classList.add("present");
                } else if (game.feedback[guessIndex][i] === "absent") {
                    letterDiv.classList.add("absent");
                }

                if (guessIndex === 0) {
                    row0.appendChild(letterDiv);
                } else if (guessIndex === 1) {
                    row1.appendChild(letterDiv);
                } else if (guessIndex === 2) {
                    row2.appendChild(letterDiv);
                } else if (guessIndex === 3) {
                    row3.appendChild(letterDiv);
                } else if (guessIndex === 4) {
                    row4.appendChild(letterDiv);
                } else if (guessIndex === 5) {
                    row5.appendChild(letterDiv);
                }
            }
        }
    });
    if (game.state === "playing") {
        statusMsg.textContent = "Game in progress";
    } else if (game.state === "lose") {
        statusMsg.textContent = "You lose."
    } else if (game.state === "win") {
        statusMsg.textContent = "You win!"
    }
}

function restartGame() {
    game.state = "playing";
    game.currentCol = 0;
    game.currentRow = 0;
    game.guesses = ["", "", "", "", "", ""];
    game.feedback = [[], [], [], [], [], []];
    renderGame();
}

document.addEventListener("keydown", (event) => {
    if (game.state !== "playing") {
        return;
    }

    const key = event.key.toUpperCase();
    processInput(key);
    renderGame();
});

const restartBtn = document.querySelector("#restartBtn");

restartBtn.addEventListener("click", restartGame);