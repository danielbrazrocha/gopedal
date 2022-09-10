const express = require('express')
const multer = require('multer')
const upload = multer({ dest: '/uploads' })

const router = express()


router.post('/profile');
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, '/uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})


