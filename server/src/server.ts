import express from 'express'

const app = express()
app.use(express.json())

const users = [
    'mario',
    'kae',
    'diego',
]


app.listen(3333)