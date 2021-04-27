const jwt = require('jsonwebtoken');
const config = require("../../config/auth");
const { promisify } = require('util');

module.exports = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            error: true,
            code: 106,
            message: "Token não encontrado!"
        })
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = await promisify(jwt.verify)(token, config.secret);
        req.userId = decoded.id
        return next();
    } catch {
        return res.status(401).json({
            error: true,
            code: 106,
            message: "Token inválido"
        })
    }
}