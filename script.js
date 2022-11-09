const Shape = {
    Rock: 'Rock',
    Paper: 'Paper',
    Scissors: 'Scissors'
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
