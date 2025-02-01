const canvas = document.getElementById('grid');
const c = canvas.getContext('2d');
context.scale(20, 20);

const grid = createMatrix(10, 20);

const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
};

