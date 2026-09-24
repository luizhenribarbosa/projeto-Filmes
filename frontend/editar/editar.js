const API_URL = "https://projeto-filmess-lac.vercel.app";
const form = document.getElementById("formEditar");
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

async function carregarFilme() {
    if (!movieId) {
        alert("Filme não informado.");
        window.location.href = "../index.html";
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/`);
        const filmes = await resposta.json();
        const filme = filmes.find((item) => String(item.id) === String(movieId));

        if (!filme) {
            alert("Filme não encontrado.");
            window.location.href = "../index.html";
            return;
        }

        document.getElementById("titulo").value = filme.titulo || "";
        document.getElementById("diretor").value = filme.diretor || "";
        document.getElementById("genero").value = filme.genero || "";
        document.getElementById("duracao").value = filme.duracao || "";
        document.getElementById("classificacao_etaria").value = filme.classificacao_etaria || "";
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar o filme para edição.");
        window.location.href = "../index.html";
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!movieId) {
        alert("Filme inválido.");
        return;
    }

    const dados = {
        titulo: document.getElementById("titulo").value.trim(),
        diretor: document.getElementById("diretor").value.trim(),
        genero: document.getElementById("genero").value.trim(),
        duracao: Number(document.getElementById("duracao").value),
        classificacao_etaria: Number(document.getElementById("classificacao_etaria").value)
    };

    if (!dados.titulo || !dados.diretor || !dados.genero || !dados.duracao || Number.isNaN(dados.classificacao_etaria)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/update-filmes/${movieId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const mensagem = await resposta.json();
        alert(mensagem.message || "Filme atualizado com sucesso!");
        window.location.href = "../index.html";
    } catch (error) {
        console.error(error);
        alert("Erro ao atualizar o filme.");
    }
});

carregarFilme();
