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
var word;
var check;
var answerArray = [];
var wrongLetters = 0;
var count = 0;
var addPosition;
var positionRight = 36;
var positionBottom = 13;
var postionPirRight = 52;
var positionPirBottom = 14;
var deathPositionRight;
var deathPositionBottom;


var response = document.querySelector('#response');
var splash = document.querySelector('#splash');
var santa = document.querySelector('#santa');
var badPirate = document.querySelector('#badpirate');
var infoWindow = document.querySelector('.info');
var textWinLose = document.querySelector('#text_win_loose');
var btnOk = document.querySelector('#btn_ok');
var retry = document.querySelector('#retry');

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

function lostGame() {
    if (wrongLetters > 6) {
        for (i = 0; i < keyboardFull.length; i++) {
            keyboardFull[i].disabled = true;
        }

        setTimeout(() => {
            infoLose();
            infoDisappear();
        }, 1800);

        showWord(word)
    }
}

function disabledLetter(lettre) {
    lettre.disabled = true;
}

function deathSanta() {

    santa.style.right = deathPositionRight;
    deathPositionBottom = deathPositionBottom - 2;
    santa.style.bottom = deathPositionBottom + '%';

}

function infoWin() {
    infoWindow.style.display = 'flex';
    textWinLose.innerText = 'Well done you won!!!';
}

function infoLose() {
    infoWindow.style.display = 'flex';
    textWinLose.innerText = 'To bad you lost!!!';
}

function infoDisappear() {
    btnOk.addEventListener('click', () => {
        infoWindow.style.display = 'none';
    })
}

function showWord(word) {
    for (var x = 0; x < word.length; x++) {
        answerArray[x] = word[x];
    }
    response.innerHTML = answerArray.join(' ');
}

function activeKeyboards() {
    for (i = 0; i < keyboardFull.length; i++) {
        keyboardFull[i].disabled = false;
    }
}

function resetVariables() {
    word = null;
    answerArray = [];
    response.innerHTML = null;
    wrongLetters = 0;
    count = 0;

}

function CreateSecretWord(word) {
    for (var x = 0; x < word.length; x++) {
        answerArray[x] = "_";
    }
}

function resetSantaPirate() {
    santa.style.right = 36 + '%';
    santa.style.bottom = 13 + '%';
    santa.style.opacity = "1";
    badPirate.style.right = 52 + '%';
    badPirate.style.bottom = 14 + '%';
    splash.style.display = 'none';
}

// ------------------ Game -------------------------

retry.disabled = true;

async function startGame() {
    word = await fetchWords(folder);

    CreateSecretWord(word);

    response.innerHTML = answerArray.join(' ');
}

startGame();

retry.addEventListener('click', async (word) => {
    animWhenWrongVar = setInterval(animWhenWrong, 50);
    resetVariables();
    activeKeyboards();
    resetSantaPirate();
    response.innerHTML = answerArray.join(' ');
    retry.disabled = true;
    startGame();
})


for (i = 0; i < keyboardFull.length; i++) {

    keyboardFull[i].addEventListener('click', (lettre) => {
        if (count === check || wrongLetters > 6) {
            resetSantaPirate();
        }
        check = lettre.target.innerHTML.toLowerCase();

        if (count < word.length) {

            for (var t = 0; t < word.length; t++) {
                if (word[t] === check) {
                    answerArray[t] = check;
                    response.innerHTML = answerArray.join(' ');
                    count++;
                }
                if (count === word.length) {
                    retry.disabled = false;
                    infoWin();
                    infoDisappear();
                    clearInterval(animWhenWrongVar);
                    for (i = 0; i < keyboardFull.length; i++) {
                        keyboardFull[i].disabled = true;
                    }
                }
            }
        }

        var j = (word.indexOf(check));

        if (j === -1) {
            wrongLetters++;
        }

        lostGame(word);
        disabledLetter(lettre.target);
    })
}

function animWhenWrong() {
    switch (wrongLetters) {
        case 1:
            santa.style.bottom = 11.4 + '%';
            santa.style.right = 31.9 + '%';
            badPirate.style.right = 48 + '%';
            badPirate.style.bottom = 12.5 + '%';
            break;
        case 2:
            santa.style.bottom = 9.8 + '%'; //-1.6
            santa.style.right = 27.8 + '%'; //-4.1
            badPirate.style.right = 44 + '%'; // -4
            badPirate.style.bottom = 11 + '%'; //-1.5

            break;
        case 3:
            santa.style.bottom = 8.2 + '%';
            santa.style.right = 23.7 + '%';
            badPirate.style.right = 40 + '%';
            badPirate.style.bottom = 9.5 + '%';
            break;
        case 4:
            santa.style.bottom = 6.6 + '%';
            santa.style.right = 19.6 + '%';
            badPirate.style.right = 36 + '%';
            badPirate.style.bottom = 8 + '%';
            break;
        case 5:
            santa.style.bottom = 5 + '%';
            santa.style.right = 15.5 + '%';
            badPirate.style.right = 32 + '%';
            badPirate.style.bottom = 6.5 + '%';;
            break;
        case 6:
            santa.style.bottom = 3.4 + '%';
            santa.style.right = 11.4 + '%';
            badPirate.style.right = 28 + '%';
            badPirate.style.bottom = 5 + '%';
            deathPositionRight = 7.3;
            deathPositionBottom = 1.8;
            break;
        case 7:
            retry.disabled = false;
            clearInterval(animWhenWrongVar);
            var animDeathSanta = setInterval(deathSanta, 50);
            setTimeout(() => {
                clearInterval(animDeathSanta);
                santa.style.opacity = "0";
                splash.style.display = 'initial';

            }, 1000)
            break;

    }

}

var animWhenWrongVar = setInterval(animWhenWrong, 50);
