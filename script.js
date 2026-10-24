const fundo = document.querySelector("#fundo-codigos");

const reduzirMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

const caracteres = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[];=+*";
const cores = ["#ff087f", "#ff20c9", "#d63aff", "#884dff", "#248aff"];

let colunas = [];
let anterior = null;

function criarChuva() {
    fundo.replaceChildren();
    colunas = [];

    // Colunas próximas para deixar a chuva densa.
    const espacamento = 10;
    const quantidade = Math.ceil(window.innerWidth / espacamento);

    for (let i = 0; i < quantidade; i++) {
        const elemento = document.createElement("span");
        elemento.className = "codigo-chuva";

        const tamanho = 25 + Math.floor(Math.random() * 55);
        const texto = Array.from(
            { length: tamanho },
            () => caracteres[Math.floor(Math.random() * caracteres.length)]
        );

        elemento.textContent = texto.join("\n");

        // Rosa à esquerda, roxo no meio e azul à direita.
        const posicao = i / quantidade;
        const indice = Math.min(
            cores.length - 1,
            Math.floor(posicao * cores.length)
        );

        elemento.style.color = cores[indice];
        elemento.style.left = `${i * espacamento}px`;
        elemento.style.fontSize = `${8 + Math.random() * 3}px`;
        elemento.style.opacity = 0.25 + Math.random() * 0.5;

        fundo.appendChild(elemento);

        const coluna = {
            elemento,
            y: Math.random() * (
                window.innerHeight + elemento.offsetHeight
            ) - elemento.offsetHeight,
            velocidade: 20 + Math.random() * 55
        };

        colunas.push(coluna);
        elemento.style.transform = `translateY(${coluna.y}px)`;
    }
}

function animar(tempo) {
    const intervalo = anterior === null
        ? 0
        : Math.min((tempo - anterior) / 1000, 0.05);

    anterior = tempo;

    if (!reduzirMovimento.matches) {
        for (const coluna of colunas) {
            coluna.y += coluna.velocidade * intervalo;

            if (coluna.y > window.innerHeight) {
                coluna.y = -coluna.elemento.offsetHeight;
            }

            coluna.elemento.style.transform =
                `translateY(${coluna.y}px)`;
        }
    }

    requestAnimationFrame(animar);
}

window.addEventListener("resize", criarChuva);

criarChuva();
requestAnimationFrame(animar);