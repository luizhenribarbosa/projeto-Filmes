async function cadastrarFilme() {
    const titulo = document.getElementById("title")
    const genero = document.getElementById("gender")
    const classificao_etaria = document.getElementById("ageLimit")
    const duracao = document.getElementById("duration")

    if (titulo.value === "" || genero.value === "" || classificao_etaria.value === "" || duracao.value === "") {
        alert("Preencha todos os campos!")
        return  
    }

    const filme = {
        titulo: titulo.value,
        genero: genero.value,
        classificao_etaria: classificao_etaria.valueAsNumber,
        duracao: duracao.valueAsNumber
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