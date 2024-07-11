require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authenticate = async (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if (token){
        jwt.verify(
            token,
            process.env.AUTH_SECRET,
            (error, decoded)=>{
                if(error){
                    return res.status(401).send({
                        isLoggedIn: false,
                        message: 'Failed to authenticate'
                    })
                }
                req.user = {};
                req.user.id = decoded.id;
                req.user.username = decoded.username;
                next()
            }
        )
    }else{
        return res.status(401).send({message: 'Not Logged in! Login or sign in to access this resource!'})
    }
}