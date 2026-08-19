async function buscarFilmes() {
    // acessar a rota GET do backend, trazer os filmes e mostrar os filmes na tela
    const resposta = await fetch("https://projeto-filmess-lac.vercel.app/") // resposta do backend
    const filmes = await resposta.json() // converte a resposta num objeto JS
    const sectionFilmes = document.querySelector(".filmes")

    filmes.forEach((filme) => {
        console.log(filme)
        sectionFilmes.innerHTML += `
                    <div>
                        <h2>${filme.titulo}</h2>
                        <p><strong>Gênero:</strong> ${filme.genero}</p>
                        <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
                        <p><strong>Classificação indicativa:</strong> ${filme.classificacao_etaria > 0 ? filme.classificacao_etaria + ' anos' : 'Livre'}</p>
                    </div>
                `
    })
}

buscarFilmes()