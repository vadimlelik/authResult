import TokenService from "../service/tokenService.js";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).send({message: 'Unauthorized'})
        }
        const data = TokenService.validateAccess(token)
        req.user = data
        next()
    } catch (e) {
        res.status(401).json({message: 'Unauthorized'})
    }
}

export default authMiddleware