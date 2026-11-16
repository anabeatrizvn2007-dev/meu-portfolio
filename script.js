const fundo = document.querySelector("#fundo-codigos");

if (fundo) {
    for (let i = 0; i < 40; i++) {
        const ponto = document.createElement("span");
        ponto.classList.add("ponto-luz");

        const tamanho = 2 + Math.random() * 3;

        ponto.style.width = `${tamanho}px`;
        ponto.style.height = `${tamanho}px`;
        ponto.style.left = `${Math.random() * 100}%`;
        ponto.style.top = `${Math.random() * 100}%`;
        ponto.style.animationDelay = `${Math.random() * -6}s`;

        fundo.appendChild(ponto);
    }
}
