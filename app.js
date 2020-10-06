const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = [
  'the office',
  'friends',
  'game of thrones',
  "grey's anatomy",
  'scrubs',
  'money heist',
  'felicity',
  'gossip girls',
  'gilmore girls',
  'community',
  'new girl',
  'parks and recreation',
  'csi',
  'house',
  'breaking bad',
  'er',
  'dark',
  'prison break',
  'jane the virgin',
  'one tree hill',
  'the good place',
  'fargo',
  'the boys',
  'cobra kai',
  'lucifer',
  'the umbrella academy',
  'vikings',
  'the witcher',
  'modern family',
  'once upon a time',
  'shameless',
  'the crown',
  'the big bang theory',
  'euphoria',
  'ozark',
  'sherlock',
  'the sopranos',
  'law and order',
  "the handmaid's tale",
  'sons of anarchy',
  'black mirror',
  'the vampire diaries',
  'watchmen',
  'doctor who',
  'better call saul',
  'this is us',
  'star trek',
  'the walking dead',
  'westworld',
  'buffy the Vampire Slayer',
  'how i met your mother',
  'the last kingdom',
  'the simpsons',
  'derry girls',
  'lost',
  'bones',
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map((letter) => {
        if (letter === ' ') {
          return '<span class="space"></span>';
        } else {
          return `
              <span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
              </span>
            `;
        }
      })
      .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord.replace(/\s/g, '')) {
    finalMessage.innerText = 'Congratulations! You won! 😃';
    popup.style.display = 'flex';
  }
}

function updateWrongLettersEl() {
  //display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  //display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = '';
    }
  });

  //check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost ';
    popup.style.display = 'flex';
  }
}

function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

//keydown press letters
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

playAgainBtn.addEventListener('click', () => {
  //empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = '';
});

displayWord();
