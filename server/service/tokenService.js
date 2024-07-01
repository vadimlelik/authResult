import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import Token from "../model/tokenModel.js";

class TokenService {
    generate(payload) {

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET)

        return {accessToken, refreshToken, expiresIn: 3600};
    }

    async save(userId, refreshToken) {
        const data = await Token.findOne({
            user: userId
        })
        if (data) {
            data.refreshToken = refreshToken
            return data.save()
        }
        const token = await Token.create({user: userId, refreshToken})
        return token
    }

    validateRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, process.env.JWT_SECRET)
        } catch (e) {

        }
    }

    validateAccess(accessToken) {
        try {
            return jwt.verify(accessToken, process.env.JWT_SECRET)
        } catch (e) {
            return null
        }
    }

    async findToken(refreshToken) {
        try {
            return Token.findOne({refreshToken})
        } catch (e) {
            return null
        }
    }
}


export default new TokenService();