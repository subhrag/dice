let player1 = document.querySelector("#playerId1");
let player2 = document.querySelector("#playerId2");

let buttons = document.querySelectorAll(".player");

let dice1 = document.querySelector("#dice-1");
let dice2 = document.querySelector("#dice-2");
let scoreId1 = document.getElementById("score1");
let scoreId2 = document.getElementById("score2");
let modal = document.getElementById("winnerModal");
let modalContent = document.getElementById("winnerModal__content--paragraph");
let closeSpan = document.querySelector(".close");

let playModule = (function() {

    let result1 = 0;
    let result2 = 0;
    const max_score = 50;
    let number1 = 0;
    let number2 = 0;

    function randomNum() {
        return Math.floor(Math.random() * 6) + 1;
    };

    function calculateCurrentScore(number1, number2, id) {
        let currentResult;
        if (number1 == number2) {
            currentResult = number1 * number1;
        } else {
            currentResult = number1 + number2;
        }
        return currentResult;
    }

    function calculateFinalScore(number1, number2, id) {
        if (id == player1.id) {

            if (result1 == 0) {
                result1 = calculateCurrentScore(number1, number2, id);
            } else {
                result1 = result1 + calculateCurrentScore(number1, number2, id);
            }
            scoreId1.innerHTML = result1;
            document.getElementById("playerId1").disabled = true;
            document.getElementById("playerId2").disabled = false;

        }
        if (id == player2.id) {
            if (result2 == 0) {
                result2 = calculateCurrentScore(number1, number2, id);
            } else {
                result2 = result2 + calculateCurrentScore(number1, number2, id);
            }
            scoreId2.innerHTML = result2;
            document.getElementById("playerId2").disabled = true;
            document.getElementById("playerId1").disabled = false;
        }

    }

    function rollDice(id) {
        number1 = randomNum();
        number2 = randomNum();
        dice1.innerHTML = number1;
        dice2.innerHTML = number2;
        calculateFinalScore(number1, number2, id);
        if (result1 >= max_score) {
            modal.style.display = "block";
            modalContent.innerHTML = "Result " + result1 + ". !! Player 1 won !!"
        }
        if (result2 >= max_score) {
            modal.style.display = "block";
            modalContent.innerHTML = "Result " + result2 + ". !! Player 2 won !!"
        }

    }


    return {
        roll: function() {
            rollDice(this.id);
        }
    };
})();


buttons.forEach(function(button) {
    button.addEventListener('click', playModule.roll);

});


closeSpan.addEventListener('click', function() {
    modal.style.display = "none";
});