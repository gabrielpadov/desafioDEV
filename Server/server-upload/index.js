const Express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = Express()
app.use(bodyParser.json())
app.use(cors())
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    // callback(null, `${file.originalname}`)
  },
})
app.use(Express.static('assets'));
const upload = multer({ storage: Storage })

app.get('/', (req, res) => {
 // res.set("Content-Security-Policy", "img-src 'self' https://apis.google.com");
  //res.set('Content-Type', 'jpeg');
  res.status(200).send('You can post to /api/upload.')
})

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
//console.log('file', req.files)
 // console.log('body', req.body)
  res.status(200).json({
     message: 'success!', name: req.files
  })
})

app.listen(8000, () => {
  console.log('App running on http://localhost:8000')
})