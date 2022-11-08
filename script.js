const Shape = {
    Rock: 'Rock',
    Paper: 'Paper',
    Scissors: 'Scissors'
};

const Winner = {
    Computer: 'You lose!',
    Player: 'You won!',
    Tie: "It's a tie!"
};

const Error = {
    WrongInput: 'Error: Wrong input. Try again!',
    NullInput: 'Game cancelled!'
}

const LogType = {
    Error: 'Error',
    Warn: 'Warn',
    Won: 'Won',
    Lose: 'Lose',
    Tie: 'Tie'
}

function formatStr(str) {
    if(str === null) return null;

    // '   sTrInG' => 'String'
    str = str.trim().split('');
    return str.shift().toUpperCase() + str.join('').toLowerCase();
}

function getComputerChoice() {
    // Returns random Shape
    return Object.keys(Shape)[Math.floor(Math.random() * Object.keys(Shape).length)];
}

function getPlayerChoice(roundNumber, roundsNumber) {
    let playerChoice = formatStr( prompt(`Round ${roundNumber}/${roundsNumber} - ` + formatStr( Object.keys(Shape).join(', ') )  + '?') );

    if(playerChoice === null)
        return Error.NullInput;
    if(!Shape.hasOwnProperty(playerChoice))
        return Error.WrongInput;

    return playerChoice;
}

function playRound(roundNumber, roundsNumber) {
    const computerChoice = getComputerChoice();
    const playerChoice = getPlayerChoice(roundNumber, roundsNumber);

    return {
        playerChoice: playerChoice,
        computerChoice: computerChoice,
        additionalMessage: (
                            playerChoice != computerChoice
                            && (playerChoice === Shape.Rock || playerChoice === Shape.Scisors)
                            && (computerChoice === Shape.Rock || computerChoice === Shape.Scissors)
                            ) ? 'Rock beats scissors!'
                        : (
                            playerChoice != computerChoice
                            && (playerChoice === Shape.Paper || playerChoice === Shape.Scisors)
                            && (computerChoice === Shape.Paper || computerChoice === Shape.Scissors)
                            ) ? 'Scissors beats paper!'
                        : (
                            playerChoice != computerChoice
                            && (playerChoice === Shape.Paper || playerChoice === Shape.Rock)
                            && (computerChoice === Shape.Paper || computerChoice === Shape.Rock)
                            ) ? 'Paper beats rock!'
                        : '',
        winner: (playerChoice === computerChoice) ? Winner.Tie
                : (playerChoice === Shape.Rock && computerChoice === Shape.Scissors) ? Winner.Player
                : (playerChoice === Shape.Scissors && computerChoice === Shape.Paper) ? Winner.Player
                : (playerChoice === Shape.Paper && computerChoice === Shape.Rock) ? Winner.Player
                : Winner.Computer
    };
}

function printLog(message, logType) {
    if(logType === LogType.Error) {
        console.error(message);
    }
    if(logType === LogType.Warn) {
        console.warn(message);
    }
    if(logType === LogType.Won) {
        console.log(`%c${message}`, "color: #91cc4d");
    }
    if(logType === LogType.Lose) {
        console.log(`%c${message}`, "color: #e25555");
    }
    if(logType === LogType.Tie) {
        console.log(`%c${message}`, "color: #dfdfdf");
    }

    alert(message);
}

function printWinner(playedRound, roundNumber, roundsNumber) {
    printLog(`Round ${roundNumber}/${roundsNumber} - ${playedRound.winner} ${playedRound.additionalMessage}\n`
                    + `Player choice - ${playedRound.playerChoice}\n`
                    + `Computer choice - ${playedRound.computerChoice}`,
        (playedRound.winner === Winner.Player) ? LogType.Won
        : (playedRound.winner === Winner.Computer) ? LogType.Lose
        : LogType.Tie);
}


function printTotalWinner(playerScore, computerScore) {
    printLog(`Game over! `
                +`${ (playerScore > computerScore) ? Winner.Player
                    : (playerScore < computerScore) ? Winner.Computer
                    : Winner.Tie }\n`
                + `Player score - ${playerScore}\n`
                + `Computer score - ${computerScore}\n`,
    (playerScore > computerScore) ? LogType.Won
    : (playerScore < computerScore) ? LogType.Lose
    : LogType.Tie);
}

function getRoundsNumber() {
    let roundsNumber = formatStr( prompt("Rounds number?") );

    if(isNaN(roundsNumber) || !Number.isInteger(Number(roundsNumber)) || roundsNumber === '') {
        printLog(Error.WrongInput, LogType.Error);
        return getRoundsNumber();
    }
    if(roundsNumber === null) {
        printLog(Error.NullInput, LogType.Warn);
        return Error.NullInput;
    }

    printLog(`You will play ${roundsNumber} rounds...`, LogType.Info, false);
    return Number(roundsNumber);
}

function game() {
    let playerScore = 0,
        computerScore = 0;

    let roundsNumber = getRoundsNumber();
    if(roundsNumber === Error.NullInput) return;

    for (let roundNumber = 1; roundNumber <= roundsNumber; roundNumber++) {
        const playedRound = playRound(roundNumber, roundsNumber);

        if(playedRound.playerChoice === Error.NullInput) {
            printLog(Error.NullInput, LogType.Warn);
            return;
        }
        if(playedRound.playerChoice === Error.WrongInput) {
            roundNumber--;
            printLog(Error.WrongInput, LogType.Error);
            continue;
        }

        printWinner(playedRound, roundNumber, roundsNumber);
        
        if(playedRound.winner === Winner.Player)
            playerScore++;
        if(playedRound.winner === Winner.Computer)
            computerScore++;
    }

    printTotalWinner(playerScore, computerScore);
}

game();
