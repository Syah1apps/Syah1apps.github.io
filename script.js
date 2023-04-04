// Mendefinisikan varialbel 'calculator-screen' yang merepresentasikan element HTML
const calculatorScreen = document.querySelector(".calculator-screen");

// Mengupdate nilai pada layar kalkulator dengan nilai parameter yang diberikan
const updateScreen = (number) => {
  calculatorScreen.value = number;
};

// Menambahkan event listener pada setiap button angka
const numbers = document.querySelectorAll(".number");

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    inputNumber(event.target.value);
    updateScreen(currentNumber);
  });
});

// Inisialisasi variabel prevNumber, calculatorOperator, dan currentNumber
let prevNumber = "";
let calculatorOperator = "";
let currentNumber = "0";
// Mendefinisikan fungsi inputNumber untuk menangani input angka
const inputNumber = (number) => {
  // Jika nilai currentNumber masih "0", maka nilai currentNumber akan diganti dengan angka yang dimasukkan
  if (currentNumber === "0") {
    currentNumber = number;
  } else {
    // Jika nilai currentNumber bukan "0", maka angka yang dimasukkan akan ditambahkan ke currentNumber
    currentNumber += number;
  }
};

// Mengambil elemen button dengan class "operator"
const operators = document.querySelectorAll(".operator");

// Menambahkan event listener pada setiap button operator
operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    inputOperator(event.target.value);
  });
});

// Mendefinisikan fungsi inputOperator untuk menangani input operator
const inputOperator = (operator) => {
  // Jika belum ada operator yang dimasukkan sebelumnya, maka prevNumber akan diset menjadi currentNumber
  if (calculatorOperator === "") {
    prevNumber = currentNumber;
  }
  // Mengupdate nilai calculatorOperator dengan operator yang dimasukkan
  calculatorOperator = operator;
  // Mengubah nilai currentNumber menjadi "0" untuk menunggu input angka selanjutnya
  currentNumber = "0";
};

// Mengambil elemen button dengan class "equal-sign"
const equalSign = document.querySelector(".equal-sign");

// Menambahkan event listener untuk event klik
equalSign.addEventListener("click", () => {
  // Memanggil fungsi calculate dan updateScreen
  calculate();
  updateScreen(currentNumber);
});

// Mendefinisikan fungsi calculate
const calculate = () => {
  let result = "";
  // Menggunakan statement switch-case untuk melakukan perhitungan sesuai dengan operator yang dipilih
  switch (calculatorOperator) {
    case "+":
      result = parseFloat(prevNumber) + parseFloat(currentNumber);
      break;
    case "-":
      result = parseFloat(prevNumber) - parseFloat(currentNumber);
      break;
    case "*":
      result = parseFloat(prevNumber) * parseFloat(currentNumber);
      break;
    case "/":
      result = parseFloat(prevNumber) / parseFloat(currentNumber);
      break;
    default:
      break;
  }
  // Mengatur nilai variabel currentNumber menjadi hasil perhitungan
  currentNumber = result;
  // Mengatur nilai variabel calculatorOperator menjadi string kosong
  calculatorOperator = "";
};

// Mengambil elemen button dengan class "all-clear"
const clearBtn = document.querySelector(".all-clear");

// Menambahkan event listener untuk event klik
clearBtn.addEventListener("click", () => {
  // Memanggil fungsi clearAll dan update Screen
  clearAll();
  updateScreen(currentNumber);
});

// Mendefinisikan fungsi clearAll
const clearAll = () => {
  // Menghapus nilai pada variabel prevNumber dan calcualtorOperator
  prevNumber = "";
  calculatorOperator = "";
  //Mengatur nilai pada variabel currentNumber menadi "0"
  currentNumber = "0";
};

// Mengambil element button dengan class "decimal"
const decimal = document.querySelector(".decimal");

// Menambahkan event listener untuk event klik
decimal.addEventListener("click", (event) => {
  // Memanggil fungsi inputDecimal dan UpdateScreen
  inputDecimal(event.target.value);
  updateScreen(currentNumber);
});

// Mendefinisikan fungsi inputDecimal
inputDecimal = (dot) => {
  // Cek apakah bilangan sudah memiliki titik sebagai desimal
  if (currentNumber.includes(".")) {
    return;
  }
  // Jika belum, tambahkan titik sebagai desimal pada bilangan
  currentNumber += dot;
};

// mengambil elemen button dengan class "percentage"
const percentage = document.querySelector(".percentage");

// Menambahkan event listener untuk event klik
percentage.addEventListener("click", function () {
  const display = document.querySelector(".calculator-screen");
  const value = parseFloat(display.value);

  // Menghitung persentase dan menampilkannya di display
  const result = value * 0.01;
  display.value = result;
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "Enter") {
    calculate();
    updateScreen(currentNumber);
  } else if (key === "Backspace") {
    clearAll();
    updateScreen(currentNumber);
  } else if (key === ".") {
    inputDecimal(key);
    updateScreen(currentNumber);
  } else if (key >= 0 && key <= 9) {
    inputNumber(key);
    updateScreen(currentNumber);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    inputOperator(key);
  }
});
