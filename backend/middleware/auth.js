const admin = require("../firebase");

const checkToken = async (req, res, next) => {
    try{
        const token = req.headers.authtoken;
        const decodedToken = await.auth().verifyIdToken(token)
        const uid = decodedToken.uid
        req.user_id = uid;
        next()
    } catch (error) {
        res.status(401).json({message: "Error 404, No authenticated user"})
    }
}
module.exports = { checkToken }