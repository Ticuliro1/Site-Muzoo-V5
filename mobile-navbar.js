class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);
mobileNavbar.init();


/*jogo da memoria*/
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

/*jogo da cobrinha */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const scoreDisplay = document.getElementById("score");

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

let box = 20;
let rows = canvas.height / box;
let columns = canvas.width / box;

let snake;
let direction;
let food;
let score;
let game;

function initializeGame() {
    snake = [];
    snake[0] = {
        x: Math.floor(columns / 2) * box,
        y: Math.floor(rows / 2) * box
    };
    direction = "right";
    food = {
        x: Math.floor(Math.random() * columns) * box,
        y: Math.floor(Math.random() * rows) * box
    };
    score = 0;
    scoreDisplay.textContent = score;
}

function startGame() {
    startButton.style.display = "none";
    restartButton.style.display = "none";
    canvas.style.display = "block";
    initializeGame();
    game = setInterval(drawGame, 100);
}

function restartGame() {
    clearInterval(game);
    initializeGame();
    startButton.style.display = "none";
    restartButton.style.display = "none";
    canvas.style.display = "block";
    game = setInterval(drawGame, 100);
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== "right") {
        direction = "left";
    } else if (event.keyCode === 38 && direction !== "down") {
        direction = "up";
    } else if (event.keyCode === 39 && direction !== "left") {
        direction = "right";
    } else if (event.keyCode === 40 && direction !== "up") {
        direction = "down";
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i % 2 === 0) ? "red" : "black"; // Alterna as cores da cobra coral
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "blue";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "left") snakeX -= box;
    if (direction === "up") snakeY -= box;
    if (direction === "right") snakeX += box;
    if (direction === "down") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * columns) * box,
            y: Math.floor(Math.random() * rows) * box
        };
        score++;
        scoreDisplay.textContent = score;
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (
        snakeX < 0 || snakeX >= canvas.width ||
        snakeY < 0 || snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        startButton.style.display = "block";
        restartButton.style.display = "block";
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}


// jogo de adivinhação 

// Seleciona os elementos HTML necessários
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resultMessage = document.getElementById('resultMessage');
const resetButton = document.getElementById('resetButton');

// Gera um número aleatório entre 1 e 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
console.log("Número pensado por Jack:", randomNumber); 

guessButton.addEventListener('click', handleGuess);
resetButton.addEventListener('click', resetGame);

function handleGuess() {
    const userGuess = Number(guessInput.value);

    if (userGuess < 1 || userGuess > 100) {
        resultMessage.textContent = 'Por favor, digite um número entre 1 e 100.';
    } else if (userGuess === randomNumber) {
        resultMessage.textContent = `Parabéns! Você adivinhou o número ${randomNumber}!`;
        guessButton.disabled = true;
    } else if (Math.abs(userGuess - randomNumber) <= 10) {
        resultMessage.textContent = 'Você está bem perto!';
    } else if (userGuess < randomNumber) {
        resultMessage.textContent = 'Tente um número maior.';
    } else {
        resultMessage.textContent = 'Tente um número menor.';
    }
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log("Novo número pensado por Jack:", randomNumber); 
    guessInput.value = '';
    resultMessage.textContent = '';
    guessButton.disabled = false;
}
