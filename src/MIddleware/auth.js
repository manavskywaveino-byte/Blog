// const jwt = require("jsonwebtoken")

// function auth(req, res, next) {
//     const token = req.header("Authorization")

//     if (!token) {
//         return res.status(401).json({ message: "Access denied" })
//     }


//     try {
//         const verified = jwt.verify(token, "secretkey")
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).json({ message: "  invaild Token" });
//     }
// }

// module.exports = auth;
const jwt = require("jsonwebtoken");

function auth(req, res, next) {

    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied" });
    }

    const token = authHeader.split(" ")[1]; // remove "Bearer"

    try {
        const verified = jwt.verify(token, "secretkey");
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
}

module.exports = auth;
