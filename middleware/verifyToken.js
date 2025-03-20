const jwt = require('jsonwebtoken')



function verifyToken(req, res, next){
    const token = req.headers['authorization'].split(' ')[1];

    if(!token) {
        return res.status(404).json({error:'token not found'})
    }

    try {
        const decodeToken = jwt.verify(token, process.env.SECRET);
        console.log(decodeToken)
        req.user = decodeToken;
        next()
    } catch (error) {
        next(error)
    }
}



module.exports = verifyToken;