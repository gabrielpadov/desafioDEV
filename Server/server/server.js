const Express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
// const compress = require('./compress');

const app = Express()
app.use(Express.static('public'));
app.use(bodyParser.json())

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads')
  },
  filename(req, file, callback) {
    //callback(null, file.originalname)
    callback(null, `${file.fieldname}_${file.id}.`+'jpg')
    //callback(null, `${file.fieldname}_${Date.now()}.${path.basename(file.originalname)}`)
  },
})

const upload = multer({ storage: Storage })

app.get('/', (req, res) => {
  res.status(200).send('You can post to /upload.')
})

app.post('/upload', upload.array('photo', 4), (req, res) => {
  console.log('file', req.files)
  //console.log('body', req.body)
/*  if (req.files.file) {
    //console.log(req.file);
    // Vamos mandar essa imagem para compressão antes de prosseguir
    // Ela vai retornar o a promise com o novo caminho como resultado,
    // então continuamos com o then.
     compress.compressImage(req.files.file, 100)
        .then(newPath => {
             // Vamos continuar normalmente, exibindo o novo caminho
              return res.send("Upload e compressão realizados com sucesso! O novo caminho é:" +newPath );
         })
        .catch(err => console.log(err) );
}

//return res.send('Houve erro no upload!');*/
  res.status(200).json({
    message: 'success!',
  })
})

app.listen(8000, () => {
  console.log('App running on http://localhost:8000')
})