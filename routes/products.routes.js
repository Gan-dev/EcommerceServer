const router = require("express").Router()

const { isAuthenticaded } = require("../middlewares/verifyToken.middleware")
const Product = require("./../models/Products.model")


router.post('/create', isAuthenticaded, (req, res, next) => {

    const { name, description, category, price, image } = req.body

    const { _id: owner } = req.payload


    Product
        .create({ name, description, category, owner, price, image })
        .then((product) => res.status(200).json({ product }))
        .catch(err => next(err))

})

router.get('/getAll', (req, res, next) => {

    Product
        .find()
        .populate('owner')
        .then((products) => res.status(200).json({ products }))
        .catch(err => next(err))
})

router.get('/getOneProduct/:product_id', (req, res, next) => {
    const { product_id } = req.params

    Product
        .findById(product_id)
        .populate('owner')
        .then(product => res.status(200).json({ product }))
        .catch(err => next(err))
})

router.put('/edit/:product_id', (req, res, next) => {
    const { product_id } = req.params

    const { name, description, category, price, image, owner } = req.body
    Product
        .findByIdAndUpdate(product_id, { name, description, category, owner, price, image })
        .then((product) => res.status(200).json({ product }))
        .catch(err => next(err))

})

router.put('/deleted/:productId', (req, res, next) => {
    const { productId } = req.params
    Product
        .findByIdAndDelete(productId)
        .then(() => res.status(200).json({ message: "Borrado Correctamente" }))
        .catch(err => next(err))
})


router.get('/search', (req, res, next) => {

    const { search } = req.query
    Product
        .find({ name: { "$regex": `${search}`, "$options": "i" } })
        .then((data) => res.status(200).json(data))
        .catch(err => next(err))
})

router.get('/getOwner/:userId', (req, res, next) => {
    const { userId } = req.params

    Product
        .find({ owner: userId })
        .populate('owner')
        .then((products) => res.status(200).json(products))
        .catch((err) => next(err))
})

module.exports = router