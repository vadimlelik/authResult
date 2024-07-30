import {Router} from 'express';
import authMiddleware from "../middleware/auth.middleware.js";
import Post from "../model/postModel.js";


const router = new Router()

router.get('/', authMiddleware, async (req, res) => {

    try {
        const posts = await  Post.find()
        return res.status(200).json(posts)
    } catch (e) {
        console.log(e)
    }

})


export default router;