const Shape = {
    Rock: 'Rock',
    Paper: 'Paper',
    Scissors: 'Scissors'
};

function getComputerChoice() {
    // Returns random Shape
    return Object.keys(Shape)[Math.floor(Math.random() * Object.keys(Shape).length)];
}
