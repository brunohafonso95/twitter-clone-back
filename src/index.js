const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = process.env.PORT || 3000 // configurando a porta do servidor
const app = express() // instanciando o app

// extraindo o servidor http do server criado
const server = require('http').Server(app)
// habilitando o ws
const io = require('socket.io')(server)

io.on('connection', socket => {
    console.log('User connected')
})

// configurando o conexão com o mlab
mongoose.connect('mongodb://brunohafonso:twitter123@ds141704.mlab.com:41704/twitter-clone', {
    useNewUrlParser: true
})

// deixando o web socket disponivel em toda a aplicação
app.use((req, res, next) => {
    req.io = io;

    // continuando a requisição
    return next()
})

//habilitando o cors
app.use(cors())
// informando que a estrutura de dados utilizada será JSON
app.use(express.json())
// importando as rotas
app.use(require('./routes'))


// iniciando o servidor na porta definida anteriormente
server.listen(PORT, () => {
    console.log(`Server started o port ${PORT}`)
})