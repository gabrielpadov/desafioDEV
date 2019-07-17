// server.js
const express = require('express');
//const cors =  require ( 'cors' )
const multer = require('multer');

const server = express();
//var bodyParser = require('body-parser');

// configure the app to use bodyParser()
//server.use(bodyParser.urlencoded({
//  extended: true
//}));
//server.use(bodyParser.json());
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
    
    cb(null, 'uploads/')
    
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }   
    
})
    
const upload = multer({ storage })
//server.use(cors(corsOptions))
server.use(express.static('static'));
//server.disable("x-powered-by");
// rota indicado no atributo action do formulário
   server.post('/upload', upload.single('img'),(req, res) => {

        console.log(req.body, req.files)
        
        res.send('ok')
        
        })

server.listen(8000,() => {
    console.log('Server started! App na porta 8000')
})

// fontes: http://cangaceirojavascript.com.br/express-realizando-upload-multer/
// https://malcoded.com/posts/react-file-upload/
// https://github.com/LukasMarx/react-file-upload/blob/master/app/src/upload/Upload.js
