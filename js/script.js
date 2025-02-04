var divResposta = document.getElementById("mainItems");
var respostaEscolhida = document.getElementById("respostaEscolhida");
var cooldown = false;
var recarregamentoInicial = false;
var cavaludo = document.getElementById("cavaludo");
var respostas = ["", ""];
var removerSorteadoCheckbox = document.getElementById('removerSorteado');
var checkboxGroup = document.getElementById('checkboxGroup');

function resetarRespostas() {
    if (cooldown) return;
    cooldown = true;
    respostas = ["", ""];
    cooldown = false;
    recarregarInputs();
}

function recarregarInputs() {
    if (cooldown) return;
    recarregamentoInicial = true;
    limparResposta();
    adicionarOpcoes();
    atualizarVisibilidadeCheckbox();
}

recarregarInputs();

function limparResposta() {
    respostaEscolhida.innerHTML = ``;
}

function adicionarOpcoes() {
    divResposta.innerHTML = ``;
    respostas.forEach((value, index) => {
        divResposta.innerHTML += `
        <div>
            <input type="text" id="resposta${index}" placeholder="Opção ${index + 1}" value="${value}" tabindex="${index+1}" oninput="atualizarValor(${index}, this.value)">
            <button class="removeBtn" onclick="mensagemExcluir(${index})">X</button>
        </div>
        `;
    });
}

function atualizarValor(index, value) {
    respostas[index] = value;
}


function mensagemExcluir(respostaId) {
    if (cooldown == true) return;
    if (respostas.length == 2) {
        mostrarMensagemTemporaria("O número de alternativas não pode ser menor que 2.", 1000);
        return;
    }
    respostas.splice(respostaId, 1);
    recarregarInputs();
}

function sortear() {
    if (cooldown) return;
    cooldown = true;
    limparResposta();

    if (respostas.some(resposta => !resposta.trim())) {
        mostrarMensagemTemporaria("Preencha todos os campos antes de sortear.", 1000);
        cooldown = false;
        return;
    }

    cavaludo.classList.add("girando");
    let numeroAleatorio = Math.floor(Math.random() * respostas.length);
    mostrarResposta(numeroAleatorio);
}

function mostrarResposta(indice) {
    cooldown = true;
    let mensagem = `O MARCELO ESCOLHEU... ${respostas[indice]}`;
    respostaEscolhida.innerHTML = '';
    let delayAcumulado = 0;

    for (let i = 0; i < mensagem.length; i++) {
        let intervaloAleatorio = Math.floor(Math.random() * 50) + 100;
        delayAcumulado += intervaloAleatorio;
        setTimeout(() => {
            respostaEscolhida.innerHTML += mensagem[i];
            if (i === mensagem.length - 1) {
                cooldown = false;
                if (removerSorteadoCheckbox.checked) {
                    respostas.splice(indice, 1);
                }
                mostrarMensagemTemporaria(mensagem, 3000);
            }
        }, delayAcumulado);
    }
}

function mostrarMensagemTemporaria(message, duracao) {
    cooldown = true;
    cavaludo.classList.remove("girando");
    respostaEscolhida.innerHTML = message;
    setTimeout(() => {
        respostaEscolhida.innerHTML = ``;
        cooldown = false;
        recarregarInputs();
    }, duracao);
}

function adicionarInputParaSorteio() {
    if (cooldown) return;
    if (respostas.length >= 10) {
        mostrarMensagemTemporaria(`Você chegou ao máximo de opções permitidas`, 1000);
        return;
    }
    respostas.push("");
    recarregarInputs();
}

function atualizarVisibilidadeCheckbox() {
    if (respostas.length > 2) {
        checkboxGroup.style.display = "flex";
    }
    else {
        checkboxGroup.style.display = "none";
        removerSorteadoCheckbox.checked = false;
    }
}

document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const offsetX = mouseX - window.innerWidth / 2;
    const offsetY = mouseY - window.innerHeight / 2;
    const sensitivity = 1; 
    const moveX = offsetX * sensitivity;
    const moveY = offsetY * sensitivity;
    cavaludo.style.transform = `translate(${moveX}px, ${moveY}px)`;
});