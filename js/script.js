var divResposta = document.getElementById("mainItems");
var respostaEscolhida = document.getElementById("respostaEscolhida");
var cooldown = false;
var recarregamentoInicial = false;
var cavaludo = document.getElementById("cavaludo");
var respostas = ["", ""];

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
}

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

recarregarInputs();

function mensagemExcluir(respostaId) {
    if(cooldown || respostas.length == 2) return;
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
    console.log(numeroAleatorio, respostas[numeroAleatorio]);
    mostrarResposta(respostas[numeroAleatorio]);
}

function mostrarResposta(mensagem) {
    cooldown = true;
    mensagem = `O MARCELO ESCOLHEU... ${mensagem}`;
    respostaEscolhida.innerHTML = '';
    let delayAcumulado = 0;

    for (let i = 0; i < mensagem.length; i++) {
        let intervaloAleatorio = Math.floor(Math.random() * 50) + 100;
        delayAcumulado += intervaloAleatorio;
        setTimeout(() => {
            respostaEscolhida.innerHTML += mensagem[i];
            if (i === mensagem.length - 1) {
                cooldown = false;
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
    }, duracao);
}

function adicionarInputParaSorteio() {
    if(cooldown) return;
    if (respostas.length >= 10) {
        mostrarMensagemTemporaria(`Você chegou ao máximo de opções permitidas`, 1000);
        return;
    }
    respostas.push("");
    recarregarInputs();
}

document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const movementX = (mouseX / window.innerWidth) * 100;
    const movementY = (mouseY / window.innerHeight) * -100;
    const cavalo = document.getElementById("cavaludo");
    cavalo.style.transform = `translate(${movementX}%, ${movementY}%)`;
});
