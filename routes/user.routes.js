const router = require("express").Router()
const { isAuthenticaded } = require("../middlewares/verifyToken.middleware")
const User = require("../models/User.model")


router.post('/addToCart/:product_id', (req, res, next) => {
    const { product_id } = req.params

    const { userId } = req.body
    User
        .findByIdAndUpdate(userId, { $push: { cart: product_id } })
        .then(() => res.status(200).json("add Completed"))
        .catch((err) => next(err))

})
router.post('/getAllCartProducts', (req, res, next) => {
    const { userId } = req.body
    User
        .findById(userId)
        .select({ cart: 1 })
        .populate("cart")
        .then((cart) => res.status(200).json({ cart }))
        .catch(err => next(err))
})

router.put('/:userId/cart/remove/:itemId', (req, res, next) => {

    const { userId, itemId } = req.params
    User
        .findByIdAndUpdate(userId, { $pull: { cart: itemId } }, { new: true })
        .then((user) => res.status(200).json(user))
        .catch(err => next(err))
})

router.put('/checkOut/:userId', (req, res, next) => {
    const { userId } = req.params
    User
        .findByIdAndUpdate(userId, { $set: { cart: [] } })
        .then(() => res.status(200).json({ message: "CheckOut Completed" }))
        .catch(err => next(err))
})

router.get('/edit/:userId', (req, res, next) => {
    const { userId } = req.params
    User
        .findById(userId)
        .then((user) => res.status(200).json(user))
        .catch(err => next(err))
})

router.put('/edit/:userId', (req, res, next) => {
    const { userId } = req.params
    const { email, username } = req.body
    console.log(email, username)

    User
        .findByIdAndUpdate(userId, { email, username })
        .then(() => res.status(200).json({ message: "Cambio correcto" }))
        .catch(err => next(err))
})



module.exports = router