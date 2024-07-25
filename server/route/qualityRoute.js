import { Router } from 'express'
import Quality from "../model/qualityModel.js";

const router = new Router()

router.get('/', async (req, res) => {
    try {
        const quality = await Quality.find()
        return res.status(200).json(quality)
    } catch (e) {
        console.log(e)
    }
})

export default router
