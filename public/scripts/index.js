// ---------------- keyboards ------------------------
var keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
var keys2 = ["J", "K", "L", "M", "N", "O", "P", "Q", "R"];
var keys3 = ["S", "T", "U", "V", "W", "X", "Y", "Z", "-"];
var keyboard1 = document.querySelector("#keyboard1");
var keyboard2 = document.querySelector('#keyboard2');
var keyboard3 = document.querySelector('#keyboard3');

for (let key of keys) {

    var i = document.createElement('button');

    i.classList.add('btn');
    i.setAttribute('id', "lettre" + key);
    i.innerHTML = key;
    keyboard1.appendChild(i);
}

for (let key of keys2) {

    var i = document.createElement('button');

    i.classList.add('btn');
    i.setAttribute('id', "lettre2" + key);
    i.innerHTML = key;
    keyboard2.appendChild(i);
}

for (let key of keys3) {

    var i = document.createElement('button');

    i.classList.add('btn');
    i.setAttribute('id', "lettre3" + key);
    i.innerHTML = key;
    keyboard3.appendChild(i);
}

// ------------------ variables -------------------------
var guess;
var check;
var answerArray = [];
var wrongLetters = 0;
var count = 0;
var addPosition;
var positionRight = 36;
var positionBottom = 13;
var postionPirRight = 52;
var positionPirBottom = 14;
var deathPositionRight = 7.3;
var deathPositionBottom = 1.8;
var animDeathSanta;
var splash = document.querySelector('#splash');
var santa = document.querySelector('#santa');
var badPirate = document.querySelector('#badpirate');
var lettreA = document.querySelector('#lettreA');
var lettreB = document.querySelector('#lettreB')
var lettreC = document.querySelector('#lettreC');
var lettreD = document.querySelector('#lettreD');
var lettreE = document.querySelector('#lettreE');
var lettreF = document.querySelector('#lettreF');
var lettreG = document.querySelector('#lettreG');
var lettreH = document.querySelector('#lettreH');
var lettreI = document.querySelector('#lettreI');
var lettreJ = document.querySelector('#lettre2J');
var lettreK = document.querySelector('#lettre2K');
var lettreL = document.querySelector('#lettre2L');
var lettreM = document.querySelector('#lettre2M');
var lettreN = document.querySelector('#lettre2N');
var lettreO = document.querySelector('#lettre2O');
var lettreP = document.querySelector('#lettre2P');
var lettreQ = document.querySelector('#lettre2Q');
var lettreR = document.querySelector('#lettre2R');
var lettreS = document.querySelector('#lettre3S');
var lettreT = document.querySelector('#lettre3T');
var lettreU = document.querySelector('#lettre3U');
var lettreV = document.querySelector('#lettre3V');
var lettreW = document.querySelector('#lettre3W');
var lettreX = document.querySelector('#lettre3X');
var lettreY = document.querySelector('#lettre3Y');
var lettreZ = document.querySelector('#lettre3Z');
var lettreSpace = document.querySelector('#lettre3-');

var keyboardFull = [lettreA, lettreB, lettreC, lettreD, lettreE, lettreF, lettreG, lettreH, lettreI, lettreJ, lettreK, lettreL, lettreM, lettreN, lettreO, lettreP, lettreQ,
    lettreR, lettreS, lettreT, lettreU, lettreV, lettreW, lettreX, lettreY, lettreZ, lettreSpace];

// ----------------- Homepage -------------------------

var startBtn = document.querySelector('#start-btn');
var homepage = document.querySelector('.homepage');

startBtn.addEventListener('click', () => {

    homepage.style.display = 'none';
});

// ---------------- Anime redeye ----------------------
var confirmRed = true
function redeye() {

    if (confirmRed) {
        document.querySelector('.header__redeye').style.display = 'none';
        confirmRed = false;
    } else {
        document.querySelector('.header__redeye').style.display = '';
        confirmRed = true;
    }
}

setInterval(redeye, 1000);

// ------------------ fetch --------------------------
const folder = './data/words.json';


async function fetchWords(endpoint) {

    // read our JSON
    let response = await fetch(endpoint);
    let words = await response.json();
    var ramdomWord = Math.floor(Math.random() * words.data.length);
    return words.data[ramdomWord];

}

// ------------------ function --------------------


function transformLetter(letter) {
    check = letter.textContent.toLowerCase();
    guess = check;
}

function checkLetters(word, guess) {
    if (count < word.length) {

        for (var j = 0; j < word.length; j++) {
            if (word[j] === guess) {
                answerArray[j] = guess;
                response.innerHTML = answerArray.join(' ');
                count++;

            }
            if (count === word.length) {
                console.log("win")
                for (i = 0; i < keyboardFull.length; i++) {
                    keyboardFull[i].disabled = true;
                }
            }
        }
    }

    var j = (word.indexOf(guess));
    if (j === -1) {
        wrongLetters++;
        moveSanta();
        movePirate();
    }

}

function lostGame() {
    if (wrongLetters > 5) {
        console.log('perdu')
        for (i = 0; i < keyboardFull.length; i++) {
            keyboardFull[i].disabled = true;
        }
        animDeathSanta = setInterval(deathSanta, 50);
        setTimeout(() => {
            clearInterval(animDeathSanta)
            santa.style.opacity = "0";
            splash.style.display = 'initial';

        }, 1000)
    }
}

function disabledLetter(lettre) {
    lettre.disabled = true;
}

function moveSanta() {
    positionRight = positionRight - 4.1;
    santa.style.right = positionRight + '%';
    positionBottom = positionBottom - 1.6;
    santa.style.bottom = positionBottom + '%';
}

function movePirate() {
    postionPirRight = postionPirRight - 4;
    badPirate.style.right = postionPirRight + '%';
    positionPirBottom = positionPirBottom - 1.5;
    badPirate.style.bottom = positionPirBottom + '%';
}

function deathSanta() {

    santa.style.right = deathPositionRight;
    deathPositionBottom = deathPositionBottom - 2;
    santa.style.bottom = deathPositionBottom + '%';

}

// ------------------ Game -------------------------
var response = document.querySelector('#response');

async function startGame() {
    var word = await fetchWords(folder);

    // check word delette after
    var letterCheck = word.split('');
    console.log(letterCheck);

    //  Create secret answer
    for (var x = 0; x < word.length; x++) {
        answerArray[x] = "_";
    }

    // probleme de boucle
    for (i = 0; i < keyboardFull.length; i++) {

        keyboardFull[i].addEventListener('click', (lettre) => {

            check = lettre.target.innerHTML.toLowerCase();
            guess = check;
            lostGame();
            checkLetters(word, guess);
            disabledLetter(lettre.target);
        })
    }

    // lettreA.addEventListener('click', () => {

    //     transformLetter(lettreA);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreA);

    // })

    // lettreB.addEventListener('click', () => {

    //     transformLetter(lettreB);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreB);

    // })

    // lettreC.addEventListener('click', () => {

    //     transformLetter(lettreC);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreC);

    // })

    // lettreD.addEventListener('click', () => {

    //     transformLetter(lettreD);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreD);

    // })

    // lettreE.addEventListener('click', () => {

    //     transformLetter(lettreE);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreE);

    // })

    // lettreF.addEventListener('click', () => {

    //     transformLetter(lettreF);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreF);

    // })

    // lettreG.addEventListener('click', () => {

    //     transformLetter(lettreG);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreG);

    // })

    // lettreH.addEventListener('click', () => {

    //     transformLetter(lettreH);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreH);

    // })

    // lettreI.addEventListener('click', () => {

    //     transformLetter(lettreI);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreI);

    // })

    // lettreJ.addEventListener('click', () => {

    //     transformLetter(lettreJ);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreJ);

    // })

    // lettreK.addEventListener('click', () => {

    //     transformLetter(lettreK);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreK);

    // })

    // lettreL.addEventListener('click', () => {

    //     transformLetter(lettreL);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreL);

    // })

    // lettreM.addEventListener('click', () => {

    //     transformLetter(lettreM);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreM);

    // })

    // lettreN.addEventListener('click', () => {

    //     transformLetter(lettreN);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreN);

    // })

    // lettreO.addEventListener('click', () => {

    //     transformLetter(lettreO);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreO);

    // })

    // lettreP.addEventListener('click', () => {

    //     transformLetter(lettreP);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreP);

    // })

    // lettreQ.addEventListener('click', () => {

    //     transformLetter(lettreQ);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreQ);

    // })

    // lettreR.addEventListener('click', () => {

    //     transformLetter(lettreR);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreR);

    // })

    // lettreS.addEventListener('click', () => {

    //     transformLetter(lettreS);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreS);

    // })

    // lettreT.addEventListener('click', () => {

    //     transformLetter(lettreT);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreT);

    // })

    // lettreU.addEventListener('click', () => {

    //     transformLetter(lettreU);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreU);

    // })

    // lettreV.addEventListener('click', () => {

    //     transformLetter(lettreV);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreV);

    // })

    // lettreW.addEventListener('click', () => {

    //     transformLetter(lettreW);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreW);

    // })

    // lettreX.addEventListener('click', () => {

    //     transformLetter(lettreX);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreX);

    // })

    // lettreY.addEventListener('click', () => {

    //     transformLetter(lettreY);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreY);

    // })

    // lettreZ.addEventListener('click', () => {

    //     transformLetter(lettreZ);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreZ);

    // })

    // lettreSpace.addEventListener('click', () => {

    //     transformLetter(lettreSpace);

    //     lostGame();

    //     checkLetters(word, guess);

    //     disabledLetter(lettreSpace);

    // })




    response.innerHTML = answerArray.join(' ');


}

startGame();

