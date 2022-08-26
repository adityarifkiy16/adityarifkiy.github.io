//Object calculator
const calculator = {
    displayNumber : '0',
    operator: null,
    firstNumber: null,
    isWaitForSecondNumber: false,
};

//fungsi untuk mengupdate angka pada layar
function updateDisplay(){
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

//fungsi untuk menghapus data pada kalkulator
function clearCalculator(){
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.isWaitForSecondNumber = false;
}

//fungsi untuk memasukan angka ke dalam displayNumber
function inputDigit(digit){
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
    calculator.displayNumber += digit;
}
}

//variable buttons
const buttons = document.querySelectorAll('.button');


//event handler
for (const button of buttons) { 
    button.addEventListener('click', function (event){
        
        //mendapatkan objek elemen yang diklik
        const target = event.target;

        //fungsi tombol +/-
        function inverseNumber() {
            if (calculator.displayNumber === '0') {
                return;
            }
            calculator.displayNumber = calculator.displayNumber * -1;
        }

        //fungsi Operasi
        function handleOperator(operator) {
            if (!calculator.isWaitForSecondNumber) {
                calculator.operator = operator;
                calculator.isWaitForSecondNumber = true;
                calculator.firstNumber = calculator.displayNumber;

                //mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angak pertama lagi
                 calculator.displayNumber = '0';
            } else {
                alert('operator sudah ditetapkan');
            }
        }

        function performCalculation() {
            if (calculator.firstNumber == null || calculator.operator == null) {
                alert('anda belum menetapkan operator');
                return;
            }

            let result = 0;
            if (calculator.operator === '+') {
                result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
            } else {
                result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
            }

            const history = {
                firstNumber: calculator.firstNumber,
                secondNumber: calculator.displayNumber,
                operator: calculator.operator,
                result: result
            }
            calculator.displayNumber = result;
            putHistory(history);
            renderHistory();
        }

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    } );
}