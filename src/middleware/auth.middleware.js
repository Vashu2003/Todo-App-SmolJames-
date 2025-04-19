import jwt from 'jsonwebtoken'


function authMiddleware(req, res, next) {
    console.log('Auth Header:', req.headers['authorization'])  // <== ADD THIS

    const token = req.headers['authorization']

    console.log('👉 Received token:', token);
    console.log('🔐 JWT_SECRET in middleware:', process.env.JWT_SECRET);

    if (!token) { return res.status(401).json({ message: "No token provided" }) }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { return res.status(401).json({ message: "Invalid token" }) }

        req.userId = decoded.id
        next()
    })
}

export default authMiddleware