// const arr consist of object for name and image
const arr = [
    {
        name: "Lizard",
        image: "lizard.png"
    },
    {
        name: "Paper",
        image: "paper.png"
    },
    {
        name: "Rock",
        image: "rock.png"
    },
    {
        name: "Scissor",
        image: "scissor.png"
    },
    {
        name: "Spock",
        image: "spock.png"
    }
]

// const rule for the game rules and strength of the player options (Rock, Paper, Scissor, Lizard, Spock)
const rule = {
    Lizard: ["Spock", "Paper"],
    Paper: ["Rock", "Spock"],
    Rock: ["Lizard", "Scissor"],
    Scissor: ["Paper", "Lizard"],
    Spock: ["Scissor", "Rock"]
}

// const player1Options an list
const player1Options = document.querySelectorAll("#player1 .available-options .option")
// const botOptions an list
const botOptions = document.querySelectorAll("#player2 .available-options .option")

// select the player1 and bot selected option area
const playerShowArea = document.querySelector("#player1 .selected-option .option")
// select the bot selected option area
const botShowArea = document.querySelector("#player2 .selected-option .option")

// select the player1 score area
const player1Score = document.querySelector("#player1-score")
// select the player2 score area
const player2Score = document.querySelector("#player2-score")
// select the round message area
const roundMessage = document.querySelector("#round-message")
// select the reset button
const resetButton = document.querySelector("#reset")

// function play for play the game with e parameter
function play(e) {
    const player1 = e.getAttribute("data-index")
    const bot = Math.floor(Math.random() * arr.length)
    showPlayerOption(player1, playerShowArea)
    showPlayerOption(bot, botShowArea)
    highlightSelectedOption(player1, player1Options)
    highlightSelectedOption(bot, botOptions)
    calculateScore(player1, bot)
}

// player1Options forEach loop for click event listener and play function with e parameter
player1Options.forEach(e => {
    e.addEventListener("click", function() {
        play(e)
    })
})

// image folder path from assets
const imgPath = "./assets/"

//! Generate an image element (generateImgElement with index)
function generateImgElement(index) {
    const {name, image} = arr[index]
    const imgElement = document.createElement("img")
    imgElement.src = `${imgPath}${image}`
    imgElement.alt = name
    imgElement.title = name
    return imgElement
    // <img src='assets/lizard.png' alt='Lizard' title='Lizard' />
}

//! Show selected option (showPlayerOption with index and showArea)
function showPlayerOption(index, showArea) {
    const imageElement = generateImgElement(index)
    showArea.innerHTML = ""
    showArea.append(imageElement)
}

//! highlightSelectedOption function with index and options array
function highlightSelectedOption(index, options) {
    options.forEach(el => {
        el.classList.remove("active")
    })
    options[index].classList.add("active")
}

// function reset for reset the game and set the score to 0 and remove the active class from the player1Options and botOptions
function reset() {
    playerShowArea.innerHTML = ""
    botShowArea.innerHTML = ""
    player1Score.textContent = 0
    player2Score.textContent = 0
    roundMessage.textContent = "Choose Your Option"
    player1Options.forEach(e => {
        e.classList.remove("active")
    })
    botOptions.forEach(e => {
        e.classList.remove("active")
    })
}

// reset click event listener for reset function
resetButton.addEventListener("click", reset)

//! Show the message (showMessage with msg)
function showMessage(msg) {
    roundMessage.textContent = msg
}

//! Claculate function for player 1, player 2 scores (calculateScore with player1, player2)
function calculateScore(player1, player2) {
    const player = arr[player1].name
    const bot = arr[player2].name
    console.log(player1, player2)
    if (player1 === player2) {
        showMessage('No winner 👻')
    } else if (rule[player].includes(bot)) {
        addScore(player1Score)
        showMessage('Player is winner 🎉')
    } else {
        addScore(player2Score)
        showMessage('Bot is winner 🥶')
    }
}

//! Change the score (addScore with player)
function addScore(player) {
    player.textContent = Number(player.textContent) + 1
}

//TODO:: *** confity, alert message, storage score, if the difference is 15 and biger, then reset game and new game start, if I want to add a third player option add it ***