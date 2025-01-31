let humanScore = 0;
let computerScore = 0;

function play(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = getResult(userChoice, computerChoice);
    document.getElementById('result').innerText = `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;
}

function getResult(userChoice, computerChoice) {
    if (userChoice == computerChoice) {
        return "It's a tie!";
    }
    if (
        (userChoice == 'rock' && computerChoice === 'scissors') ||
        (userChoice == 'paper' && computerChoice === 'rock') ||
        (userChoice == 'scissors' && computerChoice === 'paper')
    ) {
        humanScore++;
        document.getElementById('humanScore').innerText = `Human: ${humanScore}`;
        return "You win!";
    }
    computerScore++;
    document.getElementById('computerScore').innerText = `Computer: ${computerScore}`;
    return "You lose!";
}