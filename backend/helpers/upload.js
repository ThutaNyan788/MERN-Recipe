
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+"/../public")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,+Date.now()+"-"+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload;