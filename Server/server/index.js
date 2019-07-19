const Express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
// const compress = require('./compress');

const app = Express()
//app.use(Express.static('public'));
app.use(bodyParser.json())
app.use(cors())


const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads')
  },
  filename(req, file, callback) {
    callback(null, `${file.originalname}`)
    //callback(null, `${file.fieldname}_${file.id}.`+'jpg')
    //callback(null, `${file.fieldname}_${Date.now()}.${path.basename(file.originalname)}`)
  },
})

const upload = multer({ storage: Storage })

app.get('/', (req, res) => {
  res.set("Content-Security-Policy", "script-src 'self' https://apis.google.com");
  res.set('Content-Type', 'jpeg');
  res.status(200).send('You can post to /upload.')
})

app.post('/upload', upload.array('photo', 4), (req, res) => {
  console.log('file', req.files)

//return res.send('Houve erro no upload!');*/
  res.status(200).json({
    message: 'success!', name: req.files
  })
})

app.listen(8000, () => {
  console.log('App running on http://localhost:8000')
})