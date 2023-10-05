const currentPlayer = document.querySelector(".currentPlayer");
let selected = [];
let player = "X";

const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function init() {
    selected = [];

    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

    document.querySelectorAll(".game button").forEach((item, index) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
        item.addEventListener("click", () => {
            item.removeEventListener("click", newMove);
        });
        item.setAttribute("data-i", index);
    });
}

init();

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    if (selected[index]) return; // Prevent clicking on an already selected square
    e.target.innerHTML = player;
    selected[index] = player;

    setTimeout(() => {
        check();
    }, 100);

    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

function check() {
    const playerLastMove = player === "X" ? "O" : "X";

    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);

    for (const pos of positions) {
        if (pos.every((item) => items.includes(item))) {
            alert(`O JOGADOR ${playerLastMove} GANHOUUUU !`);
            init();
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {
        alert("DEU EMPATE, TENTE MAIS UMA VEZ!");
        init();
        return;
    }
}

const resetButton = document.querySelector(".resetButton");

resetButton.addEventListener("click", () => {
    init();
});
