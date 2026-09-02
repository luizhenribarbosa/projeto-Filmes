async function cadastrarFilme() {
    const titulo = document.getElementById("titulo")
    const genero = document.getElementById("genero")
    const classificao_etaria = document.getElementById("classifcacao_etaria")
    const duracao = document.getElementById("duracao")

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

    const resposta = await fetch("https://projeto-filmess-lac.vercel.app/", {
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