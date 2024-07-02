import {Router} from 'express';
import authMiddleware from "../middleware/auth.middleware.js";


const router = new Router()

router.get('/', authMiddleware, async (req, res) => {
    console.log(req.user, 'req.user')

    try {
        console.log('all good')
        return res.status(200).json({message: 'success'})
    } catch (e) {
        console.log(e)
    }

})


export default router;