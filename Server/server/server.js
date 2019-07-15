const express = require('express');
const upload = require('./upload')
const cors =  require ( 'cors' )

const server = express()

var corsOptions = {
    origem: '*',
    optionsSuccessStatus :  200 , 
}

server.use(cors(corsOptions))
server.listen(8000,() => {
    console.log('Server started!')
})
server.post('/upload', upload)

// https://malcoded.com/posts/react-file-upload/
// https://github.com/LukasMarx/react-file-upload/blob/master/app/src/upload/Upload.js
