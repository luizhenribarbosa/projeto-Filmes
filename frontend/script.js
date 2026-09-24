async function buscarFilmes() {
    const resposta = await fetch("https://projeto-filmess-lac.vercel.app/")
    const filmes = await resposta.json()
    const sectionFilmes = document.querySelector(".filmes")

    sectionFilmes.innerHTML = ""

    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
                    <div>
                        <h2>${filme.titulo}</h2>
                        <p><strong>Diretor:</strong> ${filme.diretor}</p>
                        <p><strong>Gênero:</strong> ${filme.genero}</p>
                        <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
                        <p><strong>Classificação indicativa:</strong> ${filme.classificacao_etaria > 0 ? filme.classificacao_etaria + ' anos' : 'Livre'}</p>
                        <div class="botoes-filme">
                            <button class="botao-filme botao-editar" onclick='editarFilme(${JSON.stringify(filme)})'>Editar Filme</button>
                            <button class="botao-filme botao-apagar" onclick="apagarFilme(${filme.id})">Apagar Filme</button>
                        </div>
                    </div>
                `
    })
}

async function apagarFilme(id) {
    const respostaDeSucessoAoApagar = await fetch(`https://projeto-filmess-lac.vercel.app/delete-filmes/${id}`, { method: "DELETE" })
    const mensagem = await respostaDeSucessoAoApagar.json()

    alert(mensagem.message)

    window.location.reload()
}

async function editarFilme(filme) {
    const titulo = prompt("Digite o novo título:", filme.titulo)
    if (titulo === null) return

    const diretor = prompt("Digite o novo diretor:", filme.diretor)
    if (diretor === null) return

    const genero = prompt("Digite o novo gênero:", filme.genero)
    if (genero === null) return

    const duracao = Number(prompt("Digite a nova duração:", filme.duracao))
    if (Number.isNaN(duracao)) {
        alert("Duração inválida!")
        return
    }

    const classificacaoEtaria = Number(prompt("Digite a nova classificação indicativa:", filme.classificacao_etaria))
    if (Number.isNaN(classificacaoEtaria)) {
        alert("Classificação inválida!")
        return
    }

    const resposta = await fetch(`https://projeto-filmess-lac.vercel.app/update-filmes/${filme.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo,
            diretor,
            genero,
            duracao,
            classificacao_etaria: classificacaoEtaria
        })
    })

    const mensagem = await resposta.json()

    alert(mensagem.message)

    window.location.reload()
}

buscarFilmes()

