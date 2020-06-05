import knex from 'knex'
import path from 'path'

const connection = knex({
    client: 'sqlite3',
    connection:{
        filename: path.resolve(__dirname, 'database.sqlite'), //essa funcao une caminhos
    },
    useNullAsDefault:true,
})

export default connection

// migration = historico do banco de dados (ajuda principalmente para trabalhar em equipe)

// 