const API_URL = "https://projeto-filmess-lac.vercel.app";
const movieGrid = document.getElementById("movieGrid");

async function buscarFilmes() {
    try {
        const resposta = await fetch(`${API_URL}/`);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os filmes.");
        }

        const filmes = await resposta.json();
        movieGrid.innerHTML = "";

        if (!filmes.length) {
            movieGrid.innerHTML = '<div class="empty-state">Nenhum filme cadastrado no momento.</div>';
            return;
        }

        filmes.forEach((filme) => {
            const card = document.createElement("article");
            card.className = "movie-card";

            const duracao = Number(filme.duracao);
            const classificacao = filme.classificacao_etaria;

            card.innerHTML = `
                <div>
                    <div class="movie-header">
                        <div class="movie-meta">
                            <span class="movie-genre">${filme.genero || "Sem gênero"}</span>
                        </div>
                    </div>

                    <h3>${filme.titulo}</h3>

                    <dl class="movie-info">
                        <div>
                            <dt>Diretor</dt>
                            <dd>${filme.diretor || "Não informado"}</dd>
                        </div>
                        <div>
                            <dt>Duração</dt>
                            <dd>${Number.isFinite(duracao) ? `${duracao} min` : filme.duracao || "—"}</dd>
                        </div>
                        <div>
                            <dt>Classificação</dt>
                            <dd>${classificacao === 0 || classificacao === "0" ? "Livre" : `${classificacao} anos`}</dd>
                        </div>
                    </dl>
                </div>

                <div class="movie-actions">
                    <a href="./editar/editar.html?id=${filme.id}" class="primary-button small">Editar</a>
                    <button class="ghost-button delete-button" data-id="${filme.id}">Apagar</button>
                </div>
            `;

            movieGrid.appendChild(card);
        });

        document.querySelectorAll(".delete-button").forEach((botao) => {
            botao.addEventListener("click", async () => {
                const id = botao.dataset.id;
                await apagarFilme(id);
            });
        });
    } catch (error) {
        console.error(error);
        movieGrid.innerHTML = '<div class="empty-state">Não foi possível carregar os filmes no momento.</div>';
    }
}

async function apagarFilme(id) {
    const confirmar = confirm("Deseja realmente apagar este filme?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/delete-filmes/${id}`, {
            method: "DELETE"
        });

        const mensagem = await resposta.json();
        alert(mensagem.message);
        buscarFilmes();
    } catch (error) {
        console.error(error);
        alert("Erro ao apagar o filme.");
    }
}

buscarFilmes();

