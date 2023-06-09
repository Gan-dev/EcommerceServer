const router = require("express").Router()

const uploadMiddleware = require("../middlewares/upload.middleware")

router.post('/image', uploadMiddleware.single('imageData'), (req, res) => {

    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error caragndo el archivo' })
        return
    }

    res.json({ cloudinary_url: req.file.path })
})




module.exports = router