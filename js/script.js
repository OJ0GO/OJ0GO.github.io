var answerGroupElement = document.getElementById("mainItems");
var chosenAnswerElement = document.getElementById("chosenAnswer");
var checkingNull = false;
var answerQuantity = 2;
var recarregamentoInicial = false;
var cavaludo = document.getElementById("cavaludo");

function ResetarRespostas(){
    if(checkingNull == true) return;
    checkingNull = true;
    LimparResposta();
    answerQuantity = 2;
    checkingNull = false;
    RecarregarInputs();
}

function LimparResposta(){
    chosenAnswerElement.innerHTML = ``;
}

function RecarregarInputs(){
    if(checkingNull == true) return;
    recarregamentoInicial = true;
    LimparResposta();
    answerGroupElement.innerHTML = ``;
    for(let i = 0; i < answerQuantity; i++){
        answerGroupElement.innerHTML += `
            <input type="text" id="answer${i}" placeholder="Opção ${i+1}">
        `;
    }
}

RecarregarInputs();

function Sortear() {
    if (checkingNull) return;
    checkingNull = true;
    LimparResposta();
    let answers = [];
    for (let i = 0; i < answerQuantity; i++) {
        let answer = document.getElementById(`answer${i}`).value;
        if (!answer) {
            showTemporaryMessage("Preencha todos os campos antes de sortear.", 1000);
            return;
        }
        answers.push(answer);
    }
    cavaludo.classList.add("girando");
    let randomNumber = Math.floor(Math.random() * answers.length);
    console.log(randomNumber, answers[randomNumber]);
    checkingNull = false;
    showAnswer(answers[randomNumber]);
}

function showAnswer(mensagem) {
    checkingNull = true;
    mensagem = `O MARCELO ESCOLHEU... ${mensagem}`;
    chosenAnswerElement.innerHTML = ''; 
    let accumulatedDelay = 0;

    for (let i = 0; i < mensagem.length; i++) {
        let randomInterval = Math.floor(Math.random() * 50) + 100;
        accumulatedDelay += randomInterval; 
        setTimeout(() => {
            chosenAnswerElement.innerHTML += mensagem[i];
            
            if(i == mensagem.length-1){
                checkingNull = false;
                showTemporaryMessage(mensagem, 3000);
            }
        }, accumulatedDelay);
    }

}

function showTemporaryMessage(message, duration) {
    checkingNull = true;
    cavaludo.classList.remove("girando");
    chosenAnswerElement.innerHTML = message;
    setTimeout(() => {
        chosenAnswerElement.innerHTML = ``;
        checkingNull = false;
    }, duration);
}

function AdicionarInputParaSorteio() {
    if(answerQuantity >= 10) {
        showTemporaryMessage(`Você chegou ao máximo de opções permitidas`, 1000);
        return;
    }
        
    answerGroupElement.innerHTML += `
        <input type="text" id="answer${answerQuantity}" placeholder="Opção ${answerQuantity + 1}">
    `;
    answerQuantity += 1; 
}