const path = require('path');
const express = require('express');
const app = express();
const PORT = 3500;
const multer = require('multer');
const datauri = require('datauri');
// const upload = multer({dest: 'uploads/'})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      let extensionName = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extensionName);
    }
  })
  
const upload = multer({ storage: storage }) 

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/upload', upload.single('image'), function (req, res, next) {
    // req.file is the `image` file
    // req.body will hold the text fields, if there were any
    console.log(req.body);
    console.log(req.file);
    res.redirect('/');
  })

app.listen(PORT,()=>{
    console.log(`https://localhost:`+ PORT);
})