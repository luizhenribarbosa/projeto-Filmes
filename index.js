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

app.post("/create-filme", (req, res) => {
    const {titulo, genero, duracao, classificacao_etaria} = req.body

    const insertCommand = "INSERT INTO filmes_LuizBarbosa (titulo, genero, duracao, classificacao_etaria) VALUES (?, ?, ?, ?)"

    sql.query(insertCommand, [titulo, genero, duracao, classificacao_etaria], (error)=>{
        if(error){
            console.log(error)
            return
        }

        res.status(201).json({ message: "Filme registrado com sucesso!" })
    })
})

app.delete ("/delete-filme/:id", (req, res) => {
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

app.put("/update-filme/:id", (req, res) => {
    const {id, titulo, diretor, genero, duracao, classificacao_etaria} = req.body

    let updateCommand

    if (titulo) {
        updateCommand = "UPDATE filmes_LuizBarbosa SET titulo = 0 WHERE id=?"
    } else {
        updateCommand = "UPDATE filmes_LuizBarbosa titulo = 1 WHERE id=?"
    }



    sql.query(updateCommand, [id], (error) => {
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