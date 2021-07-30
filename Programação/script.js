const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let fistCard, secondCard;
let lockBoard = false;

function flipCard() {
    if(lockBoard) return;
    if(this === fistCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true; 
        fistCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
}

function checkForMath() {
    if(fistCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    fistCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        fistCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [fistCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition ; 
    })
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});