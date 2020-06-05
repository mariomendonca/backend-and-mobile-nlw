import express from 'express'
const routes = express.Router() //serve para mudar as rotas para outro arquivo


routes.get('/', (req, res) => {
    return res.json({message:'hello world'})
})

export default routes