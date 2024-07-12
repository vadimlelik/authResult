import {Router} from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import User from '../model/userModel.js'

const router = new Router()

router.get('/', authMiddleware, async (req, res) => {
    try {
        const allUsers = await User.find()
        return res.status(200).json(allUsers)
    } catch (e) {
        console.log(e)
    }
})
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const {_id} = req.user
        const user = await User.findById(_id).populate('role')
        return res.status(200).json({'user': user})
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        console.log('hello')
        const {id} = req.params
        const user = await User.findById(id).populate('role')
        return res.status(200).json(user)
    } catch (e) {
        console.log(e)
    }
})


export default router
