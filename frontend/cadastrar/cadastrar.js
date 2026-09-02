async function cadastrarFilme() {
    const titulo = document.getElementById("titulo")
    const genero = document.getElementById("genero")
    const classificacao_etaria = document.getElementById("classificacao_etaria")
    const duracao = document.getElementById("duracao")
    const diretor = document.getElementById("diretor")

    if (titulo.value === "" || genero.value === "" || classificacao_etaria.value === "" || duracao.value === "" || diretor.value === "") {
        alert("Preencha todos os campos!")
        return  
    }

    const filme = {
        titulo: titulo.value,
        genero: genero.value,
        classificacao_etaria: classificacao_etaria.valueAsNumber,
        duracao: duracao.valueAsNumber,
        diretor: diretor.value
    }

    const resposta = await fetch("https://projeto-filmess-lac.vercel.app/create-filmes", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(filme)
    })

    const mensagem = await resposta.json()

    alert(mensagem.message)

    window.location.href = "../index.html"
}