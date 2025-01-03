var chosenAnswerElement = document.getElementById("chosenAnswer");
var checkingNull = false;
function Sortear(){
    if(checkingNull == true) return;
    var firstAnswer = document.getElementById("firstAnswer").value;
    var secondAnswer = document.getElementById("secondAnswer").value;
    if(!firstAnswer || !secondAnswer) {
        checkingNull = true;
        chosenAnswerElement.innerHTML = `Preencha os campos necessários.`;
        setTimeout(() => {
            chosenAnswerElement.innerHTML = ``;
            checkingNull = false;
        }, 1000);
        return;
    }

    var randomNumber = Math.floor(Math.random() * 2) + 1;
    if(randomNumber == 1){
        chosenAnswerElement.innerHTML = `${firstAnswer}`;
    }else{
        chosenAnswerElement.innerHTML = `${secondAnswer}`;
    }
}