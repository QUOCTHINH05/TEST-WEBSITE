 // Dữ liệu từ vựng mẫu
const vocabulary = {
  animals: [
    { word: "Dog", meaning: "Con chó" },
    { word: "Cat", meaning: "Con mèo" },
    { word: "Elephant", meaning: "Con voi" },
    { word: "Bird", meaning: "Con chim" },
    { word: "Fish", meaning: "Con cá" },
    { word: "Tiger", meaning: "Con hổ" },
    { word: "Monkey", meaning: "Con khỉ" },
    { word: "Cow", meaning: "Con bò" },
    { word: "Horse", meaning: "Con ngựa" },
    { word: "Sheep", meaning: "Con cừu" }
  ],
  colors: [
    { word: "Red", meaning: "Màu đỏ" },
    { word: "Blue", meaning: "Màu xanh dương" },
    { word: "Green", meaning: "Màu xanh lá" },
    { word: "Yellow", meaning: "Màu vàng" },
    { word: "Black", meaning: "Màu đen" },
    { word: "White", meaning: "Màu trắng" },
    { word: "Pink", meaning: "Màu hồng" },
    { word: "Orange", meaning: "Màu cam" }
  ]
};

// Lấy dữ liệu từ URL (vd: learn.html?topic=animals&numWords=5)
const urlParams = new URLSearchParams(window.location.search);
const topic = urlParams.get('topic');
const numWords = parseInt(urlParams.get('numWords')) || 5;

let currentIndex = 0;
let currentWords = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadWords() {
  const words = vocabulary[topic];
  if (!words) {
    document.getElementById('word').textContent = "Không tìm thấy chủ đề!";
    return;
  }
  currentWords = shuffle(words).slice(0, numWords);
  showWord();
}

function showWord() {
  const wordObj = currentWords[currentIndex];
  document.getElementById("card-front").textContent = wordObj.word;
  document.getElementById("card-back").textContent = wordObj.meaning;

  // Đảm bảo card luôn úp lại mỗi khi chuyển sang từ mới
  document.getElementById("flashcard").classList.remove("flipped");

  speakWord(wordObj.word);
}

function flipCard() {
  document.getElementById("flashcard").classList.toggle("flipped");
}


function nextWord() {
  currentIndex++;
  if (currentIndex < currentWords.length) {
    showWord();
  } else {
    startQuiz();
    document.getElementById("backBtn").style.display = "inline-block"; // Hiện nút quay lại
  }
}

function goBack() 
{
  window.location.href = "../home.html";
}
// Gọi khi trang tải xong
window.onload = loadWords;

let quizIndex = 0;
let score = 0;

function startQuiz() {
  document.getElementById("word-card").style.display = "none";
  document.getElementById("quiz-section").style.display = "block";
  showQuizQuestion();
}

function showQuizQuestion() {
  const question = currentWords[quizIndex];
  const correctAnswer = question.meaning;

  // Tạo danh sách các phương án trả lời
  const allMeanings = Object.values(vocabulary).flat().map(w => w.meaning);
  let options = [correctAnswer];

  while (options.length < 4) {
    const rand = allMeanings[Math.floor(Math.random() * allMeanings.length)];
    if (!options.includes(rand)) options.push(rand);
  }

  options = options.sort(() => Math.random() - 0.5);

  document.getElementById("quiz-question").textContent = `Từ "${question.word}" có nghĩa là gì?`;

  const quizOptionsDiv = document.getElementById("quiz-options");
  quizOptionsDiv.innerHTML = "";
  quizOptionsDiv.className = "options-grid";

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "option";
    btn.onclick = () => {
      // Vô hiệu hóa tất cả nút
      document.querySelectorAll(".option").forEach(b => b.disabled = true);

      if (option === correctAnswer) {
        btn.classList.add("correct");
        score++;
      } else {
        btn.classList.add("wrong");
        // tô màu nút đúng
        document.querySelectorAll(".option").forEach(b => {
          if (b.textContent === correctAnswer) b.classList.add("correct");
        });
      }

      setTimeout(() => {
        quizIndex++;
        if (quizIndex < currentWords.length) {
          showQuizQuestion();
        } else {
          showQuizResult();
        }
      }, 1500);
    };
    quizOptionsDiv.appendChild(btn);
  });
}


function showQuizResult() {
  document.getElementById("quiz-section").style.display = "none";
  document.getElementById("quiz-result").style.display = "block";
  document.getElementById("quiz-score").textContent =
    `🎉 Bạn trả lời đúng ${score} / ${currentWords.length} câu!`;
}


function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US'; // giọng tiếng Anh Mỹ
  utterance.rate = 0.8;     // tốc độ nói (0.1–10)
  speechSynthesis.speak(utterance);
}
