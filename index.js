import express from "express"
import cors from "cors"
import mysql2 from "mysql2"

const app = express()

app.use(express.json())

app.get("/all-filmes", (req, res) => {
    const selectComand = "SELECT * FROM filmes_LuizBarbosa"

    sql.query(selectComand, (error, data) => {
        if(error){
            console.log(error)
            return
        }

        res.json(data)
    })
})

app.post("/create-filmes", (req, res) => {
    const {titulo, diretor, genero, duracao, classificacao_etaria} = req.body

    const insertCommand = "INSERT INTO filmes_LuizBarbosa (titulo, diretor, genero, duracao, classificacao_etaria) VALUES (?, ?, ?, ?, ?)"

    sql.query(insertCommand, [titulo, diretor, genero, duracao, classificacao_etaria], (error)=>{
        if(error){
            console.log(error)
            return
        }

        res.status(201).json({ message: "Filme registrado com sucesso!" })
    })
})

app.delete ("/delete-filmes/:id", (req, res) => {
    const {id} = req.params

    const deleteCommand = "DELETE FROM filmes_LuizBarbosa WHERE id=?"

    sql.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
            return
        } 
            res.json ({
                message: "Filme apagado com sucesso"
            }) 
       }) 
})

app.put("/update-filmes/:id", (req, res) => {
    const {id, titulo, diretor, genero, duracao, classificacao_etaria} = req.body

    let updateCommand

    updateCommand = ` 
    UPDATE filmes_LuizBarbosa 
        SET 
            titulo = ?, 
            diretor = ?, 
            genero = ?, 
            duracao = ?, 
            classificacao_etaria = ? 
        WHERE id = ?
    `;

    sql.query(updateCommand, [id, titulo, diretor, genero, duracao, classificacao_etaria], (error) => {
        if (error) {
            console.log(error)
            return
        } 
            res.json ({
                message: "Filme atualizado com sucesso"
            })
    })
})

app.listen(3000, () => {
    console.log("Servidor online")
})

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MB"
})