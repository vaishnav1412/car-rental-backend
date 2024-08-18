const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
        return res.status(403).json({ error: "No token provided" });
    }

    const token = authorizationHeader.split(" ")[1];
    

    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) {
            return res.status(401).json({ error: "unauthorized" });
        }
        
        req.username = decode.email;
        next();
    });
};
