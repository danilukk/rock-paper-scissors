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

function getPlayerChoice() {
    let playerChoice = formatStr( prompt(formatStr( Object.keys(Shape).join(', ') )  + '?') );

    return playerChoice;
}

function playRound() {
    const computerChoice = getComputerChoice();
    const playerChoice = getPlayerChoice();

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
